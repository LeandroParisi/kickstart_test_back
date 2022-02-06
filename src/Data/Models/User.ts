import BaseModel from './Base/BaseModel'
import Roles from './Enums/Roles'

export default class User extends BaseModel {
  public Name : string

  public Role : Roles

  public Email : string

  public PasswordHash : string

  /**
    *
  */
  constructor(name : string, role : Roles, email : string, passwordHash : string) {
    super()
    this.Name = name
    this.Role = role
    this.Email = email
    this.PasswordHash = passwordHash
  }
}
