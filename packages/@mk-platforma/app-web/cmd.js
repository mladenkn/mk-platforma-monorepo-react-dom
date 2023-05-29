const { parseCommand, run, getConnectionString } = require('./cmd.utils')

const parsed = parseCommand()
const dbInstance = parsed["db-instance"]

switch(parsed.command){
  case "dev":
    run(
      { DATABASE_URL: getConnectionString(dbInstance) },
      `next dev`
    )
    break;

  case 'db.prisma':
    run(
      { DATABASE_URL: getConnectionString(dbInstance) },
      `prisma ${parsed._unknown.join(' ')}`
    )
    break;
  
  case 'db.seed':
    run(
      { DATABASE_URL: getConnectionString(dbInstance) },
      `pnpm _exe-ts ./data.gen/db.seed.ts`
    )
    break;
  
  case 'db.truncate':
    run(
      { DATABASE_URL: getConnectionString(dbInstance) },
      `prisma db execute --file './db.truncate.sql`
    )
    break;
  
  case 'db.reset':
    run(
      { DATABASE_URL: getConnectionString(dbInstance) },
      [
        `prisma db execute --file './db.truncate.sql'`,
        `prisma db push --accept-data-loss`,
        `pnpm _exe-ts ./data.gen/db.seed.ts`,
      ]
    )
    break;
  
  default:
    console.log('Unsupported subcommand')
    process.exit(1)
}