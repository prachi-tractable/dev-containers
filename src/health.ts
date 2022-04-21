import express from 'express'
import { database } from './database'

export const health: express.Handler = async (_, res, _next) => {
    try {
        await database.$executeRaw`SELECT 1;`
    } catch (error) {
        return res.status(500).send('Not OK')
    }

    res.status(200).json('OK')
}
