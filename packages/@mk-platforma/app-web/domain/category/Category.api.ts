import { z } from "zod"
import { publicProcedure, router } from "~/api_/api.server.utils"
import "@mk-libs/common/server-only"
import { eq } from "drizzle-orm"
import { category } from "~/drizzle/schema"
import { assertIsNonNil } from "@mk-libs/common/common"
import { alias } from "drizzle-orm/pg-core"

const category_parent = alias(category, "parent")

const Category_api = router({
  many2: publicProcedure.query(({ ctx: { db_drizzle } }) =>
    db_drizzle.query.category.findMany(Category_select2),
  ),
  many: publicProcedure.query(async ({ ctx: { db, db_drizzle } }) => {
    const c = await db_drizzle
      // .select({
      //   id: category.id,
      //   label: category.label,
      //   parent: {
      //     id: category.id,
      //     label: category.label,
      //   },
      // })
      .select()
      .from(category)
      .leftJoin(category_parent, eq(category_parent.id, category.parentId))

    console.log(19, c)

    return await db.category.findMany({
      select: Category_select,
    })
  }),
  // many3: publicProcedure.query(async ({ ctx: { db_drizzle } }) => {
  //   const c = await db_drizzle
  //     .select({ id: category.id, label: category.label })
  //     .from(category)
  //     .leftJoin(category, eq(category.id, category.parentId))
  //   return c
  // }),
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
