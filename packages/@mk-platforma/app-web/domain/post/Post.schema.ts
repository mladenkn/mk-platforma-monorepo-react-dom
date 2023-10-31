import {
  pgTable,
  uniqueIndex,
  integer,
  text,
  varchar,
  serial,
  boolean,
  numeric,
} from "drizzle-orm/pg-core"

import { relations } from "drizzle-orm"
import { User } from "../user/User.schema"
import { CategoryToPost } from "~/domain/category/Category.schema"
import { Post_content_personEndorsement } from "./Post.expertEndorsement.schema"

export const Post = pgTable(
  "Post",
  {
    id: serial("id").primaryKey().notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description"),
    contact: varchar("contact", { length: 256 }).notNull(),
    location_id: integer("location_id").references(() => Location.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    author_id: integer("author_id")
      .notNull()
      .references(() => User.id, { onDelete: "restrict", onUpdate: "cascade" }),
    content_personEndorsement_id: integer("content_personEndorsement_id").references(
      () => Post_content_personEndorsement.id,
      { onDelete: "set null", onUpdate: "cascade" },
    ),
    isDeleted: boolean("isDeleted").default(false).notNull(),
  },
  table => {
    return {
      personEndorsementIdKey: uniqueIndex("post_content_personEndorsement_id_key").on(
        table.content_personEndorsement_id,
      ),
    }
  },
)

export const Comment = pgTable("Comment", {
  id: serial("id").primaryKey().notNull(),
  content: text("content").notNull(),
  author_id: integer("author_id")
    .notNull()
    .references(() => User.id, { onDelete: "restrict", onUpdate: "cascade" }),
  post_id: integer("post_id")
    .notNull()
    .references(() => Post.id, { onDelete: "restrict", onUpdate: "cascade" }),
  isDeleted: boolean("isDeleted").default(false).notNull(),
})

export const CommentRelations = relations(Comment, ({ one }) => ({
  author: one(User, { fields: [Comment.author_id], references: [User.id] }),
}))

export const Image = pgTable(
  "Image",
  {
    id: serial("id").primaryKey().notNull(),
    post_id: integer("post_id"),
    url: text("url").notNull(),
    uploadthingKey: varchar("uploadthing_key", { length: 128 }),
    isMain: boolean("isMain").default(false).notNull(),
  },
  table => {
    return {
      uploadthingKeyKey: uniqueIndex("Image_uploadthing_key_key").on(table.uploadthingKey),
    }
  },
)

export const ImageRelations = relations(Image, ({ one }) => ({
  post: one(Post, {
    fields: [Image.post_id],
    references: [Post.id],
  }),
}))

export const PostRelations = relations(Post, ({ one, many }) => ({
  author: one(User, {
    fields: [Post.author_id],
    references: [User.id],
  }),
  categoryToPost: many(CategoryToPost),
  location: one(Location, {
    fields: [Post.location_id],
    references: [Location.id],
  }),
  images: many(Image),
  content_personEndorsement: one(Post_content_personEndorsement, {
    fields: [Post.content_personEndorsement_id],
    references: [Post_content_personEndorsement.id],
  }),
}))

export const Location = pgTable(
  "Location",
  {
    id: serial("id").primaryKey().notNull(),
    google_id: varchar("google_id", { length: 128 }).notNull().unique(),
    latitude: numeric("latitude", { precision: 65, scale: 30 }).notNull().$type<number>(),
    longitude: numeric("longitude", { precision: 65, scale: 30 }).notNull().$type<number>(),
    name: varchar("name", { length: 128 }).notNull(),
    adminAreaLevel1: varchar("adminAreaLevel1", { length: 128 }),
    country: varchar("country", { length: 64 }).notNull(),
  },
  table => {
    return {
      googleIdKey: uniqueIndex("Location_google_id_key").on(table.google_id),
    }
  },
)
