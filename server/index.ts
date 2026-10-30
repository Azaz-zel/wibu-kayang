import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

import authRoutes from "./routes/auth.routes";
import memberRoutes from "./routes/member.routes";
import galleryRoutes from "./routes/gallery.routes";
import storyRoutes from "./routes/story.routes";
import settingsRoutes from "./routes/settings.routes";

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Created uploads directory:", uploadsDir);
}

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static files
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/settings", settingsRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, data: { status: "ok", timestamp: new Date().toISOString() } });
});

// 404 handler for unmatched API routes
app.use("/api", (_req, res) => {
  res.status(404).json({ success: false, error: "API endpoint not found." });
});

// SPA Fallback for any frontend routes (including /admin, /login)
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api") && !req.path.startsWith("/uploads")) {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
    return;
  }
  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║         🎌 Wibu Kayank API Server 🎌          ║
╠═══════════════════════════════════════════════╣
║  Status  : Running                            ║
║  Port    : ${PORT}                                ║
║  API     : http://localhost:${PORT}/api            ║
║  Uploads : ${uploadsDir}  ║
╚═══════════════════════════════════════════════╝
  `);
});

export default app;
