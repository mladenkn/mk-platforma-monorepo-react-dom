import { Drizzle_instance } from "~/drizzle/drizzle.instance"

type Db = Drizzle_instance

export default async function doCleanSeed_lib(db: Db, folderPath: string) {
  const modules_paths = [
    "/home/mladen/projekti/mk-platforma-monorepo-react-dom/packages/@mk-platforma/app-web/data.seed.fakeRandomized.clean/data.seed.fr.1.users.ts",
    "/home/mladen/projekti/mk-platforma-monorepo-react-dom/packages/@mk-platforma/app-web/data.seed.fakeRandomized.clean/data.seed.fr1.categories.clean.ts",
    "/home/mladen/projekti/mk-platforma-monorepo-react-dom/packages/@mk-platforma/app-web/data.seed.fakeRandomized.clean/data.seed.fr1.locations.ts",
    "/home/mladen/projekti/mk-platforma-monorepo-react-dom/packages/@mk-platforma/app-web/data.seed.fakeRandomized.clean/data.seed.fr2.posts.ts",
  ]
  const a = modules_paths
    .flatMap(path => Object.values(require(path)))
    .filter(sth => typeof sth === "function" && "dbSeeder" in sth)
    .map((sth: any) => {
      if (!sth.dbSeeder.order) sth.dbSeeder.order = Number.MAX_VALUE
      return sth
    })
  console.log(13, a)
}
