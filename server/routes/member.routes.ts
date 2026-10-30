import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { requireAuth } from "../middleware/auth";
import upload from "../utils/upload";
import fs from "fs";
import path from "path";

const router = Router();

function generateCode(count: number): string {
  const num = count + 1;
  return `WK-${num.toString().padStart(2, "0")}`;
}

function deleteUploadedFile(filePath: string): void {
  try {
    const fullPath = path.join(process.cwd(), "public", filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (err) {
    console.error("Failed to delete file:", err);
  }
}

// PUT /api/members/reorder — must be registered before /:id
router.put(
  "/reorder",
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const items: { id: number; order: number }[] = req.body;

      if (!Array.isArray(items)) {
        res.status(400).json({
          success: false,
          error: "Request body must be an array of { id, order }.",
        });
        return;
      }

      await prisma.$transaction(
        items.map((item) =>
          prisma.member.update({
            where: { id: item.id },
            data: { order: item.order },
          })
        )
      );

      res.json({
        success: true,
        data: { message: "Members reordered successfully." },
      });
    } catch (error) {
      console.error("Reorder members error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

// GET /api/members
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const members = await prisma.member.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    res.json({ success: true, data: members });
  } catch (error) {
    console.error("Get members error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
});

// GET /api/members/:id
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) {
      res.status(400).json({ success: false, error: "Invalid ID." });
      return;
    }

    const member = await prisma.member.findUnique({ where: { id } });

    if (!member) {
      res.status(404).json({ success: false, error: "Member not found." });
      return;
    }

    res.json({ success: true, data: member });
  } catch (error) {
    console.error("Get member error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
});

// POST /api/members
router.post(
  "/",
  requireAuth,
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, handle, role, category, fav, quote, imageUrl } = req.body;

      if (!name || !handle || !role || !category || !fav || !quote) {
        res.status(400).json({
          success: false,
          error: "All fields (name, handle, role, category, fav, quote) are required.",
        });
        return;
      }

      const validCategories = ["founder", "gamer", "lore"];
      if (!validCategories.includes(category)) {
        res.status(400).json({
          success: false,
          error: "Category must be one of: founder, gamer, lore.",
        });
        return;
      }

      let avatar = "";
      if (req.file) {
        avatar = `/uploads/${req.file.filename}`;
      } else if (imageUrl) {
        avatar = imageUrl;
      }

      const count = await prisma.member.count();
      const code = generateCode(count);

      const member = await prisma.member.create({
        data: {
          code,
          name,
          handle,
          role,
          category,
          fav,
          quote,
          avatar,
          order: count,
        },
      });

      res.status(201).json({ success: true, data: member });
    } catch (error) {
      console.error("Create member error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

// PUT /api/members/:id
router.put(
  "/:id",
  requireAuth,
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id)) {
        res.status(400).json({ success: false, error: "Invalid ID." });
        return;
      }

      const existing = await prisma.member.findUnique({ where: { id } });

      if (!existing) {
        res.status(404).json({ success: false, error: "Member not found." });
        return;
      }

      const { name, handle, role, category, fav, quote, imageUrl } = req.body;

      if (category) {
        const validCategories = ["founder", "gamer", "lore"];
        if (!validCategories.includes(category)) {
          res.status(400).json({
            success: false,
            error: "Category must be one of: founder, gamer, lore.",
          });
          return;
        }
      }

      let avatar = existing.avatar;
      if (req.file) {
        // Delete old uploaded file if it was a local upload
        if (existing.avatar.startsWith("/uploads/")) {
          deleteUploadedFile(existing.avatar);
        }
        avatar = `/uploads/${req.file.filename}`;
      } else if (imageUrl !== undefined) {
        if (existing.avatar.startsWith("/uploads/")) {
          deleteUploadedFile(existing.avatar);
        }
        avatar = imageUrl;
      }

      const member = await prisma.member.update({
        where: { id },
        data: {
          name: name ?? existing.name,
          handle: handle ?? existing.handle,
          role: role ?? existing.role,
          category: category ?? existing.category,
          fav: fav ?? existing.fav,
          quote: quote ?? existing.quote,
          avatar,
        },
      });

      res.json({ success: true, data: member });
    } catch (error) {
      console.error("Update member error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

// DELETE /api/members/:id
router.delete(
  "/:id",
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id)) {
        res.status(400).json({ success: false, error: "Invalid ID." });
        return;
      }

      const existing = await prisma.member.findUnique({ where: { id } });

      if (!existing) {
        res.status(404).json({ success: false, error: "Member not found." });
        return;
      }

      // Delete uploaded file if exists
      if (existing.avatar.startsWith("/uploads/")) {
        deleteUploadedFile(existing.avatar);
      }

      await prisma.member.delete({ where: { id } });

      res.json({
        success: true,
        data: { message: "Member deleted successfully." },
      });
    } catch (error) {
      console.error("Delete member error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

export default router;
