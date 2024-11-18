import express, { Application } from 'express'
import path from 'path'
import router from './APIs'
import errorHandler from './middlewares/errorHandler'
import notFound from './handlers/notFound'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import bodyParser from 'body-parser';


const app: Application = express()
app.use(bodyParser.json({ limit: '2gb' }));
app.use(bodyParser.urlencoded({ limit: '2gb', extended: true }));

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
app.use('/uploads', express.static('uploads'));
//Router
// app.use('/v1', router)
router(app)

//404 handler
app.use(notFound)

//Handlers as Middlewares
app.use(errorHandler)

export default app
