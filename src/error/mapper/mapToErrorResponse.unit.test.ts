import { mapToErrorResponse } from './index'

describe('mapToErrorResponse', () => {
    it('should return expected response object', () => {
        const errorResponse = mapToErrorResponse('DCS-87654', 'Computer says no.')

        expect(errorResponse).toStrictEqual({ errorCode: 'DCS-87654', errorMessage: 'Computer says no.' })
    })
})
