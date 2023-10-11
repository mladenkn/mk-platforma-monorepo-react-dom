import { z } from "zod"
import { publicProcedure, router } from "~/api_/api.server.utils"
import "@mk-libs/common/server-only"
import { eq } from "drizzle-orm"
import { category } from "~/drizzle/schema"
import { assertIsNonNil } from "@mk-libs/common/common"

const Category_api = router({
  many: publicProcedure.query(({ ctx: { db }, input }) =>
    db.category.findMany({
      select: Category_select,
    }),
  ),
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
