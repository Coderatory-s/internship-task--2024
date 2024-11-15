import { Request, Response } from 'express';
import ResponseModel from '../models/Response';

export const deleteResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    await ResponseModel.findByIdAndDelete(req.params.responseId);
    res.status(200).json({ message: 'Response deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Response deletion failed' });
  }
};

export const updateResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedResponse = await ResponseModel.findByIdAndUpdate(req.params.responseId, req.body, { new: true });
    res.json(updatedResponse);
  } catch (error) {
    res.status(500).json({ error: 'Response update failed' });
  }
};
