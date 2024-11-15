import { Request, Response } from 'express';
import FormModel from '../models/Form';

export const getUserForms = async (req: Request, res: Response): Promise<void> => {
  try {
    const forms = await FormModel.find({ createdBy: req.params.id });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Fetching user forms failed' });
  }
};
