import { PrismaClient } from "@prisma/client"
import env from "../env.mjs"

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

const db = globalForPrisma.prisma ?? new PrismaClient({ log: ["query"] })
export default db

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db
