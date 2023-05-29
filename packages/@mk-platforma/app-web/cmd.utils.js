const commandLineArgs = require('command-line-args')
const { spawn } = require("child_process")
const { match, P } = require('ts-pattern')

const options = [
  { name: 'command', defaultOption: true },
  { name: 'env', type: String }
]

function parseCommand(){
  return commandLineArgs(options, { stopAtFirstUnknown: true })
}

function run(...cmd){
  const [env, command] = match(cmd)
    .with([{}, P.array], args => [args[0], args[1].join('&& ')])
    .with([{}, P.string], args => [args[0], args[1]])
    .with(P.array, cmd => [{}, cmd.join("&& ")])
    .with(P.string, cmd => [{}, cmd])
    .run()

  const command_words = command.split(' ')

  console.log(24, command_words, env)

  try {
    const cmd = spawn(command_words[0], [command_words.slice(1)], {
      env: {
        ...process.env,
        ...env
      }
    })
    cmd.stdout.on("data", data => process.stdout.write(data.toString()))
    cmd.stderr.on("data", data => process.stderr.write(data.toString()))
    cmd.on('error', (error) => process.stderr.write(error.message))
    cmd.on("close", code => {
      console.log(`child process exited with code ${code}`)
    })
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
