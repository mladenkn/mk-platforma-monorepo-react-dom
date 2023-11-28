import { Category } from "~/domain/category/Category.schema"
import type { Category_code } from "~/domain/category/Category.types"
import type { Drizzle_instance } from "~/drizzle/drizzle.instance"

const categories = [
  { code: "job", label_hr: "Poslovi", icon_mui: "HandymanIcon" },
  { code: "job_demand", label_hr: "Majstori", icon_mui: "EngineeringIcon" },
  { code: "accommodation", label_hr: "Smještaji", icon_mui: "BedIcon" },
  {
    code: "accommodation_demand",
    label_hr: "Smještaji/Potražnja",
    icon_mui: "BedIcon",
  },
  {
    code: "gathering",
    label_hr: "Okupljanja",
    icon_mui: "GroupsIcon",
    children: [
      {
        code: "gathering_spirituality",
        label_hr: "Duhovnost",
        icon_mui: "SelfImprovementIcon",
      },
      {
        code: "gathering_work",
        label_hr: "Radne akcije",
        icon_mui: "ConstructionIcon",
      },
      {
        code: "gathering_hangout",
        label_hr: "Druženja",
        icon_mui: "Diversity3Icon",
      },
    ],
  },
  {
    code: "sellable",
    label_hr: "Nabava",
    icon_mui: "ShoppingCartIcon",
    children: [
      {
        code: "sellable_food",
        label_hr: "Hrana",
        icon_mui: "FastfoodIcon",
      },
      {
        code: "sellable_clothes",
        label_hr: "Odjeća",
        icon_mui: "CheckroomIcon",
      },
      {
        code: "sellable_furniture",
        label_hr: "Namještaj",
        icon_mui: "ChairIcon",
      },
      {
        code: "sellable_tool",
        label_hr: "Alat",
        icon_mui: "HardwareIcon",
      },
      {
        code: "sellable_gadget",
        label_hr: "Gadgeti",
        icon_mui: "DevicesOtherIcon",
      },
      {
        code: "sellable_buildingMaterial",
        label_hr: "Građevinski materijal",
        icon_mui: "FoundationIcon",
      },
    ],
  },
  {
    code: "sellable_demand",
    label_hr: "Nabava/Potražnja",
    icon_mui: "ShoppingCartIcon",
  },
] as Category_props[]

type Category_props = {
  code: Category_code
  parent_id?: number
  label_hr: string
  icon_mui: string
  children?: Omit<Category_props, "children">[]
}

export async function data_seed_fr_categories(db: Drizzle_instance) {
  await insertCategories(db, categories)
}

async function insertCategories(db: Drizzle_instance, _categories: Category_props[]) {
  for (const category of _categories) {
    const category_inserted = await db
      .insert(Category)
      .values(category)
      .returning()
      .then(c => c[0])

    if (!category.children) continue

    const children_mapped = category.children.map(c => ({ ...c, parent_id: category_inserted.id }))
    await db.insert(Category).values(children_mapped)
  }
}
