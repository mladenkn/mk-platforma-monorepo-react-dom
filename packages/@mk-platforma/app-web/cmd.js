const { run, getConnectionString } = require('./cmd.utils')
const { spawn } = require("child_process")

const { Command } = require('commander')
const program = new Command()

const cs_option = ['-di --db-instance <string>', 'database instance', 'dev']
const db_command = program.command('db')

program
  .command('dev')
  .option(...cs_option)
  .action(options => {
    const cmd = spawn('next', ["dev"], {
      env: {
        ...process.env,
        DATABASE_URL: getConnectionString(options.dbInstance)
      }
    })

    cmd.stdout.on("data", data => process.stdout.write(data.toString()))
    cmd.stderr.on("data", data => process.stderr.write(data.toString()))
    cmd.on('error', (error) => process.stderr.write(error.message))
    cmd.on("close", code => {
      console.log(`child process exited with code ${code}`)
    })
  })

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