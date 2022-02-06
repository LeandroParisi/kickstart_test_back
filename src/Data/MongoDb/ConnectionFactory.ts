/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import { Db, MongoClient } from 'mongodb'
import { Service } from 'typedi'
import MongoDbConfig from './Config/MongoDbConfig'

export interface DbFactoryPayload{
  db: Db
  client : MongoClient
}

@Service()
export default class MongoConnectionFactory {
  public async Create() : Promise<DbFactoryPayload> {
    const client = await new MongoClient(MongoDbConfig.URI).connect()
    const db = client.db(MongoDbConfig.DB_NAME)

    return { client, db }
  }
}
