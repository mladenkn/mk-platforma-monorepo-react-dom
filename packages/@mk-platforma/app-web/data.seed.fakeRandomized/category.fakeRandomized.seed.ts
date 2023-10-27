import { Category } from "~/domain/category/Category.schema"
import type { Category_code } from "~/domain/category/Category.types"
import type { Drizzle_instance } from "~/drizzle/drizzle.instance"

type Category_props = {
  code: Category_code
  parent_id?: number
  label_hr: string
  icon_mui: string
}

export async function seedCategories(db: Drizzle_instance) {
  async function upsertCategory(props: Category_props) {
    return await db
      .insert(Category)
      .values(props)
      // .onConflictDoUpdate({ target: Category.label, set: { parentId: parent_id } }) // TODO
      .returning()
      .then(c => c[0])
  }

  await upsertCategory({ code: "job", label_hr: "Poslovi", icon_mui: "" })
  await upsertCategory({ code: "job_demand", label_hr: "Majstori", icon_mui: "" })
  await upsertCategory({ code: "accommodation", label_hr: "Smještaji", icon_mui: "" })
  await upsertCategory({
    code: "accommodation_demand",
    label_hr: "Smještaji | Potražnja",
    icon_mui: "",
  })

  const gathering = await upsertCategory({
    code: "gathering",
    label_hr: "Okupljanja",
    icon_mui: "GroupsIcon",
  })

  await Promise.all([
    upsertCategory({
      code: "gathering_spirituality",
      parent_id: gathering.id,
      label_hr: "Okupljanja | Duhovnost",
      icon_mui: "SelfImprovementIcon",
    }),
    upsertCategory({
      code: "gathering_work",
      parent_id: gathering.id,
      label_hr: "Okupljanja | Radne akcije",
      icon_mui: "ConstructionIcon",
    }),
    upsertCategory({
      code: "gathering_hangout",
      parent_id: gathering.id,
      label_hr: "Okupljanja | Druženja",
      icon_mui: "Diversity3Icon",
    }),
  ])

  const sellable = await upsertCategory({
    code: "sellable",
    label_hr: "Nabava",
    icon_mui: "ShoppingCartIcon",
  })
  await upsertCategory({
    code: "sellable_demand",
    label_hr: "Nabava/Potražnja",
    icon_mui: "ShoppingCartIcon",
  })
  await Promise.all([
    upsertCategory({
      code: "sellable_food",
      parent_id: sellable.id,
      label_hr: "Nabava | Hrana",
      icon_mui: "FastfoodIcon",
    }),
    upsertCategory({
      code: "sellable_clothes",
      parent_id: sellable.id,
      label_hr: "Nabava | Odjeća",
      icon_mui: "CheckroomIcon",
    }),
    upsertCategory({
      code: "sellable_furniture",
      parent_id: sellable.id,
      label_hr: "Nabava | Namještaj",
      icon_mui: "ChairIcon",
    }),
    upsertCategory({
      code: "sellable_tool",
      parent_id: sellable.id,
      label_hr: "Nabava | Alat",
      icon_mui: "HardwareIcon",
    }),
    upsertCategory({
      code: "sellable_gadget",
      parent_id: sellable.id,
      label_hr: "Nabava | Gadgeti",
      icon_mui: "DevicesOtherIcon",
    }),
    upsertCategory({
      code: "sellable_buildingMaterial",
      parent_id: sellable.id,
      label_hr: "Nabava | Građevinski materijal",
      icon_mui: "FoundationIcon",
    }),
  ])

  return await db.query.Category.findMany()
}
