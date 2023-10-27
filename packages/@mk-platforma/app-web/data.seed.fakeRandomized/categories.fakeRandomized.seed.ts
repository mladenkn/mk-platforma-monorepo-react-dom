import { Category } from "~/domain/category/Category.schema"
import type { Category_code } from "~/domain/category/Category.types"
import type { Drizzle_instance } from "~/drizzle/drizzle.instance"

export async function seedCategories(db: Drizzle_instance) {
  async function upsertCategory(code: Category_code, parent_id?: number) {
    return await db
      .insert(Category)
      .values({ code, parent_id })
      // .onConflictDoUpdate({ target: Category.label, set: { parentId: parent_id } }) // TODO
      .returning()
      .then(c => c[0])
  }

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
