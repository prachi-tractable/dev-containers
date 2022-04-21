import { RequestError } from './RequestError'

export class InternalServerError extends RequestError {
    constructor(errorCode: string, errorMessage: string) {
        super(500, errorCode, errorMessage)
    }
}
