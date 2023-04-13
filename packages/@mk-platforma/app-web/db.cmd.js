const commandLineArgs = require('command-line-args')
const { execSync } = require('child_process');


const command = process.argv[2]

const options = commandLineArgs([
  { name: 'env', type: String }
])

const connectionString = (() => {
  switch(options.name){
    case 'dev': return 'postgresql://postgres:postgres@localhost:5432/za_brata?schema=public'
    case 'test': return 'postgresql://postgres:s9Z4LVTQYpYvGdLdhzyJ@containers-us-west-3.railway.app:7548/railway'
    default:
      console.log('Unsupported env')
  }
})()

switch(command){
  case 'prisma':
    run(`DATABASE_URL='${connectionString}' prisma`)
    break;
  default:
    console.log('Unsupported subcommand')
}

function run(cmd){
  try {
    const stdout = execSync(cmd).toString();
    console.log(`stdout: ${stdout}`);
  } catch (error) {
    console.error(`Error executing the command: ${error.message}`);
  }
}
