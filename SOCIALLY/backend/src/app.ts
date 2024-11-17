import express, { Application } from 'express'
import path from 'path'
import setupRoutes from './routes'
import errorHandler from './middlewares/errorHandler'
// import notFound from './handlers/notFound'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app: Application = express()

//Middlewares
app.use(helmet())
app.use(cookieParser())
app.use(
    cors({
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'HEAD', 'PUT', 'PATCH'],
        origin: 'http://localhost:3001',
        credentials: true
    })
)

app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

// socket/socket.ts
import { Server } from 'socket.io'

let io: Server

export const setupSocket = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log('New user connected')

        // Join a chat room
        socket.on('join-chat', (chatId: string) => {
            socket.join(chatId)
            console.log(`User joined chat: ${chatId}`)
        })

        // Send message to the room
        socket.on('send-message', (chatId: string, message: string) => {
            io.to(chatId).emit('receive-message', { chatId, message })
        })

        // Disconnect
        socket.on('disconnect', () => {
            console.log('User disconnected')
        })
    })
}

export const getSocketInstance = () => io

//Router
// app.use('/v1', router)
setupRoutes(app)

//404 handler
// app.use(notFound)

//Handlers as Middlewares
app.use(errorHandler)

export default app

