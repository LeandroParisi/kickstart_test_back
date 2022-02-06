/* eslint-disable no-underscore-dangle */
import { Service } from 'typedi'
import EpisodeSchedule from '../Models/EpisodeSchedule'
import MongoConnectionFactory from '../MongoDb/ConnectionFactory'
import IRepository from './Interfaces/IRepository'

@Service()
export default class ScheduleRepository implements IRepository {
  Collection: string;

  /**
   *
   */
  constructor(private readonly ConnectionFactory : MongoConnectionFactory) {
    this.Collection = 'Schedules'
  }

  public async FindByDate(Year: number, Month : number, Day : number) : Promise<EpisodeSchedule[]> {
    const connection = await this.ConnectionFactory.Create()
    try {
      const collection = connection.db.collection(this.Collection)
      const scheduled = await collection.find({ Year, Month, Day }).toArray()

      return scheduled as unknown as EpisodeSchedule[]
    } catch (e) {
      console.log('TODO: error treatment')
      return e
    } finally {
      connection.client.close()
    }
  }

  public async InsertOne(schedule : EpisodeSchedule) : Promise<boolean> {
    const connection = await this.ConnectionFactory.Create()
    try {
      const collection = connection.db.collection(this.Collection)
      const scheduled = await collection.insertOne({ ...schedule })
      connection.client.close()
      return scheduled.acknowledged
    } catch (e) {
      console.log('TODO: error treatment')
      return e
    } finally {
      connection.client.close()
    }
  }
}
