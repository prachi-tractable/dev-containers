import { ListObjectsCommand } from '@aws-sdk/client-s3'
import express from 'express'
import { s3Client } from './bucket'
import { database } from './database'

export const health: express.Handler = async (_, res, _next) => {
    try {
        await database.$executeRaw`SELECT 1;`

        await s3Client.send(
            new ListObjectsCommand({
                Bucket: process.env.AWS_BUCKET,
            })
        )
    } catch (error) {
        return res.status(500).send('Not OK')
    }

    res.status(200).json('OK')
}
