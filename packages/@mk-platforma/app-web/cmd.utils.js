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

async function run(...cmd){
  const [env, commands] = match(cmd)
    .with([{}, P.array(P.string)], args => [args[0], args[1]])
    .with([{}, P.string], args => [args[0], [args[1]]])
    .with(P.array(P.string), cmd => [{}, cmd])
    .with(P.string, cmd => [{}, [cmd]])
    .run()

  try {
    for (const command of commands) {
      const result = await run_single(command, env) 
      if(result.code !== 0){
        console.error(result?.error?.message || "Error")
        process.exit(result.code)
      }    
    }    
  } catch (error) {
    console.error(`Error ${error?.message}`)
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
  return new Promise((resolve, reject) => {
    cmd.stdout?.on?.("data", data => process.stdout.write(data.toString()))
    cmd.stderr?.on?.("data", data => process.stderr.write(data.toString()))
    cmd.on?.('error', (error) => {
      reject({ error, code: -1 })
      process.stderr.write(error.message)
    })
    cmd.on?.("close", code => resolve({ code }))
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

function createCommand_exeTs(more){
  const options = JSON.stringify({
    module: "CommonJS",
    jsx: "react"
  }).replace(/"/g, '\\"')
  return `pnpm exec ts-node --compiler-options ${options} ${more}`
}

module.exports = {
  parseCommand,
  run,
  getConnectionString,
  createCommand_exeTs,
}
