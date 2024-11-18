import { Application } from 'express'
import { API_ROOT } from '../constant/application'
import { recruitmentRoutes } from '../APIs/recruitment/router/recruitmentroute'
import General from './router'
import Goalrouter from '../APIs/goalsetting/router/goalroute'
import AttendanceRouter from './attendence/router/AttendanceRouter'
import employeeRouter from './employee/router/employeeRouter'
import progressRouter from './progress tracker/router/progressRouter'
import router from '../APIs/user/index'
// import userRouter from './login/router/userRouter'

// import authRoutes from './user/authentication'
//import userManagementRoutes from './user/management'

const App = (app: Application) => {
    app.use(`${API_ROOT}`, General)
    app.use(`${API_ROOT}/user`, router)
    app.use(`${API_ROOT}/recruitment`, recruitmentRoutes)
    app.use(`${API_ROOT}/goal`, Goalrouter)
    app.use(`${API_ROOT}/Attendance`, AttendanceRouter)
    app.use(`${API_ROOT}/employee`, employeeRouter)
    app.use(`${API_ROOT}/progress`, progressRouter)
    // app.use(`${API_ROOT}/user`, userRouter)
}

export default App
