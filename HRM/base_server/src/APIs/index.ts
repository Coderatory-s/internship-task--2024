import { Application } from 'express'
import { API_ROOT } from '../constant/application'

import General from './router'
import authRoutes from './user/authentication'
import userManagementRoutes from './user/management'
import Progressrouter from './Tasktracking/router/ProgressRouter'
import Jobrouter from './recruitment/router/Jobrouter';

import Taskrouter from './goals/router/TaskRouter'
import Candidaterouter from './candidate/routes/CandidateRouter'
import Attendencerouter from './Attendence/router/AttendenceRouter'

const App = (app: Application) => {
    app.use(`${API_ROOT}`, General)
    app.use(`${API_ROOT}`, authRoutes)
    app.use(`${API_ROOT}/user`, userManagementRoutes)
    app.use(`${API_ROOT}/progress`, Progressrouter)
    app.use(`${API_ROOT}/job`, Jobrouter)
    app.use(`${API_ROOT}/task`, Taskrouter)
    app.use(`${API_ROOT}/candidate`, Candidaterouter)
    app.use(`${API_ROOT}/attendence`, Attendencerouter)
    
}

export default App
