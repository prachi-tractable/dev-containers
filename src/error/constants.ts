// Error code format is DCS-XXXXX where XXXXX is a number we increment by 1 each time we add a new code
// Error messages could be exposed to the public so should be kept vague and are only used to help quickly debug problems

export const DEFAULT_ERROR_CODE = 'DCS-00000'
export const DEFAULT_ERROR_MESSAGE = 'Something went wrong.'

export const JSON_PARSE_ERROR_CODE = 'DCS-00001'
export const JSON_PARSE_ERROR_MESSAGE = (message: string): string =>
    `Failed to parse JSON request body, reason: '${message}'`

export const API_NOT_FOUND_ERROR_CODE = 'DCS-00002'
export const API_NOT_FOUND_ERROR_MESSAGE = (method: string, url: string): string => `No API exists at: ${method} ${url}`

export const DATABASE_CONNECTION_FAILED_ERROR_CODE = 'DCS-00003'
export const DATABASE_CONNECTION_FAILED_ERROR_MESSAGE = (error: Error): string =>
    `Failed to connect to database due to: ${error}`
