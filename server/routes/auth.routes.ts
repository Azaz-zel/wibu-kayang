import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        success: false,
        error: "Username and password are required.",
      });
      return;
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials.",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials.",
      });
      return;
    }

    const secret = process.env.JWT_SECRET || "fallback-secret";
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      secret,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      data: {
        token,
        username: admin.username,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    let errorMessage = "Internal server error.";
    if (error?.code === "P1001" || error?.message?.includes("Can't reach database server")) {
      errorMessage = "Koneksi ke database MySQL gagal. Pastikan Laragon/MySQL sudah di-Start.";
    } else if (error?.code === "P2021" || (typeof error?.message === "string" && error.message.includes("does not exist"))) {
      errorMessage = "Tabel database belum dibuat. Jalankan 'npm run db:push' dan 'npm run db:seed'.";
    }
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
});

// POST /api/auth/change-password
router.post(
  "/change-password",
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        res.status(400).json({
          success: false,
          error: "Current password and new password are required.",
        });
        return;
      }

      if (newPassword.length < 6) {
        res.status(400).json({
          success: false,
          error: "New password must be at least 6 characters long.",
        });
        return;
      }

      const admin = await prisma.admin.findUnique({
        where: { id: req.adminId },
      });

      if (!admin) {
        res.status(404).json({
          success: false,
          error: "Admin not found.",
        });
        return;
      }

      const isCurrentValid = await bcrypt.compare(
        currentPassword,
        admin.password
      );

      if (!isCurrentValid) {
        res.status(401).json({
          success: false,
          error: "Current password is incorrect.",
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      await prisma.admin.update({
        where: { id: req.adminId },
        data: { password: hashedPassword },
      });

      res.json({
        success: true,
        data: { message: "Password changed successfully." },
      });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

// GET /api/auth/verify
router.get(
  "/verify",
  requireAuth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({
        success: true,
        data: {
          valid: true,
          username: req.adminUsername,
        },
      });
    } catch (error) {
      console.error("Verify error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

export default router;
