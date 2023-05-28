const { run, getConnectionString } = require('./cmd.utils')

const { Command } = require('commander')
const program = new Command()

const cs_option = ['-di --db-instance <string>', 'database instance', 'dev']
const db_command = program.command('db')
// const db_command = name => _db_command.command(name).option(...cs_option)

db_command
  .command('prisma')
  .option(...cs_option)
  .argument('<string...>', 'command passed to prisma')
  .action((str, options) =>
    run(
      { DATABASE_URL: getConnectionString(options.dbInstance) },
      `prisma ${str.join(' ')}`
    )
  )

db_command
  .command('seed')
  .option(...cs_option)
  .action(options =>
    run(
      { DATABASE_URL: getConnectionString(options.dbInstance) },
      `pnpm _exe-ts ./data.gen/db.seed.ts`
    )
  )

db_command
  .command('truncate')
  .option(...cs_option)
  .action(options =>
    run(
      { DATABASE_URL: getConnectionString(options.dbInstance) },
      `prisma db execute --file './db.truncate.sql`
    )
  )

db_command
  .command('reset')
  .option(...cs_option)
  .action(options => {
    run(
      { DATABASE_URL: getConnectionString(options.dbInstance) },
      [
        `prisma db execute --file './db.truncate.sql'`,
        `prisma db push --accept-data-loss`,
        `pnpm _exe-ts ./data.gen/db.seed.ts`,
      ]
    )
  })

program.parse()