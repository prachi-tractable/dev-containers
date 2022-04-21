import { Express } from 'express'
import classify from './classify'

/**
 * These routes do need to be authenticated and logged.
 */
export const privateRoutes = (app: Express): void => {
    app.post('/classify', classify)
}
