// src/APIs/form/controllers/formResponseController.ts

import { Request, Response } from 'express';
import FormResponse from '../models/formResponseModel'; // Import the model

// GET /api/v1/forms/:id/responses
export const getFormResponses = async (req: Request, res: Response) => {
    const formId = req.params.id;

    try {
        const responses = await FormResponse.find({ formId });
        return res.status(200).json(responses);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving responses', error });
    }
};

// POST /api/v1/forms/:id/responses
export const submitFormResponse = async (req: Request, res: Response) => {
    const formId = req.params.id;
    const response = req.body;

    const newResponse = new FormResponse({
        formId,
        response
    });

    try {
        await newResponse.save();
        return res.status(201).json({ message: 'Response submitted successfully', response: newResponse });
    } catch (error) {
        return res.status(500).json({ message: 'Error submitting response', error });
    }
};
