import { PrismaClient } from "@prisma/client"
import env from "../env.mjs"

const globalForPrisma = global as unknown as {
  prisma: DbClient | undefined
}

export type DbClient = PrismaClient

const db = globalForPrisma.prisma ?? new PrismaClient()
export default db

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db
