import { Express } from 'express'
import health from './health'

/**
 * These routes do not need to be authenticated or logged.
 */
export const publicRoutes = (app: Express): void => {
    app.get('/health', health)
}
