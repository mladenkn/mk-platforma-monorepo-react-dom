import { asNonNil, generateArray } from "@mk-libs/common/common"
import {
  cro_food_getRandom,
  cro_person_name_getRandom,
  cro_skill_getRandom,
} from "~/data.seed.common/data.gen.cro.dataset"
import { PostGenerator_context } from "~/data.seed.fakeRandomized/data.gen._utils"

export default async function data_seed_fakeBetter({ categories }: PostGenerator_context) {
  const food_common = {
    categories: [asNonNil(categories.find(c => c.label === "sellable_food"))],
  }
  const foods = generateArray(
    () => ({
      ...food_common,
      title: `${cro_food_getRandom()} | ${cro_person_name_getRandom()}`,
    }),
    30,
  )

  const majstori_common = {
    categories: [asNonNil(categories.find(c => c.label === "job_demand"))],
  }
  const majstori = generateArray(
    () => ({
      ...majstori_common,
      title: `${cro_person_name_getRandom()} | ${cro_skill_getRandom()}`,
    }),
    30,
  )

  const jobs_common = {
    categories: [asNonNil(categories.find(c => c.label === "job"))],
  }
  const jobs = [
    { title: "Izrada ogradnog zida" },
    { title: "Izrada žičane ograde" },
    { title: "Oranje zemlje" },
    { title: "Košenje" },
    { title: "Izrada drvenog krova" },
    { title: "Izdrada web stranice" },
    { title: "Nalivanje betonske ploče" },
  ].map(i => ({ jobs_common, ...i }))
}
