import { RequestError } from '.'

describe('RequestError', () => {
    it('has the expected details when thrown', () => {
        try {
            throw new RequestError(418, 'DCS-93412', "I'm a teapot.")
        } catch (e) {
            expect(e.statusCode).toBe(418)
            expect(e.errorCode).toBe('DCS-93412')
            expect(e.errorMessage).toBe("I'm a teapot.")
        }
    })
})
