import express from 'express'
import { createServer } from './server'

import request from 'supertest'
import { cleanDatabase, database } from './database'

describe('GET /health', () => {
    let server: express.Express

    beforeAll(async () => {
        await cleanDatabase()

        server = await createServer()
    })

    afterEach(async () => {
        await cleanDatabase()
    })

    afterAll(async () => {
        await database.$disconnect()
    })

    it('returns expected response', async () => {
        const response = await request(server).get('/health')

        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual('OK')
    })
})
