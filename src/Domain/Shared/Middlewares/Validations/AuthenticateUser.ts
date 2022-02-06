import { NextFunction, Response } from 'express'
import FireError from '../../Abstractions/FireError'
import StaticImplements from '../../Annotations/StaticImplements'
import JwtConfig from '../../Authentication/JwtConfig'
import { ErrorMessages } from '../../Enums/Messages'
import { StatusCode } from '../../Enums/Status'
import CustomRequest from '../../Interfaces/ExpressInterfaces/CustomRequest'
import IMiddleware from '../Interfaces/IMiddleware'

require('dotenv/config')

@StaticImplements<IMiddleware>()
export default class AuthenticateUser {
  static async ExecuteAsync(req : CustomRequest, res : Response, next : NextFunction) : Promise<void> {
    const { wbt } = req.cookies
    if (!wbt) throw new FireError(StatusCode.UNAUTHORIZED, ErrorMessages.ExpiredSession)
    try {
      const { userData } = JwtConfig.Decode(wbt)
      req.user = { ...userData }
      next()
    } catch (error) {
      throw new FireError(StatusCode.UNAUTHORIZED, ErrorMessages.ExpiredSession)
    }
  }
}
