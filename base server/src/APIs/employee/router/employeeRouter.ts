/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { addEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from '../controller/employeeController'

const employeeRouter = Router()

employeeRouter.post('/employees', addEmployee)
employeeRouter.get('/employees', getAllEmployees)
employeeRouter.get('/employees/:id', getEmployeeById)
employeeRouter.put('/employees/:id', updateEmployee)
employeeRouter.delete('/employees/:id', deleteEmployee)

export default employeeRouter
