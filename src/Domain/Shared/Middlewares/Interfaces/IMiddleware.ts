/* eslint-disable semi */
import { NextFunction, Response } from 'express';
import CustomRequest from '../../Interfaces/ExpressInterfaces/CustomRequest';

export default interface IMiddleware {
  ExecuteAsync(req : CustomRequest, res : Response, next : NextFunction) : Promise<void>
}
