import { pgTable, uniqueIndex, integer, varchar, serial } from "drizzle-orm/pg-core"

import { relations } from "drizzle-orm"
import { AvatarStyle, AvataryStyle_zod } from "~/domain/user/User.types"
import { stringJson_type } from "~/drizzle/drizzle.utils"

export const Post_content_personEndorsement = pgTable(
  "Post_content_personEndorsement",
  {
    id: serial("id").primaryKey().notNull(),
    post_id: integer("post_id").notNull(),
    firstName: varchar("firstName", { length: 64 }).notNull(),
    lastName: varchar("lastName", { length: 64 }).notNull(),
    avatarStyle: stringJson_type<AvatarStyle>(AvataryStyle_zod)("avatarStyle").notNull(),
  },
  table => {
    return {
      postIdKey: uniqueIndex("Post_content_personEndorsement_post_id_key").on(table.post_id),
    }
  },
)

export const Post_content_personEndorsementRelations = relations(
  Post_content_personEndorsement,
  ({ many }) => ({
    skills: many(Post_content_personEndorsement_skill),
  }),
)

export const Post_content_personEndorsement_skill = pgTable(
  "Post_content_personEndorsement_skill",
  {
    id: serial("id").primaryKey().notNull(),
    label: varchar("label", { length: 64 }).notNull(),
    level: integer("level"),
    post_personEndorsement_id: integer("post_personEndorsement_id")
      .notNull()
      .references(() => Post_content_personEndorsement.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
  },
  table => {
    return {
      expertEndorsementIdLabelKey: uniqueIndex(
        "Post_content_personEndorsement_skill_expertEndorsement_id_label_key",
      ).on(table.label, table.post_personEndorsement_id),
    }
  },
)

export const Post_content_personEndorsement_skillRelations = relations(
  Post_content_personEndorsement_skill,
  ({ one }) => ({
    post_content_personEndorsement: one(Post_content_personEndorsement, {
      fields: [Post_content_personEndorsement_skill.post_personEndorsement_id],
      references: [Post_content_personEndorsement.id],
    }),
  }),
)
