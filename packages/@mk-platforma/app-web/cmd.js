const { run, getConnectionString } = require('./cmd.utils')

const { Command } = require('commander')
const program = new Command()

const cs_option = ['-di --db-instance <string>', 'database instance', 'dev']
const _db_command = program.command('db')
const db_command = name => _db_command.command(name).option(...cs_option)

db_command('prisma')
  .argument('<string...>', 'command passed to prisma')
  .action((str, options) => {
    const cs_env = `DATABASE_URL=${getConnectionString(options.dbInstance)}`
    run(`${cs_env} prisma ${str.join(' ')}`)
  })

db_command('seed')
  .action(options => {
    const cs_env = `DATABASE_URL=${getConnectionString(options.dbInstance)}`
    run(`${cs_env} pnpm _exe-ts ./data.gen/db.seed.ts`)
  })

db_command('truncate')
  .action(options => {
    const cs_env = `DATABASE_URL=${getConnectionString(options.dbInstance)}`
    run(`${cs_env} prisma db execute --file './db.truncate.sql'`)
  })

db_command('reset')
  .action(options => {
    const cs_env = `DATABASE_URL=${getConnectionString(options.dbInstance)}`
    run(
      `${cs_env()} prisma db execute --file './db.truncate.sql'`,
      `${cs_env()} prisma db push --accept-data-loss`,
      `${cs_env()} pnpm _exe-ts ./data.gen/db.seed.ts`,
    )
  })

program.parse()