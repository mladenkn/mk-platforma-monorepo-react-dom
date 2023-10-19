import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core"

import { relations } from "drizzle-orm"
import { AvatarStyle, AvataryStyle_zod } from "~/domain/user/User.types"
import { User } from "../user/User.schema"
import { stringJson_type } from "~/drizzle/drizzle.utils"
import { CategoryToPost } from "~/domain/category/Category.schema"

export const Post = sqliteTable(
  "Post",
  {
    id: integer("id").primaryKey().notNull(),
    title: text("title", { length: 256 }).notNull(),
    description: text("description"),
    contact: text("contact", { length: 256 }).notNull(),
    location_id: integer("location_id").references(() => Location.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    author_id: integer("author_id")
      .notNull()
      .references(() => User.id, { onDelete: "restrict", onUpdate: "cascade" }),
    expertEndorsementId: integer("expertEndorsement_id")
      .references(() => PostExpertEndorsement.id, { onDelete: "set null", onUpdate: "cascade" })
      .unique(),
    isDeleted: integer("isDeleted", { mode: "boolean" }).default(false).notNull(),
  },
  // table => {
  //   return {
  //     expertEndorsementIdKey: uniqueIndex("Post_expertEndorsement_id_key").on(
  //       table.expertEndorsementId,
  //     ),
  //   }
  // },
)

export const Comment = sqliteTable("Comment", {
  id: integer("id").primaryKey().notNull(),
  content: text("content").notNull(),
  author_id: integer("author_id")
    .notNull()
    .references(() => User.id, { onDelete: "restrict", onUpdate: "cascade" }),
  post_id: integer("post_id")
    .notNull()
    .references(() => Post.id, { onDelete: "restrict", onUpdate: "cascade" }),
  isDeleted: integer("isDeleted", { mode: "boolean" }).default(false).notNull(),
})

export const CommentRelations = relations(Comment, ({ one }) => ({
  author: one(User, { fields: [Comment.author_id], references: [User.id] }),
}))

export const Image = sqliteTable(
  "Image",
  {
    id: integer("id").primaryKey().notNull(),
    post_id: integer("post_id"),
    url: text("url").notNull(),
    uploadthingKey: text("uploadthing_key", { length: 128 }),
    isMain: integer("isMain", { mode: "boolean" }).default(false).notNull(),
  },
  // table => {
  //   return {
  //     uploadthingKeyKey: uniqueIndex("Image_uploadthing_key_key").on(table.uploadthingKey),
  //   }
  // },
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
  expertEndorsement: one(PostExpertEndorsement, {
    fields: [Post.expertEndorsementId],
    references: [PostExpertEndorsement.id],
  }),
}))

export const PostExpertEndorsement = sqliteTable(
  "Post_ExpertEndorsement",
  {
    id: integer("id").primaryKey().notNull(),
    post_id: integer("post_id").notNull(),
    firstName: text("firstName", { length: 64 }).notNull(),
    lastName: text("lastName", { length: 64 }).notNull(),
    avatarStyle: stringJson_type<AvatarStyle>(AvataryStyle_zod)("avatarStyle").notNull(),
  },
  // table => {
  //   return {
  //     postIdKey: uniqueIndex("Post_ExpertEndorsement_post_id_key").on(table.post_id),
  //   }
  // },
)

export const PostExpertEndorsementRelations = relations(PostExpertEndorsement, ({ many }) => ({
  skills: many(PostExpertEndorsementSkill),
}))

export const PostExpertEndorsementSkill = sqliteTable(
  "Post_ExpertEndorsement_skill",
  {
    id: integer("id").primaryKey().notNull(),
    label: text("label", { length: 64 }).notNull(),
    level: integer("level"),
    expertEndorsementId: integer("expertEndorsement_id")
      .notNull()
      .references(() => PostExpertEndorsement.id, { onDelete: "restrict", onUpdate: "cascade" }),
  },
  // table => {
  //   return {
  //     expertEndorsementIdLabelKey: uniqueIndex(
  //       "Post_ExpertEndorsement_skill_expertEndorsement_id_label_key",
  //     ).on(table.label, table.expertEndorsementId),
  //   }
  // },
)

export const PostExpertEndorsementSkillRelations = relations(
  PostExpertEndorsementSkill,
  ({ one }) => ({
    postExpertEndorsement: one(PostExpertEndorsement, {
      fields: [PostExpertEndorsementSkill.expertEndorsementId],
      references: [PostExpertEndorsement.id],
    }),
  }),
)

export const Location = sqliteTable(
  "Location",
  {
    id: integer("id").primaryKey().notNull(),
    google_id: text("google_id", { length: 128 }).notNull().unique(),
    latitude: integer("latitude").notNull().$type<number>(),
    longitude: integer("longitude").notNull().$type<number>(),
    name: text("name", { length: 128 }).notNull(),
    adminAreaLevel1: text("adminAreaLevel1", { length: 128 }),
    country: text("country", { length: 64 }).notNull(),
  },
  // table => {
  //   return {
  //     googleIdKey: uniqueIndex("Location_google_id_key").on(table.google_id),
  //   }
  // },
)
