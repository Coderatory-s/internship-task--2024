import { Application } from 'express'
import { API_ROOT } from '../constant/application'

import General from './router'
import authRoutes from './user/authentication'
import userManagementRoutes from './user/management'
import leadRoutes from './lead'
import activitiesRoutes from './activities/index'
import opportunityRoutes from './opportunity/index'

const App = (app: Application) => {
    app.use(`${API_ROOT}`, General)
    app.use(`${API_ROOT}`, authRoutes)
    app.use(`${API_ROOT}/user`, userManagementRoutes)
    app.use(`${API_ROOT}/leads`, leadRoutes)
    app.use(`${API_ROOT}/activities`, activitiesRoutes)
    app.use(`${API_ROOT}/opportunities`, opportunityRoutes)
}

export default App

