/* eslint-disable no-underscore-dangle */
import { v4 } from 'uuid'

export default abstract class BaseModel {
  id : string

  CreatedAt: number

  UpdatedAt: number

  /**
   *
   */
  constructor() {
    this.id = v4()
    this.CreatedAt = Date.now()
    this.UpdatedAt = Date.now()
  }

  public Update() : void {
    this.UpdatedAt = Date.now()
  }
}
