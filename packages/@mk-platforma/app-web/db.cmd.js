const { doFirstParse, db_doSecondParse, run } = require('./db.cmd.utils')

const firstParse = doFirstParse()

switch(firstParse.command){
  case 'prisma':
    const { env, _unknown } = db_doSecondParse(firstParse._unknown)
    const connectionString = getConnectionString(env)
    run(`DATABASE_URL=${connectionString} prisma ${_unknown.join(' ')}`)
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
