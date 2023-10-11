import { z } from "zod"
import { publicProcedure, router } from "~/api_/api.server.utils"
import "@mk-libs/common/server-only"
import { eq } from "drizzle-orm"
import { category } from "~/drizzle/schema"
import { assertIsNonNil } from "@mk-libs/common/common"

const Category_api = router({
  many: publicProcedure.query(async ({ ctx: { db, db_drizzle } }) => {
    const categories = await db_drizzle
      .select({
        id: category.id,
        label: category.label,
        parentId: category.parentId,
      })
      .from(category)

    type Category = (typeof categories)[0]

    function categories_addParents<TCategory extends Category>(categories: TCategory[]) {
      return categories.map(category => {
        const parent = categories.find(maybeParent => maybeParent.id === category.parentId) ?? null
        return {
          ...category,
          parent,
        }
      })
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
  single: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const c = await ctx.db_drizzle.query.category.findFirst({
      where: eq(category.id, input),
      ...Category_select2,
    })
    assertIsNonNil(c) // TODO: fix
    return c
  }),
  // single2: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
  //   const c = await ctx.db.category.findUnique({ where: { id: input }, select: Category_select })
  //   return c
  // }),
})

const Category_select2 = {
  columns: { id: true, label: true },
  with: {
    parent: {
      columns: { id: true, label: true },
      with: {
        parent: { columns: { id: true, label: true } },
        children: { columns: { id: true, label: true } },
      },
    },
    children: {
      columns: { id: true, label: true },
      with: { parent: { columns: { id: true, label: true } } },
    },
  },
} as const

const Category_select = {
  id: true,
  label: true,
  parent: {
    select: {
      id: true,
      label: true,
      children: {
        select: {
          id: true,
          label: true,
        },
      },
      parent: {
        select: {
          id: true,
          label: true,
        },
      },
    },
  },
  children: {
    select: {
      id: true,
      label: true,
      parent: {
        select: {
          id: true,
          label: true,
        },
      },
    },
  },
}

export default Category_api
