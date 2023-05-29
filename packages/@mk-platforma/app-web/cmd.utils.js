const commandLineArgs = require('command-line-args')
const { spawn } = require("child_process")
const { match, P } = require('ts-pattern')

const options = [
  { name: 'command', defaultOption: true },
  { name: 'db-instance', type: String }
]

function parseCommand(){
  return commandLineArgs(options, { stopAtFirstUnknown: true })
}

function run(...cmd){
  const [env, commands] = match(cmd)
    .with([{}, P.array], args => [args[0], args[1]])
    .with([{}, P.string], args => [args[0], [args[1]]])
    .with(P.array, cmd => [{}, cmd])
    .with(P.string, cmd => [{}, [cmd]])
    .run()

  try {
    for (const command of commands) {
      run_single(command, env) 
    }    
  } catch (error) {
    console.error(`Error executing the command: ${error.message}`)
    process.exit(1)
  }
}

function run_single(command, env){
  const command_words = command.split(' ')
  const cmd = spawn(command_words[0], [command_words.slice(1)], {
    env: { ...process.env, ...env }
  })
  cmd.stdout.on("data", data => process.stdout.write(data.toString()))
  cmd.stderr.on("data", data => process.stderr.write(data.toString()))
  cmd.on('error', (error) => process.stderr.write(error.message))
  cmd.on("close", code => {
    console.log(`child process exited with code ${code}`)
  })
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
