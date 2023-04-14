const commandLineArgs = require('command-line-args')
const { execSync } = require('child_process')

function doFirstParse(){
  return commandLineArgs([{ name: 'command', defaultOption: true }], { stopAtFirstUnknown: true })
}

function db_doSecondParse(firstParse_unknown){
  return commandLineArgs([{ name: 'env', type: String }], { argv: firstParse_unknown, stopAtFirstUnknown: true })
}

function run(cmd){
  try {
    const stdout = execSync(cmd).toString()
    console.log(stdout)
  } catch (error) {
    console.error(`Error executing the command: ${error.message}`)
  }
}

module.exports = {
  doFirstParse,
  db_doSecondParse,
  run
}
