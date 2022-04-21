import { InternalServerError } from '.'

describe('InternalServerError', () => {
    it('has the expected details when thrown', () => {
        try {
            throw new InternalServerError('DCS-76543', 'Do you smell smoke?')
        } catch (e) {
            expect(e.statusCode).toBe(500)
            expect(e.errorCode).toBe('DCS-76543')
            expect(e.errorMessage).toBe('Do you smell smoke?')
        }
    })
})
