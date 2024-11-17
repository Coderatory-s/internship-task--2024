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
