import { Request, Response } from 'express';
import FormModel from '../models/Form';

export const updatePermissions = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedForm = await FormModel.findByIdAndUpdate(
            req.params.id,
            { permissions: req.body.permissions },
            { new: true }
        );
        res.json(updatedForm);
    } catch (error) {
        res.status(500).json({ error: 'Permissions update failed' });
    }
};
