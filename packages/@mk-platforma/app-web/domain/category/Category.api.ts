import { publicProcedure, router } from "~/api_/api.server.utils"
import "@mk-libs/common/server-only"
import { Category } from "~/domain/category/Category.schema"

const Category_api = router({
  many: publicProcedure.query(async ({ ctx: { db } }) => {
    const categories = await db
      .select({
        id: Category.id,
        code: Category.code,
        parentId: Category.parent_id,
        label_hr: Category.label_hr,
        icon_mui: Category.icon_mui,
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
