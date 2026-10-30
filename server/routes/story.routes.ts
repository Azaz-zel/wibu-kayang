import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { requireAuth } from "../middleware/auth";
import upload from "../utils/upload";
import fs from "fs";
import path from "path";

const router = Router();

function generateCode(count: number): string {
  const num = count + 1;
  return `STORY-${num.toString().padStart(2, "0")}`;
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

// GET /api/stories
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const stories = await prisma.story.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    res.json({ success: true, data: stories });
  } catch (error) {
    console.error("Get stories error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
});

// POST /api/stories
router.post(
  "/",
  requireAuth,
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, author, tag, date, content, imageUrl } = req.body;

      if (!title || !author || !tag || !date || !content) {
        res.status(400).json({
          success: false,
          error: "Fields title, author, tag, date, and content are required.",
        });
        return;
      }

      let img: string | null = null;
      if (req.file) {
        img = `/uploads/${req.file.filename}`;
      } else if (imageUrl) {
        img = imageUrl;
      }

      const count = await prisma.story.count();
      const code = generateCode(count);

      const story = await prisma.story.create({
        data: {
          code,
          title,
          author,
          tag,
          date,
          content,
          img,
          order: count,
        },
      });

      res.status(201).json({ success: true, data: story });
    } catch (error) {
      console.error("Create story error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

// PUT /api/stories/:id
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

      const existing = await prisma.story.findUnique({ where: { id } });

      if (!existing) {
        res.status(404).json({ success: false, error: "Story not found." });
        return;
      }

      const { title, author, tag, date, content, imageUrl } = req.body;

      let img = existing.img;
      if (req.file) {
        if (existing.img && existing.img.startsWith("/uploads/")) {
          deleteUploadedFile(existing.img);
        }
        img = `/uploads/${req.file.filename}`;
      } else if (imageUrl !== undefined) {
        if (existing.img && existing.img.startsWith("/uploads/")) {
          deleteUploadedFile(existing.img);
        }
        img = imageUrl || null;
      }

      const story = await prisma.story.update({
        where: { id },
        data: {
          title: title ?? existing.title,
          author: author ?? existing.author,
          tag: tag ?? existing.tag,
          date: date ?? existing.date,
          content: content ?? existing.content,
          img,
        },
      });

      res.json({ success: true, data: story });
    } catch (error) {
      console.error("Update story error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

// DELETE /api/stories/:id
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

      const existing = await prisma.story.findUnique({ where: { id } });

      if (!existing) {
        res.status(404).json({ success: false, error: "Story not found." });
        return;
      }

      if (existing.img && existing.img.startsWith("/uploads/")) {
        deleteUploadedFile(existing.img);
      }

      await prisma.story.delete({ where: { id } });

      res.json({
        success: true,
        data: { message: "Story deleted successfully." },
      });
    } catch (error) {
      console.error("Delete story error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

export default router;
