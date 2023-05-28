const { parseCommand, run, getConnectionString } = require('./cmd.utils')

// const parsed = parseCommand()

// const cs_env = () => `DATABASE_URL=${getConnectionString(parsed.env)}`

// switch(parsed.command){
//   case 'db.prisma':
//     run(`${cs_env()} prisma ${parsed._unknown.join(' ')}`)
//     break;
  
//   case 'db.seed':
//     run(`${cs_env()} pnpm _exe-ts ./data.gen/db.seed.ts`)
//     break;
  
//   case 'db.truncate':
//     run(`${cs_env()} prisma db execute --file './db.truncate.sql'`)
//     break;
  
//   case 'db.reset':
//     run(
//       `${cs_env()} prisma db execute --file './db.truncate.sql'`,
//       `${cs_env()} prisma db push --accept-data-loss`,
//       `${cs_env()} pnpm _exe-ts ./data.gen/db.seed.ts`,
//     )
//     break;
  
//   default:
//     console.log('Unsupported subcommand')
//     process.exit(1)
// }

const { Command } = require('commander')
const program = new Command()

program.command('db.prisma')
  .option('-di --db-instance <string>', 'database instance', 'dev')
  .argument('<string...>', 'command passed to prisma')
  .action((str, options) => {
    const cs_env = `DATABASE_URL=${getConnectionString(options.dbInstance)}`
    run(`${cs_env} prisma ${str.join(' ')}`)
  })

program.parse()