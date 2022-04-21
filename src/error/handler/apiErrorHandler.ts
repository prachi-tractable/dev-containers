import type { ErrorRequestHandler } from 'express'
import { DEFAULT_ERROR_CODE, DEFAULT_ERROR_MESSAGE } from '../constants'
import { RequestError } from '../object'
import { mapToErrorResponse } from '../mapper'

interface InternalApiError {
    response: {
        status: number
        data: {
            errorCode: string
            errorMessage: string
        }
    }
}

// Returns true if the error was thrown by us intentionally during an endpoint invocation
function isRequestError(error): error is RequestError {
    return error instanceof RequestError
}

// Returns true if the error originated from one of our internal APIs and therefore has this specific shape
function isInternalApiError(error): error is InternalApiError {
    return error?.response?.status && error?.response?.data?.errorCode && error?.response?.data?.errorMessage
}

export const apiErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    if (isRequestError(error)) {
        // This is an error we threw intentionally
        const { statusCode, errorCode, errorMessage } = error

        console.warn(error)

        res.status(statusCode).send(mapToErrorResponse(errorCode, errorMessage))
    } else if (isInternalApiError(error)) {
        // This is an error that was thrown from an internal API we called, so we just pass the error codes back
        // TODO: This relies on Flexible API having a defined error response shape with codes and messages, which we need to verify or insist on!
        console.error(error)

        const {
            status,
            data: { errorCode, errorMessage },
        } = error.response

        res.status(status).send(mapToErrorResponse(errorCode, errorMessage))
    } else {
        // We don't know what this error is, so we fall back to a generic error response and log it as an error
        console.error(error)

        res.status(500).send(mapToErrorResponse(DEFAULT_ERROR_CODE, DEFAULT_ERROR_MESSAGE))
    }
}
