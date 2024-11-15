import { Application } from 'express'
import { API_ROOT } from '../constant/application'
import General from './router'
import authRoutes from './user/authentication'
import userManagementRoutes from './user/management'
import hrRoutes from './HR/authentication/router'
import reportRoutes from './HR/report/router'
import teamRoutes from './HR/team/router'
import authentication from './HR/authentication/authRoutes'
//import managementRequestRoutes from '../../src/APIs/HR/authentication/validation/managementRequest.router'
import leaveRoutes from '../../src/APIs/HR/authentication/validation/leave.router'
//import timeTrackingRoutes from './HR/_shared/Timetracking/timeTracking.router'

const App = (app: Application) => {
    app.use(`${API_ROOT}`, General)
    app.use(`${API_ROOT}`, authRoutes)
    app.use(`${API_ROOT}/user`, userManagementRoutes)
    app.use(`${API_ROOT}/attedance` , hrRoutes)
    app.use(`${API_ROOT}/report`, reportRoutes)
    app.use(`${API_ROOT}/team`, teamRoutes)
    app.use(`${API_ROOT}/authen`, authentication)
    app.use(`${API_ROOT}/leave`, leaveRoutes);
    //app.use(`${API_ROOT}/management`, managementRequestRoutes )
    //app.use(`${API_ROOT}/time-tracking`, timeTrackingRoutes);
   
}

export default App
