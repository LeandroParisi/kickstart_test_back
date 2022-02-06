import { ValidationResult } from 'joi'

export default interface IValidatedController<T> {
  Validate(payload : T) : ValidationResult<any>
}
