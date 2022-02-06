import 'dotenv/config'
import { NextFunction } from 'express'
import FireError from '../../Abstractions/FireError'
import { StatusCode } from '../../Enums/Status'
import { ErrorMessages } from '../../Enums/Messages'
import IMiddleware from '../Interfaces/IMiddleware'
import StaticImplements from '../../Annotations/StaticImplements'
import CustomRequest from '../../Interfaces/ExpressInterfaces/CustomRequest'
import JwtConfig from '../../Authentication/JwtConfig'

@StaticImplements<IMiddleware>()
export default class AuthenticateBotUser {
  static async ExecuteAsync(req : CustomRequest, res : Response, next : NextFunction) : Promise<void> {
    const { auth } = req.headers
    if (!auth) throw new FireError(StatusCode.UNAUTHORIZED, ErrorMessages.ExpiredSession)
    try {
      const { userData } = JwtConfig.Decode(auth)
      req.user = { ...userData }
      next()
    } catch (error) {
      throw new FireError(StatusCode.UNAUTHORIZED, ErrorMessages.ExpiredSession)
    }
  }
}
