// formatter: off
// prettier-ignore
require('dotenv').config() // Load environment variables from .env file
// formatter: on
import * as process from 'process'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import { connectDB } from './config/database'
import api from './controllers/index.controller'
import { errorHandler, notFound } from './middlewares/exception.handler.mw'
import authenticationMiddleware from './middlewares/authentication.mw'
import './firebase/init'

const app = express()
// Setup Mongo
connectDB()
mongoose.connection.once('open', () => {
    // All OK - fire (emit) a ready event.
    app.emit('ready')
})

// setup morgan for req logging
app.use(morgan('common'))
app.use(
    cors({
        origin: process.env.ALLOWED_CORS_HOST,
    }),
)
app.use(express.json())
// Controllers
app.use('/', authenticationMiddleware, api)
// Middlewares
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000
// set vars
app.set('port', port)
app.set('env', process.env.APP_ENV)
app.set('host', process.env.APP_HOST)

// Start the server

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server Listening @: ${process.env.PROTOCOL}://${process.env.HOST}:${port}`)
})

export default app
