import {  Response } from 'express';
import Lecture, { ILecture } from '../../models/addLecture.model';
import multer from 'multer';
import path from 'path';
import { Cloudinary } from '../../../config/cloudinaryConfig';
import fs from 'fs';
import {CourseModel} from '../../models/course';

const uploadsDir = path.join(__dirname, '../../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadsDir); 
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

export const uploadLecture = upload.single('videoUrl');

export const createLecture = async (req: any, res: Response): Promise<Response> => {
  const { userId, courseId } = req.params; 
  const { title, type, articleContent, textContent } = req.body;
  const user = req.user; 

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
  }

  if (user._id.toString() !== userId) {
    return res.status(403).json({ message: 'You can only add lectures to your own courses' });
  }

  try {
    const course = await CourseModel.findOne({ _id: courseId, createdBy: user._id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found or does not belong to the user' });
    }

    if (!title || !type) {
      return res.status(400).json({ message: 'Title and type are required fields' });
    }
    const lectureData: Partial<ILecture> = { title, type, courseId };

    if (type === 'video') {
      if (req.file) {
        const cloudinaryResult = await Cloudinary.uploader.upload(req.file.path, {
          resource_type: 'video',
          folder: 'lectures',
          format: 'mp4',
        });

        lectureData.videoUrl = cloudinaryResult.secure_url;

        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      } else {
        return res.status(400).json({ message: 'Video file is required for video lectures' });
      }
    } else if (type === 'article') {
      lectureData.articleContent = articleContent || '';
    } else if (type === 'text') {
      lectureData.textContent = textContent || '';
    } else {
      return res.status(400).json({ message: 'Invalid lecture type' });
    }

    // Create and save the lecture
    const lecture: ILecture = new Lecture(lectureData);
    await lecture.save();

    return res.status(201).json({ message: 'Lecture created successfully', lecture });
  } catch (error: any) {
    console.error('Error creating lecture:', error);
    return res.status(500).json({ message: 'Failed to create lecture', error: error.message || error });
  }
};
