import { Router } from 'express';
import {
    createForm,
    getForms,
    getFormById,
    updateForm,
    deleteForm,
    sendFormLink,
} from '../../form/controlle/formController';
import Form from '../models/Form';

const router = Router();

router.post('/', createForm);
router.get('/', getForms);
router.get('/:id', getFormById);
router.patch('/:id', updateForm);
router.delete('/:id', deleteForm);
router.post('/:id/send-link', sendFormLink);

// New route to access form by token
router.get('/token/:token', async (req, res) => {
    try {
        const form = await Form.findOne({ token: req.params.token });
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        return res.json(form); // Explicitly return here as well
    } catch (error) {
        const err = error as Error; // Cast error to Error type
        return res.status(500).json({ message: err.message }); // Ensure a response is always returned
    }
});

export default router;
