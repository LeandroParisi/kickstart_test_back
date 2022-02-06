import 'reflect-metadata'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import Container, { Service } from 'typedi'
import ScheduleApiRouter from './Domain/ScheduleApi/Router'
import ErrorCatcher from './Domain/Shared/Middlewares/ErrorHandler/ErrorCatcher'

const corsOptions = {
  credentials: true,
  origin: true,
}

@Service()
class Main {
  ScheduleApiRouter : ScheduleApiRouter

  /**
   *
   */
  constructor() {
    this.ScheduleApiRouter = Container.get(ScheduleApiRouter)
  }

  public StartServer() {
    const app = express()
    const PORT = process.env.PORT || 3000

    app.use(cors(corsOptions))
    app.use(express.json())
    app.use(cookieParser())

    this.Startup()

    app.get('/', (re, res) => res.status(200))

    app.use(this.ScheduleApiRouter.BaseRoute, this.ScheduleApiRouter.Route)

    app.use(ErrorCatcher.HandleError)

    app.listen(PORT, () => console.log(`listening to port ${PORT}`))
  }

  Startup() {
    this.ScheduleApiRouter.SetRouter()
  }
}

new Main().StartServer()
