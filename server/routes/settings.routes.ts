import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/settings
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const settings = await prisma.setting.findMany();

    const settingsMap: Record<string, string> = {};
    for (const setting of settings) {
      settingsMap[setting.key] = setting.value;
    }

    res.json({ success: true, data: settingsMap });
  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
});

// PUT /api/settings
router.put(
  "/",
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const updates: Record<string, string> = req.body;

      if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
        res.status(400).json({
          success: false,
          error: "Request body must be a { key: value } object.",
        });
        return;
      }

      const upsertOperations = Object.entries(updates).map(([key, value]) =>
        prisma.setting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        })
      );

      await prisma.$transaction(upsertOperations);

      // Return updated settings
      const settings = await prisma.setting.findMany();
      const settingsMap: Record<string, string> = {};
      for (const setting of settings) {
        settingsMap[setting.key] = setting.value;
      }

      res.json({ success: true, data: settingsMap });
    } catch (error) {
      console.error("Update settings error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

export default router;
