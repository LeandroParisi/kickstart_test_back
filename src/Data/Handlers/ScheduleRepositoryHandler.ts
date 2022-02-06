/* eslint-disable no-useless-constructor */
import { Service } from 'typedi'
import EpisodeSchedule from '../Models/EpisodeSchedule'
import ScheduleRepository from '../Repositories/ScheduleRepository'

@Service()
export default class ScheduleRepositoryHandler {
  /**
   *
   */
  constructor(private readonly Repository : ScheduleRepository) {
  }

  public async ValidateSchedule(schedule : EpisodeSchedule) : Promise<boolean> {
    const episodes = await this.Repository.FindByDate(schedule.Year, schedule.Month, schedule.Day)
    console.log(episodes)

    if (!episodes.length) return true

    const isValid = episodes.some((e : EpisodeSchedule) => e.StartTime <= schedule.StartTime && e.EndTime >= schedule.EndTime)

    return !isValid
  }
}
