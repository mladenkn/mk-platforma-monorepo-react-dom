const { match } = require('ts-pattern')
const { parseCommand, run, getConnectionString } = require('./cmd.utils')

const parsed = parseCommand()
const dbInstance = parsed["db-instance"]

const run_args = match(parsed.command)
  .with('dev', () => [
    { DATABASE_URL: getConnectionString(dbInstance) },
    `next dev`
  ])
  .with('db.prisma', () => [
    { DATABASE_URL: getConnectionString(dbInstance) },
    `prisma ${parsed._unknown.join(' ')}`
  ])
  .with('db.seed', () => [
    { DATABASE_URL: getConnectionString(dbInstance) },
    `pnpm _exe-ts ./data.gen/db.seed.ts`
  ])
  .with('db.truncate', () => [
    { DATABASE_URL: getConnectionString(dbInstance) },
    `prisma db execute --file './db.truncate.sql`
  ])
  .with('db.reset', () => [
    { DATABASE_URL: getConnectionString(dbInstance) },
    [
      `prisma db execute --file './db.truncate.sql'`,
      `prisma db push --accept-data-loss`,
      `pnpm _exe-ts ./data.gen/db.seed.ts`,
    ]
  ])
  .exhaustive()

run(...run_args)
