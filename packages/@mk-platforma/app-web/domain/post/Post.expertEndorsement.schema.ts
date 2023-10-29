import { pgTable, uniqueIndex, integer, varchar, serial } from "drizzle-orm/pg-core"

import { relations } from "drizzle-orm"
import { AvatarStyle, AvataryStyle_zod } from "~/domain/user/User.types"
import { stringJson_type } from "~/drizzle/drizzle.utils"

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
