import db from "./prisma/instance"
const { spawn } = require("child_process")

async function main() {
  const cmd = spawn("prisma", ["db", "execute", "--file", "./db.truncate.sql"])
  cmd.stdout?.on?.("data", (data: any) => process.stdout.write(data.toString()))
  cmd.stderr?.on?.("data", (data: any) => process.stderr.write(data.toString()))
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
