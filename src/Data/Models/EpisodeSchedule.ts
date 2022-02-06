import PodcastEpisode from './PodcastEpidode'
import BaseModel from './Base/BaseModel'
import SchedulePayload from '../../Domain/ScheduleApi/Payloads/SchedulePayload'

export default class EpisodeSchedule extends BaseModel {
  EpisodeId : string

  Year : number

  Month : number

  Day : number

  StartTime : number

  EndTime : number

  /**
   *
   */
  constructor(
    payload : SchedulePayload,
  ) {
    super()
    this.EpisodeId = payload.EpisodeId
    this.Year = payload.Year
    this.Month = payload.Month
    this.Day = payload.Day
    this.StartTime = payload.StartTime
    this.EndTime = payload.EndTime
  }
}
