const commandLineArgs = require('command-line-args')
const { spawn, exec } = require("child_process")
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
    .with(P.array(P.string), cmd => [{}, cmd])
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
  if(command.startsWith("pnpm exec ts-node")){
    run_withExec(command, env)
    return
  }
  const command_words = command.split(' ')
  const cmd = spawn(command_words[0], [command_words.slice(1)], {
    env: { ...process.env, ...env },
    stdio: command_words[0] === 'psql' ? 'inherit' : undefined
  })
  cmd.stdout?.on?.("data", data => process.stdout.write(data.toString()))
  cmd.stderr?.on?.("data", data => process.stderr.write(data.toString()))
  cmd.on?.('error', (error) => process.stderr.write(error.message))
  cmd.on?.("close", code => {
    console.log(`child process exited with code ${code}`)
  })
}

function run_withExec(command, env){
  const command_ = `${objectToEnvString(env)} ${command}`
  exec(command_, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  })
}

function objectToEnvString(obj){
  return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join(' ')
}

function getConnectionString(env){
  switch(env){
    case 'dev': return 'postgresql://postgres:postgres@localhost:5432/za_brata'
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
