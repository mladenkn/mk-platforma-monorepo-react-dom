const commandLineArgs = require('command-line-args')
const { execSync } = require('child_process')

const options = [
  { name: 'command', defaultOption: true },
  { name: 'env', type: String }
]

function parseCommand(){
  return commandLineArgs(options, { stopAtFirstUnknown: true })
}

function run(...cmd){
  try {
    const stdout = execSync(cmd.join("&& ")).toString()
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
