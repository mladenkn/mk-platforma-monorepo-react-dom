const commandLineArgs = require('command-line-args')
const { execSync } = require('child_process');

const firstParse = commandLineArgs([{ name: 'command', defaultOption: true }], { stopAtFirstUnknown: true })

switch(firstParse.command){
  case 'prisma':
    const { env, _unknown } = commandLineArgs([{ name: 'env', type: String }], { argv: firstParse._unknown, stopAtFirstUnknown: true })
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

function run(cmd){
  try {
    const stdout = execSync(cmd).toString()
    console.log(stdout)
  } catch (error) {
    console.error(`Error executing the command: ${error.message}`)
  }
}