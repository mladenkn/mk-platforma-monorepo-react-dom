import locations from "./data.locations.json"
import { Category } from "~/domain/category/Category.schema"
import { Location } from "~/domain/post/Post.schema"
import type { Category_label } from "~/domain/category/Category.types"
import type { Drizzle_instance } from "~/drizzle/drizzle.instance"

export default async function data_seed_prod(db: Drizzle_instance) {
  await seedCategories(db)
  await seedLocations(db)
}

export async function seedCategories(db: Drizzle_instance) {
  await upsertCategory(db, "job")
  await upsertCategory(db, "job_demand")
  await upsertCategory(db, "accommodation")
  await upsertCategory(db, "accommodation_demand")

  const gathering = await upsertCategory(db, "gathering")

  await Promise.all([
    upsertCategory(db, "gathering_spirituality", gathering.id),
    upsertCategory(db, "gathering_work", gathering.id),
    upsertCategory(db, "gathering_hangout", gathering.id),
  ])

  const sellable = await upsertCategory(db, "sellable")
  await upsertCategory(db, "sellable_demand")
  await Promise.all([
    upsertCategory(db, "sellable_food", sellable.id),
    upsertCategory(db, "sellable_clothes", sellable.id),
    upsertCategory(db, "sellable_furniture", sellable.id),
    upsertCategory(db, "sellable_tool", sellable.id),
    upsertCategory(db, "sellable_gadget", sellable.id),
    upsertCategory(db, "sellable_buildingMaterial", sellable.id),
  ])

  return await db.query.Category.findMany()
}

async function upsertCategory(db: Drizzle_instance, label: Category_label, parent_id?: number) {
  return await db
    .insert(Category)
    .values({ label, parent_id })
    // .onConflictDoUpdate({ target: Category.label, set: { parentId: parent_id } }) // TODO
    .returning()
    .then(c => c[0])
}

export async function seedLocations(db: Drizzle_instance) {
  const mapped = locations.map(l => ({ ...l, googleId: l.google_id }))
  return db.insert(Location).values(mapped).returning() // TODO: fali onConflictDoUpdate
}
