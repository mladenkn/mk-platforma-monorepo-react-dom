import {
  pgTable,
  uniqueIndex,
  integer,
  text,
  varchar,
  timestamp,
  serial,
  boolean,
} from "drizzle-orm/pg-core"

import { relations } from "drizzle-orm"
import { AvatarStyle, AvataryStyle_zod } from "~/domain/user/User.types"
import { stringJson_type } from "~/drizzle/drizzle.utils"
import { Post } from "../post/Post.schema"

export const User = pgTable(
  "User",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 32 }),
    avatarStyle: stringJson_type<AvatarStyle>(AvataryStyle_zod)("avatarStyle").notNull(),
    email: varchar("email", { length: 64 }),
    // emailVerified: timestamp("emailVerified", { precision: 3, mode: "string" }),
    canMutate: boolean("canMutate").default(true).notNull(),
  },
  table => {
    return {
      nameKey: uniqueIndex("User_name_key").on(table.name),
      emailKey: uniqueIndex("User_email_key").on(table.email),
    }
  },
)

export const UserRelations = relations(User, ({ many }) => ({
  posts: many(Post),
}))

export const Account = pgTable(
  "Account",
  {
    id: text("id").primaryKey().notNull(),
    userId: integer("userId")
      .notNull()
      .references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  table => {
    return {
      providerProviderAccountIdKey: uniqueIndex("Account_provider_providerAccountId_key").on(
        table.provider,
        table.providerAccountId,
      ),
    }
  },
)

export const VerificationToken = pgTable(
  "VerificationToken",
  {
    identifier: text("identifier").notNull(),
    token: varchar("token", { length: 128 }).notNull(),
    expires: timestamp("expires", { precision: 3, mode: "string" }).notNull(),
  },
  table => {
    return {
      tokenKey: uniqueIndex("VerificationToken_token_key").on(table.token),
      identifierTokenKey: uniqueIndex("VerificationToken_identifier_token_key").on(
        table.identifier,
        table.token,
      ),
    }
  },
)

export const Session = pgTable(
  "Session",
  {
    id: text("id").primaryKey().notNull(),
    sessionToken: varchar("sessionToken", { length: 128 }).notNull(),
    userId: integer("userId")
      .notNull()
      .references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" }),
    expires: timestamp("expires", { precision: 3, mode: "string" }).notNull(),
  },
  table => {
    return {
      sessionTokenKey: uniqueIndex("Session_sessionToken_key").on(table.sessionToken),
    }
  },
)
