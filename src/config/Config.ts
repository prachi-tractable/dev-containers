import * as process from 'process'
import { Environment } from '../util/environment'

interface Config {
    environment: Environment
    version: string
    port: string
    logLevel: string
    service: string
}

export const CONFIG: Config = {
    environment: process.env.ENVIRONMENT as Environment,
    version: process.env.npm_package_version,
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL || 'info',
    service: process.env.npm_package_name,
}
