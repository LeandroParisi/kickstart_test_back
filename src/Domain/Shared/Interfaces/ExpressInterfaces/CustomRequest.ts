import { IncomingHttpHeaders } from 'http'
import { Request } from 'express'
import IUserToken from '../IUserToken'

interface CustomRequest extends Request {
  myAwesomeProperty?: number
  headers : IncomingHttpHeaders & {
    auth : string
  }
  user? : IUserToken
}

export default CustomRequest
