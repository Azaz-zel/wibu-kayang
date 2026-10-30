import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { requireAuth } from "../middleware/auth";
import upload from "../utils/upload";
import fs from "fs";
import path from "path";

const router = Router();

function generateCode(count: number): string {
  const num = count + 1;
  return `LOG-${num.toString().padStart(2, "0")}`;
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

// GET /api/gallery
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await prisma.gallery.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    res.json({ success: true, data: items });
  } catch (error) {
    console.error("Get gallery error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
});

// POST /api/gallery
router.post(
  "/",
  requireAuth,
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, description, date, spanSize, imageUrl } = req.body;

      if (!title || !description || !date) {
        res.status(400).json({
          success: false,
          error: "Fields title, description, and date are required.",
        });
        return;
      }

      const validSpanSizes = ["normal", "wide"];
      const span = spanSize && validSpanSizes.includes(spanSize) ? spanSize : "normal";

      let img = "";
      if (req.file) {
        img = `/uploads/${req.file.filename}`;
      } else if (imageUrl) {
        img = imageUrl;
      }

      const count = await prisma.gallery.count();
      const code = generateCode(count);

      const item = await prisma.gallery.create({
        data: {
          code,
          title,
          description,
          date,
          spanSize: span,
          img,
          order: count,
        },
      });

      res.status(201).json({ success: true, data: item });
    } catch (error) {
      console.error("Create gallery item error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

// PUT /api/gallery/:id
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

      const existing = await prisma.gallery.findUnique({ where: { id } });

      if (!existing) {
        res.status(404).json({ success: false, error: "Gallery item not found." });
        return;
      }

      const { title, description, date, spanSize, imageUrl } = req.body;

      const validSpanSizes = ["normal", "wide"];
      const span =
        spanSize !== undefined
          ? validSpanSizes.includes(spanSize)
            ? spanSize
            : existing.spanSize
          : existing.spanSize;

      let img = existing.img;
      if (req.file) {
        if (existing.img.startsWith("/uploads/")) {
          deleteUploadedFile(existing.img);
        }
        img = `/uploads/${req.file.filename}`;
      } else if (imageUrl !== undefined) {
        if (existing.img.startsWith("/uploads/")) {
          deleteUploadedFile(existing.img);
        }
        img = imageUrl;
      }

      const item = await prisma.gallery.update({
        where: { id },
        data: {
          title: title ?? existing.title,
          description: description ?? existing.description,
          date: date ?? existing.date,
          spanSize: span,
          img,
        },
      });

      res.json({ success: true, data: item });
    } catch (error) {
      console.error("Update gallery item error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

// DELETE /api/gallery/:id
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

      const existing = await prisma.gallery.findUnique({ where: { id } });

      if (!existing) {
        res.status(404).json({ success: false, error: "Gallery item not found." });
        return;
      }

      if (existing.img.startsWith("/uploads/")) {
        deleteUploadedFile(existing.img);
      }

      await prisma.gallery.delete({ where: { id } });

      res.json({
        success: true,
        data: { message: "Gallery item deleted successfully." },
      });
    } catch (error) {
      console.error("Delete gallery item error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

export default router;
