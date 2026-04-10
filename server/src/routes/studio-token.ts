import { Router } from "express";
import { studioTokenService } from "../services/studio-token-service.js";
import { assertBoard } from "./authz.js";
import { badRequest } from "../errors.js";

export function studioTokenRoutes() {
  const router = Router();

  // POST /api/studio/generate-token
  // Requires an authenticated board session. Generates a one-time token for
  // the current user so the Studio app can verify their identity.
  router.post("/studio/generate-token", (req, res) => {
    assertBoard(req);

    const userId = req.actor.userId;
    if (!userId) {
      throw badRequest("No userId on actor");
    }

    const companyId: string =
      (req.body as { companyId?: string })?.companyId ??
      (req.actor.type === "board" && req.actor.companyIds?.[0]) ??
      "";

    const { token, expiresAt } = studioTokenService.generate(userId, companyId);
    res.json({ token, expiresAt });
  });

  // POST /api/studio/validate-token
  // No auth required — called by the external Studio backend to verify a token.
  router.post("/studio/validate-token", (req, res) => {
    const { token } = req.body as { token?: string };
    if (!token || typeof token !== "string") {
      res.json({ valid: false });
      return;
    }
    const result = studioTokenService.validate(token);
    res.json(result);
  });

  return router;
}
