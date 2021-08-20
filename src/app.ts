/* Archivo global con todas sus configuraciones */
import express, { Application } from 'express'
import passport from 'passport'
import authRoute from './routes/auth.route'
import catRoute from './routes/cat.route'
import cookieSession from 'cookie-session'
import config from './config//config'
import cors from 'cors'
import { environment } from './environments/environment.dev'

const app : Application = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookies.key]
}))

app.use(cors({
    methods: ['GET', 'POST'],
    credentials: true,
    origin: environment.frontEnd,
}))

app.use(passport.initialize())
app.use(passport.session())

/* Rutas */
app.use(authRoute)
app.use(catRoute)

app.set('port', process.env.PORT || 3000)

export default app
