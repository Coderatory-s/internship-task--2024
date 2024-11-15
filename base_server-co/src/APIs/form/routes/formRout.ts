import express from 'express';
import { getAnalytics } from '../controlle/analyticsController';
import { deleteResponse, updateResponse } from '../controlle/responseController';
import { updateDesign } from '../controlle/designController';
import { createDraft, getDraft } from '../controlle/draftController';
import { createTemplate, getTemplates, deleteTemplate } from '../controlle/templateController';
import { getUserForms } from '../controlle/userController';
import { updatePermissions } from '../controlle/permissionsController';

const router = express.Router();

// Analytics
router.get('/:id/analytics', getAnalytics);

// Response Management
router.delete('/:id/responses/:responseId', deleteResponse);
router.patch('/:id/responses/:responseId', updateResponse);

// Form Design Customization
router.patch('/:id/design', updateDesign);

// Drafts and Autosave
router.post('/drafts', createDraft);
router.get('/drafts/:id', getDraft);

// Template Management
router.post('/templates', createTemplate);
router.get('/templates', getTemplates);
router.delete('/templates/:id', deleteTemplate);

// User Form Retrieval
router.get('/users/:id/forms', getUserForms);

// Permissions/Access Control
router.patch('/:id/permissions', updatePermissions);

export default router;