import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";

const PLUGIN_ID = "cartolab.plugin-studio";
const PLUGIN_VERSION = "0.1.0";
const SIDEBAR_SLOT_ID = "studio-sidebar-link";
const SIDEBAR_EXPORT_NAME = "StudioSidebarEntry";

const manifest: PaperclipPluginManifestV1 = {
  id: PLUGIN_ID,
  apiVersion: 1,
  version: PLUGIN_VERSION,
  displayName: "Studio",
  description: "Adds a Studio entry to the Paperclip sidebar, linking to the Cartolab Studio app.",
  author: "Cartola Lab",
  categories: ["ui"],
  capabilities: ["ui.sidebar.register"],
  entrypoints: {
    worker: "./dist/worker.js",
    ui: "./dist/ui",
  },
  ui: {
    slots: [
      {
        type: "sidebar",
        id: SIDEBAR_SLOT_ID,
        displayName: "Studio",
        exportName: SIDEBAR_EXPORT_NAME,
      },
    ],
  },
};

export default manifest;
