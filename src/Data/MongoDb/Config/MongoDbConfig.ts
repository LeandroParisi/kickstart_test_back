import { Service } from 'typedi'

@Service()
export default class MongoDbConfig {
  static URI = 'mongodb://localhost:27017/kickstart'

  static DB_NAME = 'kickstart_test'
}
