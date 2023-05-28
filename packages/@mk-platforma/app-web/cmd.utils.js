const commandLineArgs = require('command-line-args')
const { execSync } = require('child_process')
const { match, P } = require('ts-pattern')

const options = [
  { name: 'command', defaultOption: true },
  { name: 'env', type: String }
]

function parseCommand(){
  return commandLineArgs(options, { stopAtFirstUnknown: true })
}

function objectToEnvString(obj){
  return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join(' ')
}

function run(...cmd){
  const command = match(cmd)
    .with([{}, P.array], args => {
      const envStr = objectToEnvString(args[0])
      return args[1].map(str => `${envStr} ${str}`).join('&& ')
    })
    .with([{}, P.string], args => {
      const envStr = objectToEnvString(args[0])
      return `${envStr} ${args[1]}`
    })
    .with(P.array, cmd => cmd.join("&& "))
    .with(P.string, cmd => cmd)
    .run()

  try {
    const stdout = execSync(command).toString()
    console.log(stdout)
  } catch (error) {
    console.error(`Error executing the command: ${error.message}`)
    process.exit(1)
  }
}

function getConnectionString(env){
  switch(env){
    case 'dev': return 'postgresql://postgres:postgres@localhost:5432/za_brata?schema=public'
    case 'test': return 'postgresql://postgres:s9Z4LVTQYpYvGdLdhzyJ@containers-us-west-3.railway.app:7548/railway'
    default:
      throw new Error(`Unsupported env: ${env}`)
  }
}


module.exports = {
  parseCommand,
  run,
  getConnectionString,
}
