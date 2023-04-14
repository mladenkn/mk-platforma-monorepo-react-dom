const { doFirstParse, run } = require('./db.cmd.utils')

const firstParse = doFirstParse()

const connectionString = getConnectionString(firstParse.env)
const cs_env = `DATABASE_URL=${connectionString}`

switch(firstParse.command){
  case 'prisma':
    run(`${cs_env} prisma ${firstParse._unknown.join(' ')}`)
    break;
  
  case 'seed':
    run(`${cs_env} pnpm _exe-ts ./data/db.seed.ts`)
    break;
  
  case 'truncate':
    run(`${cs_env} prisma db execute --file './db.truncate.sql'`)
    break;
  
  default:
    console.log('Unsupported subcommand')
    process.exit(1)
}

function getConnectionString(env){
  switch(env){
    case 'dev': return 'postgresql://postgres:postgres@localhost:5432/za_brata?schema=public'
    case 'test': return 'postgresql://postgres:s9Z4LVTQYpYvGdLdhzyJ@containers-us-west-3.railway.app:7548/railway'
    default:
      throw new Error(`Unsupported env: ${env}`)
  }
}
