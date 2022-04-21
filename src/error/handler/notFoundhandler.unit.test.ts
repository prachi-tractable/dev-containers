import { Request, Response } from 'express'
import { notFoundHandler } from './index'

describe('notFoundHandler', () => {
    beforeEach(() => {
        jest.resetModules()
    })

    it('sends correct response status and body', () => {
        const req = {
            method: 'POST',
            url: '/box',
        }

        const sendMock = jest.fn()
        const statusMock = jest.fn().mockImplementation(() => ({ send: sendMock }))
        const mockRes = {
            status: statusMock,
        }

        notFoundHandler(req as Request, mockRes as unknown as Response, null)

        expect(statusMock).toHaveBeenCalledWith(404)
        expect(sendMock).toHaveBeenCalledWith({
            errorCode: 'DCS-00002',
            errorMessage: 'No API exists at: POST /box',
        })
    })
})
