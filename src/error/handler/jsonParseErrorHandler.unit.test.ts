import { Response } from 'express'
import { jsonParseErrorHandler } from './index'

describe('jsonParseErrorHandler', () => {
    beforeEach(() => {
        jest.resetModules()
    })

    it('sends correct response status and body', () => {
        const error = new Error('Unexpected token c in JSON at position 6')

        const sendMock = jest.fn()
        const statusMock = jest.fn().mockImplementation(() => ({ send: sendMock }))
        const mockRes = {
            status: statusMock,
        }

        jsonParseErrorHandler(error, null, mockRes as unknown as Response, null)

        expect(statusMock).toHaveBeenCalledWith(400)
        expect(sendMock).toHaveBeenCalledWith({
            errorCode: 'DCS-00001',
            errorMessage: "Failed to parse JSON request body, reason: 'Unexpected token c in JSON at position 6'",
        })
    })
})
