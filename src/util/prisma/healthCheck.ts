import { database } from './database'

/**
 * Checks that the app has a working connection to the database.
 */
export const healthCheck = async (): Promise<void> => {
    await database.$executeRaw`SELECT 1;`
}
