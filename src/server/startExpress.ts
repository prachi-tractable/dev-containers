import { Server } from 'http'
import express from 'express'
import { CONFIG } from '../config'
import { publicRoutes, privateRoutes } from '../api'
import { apiErrorHandler, jsonParseErrorHandler, notFoundHandler } from '../error/handler'
import { expressAsyncLocalStorage, expressLogger, logger, initialiseLogger } from '@coa/logging'
import { Environment } from '../util/environment'
import { AddressInfo } from 'net'

initialiseLogger({
    service: CONFIG.service,
    version: CONFIG.version,
    logLevel: CONFIG.logLevel,
    isLocal: CONFIG.environment === Environment.LOCAL,
})

export const startExpress = async (): Promise<Server> => {
    const app = express()

    app.use(jsonBodyParser)

    app.use(jsonParseErrorHandler)

    publicRoutes(app)

    // app.use(apiKeyAuth)

    // app.use(sessionAuth)

    app.use(expressAsyncLocalStorage)

    app.use(expressLogger())

    privateRoutes(app)

    app.use(apiErrorHandler)

    app.use(notFoundHandler)

    const server = await app.listen(CONFIG.port)

    logger.debug('Config', CONFIG)
    logger.debug('Environment variables', process.env)

    logger.info(`Server at http://localhost:${(server.address() as AddressInfo).port} started`)

    return server
}

const jsonBodyParser = express.json({
    type: () => true,
})
