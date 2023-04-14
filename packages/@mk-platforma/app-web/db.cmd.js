const { doFirstParse, run } = require('./db.cmd.utils')

const firstParse = doFirstParse()

const connectionString = getConnectionString(firstParse.env)

switch(firstParse.command){
  case 'prisma':
    run(`DATABASE_URL=${connectionString} prisma ${firstParse._unknown.join(' ')}`)
    break;
  case 'seed':
    run(`DATABASE_URL=${connectionString} pnpm _exe-ts ./data/db.seed.ts`)
    break;
  case 'truncate':
    run(`DATABASE_URL=${connectionString} prisma db execute --file './db.truncate.sql'`)
    break;
  default:
    console.log('Unsupported subcommand')
}

function getConnectionString(env){
  switch(env){
    case 'dev': return 'postgresql://postgres:postgres@localhost:5432/za_brata?schema=public'
    case 'test': return 'postgresql://postgres:s9Z4LVTQYpYvGdLdhzyJ@containers-us-west-3.railway.app:7548/railway'
    default:
      console.log(`Unsupported env: ${env}`)
  }
}
