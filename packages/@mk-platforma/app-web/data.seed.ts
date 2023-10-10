import { Category_label } from "@prisma/client"
import locations from "./data.locations.json"
import db from "./prisma/instance"

export default async function data_seed_prod() {
  await seedCategories()
  await seedLocations()
}

export async function seedCategories() {
  await upsertCategory("job")
  await upsertCategory("job_demand")
  await upsertCategory("accommodation")
  await upsertCategory("accommodation_demand")

  const gathering = await upsertCategory("gathering")

  await Promise.all([
    upsertCategory("gathering_spirituality", gathering.id),
    upsertCategory("gathering_work", gathering.id),
    upsertCategory("gathering_hangout", gathering.id),
  ])

  const sellable = await upsertCategory("sellable")
  await upsertCategory("sellable_demand")
  await Promise.all([
    upsertCategory("sellable_food", sellable.id),
    upsertCategory("sellable_clothes", sellable.id),
    upsertCategory("sellable_furniture", sellable.id),
    upsertCategory("sellable_tool", sellable.id),
    upsertCategory("sellable_gadget", sellable.id),
    upsertCategory("sellable_buildingMaterial", sellable.id),
  ])

  return await db.category.findMany({})
}

async function upsertCategory(label: Category_label, parent_id?: number) {
  return await db.category.upsert({
    where: { label },
    create: { label, parent_id },
    update: { label, parent_id },
  })
}

export async function seedLocations() {
  return await Promise.all(
    locations.map(location =>
      db.location.upsert({
        where: { google_id: location.google_id },
        create: location,
        update: location,
      }),
    ),
  )
}
