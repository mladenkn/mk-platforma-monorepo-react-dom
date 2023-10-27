import { pgTable, uniqueIndex, foreignKey, integer, serial, index } from "drizzle-orm/pg-core"

import { relations } from "drizzle-orm"
import { Category_label, Category_label_zod } from "~/domain/category/Category.types"
import { enum_type } from "~/drizzle/drizzle.utils"
import { Post } from "../post/Post.schema"

export const Category = pgTable(
  "Category",
  {
    id: serial("id").primaryKey().notNull(),
    parent_id: integer("parent_id"),
    code: enum_type(Category_label_zod)("label").$type<Category_label>().notNull().unique(),
  },
  table => {
    return {
      labelKey: uniqueIndex("Category_label_key").on(table.code),
      categoryParentIdFkey: foreignKey({
        columns: [table.parent_id],
        foreignColumns: [table.id],
      })
        .onUpdate("cascade")
        .onDelete("set null"),
    }
  },
)

export const CategoryRelations = relations(Category, ({ one }) => ({
  parent: one(Category, {
    fields: [Category.parent_id],
    references: [Category.id],
  }),
}))

export const CategoryToPost = pgTable(
  "_CategoryToPost",
  {
    category_id: integer("A")
      .notNull()
      .references(() => Category.id, { onDelete: "cascade", onUpdate: "cascade" }),
    post_id: integer("B")
      .notNull()
      .references(() => Post.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  table => {
    return {
      abUnique: uniqueIndex("_CategoryToPost_AB_unique").on(table.category_id, table.post_id),
      bIdx: index().on(table.post_id),
    }
  },
)

export const CategoryToPostRelations = relations(CategoryToPost, ({ one }) => ({
  category: one(Category, { fields: [CategoryToPost.category_id], references: [Category.id] }),
  post: one(Post, { fields: [CategoryToPost.post_id], references: [Post.id] }),
}))
