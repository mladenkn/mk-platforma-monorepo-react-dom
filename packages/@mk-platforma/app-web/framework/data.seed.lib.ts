import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import fs from "fs"
import path from "path"
import { groupBy, sortBy } from "lodash"
import { withPerfLogging } from "@mk-libs/common/debug"

type Db = Drizzle_instance

export default async function doCleanSeed_lib(db: Db, folderPath: string) {
  // const modules_paths = fs
  //   .readdirSync(folderPath)
  //   .map(file_name => path.join(folderPath, file_name))
  // const seeders = modules_paths
  //   .flatMap(path => Object.values(require(path)))
  //   .filter(sth => typeof sth === "function" && "dbSeeder" in sth)
  //   .map((sth: any) => {
  //     if (!sth.dbSeeder.order) sth.dbSeeder.order = Number.MAX_VALUE
  //     return sth
  //   })

  const seeders = withPerfLogging(function doCleanSeed_lib_getSeeders() {
    const modules_paths = fs
      .readdirSync(folderPath)
      .map(file_name => path.join(folderPath, file_name))
    const seeders = modules_paths
      .flatMap(path => Object.values(require(path)))
      .filter(sth => typeof sth === "function" && "dbSeeder" in sth)
      .map((sth: any) => {
        if (!sth.dbSeeder.order) sth.dbSeeder.order = Number.MAX_VALUE
        return sth
      })
    return seeders
  })() as any[]

  const seeders_byOrder = sortBy(
    Object.entries(groupBy(seeders, s => s.dbSeeder.order)),
    ([order]) => order,
  )
  for (const [_, seeders] of seeders_byOrder) {
    const promises = seeders.map(seeder => seeder(db)).filter(isPromise)
    await Promise.all(promises)
  }
}

function isPromise(p: unknown): p is Promise<unknown> {
  return Object.prototype.toString.call(p) === "[object Promise]"
}
