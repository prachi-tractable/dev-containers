import { Handler } from 'express'
import { Environment } from '../../util/environment'
import { CONFIG } from '../../config'
import * as process from 'process'
import { healthCheck } from '../../util/prisma'
import { RequestError } from '../../error/object'
import { DATABASE_CONNECTION_FAILED_ERROR_CODE, DATABASE_CONNECTION_FAILED_ERROR_MESSAGE } from '../../error/constants'

enum Status {
    UP = 'UP',
    DOWN = 'DOWN',
}

interface HealthResponse {
    environment: Environment
    uptime: number
    sha: string
    status: Status
}

const health: Handler = async (_, res, next) => {
    try {
        await healthCheck()
    } catch (error) {
        return next(
            new RequestError(
                503,
                DATABASE_CONNECTION_FAILED_ERROR_CODE,
                DATABASE_CONNECTION_FAILED_ERROR_MESSAGE(error)
            )
        )
    }

    const response: HealthResponse = {
        environment: CONFIG.environment,
        uptime: process.uptime(),
        sha: process.env.SHA, // TODO: Not going to work currently
        status: Status.UP,
    }

    res.status(200).json(response)
}

export default health
