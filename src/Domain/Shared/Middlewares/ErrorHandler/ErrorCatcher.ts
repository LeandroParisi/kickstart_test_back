/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import FireError from '../../Abstractions/FireError'
import CustomRequest from '../../Interfaces/ExpressInterfaces/CustomRequest'
import EndpointFn from '../../Interfaces/ExpressInterfaces/EndpointFn'
import IMiddleware from '../Interfaces/IMiddleware'
import ErrorSender from './ErrorSender'

export default class ErrorCatcher {
  static HandleError(
    error : FireError,
    _req : CustomRequest,
    res : Response,
    _next : NextFunction,
  ) {
    console.log(error)

    return ErrorSender.SendCustomError(error, res)
  }

  static ApplyErrorCatcher(route : EndpointFn) {
    return async (req : CustomRequest, res : Response, next : NextFunction) => {
      try {
        await route(req, res, next)
      } catch (err) {
        next(err)
      }
    }
  }
}
