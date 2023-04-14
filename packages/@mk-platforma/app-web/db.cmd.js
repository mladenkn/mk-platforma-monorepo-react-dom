const { doFirstParse, run } = require('./db.cmd.utils')

const firstParse = doFirstParse()
const connStr = getConnectionString(firstParse.env)

switch(firstParse.command){
  case 'prisma':
    run(`DATABASE_URL=${connStr} prisma ${firstParse._unknown.join(' ')}`)
    break;
  
  case 'seed':
    run(`DATABASE_URL=${connStr} pnpm _exe-ts ./data/db.seed.ts`)
    break;
  
  case 'truncate':
    run(`DATABASE_URL=${connStr} prisma db execute --file './db.truncate.sql'`)
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
