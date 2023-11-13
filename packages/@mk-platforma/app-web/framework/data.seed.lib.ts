import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import fs from "fs"
import path from "path"
import { groupBy, sortBy } from "lodash"

type Db = Drizzle_instance

export default async function doCleanSeed_lib(db: Db, folderPath: string) {
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
  const seeders_byOrder = sortBy(
    Object.entries(groupBy(seeders, s => s.dbSeeder.order)),
    ([order]) => order,
  )
  console.log(13, seeders_byOrder)
}
