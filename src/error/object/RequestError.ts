export class RequestError extends Error {
    statusCode: number
    errorCode: string
    errorMessage: string

    constructor(statusCode: number, errorCode: string, errorMessage: string) {
        super(errorMessage)

        this.statusCode = statusCode
        this.errorCode = errorCode
        this.errorMessage = errorMessage
    }
}
