import { Application } from 'express'
import { API_ROOT } from '../constant/application'

import General from './router'
// import authRoutes from './user/authentication'
// import userManagementRoutes from './user/management'
import userUploadRoutes from './course_builder/router'
import userRoutes from './useUser/index'

const App = (app: Application) => {
    app.use(`${API_ROOT}`, General)
    // app.use(`${API_ROOT}`, authRoutes)
    // app.use(`${API_ROOT}/user`, userManagementRoutes)
    app.use(`${API_ROOT}/upload`, userUploadRoutes)
    app.use(`${API_ROOT}/users`, userRoutes)
}

export default App

