import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const Category = sqliteTable("Category", {
  id: integer("id").primaryKey().notNull(),
  label: text("label").unique().notNull(),
})
