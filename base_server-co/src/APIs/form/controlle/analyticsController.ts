import { Request, Response } from 'express';
import ResponseModel from '../models/Response';

export const getAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const responseCount = await ResponseModel.countDocuments({ formId: req.params.id });
    res.json({ responseCount });
  } catch (error) {
    res.status(500).json({ error: 'Analytics retrieval failed' });
  }
};
