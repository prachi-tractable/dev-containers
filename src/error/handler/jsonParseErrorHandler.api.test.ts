import { Server } from 'http'
import { setupServer, teardownServer } from '../../util/test/setup'
import request from 'supertest'

describe('POST incorrect request body', () => {
    let server: Server

    beforeAll(async () => {
        server = await setupServer()
    })

    afterAll(() => {
        teardownServer(server)
    })

    it('returns expected response when given malformed json', async () => {
        const response = await request(server).post('/classify').send("{ 'cat': 'meow' ")

        expect(response.status).toBe(400)
        expect(response.body).toStrictEqual({
            errorCode: 'DCS-00001',
            errorMessage: "Failed to parse JSON request body, reason: 'Unexpected token ' in JSON at position 2'",
        })
    })

    it('returns expected response when given xml', async () => {
        const response = await request(server)
            .post('/classify')
            .send('<?xml version="1.0" encoding="UTF-8" ?><cat>meow</cat>')

        expect(response.status).toBe(400)
        expect(response.body).toStrictEqual({
            errorCode: 'DCS-00001',
            errorMessage: "Failed to parse JSON request body, reason: 'Unexpected token < in JSON at position 0'",
        })
    })

    it('returns expected response when given correct json', async () => {
        const response = await request(server).post('/classify').send({ cat: 'meow' })

        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual({})
    })
})
