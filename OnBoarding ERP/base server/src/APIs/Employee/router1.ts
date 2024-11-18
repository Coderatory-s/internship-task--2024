import { Router } from 'express'
import { register, loginHandler, UserPasswordResetEmail, userPasswordReset, logoutHandler } from './controllers'
import { getEmployees, getEmployeeById, addTourStep, TourCompany } from '../Employee/shared/Dahboard/Employee dashboard'

const router = Router()

router.route('/register').post(register)
router.route('/login').post(loginHandler)

router.route('/passwordresetemail').post(UserPasswordResetEmail)
router.route('/userresetpass/:id/:token').post(userPasswordReset)

router.route('/getdata').get(getEmployees)
router.route('/getdatabyid/:id').get(getEmployeeById)

router.route('/Tourdesc').post(addTourStep)
router.route('/Tourdata').get(TourCompany)
router.route('/logout').post(logoutHandler)

export default router

// router.post("/",register)
