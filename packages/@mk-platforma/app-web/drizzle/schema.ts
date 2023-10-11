import {
  pgTable,
  uniqueIndex,
  index,
  foreignKey,
  integer,
  text,
  varchar,
  timestamp,
  serial,
  boolean,
  numeric,
  jsonb,
  customType,
} from "drizzle-orm/pg-core"

import { relations, sql } from "drizzle-orm"
import { Category_label, Category_label_zod } from "~/domain/category/Category.types"
import { ZodEnum } from "zod"

export const imageToPost = pgTable(
  "_ImageToPost",
  {
    a: integer("A")
      .notNull()
      .references(() => image.id, { onDelete: "cascade", onUpdate: "cascade" }),
    b: integer("B")
      .notNull()
      .references(() => post.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  table => {
    return {
      abUnique: uniqueIndex("_ImageToPost_AB_unique").on(table.a, table.b),
      bIdx: index().on(table.b),
    }
  },
)

export const session = pgTable(
  "Session",
  {
    id: text("id").primaryKey().notNull(),
    sessionToken: varchar("sessionToken", { length: 128 }).notNull(),
    userId: integer("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
    expires: timestamp("expires", { precision: 3, mode: "string" }).notNull(),
  },
  table => {
    return {
      sessionTokenKey: uniqueIndex("Session_sessionToken_key").on(table.sessionToken),
    }
  },
)

export const comment = pgTable("Comment", {
  id: serial("id").primaryKey().notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" }),
  postId: integer("post_id")
    .notNull()
    .references(() => post.id, { onDelete: "restrict", onUpdate: "cascade" }),
  isDeleted: boolean("isDeleted").default(false).notNull(),
})

export const commentRelations = relations(comment, ({ one }) => ({
  author: one(user, { fields: [comment.authorId], references: [user.id] }),
}))

// export const geographyColumns = pgTable("geography_columns", {
// 	// TODO: failed to parse database type 'name'
// 	fTableCatalog: unknown("f_table_catalog"),
// 	// TODO: failed to parse database type 'name'
// 	fTableSchema: unknown("f_table_schema"),
// 	// TODO: failed to parse database type 'name'
// 	fTableName: unknown("f_table_name"),
// 	// TODO: failed to parse database type 'name'
// 	fGeographyColumn: unknown("f_geography_column"),
// 	coordDimension: integer("coord_dimension"),
// 	srid: integer("srid"),
// 	type: text("type"),
// });

// export const geometryColumns = pgTable("geometry_columns", {
// 	fTableCatalog: varchar("f_table_catalog", { length: 256 }),
// 	// TODO: failed to parse database type 'name'
// 	fTableSchema: unknown("f_table_schema"),
// 	// TODO: failed to parse database type 'name'
// 	fTableName: unknown("f_table_name"),
// 	// TODO: failed to parse database type 'name'
// 	fGeometryColumn: unknown("f_geometry_column"),
// 	coordDimension: integer("coord_dimension"),
// 	srid: integer("srid"),
// 	type: varchar("type", { length: 30 }),
// });

export const image = pgTable(
  "Image",
  {
    id: serial("id").primaryKey().notNull(),
    postId: integer("post_id"),
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

export const location = pgTable(
  "Location",
  {
    id: serial("id").primaryKey().notNull(),
    googleId: varchar("google_id", { length: 128 }).notNull(),
    latitude: numeric("latitude", { precision: 65, scale: 30 }).notNull(),
    longitude: numeric("longitude", { precision: 65, scale: 30 }).notNull(),
    name: varchar("name", { length: 128 }).notNull(),
    adminAreaLevel1: varchar("adminAreaLevel1", { length: 128 }),
    country: varchar("country", { length: 64 }).notNull(),
  },
  table => {
    return {
      googleIdKey: uniqueIndex("Location_google_id_key").on(table.googleId),
    }
  },
)

export const spatialRefSys = pgTable("spatial_ref_sys", {
  srid: integer("srid").primaryKey().notNull(),
  authName: varchar("auth_name", { length: 256 }),
  authSrid: integer("auth_srid"),
  srtext: varchar("srtext", { length: 2048 }),
  proj4Text: varchar("proj4text", { length: 2048 }),
})

export const post = pgTable(
  "Post",
  {
    id: serial("id").primaryKey().notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description"),
    contact: varchar("contact", { length: 256 }).notNull(),
    locationId: integer("location_id").references(() => location.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    authorId: integer("author_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" }),
    expertEndorsementId: integer("expertEndorsement_id").references(
      () => postExpertEndorsement.id,
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

export const categoryToPost = pgTable(
  "_CategoryToPost",
  {
    a: integer("A")
      .notNull()
      .references(() => category.id, { onDelete: "cascade", onUpdate: "cascade" }),
    b: integer("B")
      .notNull()
      .references(() => post.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  table => {
    return {
      abUnique: uniqueIndex("_CategoryToPost_AB_unique").on(table.a, table.b),
      bIdx: index().on(table.b),
    }
  },
)

export const postExpertEndorsement = pgTable(
  "Post_ExpertEndorsement",
  {
    id: serial("id").primaryKey().notNull(),
    postId: integer("post_id").notNull(),
    firstName: varchar("firstName", { length: 64 }).notNull(),
    lastName: varchar("lastName", { length: 64 }).notNull(),
    avatarStyle: jsonb("avatarStyle").notNull(),
  },
  table => {
    return {
      postIdKey: uniqueIndex("Post_ExpertEndorsement_post_id_key").on(table.postId),
    }
  },
)

function enum_type(zodEnum: ZodEnum<any>) {
  return customType<{
    data: string
    driverData: string
  }>({
    dataType() {
      return "text"
    },
    toDriver(value: string) {
      zodEnum.parse(value)
      return value
    },
  })
}

export const category = pgTable(
  "Category",
  {
    id: serial("id").primaryKey().notNull(),
    parentId: integer("parent_id"),
    label: enum_type(Category_label_zod)("label").$type<Category_label>().notNull(),
  },
  table => {
    return {
      labelKey: uniqueIndex("Category_label_key").on(table.label),
      categoryParentIdFkey: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
      })
        .onUpdate("cascade")
        .onDelete("set null"),
    }
  },
)

export const categoryRelations = relations(category, ({ one, many }) => ({
  parent: one(category, {
    fields: [category.parentId],
    references: [category.id],
  }),
}))

export const postExpertEndorsementSkill = pgTable(
  "Post_ExpertEndorsement_skill",
  {
    id: serial("id").primaryKey().notNull(),
    label: varchar("label", { length: 64 }).notNull(),
    level: integer("level"),
    expertEndorsementId: integer("expertEndorsement_id")
      .notNull()
      .references(() => postExpertEndorsement.id, { onDelete: "restrict", onUpdate: "cascade" }),
  },
  table => {
    return {
      expertEndorsementIdLabelKey: uniqueIndex(
        "Post_ExpertEndorsement_skill_expertEndorsement_id_label_key",
      ).on(table.label, table.expertEndorsementId),
    }
  },
)

export const user = pgTable(
  "User",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 32 }),
    avatarStyle: jsonb("avatarStyle").notNull(),
    email: varchar("email", { length: 64 }),
    emailVerified: timestamp("emailVerified", { precision: 3, mode: "string" }),
    canMutate: boolean("canMutate").default(true).notNull(),
  },
  table => {
    return {
      nameKey: uniqueIndex("User_name_key").on(table.name),
      emailKey: uniqueIndex("User_email_key").on(table.email),
    }
  },
)

export const account = pgTable(
  "Account",
  {
    id: text("id").primaryKey().notNull(),
    userId: integer("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
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

export const verificationToken = pgTable(
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
