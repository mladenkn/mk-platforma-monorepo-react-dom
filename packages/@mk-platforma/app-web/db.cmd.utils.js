const commandLineArgs = require('command-line-args')
const { execSync } = require('child_process')

const options = [
  { name: 'command', defaultOption: true },
  { name: 'env', type: String }
]

function doFirstParse(){
  return commandLineArgs(options, { stopAtFirstUnknown: true })
}

function run(cmd){
  try {
    const stdout = execSync(cmd).toString()
    console.log(stdout)
  } catch (error) {
    console.error(`Error executing the command: ${error.message}`)
    process.exit(1)
  }
}

module.exports = {
  doFirstParse,
  run,
}
