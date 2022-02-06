/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { NextFunction, Request, Response } from 'express'
import Joi, { ValidationError, ValidationResult } from 'joi'
import { Service } from 'typedi'
import ScheduleRepositoryHandler from '../../../Data/Handlers/ScheduleRepositoryHandler'
import EpisodeSchedule from '../../../Data/Models/EpisodeSchedule'
import ScheduleRepository from '../../../Data/Repositories/ScheduleRepository'
import StaticImplements from '../../Shared/Annotations/StaticImplements'
import IController from '../../Shared/Interfaces/IController'
import IValidatedController from '../../Shared/Interfaces/IValidatedController'
import SchedulePayload from '../Payloads/SchedulePayload'

@Service()
export default class PostScheduleController implements IController, IValidatedController<SchedulePayload> {
  /**
   *
   */
  constructor(
    private readonly ScheduleHandler : ScheduleRepositoryHandler,
    private readonly Repository : ScheduleRepository,
  ) {
    this.ExecuteAsync.bind(this)
  }

  public Validate(payload: SchedulePayload): ValidationResult<any> {
    const schema = Joi.object({
      Year: Joi.number().required(),
      Month: Joi.number().required(),
      Day: Joi.number().required(),
      StartTime: Joi.number().required(),
      EndTime: Joi.number().required(),
      EpisodeId: Joi.string().required(),
    })

    return schema.validate(payload)
  }

  public async ExecuteAsync(req : Request, res : Response) : Promise<Response> {
    const payload = req.body as SchedulePayload
    const validation = this.Validate(payload)

    if (validation.error) {
      return res.status(404).json({ errors: this.ExtractValidationErrors(validation.error) })
    }

    const schedule = new EpisodeSchedule(payload)
    const isValid = await this.ScheduleHandler.ValidateSchedule(schedule)

    if (!isValid) return res.status(409).json({ error: 'Date already taken' })

    try {
      await this.Repository.InsertOne(schedule)
      return res.status(201)
    } catch {
      return res.status(500)
    }
  }

  private ExtractValidationErrors(error: ValidationError) : string {
    return error.details.map((x) => x.message).join(', ')
  }
}
