import { PrismaClient } from "@prisma/client"
import env from "../env.mjs"

const globalForPrisma = global as unknown as {
  prisma: DbClient | undefined
}

function wrapDb() {
  const _db = new PrismaClient()
  return {
    user: _db.user,
    post: _db.post,
    post_ExpertEndorsement: _db.post_ExpertEndorsement,
    post_ExpertEndorsement_skill: _db.post_ExpertEndorsement_skill,
    category: _db.category,
    location: _db.location,
    image: _db.image,
    account: _db.account,
    session: _db.session,
    verificationToken: _db.verificationToken,
    comment: _db.comment,
    $disconnect: _db.$disconnect,
    // $transaction: _db.$transaction,
    $queryRaw: _db.$queryRaw,
    _asPrisma: _db,
  }
}

export type DbClient = ReturnType<typeof wrapDb>

const db = globalForPrisma.prisma ?? wrapDb()
export default db

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db
