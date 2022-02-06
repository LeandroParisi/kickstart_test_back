import { Service } from 'typedi'
import BaseRouter from '../Shared/BaseClasses/BaseRouter'
import ErrorCatcher from '../Shared/Middlewares/ErrorHandler/ErrorCatcher'
import PostScheduleController from './Controllers/PostScheduleController'

@Service()
export default class ScheduleApiRouter extends BaseRouter {
  /**
   *
   */
  constructor(
    private readonly PostSchedule : PostScheduleController,
  ) {
    super('/schedule')
  }

  SetRouter() : void {
    this.Route.post('/', ErrorCatcher.ApplyErrorCatcher(this.PostSchedule.ExecuteAsync.bind(this.PostSchedule)))
  }
}
