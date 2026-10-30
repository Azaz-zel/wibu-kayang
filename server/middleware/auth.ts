import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      adminId?: number;
      adminUsername?: string;
    }
  }
}

interface JwtPayload {
  id: number;
  username: string;
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      error: "Authentication required. Provide a Bearer token.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "fallback-secret";
    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.adminId = decoded.id;
    req.adminUsername = decoded.username;
    next();
  } catch {
    res.status(401).json({
      success: false,
      error: "Invalid or expired token.",
    });
  }
}
