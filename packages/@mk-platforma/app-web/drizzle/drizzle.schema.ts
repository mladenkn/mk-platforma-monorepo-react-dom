export * from "~/domain/post/Post.schema"
export * from "~/domain/user/User.schema"
export * from "~/domain/category/Category.schema"

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

// export const SpatialRefSys = pgTable("spatial_ref_sys", {
//   srid: integer("srid").primaryKey().notNull(),
//   authName: varchar("auth_name", { length: 256 }),
//   authSrid: integer("auth_srid"),
//   srtext: varchar("srtext", { length: 2048 }),
//   proj4Text: varchar("proj4text", { length: 2048 }),
// })
