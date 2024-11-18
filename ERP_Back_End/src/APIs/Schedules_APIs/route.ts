import { Router } from 'express'
import controller from './controller'
// import asyncHandler from '../../handlers/async';

const router = Router()

router.route('/get_schedule').get(controller.get_schedule);
router.route('/get_one_schedule').post(controller.get_one_schedule);
// router.route('/post_schedule').post(controller.post_schedule);
router.route('/post_schedule').post(controller.post_schedule);
router.route('/schedule_update/:id').put(controller.schedule_update);
router.route('/schedule_delete/:id').delete(controller.schedule_delete);

export default router;
