import type { ErrorRequestHandler } from 'express'
import { JSON_PARSE_ERROR_CODE, JSON_PARSE_ERROR_MESSAGE } from '../constants'
import { mapToErrorResponse } from '../mapper'

export const jsonParseErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    res.status(400).send(mapToErrorResponse(JSON_PARSE_ERROR_CODE, JSON_PARSE_ERROR_MESSAGE(error.message)))
}
