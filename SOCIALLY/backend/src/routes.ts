import { Application } from 'express'
import userRouter from './APIs/user' // Your user routes
import postRouter from './APIs/posts' // Your post routes (assuming you have this)
import friendRouter from './APIs/friend'
import chatRouter from './APIs/chats'
const API_URL = '/v1'
const setupRoutes = (app: Application) => {
    app.use(`${API_URL}/users`, userRouter) // Register user routes
    app.use(`${API_URL}/posts`, postRouter) //  post routes
    app.use(`${API_URL}/chats`, chatRouter) // chat routes
    app.use(`${API_URL}/friends`, friendRouter) //  friends routes
}

export default setupRoutes
