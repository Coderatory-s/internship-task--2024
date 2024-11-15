import { Request, Response } from 'express';
import TemplateModel from '../models/Template';

export const createTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const template = new TemplateModel(req.body);
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ error: 'Template creation failed' });
  }
};

export const getTemplates = async (_req: Request, res: Response): Promise<void> => {
  try {
    const templates = await TemplateModel.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: 'Fetching templates failed' });
  }
};

export const deleteTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    await TemplateModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Template deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Template deletion failed' });
  }
};
