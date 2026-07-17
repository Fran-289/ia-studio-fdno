import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  private getUserDir(userId: string): string {
    const dir = path.join(this.uploadDir, userId);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
  }

  async upload(file: Express.Multer.File, userId: string) {
    try {
      const userDir = this.getUserDir(userId);
      const filename = `${Date.now()}-${file.originalname}`;
      const filePath = path.join(userDir, filename);

      fs.writeFileSync(filePath, file.buffer);

      const url = `/uploads/${userId}/${filename}`;

      this.logger.log(`File uploaded: ${url} (${file.size} bytes)`);

      return {
        success: true,
        data: {
          id: filename,
          url,
          filename: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
        },
      };
    } catch (error: any) {
      this.logger.error(`Upload failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async list(userId: string) {
    try {
      const userDir = this.getUserDir(userId);
      const files = fs.readdirSync(userDir);

      const result = files
        .filter((f) => fs.statSync(path.join(userDir, f)).isFile())
        .map((f) => {
          const stat = fs.statSync(path.join(userDir, f));
          return {
            id: f,
            url: `/uploads/${userId}/${f}`,
            filename: f.replace(/^\d+-/, ''),
            size: stat.size,
            createdAt: stat.birthtime,
          };
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return { success: true, data: result };
    } catch (error: any) {
      this.logger.error(`List failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async delete(fileUrl: string) {
    try {
      const filePath = path.join(process.cwd(), fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        this.logger.log(`File deleted: ${fileUrl}`);
      }
      return { success: true };
    } catch (error: any) {
      this.logger.error(`Delete failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}
