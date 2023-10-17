import { publicProcedure, router } from "~/api_/api.server.utils"
import "@mk-libs/common/server-only"
import { Category } from "~/drizzle/drizzle.schema"

const Category_api = router({
  many: publicProcedure.query(async ({ ctx: { db_drizzle } }) => {
    const categories = await db_drizzle
      .select({
        id: Category.id,
        label: Category.label,
        parentId: Category.parent_id,
      })
      .from(Category)

    type Category = (typeof categories)[0]

    function categories_addParents<TCategory extends Category>(categories: TCategory[]) {
      return categories.map(category => ({
        ...category,
        parent: categories.find(maybeParent => maybeParent.id === category.parentId) ?? null,
      }))
    }

    const categories_withRelations = categories_addParents(
      categories.map(category => ({
        ...category,
        children: categories_addParents(
          categories.filter(maybeChild => maybeChild.parentId === category.id),
        ),
      })),
    )

    return categories_withRelations
  }),
})

export default Category_api
