import { Response } from 'express'
import { Service } from 'typedi'
import FireError from '../../Abstractions/FireError'
import { DefaultErrorsDict, DefaultPathDict } from '../../Enums/SequelizeErrorsLib'
import { StatusCode } from '../../Enums/Status'
import { ErrorMessages, ErrorTypes } from '../../Enums/Messages'
import { IIndexable } from '../../Interfaces/SystemInterfaces/IIndexable'

@Service()
export default class ErrorSender {
  static SendCustomError(error : FireError, res : Response) : Response {
    const { statusCode, message } = error

    if (!statusCode) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        type: ErrorTypes.CustomError,
        error: ErrorMessages.InternalError,
      })
    }

    return res.status(statusCode).json({
      type: ErrorTypes.CustomError,
      error: message,
    })
  }

  static TranslateDefaultError(errorMessage : string) {
    const translatedMessage = (DefaultErrorsDict as IIndexable)[errorMessage] as string
    if (translatedMessage) return translatedMessage
    return errorMessage
  }
}
