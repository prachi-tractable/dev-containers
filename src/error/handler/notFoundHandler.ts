import type { Handler } from 'express'
import { API_NOT_FOUND_ERROR_CODE, API_NOT_FOUND_ERROR_MESSAGE } from '../constants'
import { mapToErrorResponse } from '../mapper'

export const notFoundHandler: Handler = (req, res, _next) => {
    res.status(404).send(mapToErrorResponse(API_NOT_FOUND_ERROR_CODE, API_NOT_FOUND_ERROR_MESSAGE(req.method, req.url)))
}
