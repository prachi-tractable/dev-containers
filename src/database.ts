import { PrismaClient } from '@prisma/client'

export const database = new PrismaClient()

/**
 * Truncates the database using the algorithm in the prisma docs
 * https://www.prisma.io/docs/concepts/components/prisma-client/crud#deleting-all-data-with-raw-sql--truncate
 */
export const cleanDatabase = async (): Promise<void> => {
    const tablenames = await database.$queryRaw<
        Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

    for (const { tablename } of tablenames) {
        if (tablename !== '_prisma_migrations') {
            try {
                await database.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`)
            } catch (error) {
                console.log({ error })
            }
        }
    }
}
