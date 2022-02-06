import { Request, Response } from 'express'

export default interface IController {
  ExecuteAsync(req : Request, res : Response) : Promise<Response>
}
