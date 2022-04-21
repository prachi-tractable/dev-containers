import { PrismaClient } from '@prisma/client'

const database = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
        {
            emit: 'event',
            level: 'error',
        },
    ],
})

database.$on('query', (event) => {
    console.debug(`query: ${event.query}, params: ${event.params}, duration: ${event.duration}`)
})

database.$on('info', (event) => {
    console.info(event.message)
})

database.$on('warn', (event) => {
    console.warn(event.message)
})

database.$on('error', (event) => {
    console.error(event.message)
})

export { database }
