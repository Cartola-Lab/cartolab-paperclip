import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadConfig } from "../config.js";
import { readConfigFile } from "../config-file.js";

vi.mock("../config-file.js", () => ({
  readConfigFile: vi.fn(),
}));

vi.mock("../home-paths.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../home-paths.js")>();
  return {
    ...actual,
    resolveDefaultBackupDir: () => "/default/backup",
    resolveDefaultEmbeddedPostgresDir: () => "/default/db",
    resolveDefaultSecretsKeyFilePath: () => "/default/secrets/master.key",
    resolveDefaultStorageDir: () => "/default/storage",
    resolveHomeAwarePath: (p: string) => p.replace(/^~/, "/home/user"),
  };
});

describe("loadConfig", () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset process.env but keep ORIGINAL_ENV reference if possible,
    // though vitest might prefer a fresh object.
    for (const key in process.env) {
      delete process.env[key];
    }
    Object.assign(process.env, ORIGINAL_ENV);

    // Clear relevant PAPERCLIP_ env vars to ensure a clean state
    for (const key in process.env) {
      if (key.startsWith("PAPERCLIP_") || key === "PORT" || key === "HOST" || key === "DATABASE_URL") {
        delete process.env[key];
      }
    }
  });

  afterEach(() => {
    for (const key in process.env) {
      delete process.env[key];
    }
    Object.assign(process.env, ORIGINAL_ENV);
  });

  it("loads default configuration when no file or environment variables are present", () => {
    vi.mocked(readConfigFile).mockReturnValue(null);

    const config = loadConfig();

    expect(config.port).toBe(3100);
    expect(config.host).toBe("127.0.0.1");
    expect(config.databaseMode).toBe("embedded-postgres");
    expect(config.secretsProvider).toBe("local_encrypted");
    expect(config.storageProvider).toBe("local_disk");
    expect(config.deploymentMode).toBe("local_trusted");
    expect(config.deploymentExposure).toBe("private");
  });

  it("prefers environment variables over config file", () => {
    vi.mocked(readConfigFile).mockReturnValue({
      $meta: { version: 1, updatedAt: "", source: "configure" },
      server: { port: 4000, host: "0.0.0.0", deploymentMode: "local_trusted", exposure: "private", serveUi: true, allowedHostnames: [] },
      database: { mode: "postgres", connectionString: "postgres://file", embeddedPostgresDataDir: "", embeddedPostgresPort: 54329, backup: { enabled: true, intervalMinutes: 60, retentionDays: 30, dir: "" } },
      logging: { mode: "file", logDir: "" },
      telemetry: { enabled: true },
    } as any);

    process.env.PORT = "5000";
    process.env.DATABASE_URL = "postgres://env";
    process.env.PAPERCLIP_DEPLOYMENT_MODE = "authenticated";
    process.env.PAPERCLIP_DEPLOYMENT_EXPOSURE = "public";

    const config = loadConfig();

    expect(config.port).toBe(5000);
    expect(config.databaseUrl).toBe("postgres://env");
    expect(config.deploymentMode).toBe("authenticated");
    expect(config.deploymentExposure).toBe("public");
  });

  it("correctly handles allowedHostnames from env and config", () => {
    vi.mocked(readConfigFile).mockReturnValue({
      server: {
        allowedHostnames: ["file.com"],
        deploymentMode: "local_trusted",
      },
    } as any);

    process.env.PAPERCLIP_ALLOWED_HOSTNAMES = "env1.com, env2.com ";
    process.env.PAPERCLIP_PUBLIC_URL = "https://public.com";

    const config = loadConfig();

    expect(config.allowedHostnames).toContain("file.com");
    expect(config.allowedHostnames).toContain("env1.com");
    expect(config.allowedHostnames).toContain("env2.com");
    expect(config.allowedHostnames).toContain("public.com");
  });

  it("handles authBaseUrlMode logic and public URL fallbacks", () => {
    // Case 1: auto with no public URL
    vi.mocked(readConfigFile).mockReturnValue(null);
    let config = loadConfig();
    expect(config.authBaseUrlMode).toBe("auto");
    expect(config.authPublicBaseUrl).toBeUndefined();

    // Case 2: BETTER_AUTH_URL fallback
    process.env.BETTER_AUTH_URL = "https://better.com";
    config = loadConfig();
    expect(config.authPublicBaseUrl).toBe("https://better.com");
    expect(config.authBaseUrlMode).toBe("explicit");
    delete process.env.BETTER_AUTH_URL;

    // Case 3: auto with PAPERCLIP_PUBLIC_URL -> explicit
    process.env.PAPERCLIP_PUBLIC_URL = "https://example.com";
    config = loadConfig();
    expect(config.authPublicBaseUrl).toBe("https://example.com");
    expect(config.authBaseUrlMode).toBe("explicit");

    // Case 4: explicit from env overrides auto-detection
    process.env.PAPERCLIP_AUTH_BASE_URL_MODE = "auto";
    config = loadConfig();
    expect(config.authBaseUrlMode).toBe("auto");
  });

  it("handles secrets provider selection", () => {
    vi.mocked(readConfigFile).mockReturnValue({
      secrets: { provider: "local_plain" },
    } as any);

    let config = loadConfig();
    expect(config.secretsProvider).toBe("local_plain");

    process.env.PAPERCLIP_SECRETS_PROVIDER = "local_encrypted";
    config = loadConfig();
    expect(config.secretsProvider).toBe("local_encrypted");
  });

  it("handles storage provider and local disk configuration", () => {
    vi.mocked(readConfigFile).mockReturnValue({
      storage: {
        provider: "local_disk",
        localDisk: { baseDir: "/file/storage" }
      },
    } as any);

    let config = loadConfig();
    expect(config.storageProvider).toBe("local_disk");
    expect(config.storageLocalDiskBaseDir).toBe("/file/storage");

    process.env.PAPERCLIP_STORAGE_LOCAL_DIR = "~/env/storage";
    config = loadConfig();
    expect(config.storageLocalDiskBaseDir).toBe("/home/user/env/storage");
  });

  it("handles S3 storage configuration", () => {
    process.env.PAPERCLIP_STORAGE_PROVIDER = "s3";
    process.env.PAPERCLIP_STORAGE_S3_BUCKET = "my-bucket";
    process.env.PAPERCLIP_STORAGE_S3_REGION = "us-west-2";
    process.env.PAPERCLIP_STORAGE_S3_ENDPOINT = "http://minio:9000";
    process.env.PAPERCLIP_STORAGE_S3_PREFIX = "test/";
    process.env.PAPERCLIP_STORAGE_S3_FORCE_PATH_STYLE = "true";

    const config = loadConfig();
    expect(config.storageProvider).toBe("s3");
    expect(config.storageS3Bucket).toBe("my-bucket");
    expect(config.storageS3Region).toBe("us-west-2");
    expect(config.storageS3Endpoint).toBe("http://minio:9000");
    expect(config.storageS3Prefix).toBe("test/");
    expect(config.storageS3ForcePathStyle).toBe(true);
  });

  it("handles database backup configuration", () => {
    vi.mocked(readConfigFile).mockReturnValue({
      database: {
        backup: {
          enabled: true,
          intervalMinutes: 120,
          retentionDays: 60,
          dir: "/file/backup"
        }
      },
    } as any);

    let config = loadConfig();
    expect(config.databaseBackupEnabled).toBe(true);
    expect(config.databaseBackupIntervalMinutes).toBe(120);
    expect(config.databaseBackupRetentionDays).toBe(60);
    expect(config.databaseBackupDir).toBe("/file/backup");

    process.env.PAPERCLIP_DB_BACKUP_ENABLED = "false";
    process.env.PAPERCLIP_DB_BACKUP_INTERVAL_MINUTES = "30";
    process.env.PAPERCLIP_DB_BACKUP_RETENTION_DAYS = "10";
    process.env.PAPERCLIP_DB_BACKUP_DIR = "/env/backup";

    config = loadConfig();
    expect(config.databaseBackupEnabled).toBe(false);
    expect(config.databaseBackupIntervalMinutes).toBe(30);
    expect(config.databaseBackupRetentionDays).toBe(10);
    expect(config.databaseBackupDir).toBe("/env/backup");
  });

  it("handles telemetry and company deletion defaults based on deployment mode", () => {
    // Mode local_trusted -> companyDeletionEnabled defaults to true
    process.env.PAPERCLIP_DEPLOYMENT_MODE = "local_trusted";
    let config = loadConfig();
    expect(config.companyDeletionEnabled).toBe(true);

    // Mode authenticated -> companyDeletionEnabled defaults to false
    process.env.PAPERCLIP_DEPLOYMENT_MODE = "authenticated";
    config = loadConfig();
    expect(config.companyDeletionEnabled).toBe(false);

    // Explicitly set via env
    process.env.PAPERCLIP_ENABLE_COMPANY_DELETION = "true";
    config = loadConfig();
    expect(config.companyDeletionEnabled).toBe(true);
  });

  it("handles heartbeat scheduler configuration", () => {
    process.env.HEARTBEAT_SCHEDULER_ENABLED = "false";
    process.env.HEARTBEAT_SCHEDULER_INTERVAL_MS = "5000"; // Should be clamped to 10000

    const config = loadConfig();
    expect(config.heartbeatSchedulerEnabled).toBe(false);
    expect(config.heartbeatSchedulerIntervalMs).toBe(10000);
  });
});
