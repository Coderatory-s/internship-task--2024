import { Request, Response } from 'express';
import Draft from '../models/Draft';


export const getDraft = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const draft = await Draft.findById(id);
        if (!draft) {
            return res.status(404).json({ error: 'Draft not found' });
        }
        return res.status(200).json(draft);
    } catch (error) {
        console.error('Error fetching draft:', error);
        return res.status(500).json({ error: 'Failed to retrieve draft' });
    }
};


export const createDraft = async (req: Request, res: Response) => {
    const { title, description, fields, createdBy } = req.body;

    if (!title || !description || !fields || !createdBy) {
        return res.status(400).json({ error: 'Title, description, fields, and createdBy are required.' });
    }

    try {
        const newDraft = new Draft({
            title,
            description,
            fields,
            createdBy,
        });

        await newDraft.save();
        return res.status(201).json({ message: 'Draft created successfully', draft: newDraft });
    } catch (error) {
        console.error('Error creating draft:', error);
        return res.status(500).json({ error: 'Failed to create draft' });
    }
};
