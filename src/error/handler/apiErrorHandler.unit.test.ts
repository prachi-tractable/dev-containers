import { Response } from 'express'
import { apiErrorHandler } from './index'
import { RequestError } from '../object'

describe('apiErrorHandler', () => {
    beforeEach(() => {
        jest.resetModules()
    })

    it('sends correct response status and body when the error is a RequestError', () => {
        const error = new RequestError(418, 'ERR-418', "I'm a teapot.")

        const sendMock = jest.fn()
        const statusMock = jest.fn().mockImplementation(() => ({ send: sendMock }))
        const mockRes = {
            status: statusMock,
        }

        apiErrorHandler(error, null, mockRes as unknown as Response, null)

        expect(statusMock).toHaveBeenCalledWith(418)
        expect(sendMock).toHaveBeenCalledWith({
            errorCode: 'ERR-418',
            errorMessage: "I'm a teapot.",
        })
    })

    it('sends correct response status and body when the error is from one of our internal services', () => {
        const error = {
            response: {
                status: 418,
                data: {
                    errorCode: 'ERR-418',
                    errorMessage: "I'm a teapot.",
                },
            },
        }

        const sendMock = jest.fn()
        const statusMock = jest.fn().mockImplementation(() => ({ send: sendMock }))
        const mockRes = {
            status: statusMock,
        }

        apiErrorHandler(error, null, mockRes as unknown as Response, null)

        expect(statusMock).toHaveBeenCalledWith(418)
        expect(sendMock).toHaveBeenCalledWith({
            errorCode: 'ERR-418',
            errorMessage: "I'm a teapot.",
        })
    })

    it('sends correct response status and body when the error is missing response field', () => {
        const error = {}

        const sendMock = jest.fn()
        const statusMock = jest.fn().mockImplementation(() => ({ send: sendMock }))
        const mockRes = {
            status: statusMock,
        }

        apiErrorHandler(error, null, mockRes as unknown as Response, null)

        expect(statusMock).toHaveBeenCalledWith(500)
        expect(sendMock).toHaveBeenCalledWith({
            errorCode: 'DCS-00000',
            errorMessage: 'Something went wrong.',
        })
    })

    it('sends correct response status and body when the error is missing status field', () => {
        const error = {
            response: {
                data: {
                    errorCode: 'ERR-418',
                    errorMessage: "I'm a teapot.",
                },
            },
        }

        const sendMock = jest.fn()
        const statusMock = jest.fn().mockImplementation(() => ({ send: sendMock }))
        const mockRes = {
            status: statusMock,
        }

        apiErrorHandler(error, null, mockRes as unknown as Response, null)

        expect(statusMock).toHaveBeenCalledWith(500)
        expect(sendMock).toHaveBeenCalledWith({
            errorCode: 'DCS-00000',
            errorMessage: 'Something went wrong.',
        })
    })

    it('sends correct response status and body when the error is missing data field', () => {
        const error = {
            response: {
                status: 418,
            },
        }

        const sendMock = jest.fn()
        const statusMock = jest.fn().mockImplementation(() => ({ send: sendMock }))
        const mockRes = {
            status: statusMock,
        }

        apiErrorHandler(error, null, mockRes as unknown as Response, null)

        expect(statusMock).toHaveBeenCalledWith(500)
        expect(sendMock).toHaveBeenCalledWith({
            errorCode: 'DCS-00000',
            errorMessage: 'Something went wrong.',
        })
    })

    it('sends correct response status and body when the error is missing errorCode field', () => {
        const error = {
            response: {
                status: 418,
                data: {
                    errorMessage: "I'm a teapot.",
                },
            },
        }

        const sendMock = jest.fn()
        const statusMock = jest.fn().mockImplementation(() => ({ send: sendMock }))
        const mockRes = {
            status: statusMock,
        }

        apiErrorHandler(error, null, mockRes as unknown as Response, null)

        expect(statusMock).toHaveBeenCalledWith(500)
        expect(sendMock).toHaveBeenCalledWith({
            errorCode: 'DCS-00000',
            errorMessage: 'Something went wrong.',
        })
    })

    it('sends correct response status and body when the error is missing errorMessage field', () => {
        const error = {
            response: {
                status: 418,
                data: {
                    errorCode: 'ERR-418',
                },
            },
        }

        const sendMock = jest.fn()
        const statusMock = jest.fn().mockImplementation(() => ({ send: sendMock }))
        const mockRes = {
            status: statusMock,
        }

        apiErrorHandler(error, null, mockRes as unknown as Response, null)

        expect(statusMock).toHaveBeenCalledWith(500)
        expect(sendMock).toHaveBeenCalledWith({
            errorCode: 'DCS-00000',
            errorMessage: 'Something went wrong.',
        })
    })
})
