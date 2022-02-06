import { Router } from 'express'
import IRouter from '../Interfaces/IRouter'

export default abstract class BaseRouter implements IRouter {
  BaseRoute: string;

  Route: Router;

  /**
   *
   */
  constructor(baseRoute : string) {
    this.BaseRoute = baseRoute
    this.Initialize()
  }

  private Initialize() {
    this.Route = Router()
  }

  abstract SetRouter() : void
}
