import * as express from 'express';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      file?: express.Multer.File; // Add this line to include the file property
    }
  }
}
