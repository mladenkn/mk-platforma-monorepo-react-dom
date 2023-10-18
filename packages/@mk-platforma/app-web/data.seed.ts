import locations from "./data.locations.json"
import { Category } from "~/domain/category/Category.schema"
import { Location } from "~/domain/post/Post.schema"
import type { Category_label } from "~/domain/category/Category.types"
import db from "~/drizzle/drizzle.instance"

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

  return await db.query.Category.findMany()
}

async function upsertCategory(label: Category_label, parent_id?: number) {
  return await db
    .insert(Category)
    .values({ label, parent_id })
    // .onConflictDoUpdate({ target: Category.label, set: { parentId: parent_id } }) // TODO
    .returning()
    .then(c => c[0])
}

export async function seedLocations() {
  const mapped = locations.map(l => ({ ...l, googleId: l.google_id }))
  return db.insert(Location).values(mapped).returning() // TODO: fali onConflictDoUpdate
}
