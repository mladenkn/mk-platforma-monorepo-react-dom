const { parseCommand, run, getConnectionString } = require('./cmd.utils')

const parsed = parseCommand()

const cs_env = () => `DATABASE_URL=${getConnectionString(parsed.env)}`

switch(parsed.command){
  case 'db.prisma':
    run(`${cs_env()} prisma ${parsed._unknown.join(' ')}`)
    break;
  
  case 'db.seed':
    run(`${cs_env()} pnpm _exe-ts ./data.gen/db.seed.ts`)
    break;
  
  case 'db.truncate':
    run(`${cs_env()} prisma db execute --file './db.truncate.sql'`)
    break;
  
  case 'db.reset':
    run(
      `${cs_env()} prisma db execute --file './db.truncate.sql'`,
      `${cs_env()} prisma db push --accept-data-loss`,
      `${cs_env()} pnpm _exe-ts ./data.gen/db.seed.ts`,
    )
    break;
  
  default:
    console.log('Unsupported subcommand')
    process.exit(1)
}
