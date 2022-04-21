import { Server } from 'http'
import { startExpress } from './startExpress'
import { assertEnvVarIsPresent } from '../util/environment'
import { AddressInfo } from 'net'

export const startServer = async (): Promise<Server> => {
    startupCheck()

    const server = await startExpress()

    prepareGracefulShutdown(server)

    return server
}

const startupCheck = (): void | never => {
    // Here we check that the service has all the env vars it needs to function that do not have defaults
    assertEnvVarIsPresent('ENVIRONMENT')
    assertEnvVarIsPresent('PORT')
    assertEnvVarIsPresent('DATABASE_URL')
}

const prepareGracefulShutdown = (server: Server): void => {
    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received: closing server')
        const { port } = server.address() as AddressInfo
        server.close(() => {
            console.info(`Server at http://localhost:${port} closed`)
        })
    })
}
