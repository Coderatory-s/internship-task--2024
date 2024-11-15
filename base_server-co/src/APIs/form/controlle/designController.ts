import { Request, Response } from 'express';
import FormModel from '../models/Form';

export const updateDesign = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedForm = await FormModel.findByIdAndUpdate(req.params.id, { design: req.body.design }, { new: true });
    res.json(updatedForm);
  } catch (error) {
    res.status(500).json({ error: 'Form design update failed' });
  }
};
