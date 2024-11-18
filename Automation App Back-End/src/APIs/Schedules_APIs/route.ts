import { Router } from 'express'
import controller from './controller'
import asyncHandler from '../../middlewares/authenticate';

const router = Router()

router.route('/protected_route').get( asyncHandler ,  controller.get_schedule);
router.route('/post_workflow').post( asyncHandler , controller.post_workflow);
router.route('/get_workflow').get( asyncHandler , controller.get_workflow);
router.route('/create_token').post(asyncHandler , controller.create_token);
router.route('/google_sheets_data').get(asyncHandler , controller.google_sheets_events);
router.route('/get_workflow/:id').get(controller.get_workflow_one);
router.route('/generate_pdf').post(controller.generate_pdf);


export default router;
