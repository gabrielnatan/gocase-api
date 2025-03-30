import multer from "multer";
import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware dinâmico de upload
 * 
 * @param folder Nome da subpasta dentro de /upload (ex: 'products', 'users')
 * @param field Nome do campo de input (ex: 'images', 'avatar')
 * @param max Quantidade máxima de arquivos
 */
export function createUploadMiddleware(folder: string, field: string, max = 5) {
  const UPLOAD_FOLDER = path.resolve("src", "upload", folder);

  // Garante que a pasta existe
  if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, UPLOAD_FOLDER);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${field}-${unique}${ext}`);
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB por arquivo
    fileFilter: (_req, file, cb) => {
        console.log("ARQUIVO RECEBIDO:", {
            mimetype: file.mimetype,
            name: file.originalname,
          });
      const allowed = ["image/jpeg", "image/png", "image/webp"];
      if (allowed.includes(file.mimetype)) cb(null, true);
      else cb(new Error("Formato de imagem inválido"));
    },
  }).array(field, max);

  return (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError || err) {
        return res.status(400).json({ error: err.message });
      }

      const files = Array.isArray(req.files) ? (req.files as Express.Multer.File[]) : [];

      // Injeta as URLs no req.body
      req.body[field] = files.map((file) => `/uploads/${folder}/${file.filename}`);

      next();
    });
  };
}
