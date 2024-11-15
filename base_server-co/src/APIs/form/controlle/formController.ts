import { Request, Response } from 'express';
import Form from '../models/Form';
import { sendEmail } from '../services/emailService';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique tokens

// Create a new form
export const createForm = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    try {
        const token = uuidv4(); // Generate a unique token
        const newForm = new Form({ name, description, token });
        await newForm.save();
        return res.status(201).json(newForm);
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ message: err.message });
    }
};

// Get all forms
export const getForms = async (_req: Request, res: Response) => {
    try {
        const forms = await Form.find();
        return res.json(forms);
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ message: err.message });
    }
};

// Get a form by ID
export const getFormById = async (req: Request, res: Response) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ message: 'Form not found' });
        return res.json(form);
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ message: err.message });
    }
};

// Update a form by ID
export const updateForm = async (req: Request, res: Response) => {
    try {
        const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!form) return res.status(404).json({ message: 'Form not found' });
        return res.json(form);
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ message: err.message });
    }
};

// Delete a form by ID
export const deleteForm = async (req: Request, res: Response) => {
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        if (!form) return res.status(404).json({ message: 'Form not found' });
        return res.json({ message: 'Form deleted successfully' });
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ message: err.message });
    }
};

// Send link to the form via email
export const sendFormLink = async (req: Request, res: Response) => {
    const { emails } = req.body;
    const formId = req.params.id;
    const formLink = `${process.env.SERVER_URL}/v1/forms/${formId}`;

    try {
        await sendEmail(emails, formLink);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};

// Get a form by token
export const getFormByToken = async (req: Request, res: Response) => {
    try {
        const form = await Form.findOne({ token: req.params.token });
        if (!form) return res.status(404).json({ message: 'Form not found' });
        return res.json(form);
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ message: err.message });
    }
};
