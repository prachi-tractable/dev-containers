import { Server } from 'http'
import { setupServer, teardownServer } from '../../util/test/setup'
import request from 'supertest'

describe('GET Non existent API', () => {
    let server: Server

    beforeAll(async () => {
        server = await setupServer()
    })

    afterAll(() => {
        teardownServer(server)
    })

    it('returns expected response', async () => {
        const response = await request(server).get('/this-is-definitely-one-hundred-percent-sure-not-a-real-endpoint')

        expect(response.status).toBe(404)
        expect(response.body).toStrictEqual({
            errorCode: 'DCS-00002',
            errorMessage: 'No API exists at: GET /this-is-definitely-one-hundred-percent-sure-not-a-real-endpoint',
        })
    })
})
