// This is the common format that every single error that comes from our service should return (including unexpected errors).
// This means other APIs or FEs that call us will always be able to access these fields on the response without fear of undefined errors.
interface ErrorResponse {
    errorCode: string
    errorMessage: string
}

export const mapToErrorResponse = (errorCode: string, errorMessage: string): ErrorResponse => ({
    errorCode,
    errorMessage,
})
