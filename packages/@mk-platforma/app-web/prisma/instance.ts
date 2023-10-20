import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

const db_prisma = globalForPrisma.prisma ?? new PrismaClient()
export default db_prisma

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db_prisma
