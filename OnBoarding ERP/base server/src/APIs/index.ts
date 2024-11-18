import { Application } from 'express'
import { API_ROOT } from '../constant/application'

import General from './router'
import authRoutes from './user/authentication'
import userManagementRoutes from './user/management'
// import cookieParser from 'cookie-parser'
import EmployeeRouter from './Employee/router1'
// import ResetRouterLink from './Resetlinks/router2'

// import { register } from '../Api/controller';
const App = (app: Application) => {
    // app.use(cookieParser())
    app.use(`${API_ROOT}`, General)
    app.use(`${API_ROOT}`, authRoutes)
    app.use(`${API_ROOT}/user`, userManagementRoutes)
    app.use(`${API_ROOT}/reg`, EmployeeRouter)
    app.use(`${API_ROOT}/loggin`, EmployeeRouter)
    app.use(`${API_ROOT}/passwordreset`, EmployeeRouter)
    app.use(`${API_ROOT}/Userpasswordreset`, EmployeeRouter)
    app.use(`${API_ROOT}/GetEmployeeData`, EmployeeRouter)
    app.use(`${API_ROOT}/GetEmployeeDataByID`, EmployeeRouter)
    app.use(`${API_ROOT}/CreateTourDesc`, EmployeeRouter)
    app.use(`${API_ROOT}/CompanyTourData`, EmployeeRouter)
    app.use(`${API_ROOT}/LogOut`, EmployeeRouter)
}

export default App
