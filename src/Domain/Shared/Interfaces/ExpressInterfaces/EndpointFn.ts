import { NextFunction, Response } from 'express'
import CustomRequest from './CustomRequest'

type EndpointFn = (req : CustomRequest, res : Response, next? : NextFunction) => Promise<Response> | Promise<void>

export default EndpointFn
