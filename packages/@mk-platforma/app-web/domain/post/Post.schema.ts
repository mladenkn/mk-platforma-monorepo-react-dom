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
import { AvatarStyle, AvataryStyle_zod } from "~/domain/user/User.types"
import { User } from "../user/User.schema"
import { stringJson_type } from "~/drizzle/drizzle.utils"
import { CategoryToPost } from "~/domain/category/Category.schema"

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
    expertEndorsementId: integer("expertEndorsement_id").references(
      () => PostExpertEndorsement.id,
      { onDelete: "set null", onUpdate: "cascade" },
    ),
    isDeleted: boolean("isDeleted").default(false).notNull(),
  },
  table => {
    return {
      expertEndorsementIdKey: uniqueIndex("Post_expertEndorsement_id_key").on(
        table.expertEndorsementId,
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
  expertEndorsement: one(PostExpertEndorsement, {
    fields: [Post.expertEndorsementId],
    references: [PostExpertEndorsement.id],
  }),
}))

export const PostExpertEndorsement = pgTable(
  "Post_ExpertEndorsement",
  {
    id: serial("id").primaryKey().notNull(),
    post_id: integer("post_id").notNull(),
    firstName: varchar("firstName", { length: 64 }).notNull(),
    lastName: varchar("lastName", { length: 64 }).notNull(),
    avatarStyle: stringJson_type<AvatarStyle>(AvataryStyle_zod)("avatarStyle").notNull(),
  },
  table => {
    return {
      postIdKey: uniqueIndex("Post_ExpertEndorsement_post_id_key").on(table.post_id),
    }
  },
)

export const PostExpertEndorsementRelations = relations(PostExpertEndorsement, ({ many }) => ({
  skills: many(PostExpertEndorsementSkill),
}))

export const PostExpertEndorsementSkill = pgTable(
  "Post_ExpertEndorsement_skill",
  {
    id: serial("id").primaryKey().notNull(),
    label: varchar("label", { length: 64 }).notNull(),
    level: integer("level"),
    expertEndorsementId: integer("expertEndorsement_id")
      .notNull()
      .references(() => PostExpertEndorsement.id, { onDelete: "restrict", onUpdate: "cascade" }),
  },
  table => {
    return {
      expertEndorsementIdLabelKey: uniqueIndex(
        "Post_ExpertEndorsement_skill_expertEndorsement_id_label_key",
      ).on(table.label, table.expertEndorsementId),
    }
  },
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
