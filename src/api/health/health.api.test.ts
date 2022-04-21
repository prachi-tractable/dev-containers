import { Server } from 'http'
import { setupServer, teardownServer } from '../../util/test/setup'
import { cleanDatabase } from '../../util/test/database'
import request from 'supertest'
import { database } from '../../util/prisma'

describe('GET /health', () => {
    let server: Server

    beforeAll(async () => {
        await cleanDatabase()

        server = await setupServer()
    })

    afterEach(async () => {
        await cleanDatabase()
    })

    afterAll(async () => {
        await teardownServer(server)

        await database.$disconnect()
    })

    it('returns expected response', async () => {
        const response = await request(server).get('/health')

        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual({
            environment: 'test',
            uptime: expect.any(Number),
            status: 'UP',
        })
    })
})
