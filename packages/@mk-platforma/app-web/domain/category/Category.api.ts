import { publicProcedure, router } from "~/api_/api.server.utils"
import "@mk-libs/common/server-only"
import { category } from "~/drizzle/schema"

const Category_api = router({
  many: publicProcedure.query(async ({ ctx: { db_drizzle } }) => {
    const categories = await db_drizzle
      .select({
        id: category.id,
        label: category.label,
        parentId: category.parentId,
      })
      .from(category)

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
