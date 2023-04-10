import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;

// DECIMAL
//------------------------------------------------------

export const DecimalJSLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({ d: z.array(z.number()), e: z.number(), s: z.number(), toFixed: z.function().args().returns(z.string()), });

export const DecimalJSLikeListSchema: z.ZodType<Prisma.DecimalJsLike[]> = z.object({ d: z.array(z.number()), e: z.number(), s: z.number(), toFixed: z.function().args().returns(z.string()), }).array();

export const DECIMAL_STRING_REGEX = /^[0-9.,e+-bxffo_cp]+$|Infinity|NaN/;

export const isValidDecimalInput =
  (v?: null | string | number | Prisma.DecimalJsLike): v is string | number | Prisma.DecimalJsLike => {
    if (v === undefined || v === null) return false;
    return (
      (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) ||
      (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
      typeof v === 'number'
    )
  };

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const ImageScalarFieldEnumSchema = z.enum(['id','cloudinary_id','postId']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]);

export const LocationScalarFieldEnumSchema = z.enum(['id','googleId','latitude','longitude']);

export const PostScalarFieldEnumSchema = z.enum(['id','title','description','contact','location_id','author_id','as_PersonEndorsement_id']);

export const Post_asPersonEndorsementScalarFieldEnumSchema = z.enum(['id','postId','firstName','lastName','avatarStyle']);

export const Post_asPersonEndorsement_skillScalarFieldEnumSchema = z.enum(['id','label','level','as_PersonEndorsement_id']);

export const Post_categoryScalarFieldEnumSchema = z.enum(['id','label','parent_id']);

export const Post_commentScalarFieldEnumSchema = z.enum(['id','content','authorId','postId']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','avatarStyle']);

export const Post_category_labelSchema = z.enum(['job','accommodation','personEndorsement','sellable','gathering','gathering_spirituality','gathering_work','gathering_hangout']);

export type Post_category_labelType = `${z.infer<typeof Post_category_labelSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location_id: z.number().int().nullable(),
  author_id: z.number().int(),
  as_PersonEndorsement_id: z.number().int().nullable(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// POST AS PERSON ENDORSEMENT SCHEMA
/////////////////////////////////////////

export const Post_asPersonEndorsementSchema = z.object({
  id: z.number().int(),
  postId: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  avatarStyle: InputJsonValue,
})

export type Post_asPersonEndorsement = z.infer<typeof Post_asPersonEndorsementSchema>

/////////////////////////////////////////
// POST AS PERSON ENDORSEMENT SKILL SCHEMA
/////////////////////////////////////////

export const Post_asPersonEndorsement_skillSchema = z.object({
  id: z.number().int(),
  label: z.string(),
  level: z.number().int(),
  as_PersonEndorsement_id: z.number().int().nullable(),
})

export type Post_asPersonEndorsement_skill = z.infer<typeof Post_asPersonEndorsement_skillSchema>

/////////////////////////////////////////
// POST CATEGORY SCHEMA
/////////////////////////////////////////

export const Post_categorySchema = z.object({
  label: Post_category_labelSchema,
  id: z.number().int(),
  parent_id: z.number().int().nullable(),
})

export type Post_category = z.infer<typeof Post_categorySchema>

/////////////////////////////////////////
// LOCATION SCHEMA
/////////////////////////////////////////

export const LocationSchema = z.object({
  id: z.number().int(),
  googleId: z.string(),
  latitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: "Field 'latitude' must be a Decimal. Location: ['Models', 'Location']",  }),
  longitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: "Field 'longitude' must be a Decimal. Location: ['Models', 'Location']",  }),
})

export type Location = z.infer<typeof LocationSchema>

/////////////////////////////////////////
// IMAGE SCHEMA
/////////////////////////////////////////

export const ImageSchema = z.object({
  id: z.number().int(),
  cloudinary_id: z.string(),
  postId: z.number().int(),
})

export type Image = z.infer<typeof ImageSchema>

/////////////////////////////////////////
// POST COMMENT SCHEMA
/////////////////////////////////////////

export const Post_commentSchema = z.object({
  id: z.number().int(),
  content: z.string(),
  authorId: z.number().int(),
  postId: z.number().int(),
})

export type Post_comment = z.infer<typeof Post_commentSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  avatarStyle: InputJsonValue,
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// POST
//------------------------------------------------------

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z.object({
  location: z.union([z.boolean(),z.lazy(() => LocationArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => Post_commentFindManyArgsSchema)]).optional(),
  categories: z.union([z.boolean(),z.lazy(() => Post_categoryFindManyArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  asPersonEndorsement: z.union([z.boolean(),z.lazy(() => Post_asPersonEndorsementArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PostArgsSchema: z.ZodType<Prisma.PostArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
}).strict();

export const PostCountOutputTypeArgsSchema: z.ZodType<Prisma.PostCountOutputTypeArgs> = z.object({
  select: z.lazy(() => PostCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PostCountOutputTypeSelectSchema: z.ZodType<Prisma.PostCountOutputTypeSelect> = z.object({
  images: z.boolean().optional(),
  comments: z.boolean().optional(),
  categories: z.boolean().optional(),
}).strict();

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  contact: z.boolean().optional(),
  location_id: z.boolean().optional(),
  author_id: z.boolean().optional(),
  as_PersonEndorsement_id: z.boolean().optional(),
  location: z.union([z.boolean(),z.lazy(() => LocationArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => Post_commentFindManyArgsSchema)]).optional(),
  categories: z.union([z.boolean(),z.lazy(() => Post_categoryFindManyArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  asPersonEndorsement: z.union([z.boolean(),z.lazy(() => Post_asPersonEndorsementArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostCountOutputTypeArgsSchema)]).optional(),
}).strict()

// POST AS PERSON ENDORSEMENT
//------------------------------------------------------

export const Post_asPersonEndorsementIncludeSchema: z.ZodType<Prisma.Post_asPersonEndorsementInclude> = z.object({
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  skills: z.union([z.boolean(),z.lazy(() => Post_asPersonEndorsement_skillFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Post_asPersonEndorsementCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const Post_asPersonEndorsementArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementArgs> = z.object({
  select: z.lazy(() => Post_asPersonEndorsementSelectSchema).optional(),
  include: z.lazy(() => Post_asPersonEndorsementIncludeSchema).optional(),
}).strict();

export const Post_asPersonEndorsementCountOutputTypeArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementCountOutputTypeArgs> = z.object({
  select: z.lazy(() => Post_asPersonEndorsementCountOutputTypeSelectSchema).nullish(),
}).strict();

export const Post_asPersonEndorsementCountOutputTypeSelectSchema: z.ZodType<Prisma.Post_asPersonEndorsementCountOutputTypeSelect> = z.object({
  skills: z.boolean().optional(),
}).strict();

export const Post_asPersonEndorsementSelectSchema: z.ZodType<Prisma.Post_asPersonEndorsementSelect> = z.object({
  id: z.boolean().optional(),
  postId: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  avatarStyle: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  skills: z.union([z.boolean(),z.lazy(() => Post_asPersonEndorsement_skillFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Post_asPersonEndorsementCountOutputTypeArgsSchema)]).optional(),
}).strict()

// POST AS PERSON ENDORSEMENT SKILL
//------------------------------------------------------

export const Post_asPersonEndorsement_skillIncludeSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillInclude> = z.object({
  as_PersonEndorsement: z.union([z.boolean(),z.lazy(() => Post_asPersonEndorsementArgsSchema)]).optional(),
}).strict()

export const Post_asPersonEndorsement_skillArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillArgs> = z.object({
  select: z.lazy(() => Post_asPersonEndorsement_skillSelectSchema).optional(),
  include: z.lazy(() => Post_asPersonEndorsement_skillIncludeSchema).optional(),
}).strict();

export const Post_asPersonEndorsement_skillSelectSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillSelect> = z.object({
  id: z.boolean().optional(),
  label: z.boolean().optional(),
  level: z.boolean().optional(),
  as_PersonEndorsement_id: z.boolean().optional(),
  as_PersonEndorsement: z.union([z.boolean(),z.lazy(() => Post_asPersonEndorsementArgsSchema)]).optional(),
}).strict()

// POST CATEGORY
//------------------------------------------------------

export const Post_categoryIncludeSchema: z.ZodType<Prisma.Post_categoryInclude> = z.object({
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  parent: z.union([z.boolean(),z.lazy(() => Post_categoryArgsSchema)]).optional(),
  children: z.union([z.boolean(),z.lazy(() => Post_categoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Post_categoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const Post_categoryArgsSchema: z.ZodType<Prisma.Post_categoryArgs> = z.object({
  select: z.lazy(() => Post_categorySelectSchema).optional(),
  include: z.lazy(() => Post_categoryIncludeSchema).optional(),
}).strict();

export const Post_categoryCountOutputTypeArgsSchema: z.ZodType<Prisma.Post_categoryCountOutputTypeArgs> = z.object({
  select: z.lazy(() => Post_categoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const Post_categoryCountOutputTypeSelectSchema: z.ZodType<Prisma.Post_categoryCountOutputTypeSelect> = z.object({
  posts: z.boolean().optional(),
  children: z.boolean().optional(),
}).strict();

export const Post_categorySelectSchema: z.ZodType<Prisma.Post_categorySelect> = z.object({
  id: z.boolean().optional(),
  label: z.boolean().optional(),
  parent_id: z.boolean().optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  parent: z.union([z.boolean(),z.lazy(() => Post_categoryArgsSchema)]).optional(),
  children: z.union([z.boolean(),z.lazy(() => Post_categoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Post_categoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LOCATION
//------------------------------------------------------

export const LocationIncludeSchema: z.ZodType<Prisma.LocationInclude> = z.object({
  post: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LocationArgsSchema: z.ZodType<Prisma.LocationArgs> = z.object({
  select: z.lazy(() => LocationSelectSchema).optional(),
  include: z.lazy(() => LocationIncludeSchema).optional(),
}).strict();

export const LocationCountOutputTypeArgsSchema: z.ZodType<Prisma.LocationCountOutputTypeArgs> = z.object({
  select: z.lazy(() => LocationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LocationCountOutputTypeSelectSchema: z.ZodType<Prisma.LocationCountOutputTypeSelect> = z.object({
  post: z.boolean().optional(),
}).strict();

export const LocationSelectSchema: z.ZodType<Prisma.LocationSelect> = z.object({
  id: z.boolean().optional(),
  googleId: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// IMAGE
//------------------------------------------------------

export const ImageIncludeSchema: z.ZodType<Prisma.ImageInclude> = z.object({
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
}).strict()

export const ImageArgsSchema: z.ZodType<Prisma.ImageArgs> = z.object({
  select: z.lazy(() => ImageSelectSchema).optional(),
  include: z.lazy(() => ImageIncludeSchema).optional(),
}).strict();

export const ImageSelectSchema: z.ZodType<Prisma.ImageSelect> = z.object({
  id: z.boolean().optional(),
  cloudinary_id: z.boolean().optional(),
  postId: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
}).strict()

// POST COMMENT
//------------------------------------------------------

export const Post_commentIncludeSchema: z.ZodType<Prisma.Post_commentInclude> = z.object({
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const Post_commentArgsSchema: z.ZodType<Prisma.Post_commentArgs> = z.object({
  select: z.lazy(() => Post_commentSelectSchema).optional(),
  include: z.lazy(() => Post_commentIncludeSchema).optional(),
}).strict();

export const Post_commentSelectSchema: z.ZodType<Prisma.Post_commentSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  authorId: z.boolean().optional(),
  postId: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  comments: z.union([z.boolean(),z.lazy(() => Post_commentFindManyArgsSchema)]).optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  comments: z.boolean().optional(),
  posts: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  avatarStyle: z.boolean().optional(),
  comments: z.union([z.boolean(),z.lazy(() => Post_commentFindManyArgsSchema)]).optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contact: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  author_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  as_PersonEndorsement_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  location: z.union([ z.lazy(() => LocationRelationFilterSchema),z.lazy(() => LocationWhereInputSchema) ]).optional().nullable(),
  images: z.lazy(() => ImageListRelationFilterSchema).optional(),
  comments: z.lazy(() => Post_commentListRelationFilterSchema).optional(),
  categories: z.lazy(() => Post_categoryListRelationFilterSchema).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  asPersonEndorsement: z.union([ z.lazy(() => Post_asPersonEndorsementRelationFilterSchema),z.lazy(() => Post_asPersonEndorsementWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  contact: z.lazy(() => SortOrderSchema).optional(),
  location_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => LocationOrderByWithRelationInputSchema).optional(),
  images: z.lazy(() => ImageOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => Post_commentOrderByRelationAggregateInputSchema).optional(),
  categories: z.lazy(() => Post_categoryOrderByRelationAggregateInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  asPersonEndorsement: z.lazy(() => Post_asPersonEndorsementOrderByWithRelationInputSchema).optional()
}).strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
  as_PersonEndorsement_id: z.number().int().optional()
}).strict();

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  contact: z.lazy(() => SortOrderSchema).optional(),
  location_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PostAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PostSumOrderByAggregateInputSchema).optional()
}).strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  contact: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  location_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  author_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  as_PersonEndorsement_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const Post_asPersonEndorsementWhereInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Post_asPersonEndorsementWhereInputSchema),z.lazy(() => Post_asPersonEndorsementWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_asPersonEndorsementWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_asPersonEndorsementWhereInputSchema),z.lazy(() => Post_asPersonEndorsementWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  postId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatarStyle: z.lazy(() => JsonFilterSchema).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional().nullable(),
  skills: z.lazy(() => Post_asPersonEndorsement_skillListRelationFilterSchema).optional()
}).strict();

export const Post_asPersonEndorsementOrderByWithRelationInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  avatarStyle: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
  skills: z.lazy(() => Post_asPersonEndorsement_skillOrderByRelationAggregateInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementWhereUniqueInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
  postId: z.number().int().optional()
}).strict();

export const Post_asPersonEndorsementOrderByWithAggregationInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  avatarStyle: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Post_asPersonEndorsementCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => Post_asPersonEndorsementAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Post_asPersonEndorsementMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Post_asPersonEndorsementMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => Post_asPersonEndorsementSumOrderByAggregateInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Post_asPersonEndorsementScalarWhereWithAggregatesInputSchema),z.lazy(() => Post_asPersonEndorsementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_asPersonEndorsementScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_asPersonEndorsementScalarWhereWithAggregatesInputSchema),z.lazy(() => Post_asPersonEndorsementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  postId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  avatarStyle: z.lazy(() => JsonWithAggregatesFilterSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillWhereInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Post_asPersonEndorsement_skillWhereInputSchema),z.lazy(() => Post_asPersonEndorsement_skillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_asPersonEndorsement_skillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_asPersonEndorsement_skillWhereInputSchema),z.lazy(() => Post_asPersonEndorsement_skillWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  level: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  as_PersonEndorsement_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  as_PersonEndorsement: z.union([ z.lazy(() => Post_asPersonEndorsementRelationFilterSchema),z.lazy(() => Post_asPersonEndorsementWhereInputSchema) ]).optional().nullable(),
}).strict();

export const Post_asPersonEndorsement_skillOrderByWithRelationInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement: z.lazy(() => Post_asPersonEndorsementOrderByWithRelationInputSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillWhereUniqueInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const Post_asPersonEndorsement_skillOrderByWithAggregationInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Post_asPersonEndorsement_skillCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => Post_asPersonEndorsement_skillAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Post_asPersonEndorsement_skillMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Post_asPersonEndorsement_skillMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => Post_asPersonEndorsement_skillSumOrderByAggregateInputSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Post_asPersonEndorsement_skillScalarWhereWithAggregatesInputSchema),z.lazy(() => Post_asPersonEndorsement_skillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_asPersonEndorsement_skillScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_asPersonEndorsement_skillScalarWhereWithAggregatesInputSchema),z.lazy(() => Post_asPersonEndorsement_skillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  level: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  as_PersonEndorsement_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const Post_categoryWhereInputSchema: z.ZodType<Prisma.Post_categoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Post_categoryWhereInputSchema),z.lazy(() => Post_categoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_categoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_categoryWhereInputSchema),z.lazy(() => Post_categoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => EnumPost_category_labelFilterSchema),z.lazy(() => Post_category_labelSchema) ]).optional(),
  parent_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  parent: z.union([ z.lazy(() => Post_categoryRelationFilterSchema),z.lazy(() => Post_categoryWhereInputSchema) ]).optional().nullable(),
  children: z.lazy(() => Post_categoryListRelationFilterSchema).optional()
}).strict();

export const Post_categoryOrderByWithRelationInputSchema: z.ZodType<Prisma.Post_categoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  parent: z.lazy(() => Post_categoryOrderByWithRelationInputSchema).optional(),
  children: z.lazy(() => Post_categoryOrderByRelationAggregateInputSchema).optional()
}).strict();

export const Post_categoryWhereUniqueInputSchema: z.ZodType<Prisma.Post_categoryWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
  label: z.lazy(() => Post_category_labelSchema).optional()
}).strict();

export const Post_categoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.Post_categoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Post_categoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => Post_categoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Post_categoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Post_categoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => Post_categorySumOrderByAggregateInputSchema).optional()
}).strict();

export const Post_categoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Post_categoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Post_categoryScalarWhereWithAggregatesInputSchema),z.lazy(() => Post_categoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_categoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_categoryScalarWhereWithAggregatesInputSchema),z.lazy(() => Post_categoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => EnumPost_category_labelWithAggregatesFilterSchema),z.lazy(() => Post_category_labelSchema) ]).optional(),
  parent_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const LocationWhereInputSchema: z.ZodType<Prisma.LocationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  googleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  longitude: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  post: z.lazy(() => PostListRelationFilterSchema).optional()
}).strict();

export const LocationOrderByWithRelationInputSchema: z.ZodType<Prisma.LocationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional()
}).strict();

export const LocationWhereUniqueInputSchema: z.ZodType<Prisma.LocationWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const LocationOrderByWithAggregationInputSchema: z.ZodType<Prisma.LocationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LocationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LocationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LocationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LocationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LocationSumOrderByAggregateInputSchema).optional()
}).strict();

export const LocationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LocationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  googleId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  longitude: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema),z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
}).strict();

export const ImageWhereInputSchema: z.ZodType<Prisma.ImageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ImageWhereInputSchema),z.lazy(() => ImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageWhereInputSchema),z.lazy(() => ImageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cloudinary_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
}).strict();

export const ImageOrderByWithRelationInputSchema: z.ZodType<Prisma.ImageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cloudinary_id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional()
}).strict();

export const ImageWhereUniqueInputSchema: z.ZodType<Prisma.ImageWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const ImageOrderByWithAggregationInputSchema: z.ZodType<Prisma.ImageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cloudinary_id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ImageCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ImageAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ImageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ImageMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ImageSumOrderByAggregateInputSchema).optional()
}).strict();

export const ImageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ImageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  cloudinary_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const Post_commentWhereInputSchema: z.ZodType<Prisma.Post_commentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Post_commentWhereInputSchema),z.lazy(() => Post_commentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_commentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_commentWhereInputSchema),z.lazy(() => Post_commentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  postId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const Post_commentOrderByWithRelationInputSchema: z.ZodType<Prisma.Post_commentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const Post_commentWhereUniqueInputSchema: z.ZodType<Prisma.Post_commentWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const Post_commentOrderByWithAggregationInputSchema: z.ZodType<Prisma.Post_commentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Post_commentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => Post_commentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Post_commentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Post_commentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => Post_commentSumOrderByAggregateInputSchema).optional()
}).strict();

export const Post_commentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Post_commentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Post_commentScalarWhereWithAggregatesInputSchema),z.lazy(() => Post_commentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_commentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_commentScalarWhereWithAggregatesInputSchema),z.lazy(() => Post_commentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  postId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatarStyle: z.lazy(() => JsonFilterSchema).optional(),
  comments: z.lazy(() => Post_commentListRelationFilterSchema).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  avatarStyle: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => Post_commentOrderByRelationAggregateInputSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  avatarStyle: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  avatarStyle: z.lazy(() => JsonWithAggregatesFilterSchema).optional()
}).strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.object({
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location: z.lazy(() => LocationCreateNestedOneWithoutPostInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => Post_commentCreateNestedManyWithoutPostInputSchema).optional(),
  categories: z.lazy(() => Post_categoryCreateNestedManyWithoutPostsInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  asPersonEndorsement: z.lazy(() => Post_asPersonEndorsementCreateNestedOneWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location_id: z.number().int().optional().nullable(),
  author_id: z.number().int(),
  as_PersonEndorsement_id: z.number().int().optional().nullable(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => Post_commentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUncheckedCreateNestedManyWithoutPostsInputSchema).optional()
}).strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutPostNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => Post_commentUpdateManyWithoutPostNestedInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUpdateManyWithoutPostsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  asPersonEndorsement: z.lazy(() => Post_asPersonEndorsementUpdateOneWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  author_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  as_PersonEndorsement_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => Post_commentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUncheckedUpdateManyWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location_id: z.number().int().optional().nullable(),
  author_id: z.number().int(),
  as_PersonEndorsement_id: z.number().int().optional().nullable()
}).strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  author_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  as_PersonEndorsement_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Post_asPersonEndorsementCreateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementCreateInput> = z.object({
  postId: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  post: z.lazy(() => PostCreateNestedOneWithoutAsPersonEndorsementInputSchema).optional(),
  skills: z.lazy(() => Post_asPersonEndorsement_skillCreateNestedManyWithoutAs_PersonEndorsementInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementUncheckedCreateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  postId: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  post: z.lazy(() => PostUncheckedCreateNestedOneWithoutAsPersonEndorsementInputSchema).optional(),
  skills: z.lazy(() => Post_asPersonEndorsement_skillUncheckedCreateNestedManyWithoutAs_PersonEndorsementInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementUpdateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUpdateInput> = z.object({
  postId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  post: z.lazy(() => PostUpdateOneWithoutAsPersonEndorsementNestedInputSchema).optional(),
  skills: z.lazy(() => Post_asPersonEndorsement_skillUpdateManyWithoutAs_PersonEndorsementNestedInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementUncheckedUpdateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  post: z.lazy(() => PostUncheckedUpdateOneWithoutAsPersonEndorsementNestedInputSchema).optional(),
  skills: z.lazy(() => Post_asPersonEndorsement_skillUncheckedUpdateManyWithoutAs_PersonEndorsementNestedInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementCreateManyInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementCreateManyInput> = z.object({
  id: z.number().int().optional(),
  postId: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
}).strict();

export const Post_asPersonEndorsementUpdateManyMutationInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUpdateManyMutationInput> = z.object({
  postId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const Post_asPersonEndorsementUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const Post_asPersonEndorsement_skillCreateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillCreateInput> = z.object({
  label: z.string(),
  level: z.number().int(),
  as_PersonEndorsement: z.lazy(() => Post_asPersonEndorsementCreateNestedOneWithoutSkillsInputSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillUncheckedCreateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  level: z.number().int(),
  as_PersonEndorsement_id: z.number().int().optional().nullable()
}).strict();

export const Post_asPersonEndorsement_skillUpdateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUpdateInput> = z.object({
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  as_PersonEndorsement: z.lazy(() => Post_asPersonEndorsementUpdateOneWithoutSkillsNestedInputSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillUncheckedUpdateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  as_PersonEndorsement_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Post_asPersonEndorsement_skillCreateManyInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillCreateManyInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  level: z.number().int(),
  as_PersonEndorsement_id: z.number().int().optional().nullable()
}).strict();

export const Post_asPersonEndorsement_skillUpdateManyMutationInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUpdateManyMutationInput> = z.object({
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_asPersonEndorsement_skillUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  as_PersonEndorsement_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Post_categoryCreateInputSchema: z.ZodType<Prisma.Post_categoryCreateInput> = z.object({
  label: z.lazy(() => Post_category_labelSchema),
  posts: z.lazy(() => PostCreateNestedManyWithoutCategoriesInputSchema).optional(),
  parent: z.lazy(() => Post_categoryCreateNestedOneWithoutChildrenInputSchema).optional(),
  children: z.lazy(() => Post_categoryCreateNestedManyWithoutParentInputSchema).optional()
}).strict();

export const Post_categoryUncheckedCreateInputSchema: z.ZodType<Prisma.Post_categoryUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  label: z.lazy(() => Post_category_labelSchema),
  parent_id: z.number().int().optional().nullable(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional(),
  children: z.lazy(() => Post_categoryUncheckedCreateNestedManyWithoutParentInputSchema).optional()
}).strict();

export const Post_categoryUpdateInputSchema: z.ZodType<Prisma.Post_categoryUpdateInput> = z.object({
  label: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => EnumPost_category_labelFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  parent: z.lazy(() => Post_categoryUpdateOneWithoutChildrenNestedInputSchema).optional(),
  children: z.lazy(() => Post_categoryUpdateManyWithoutParentNestedInputSchema).optional()
}).strict();

export const Post_categoryUncheckedUpdateInputSchema: z.ZodType<Prisma.Post_categoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => EnumPost_category_labelFieldUpdateOperationsInputSchema) ]).optional(),
  parent_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  children: z.lazy(() => Post_categoryUncheckedUpdateManyWithoutParentNestedInputSchema).optional()
}).strict();

export const Post_categoryCreateManyInputSchema: z.ZodType<Prisma.Post_categoryCreateManyInput> = z.object({
  id: z.number().int().optional(),
  label: z.lazy(() => Post_category_labelSchema),
  parent_id: z.number().int().optional().nullable()
}).strict();

export const Post_categoryUpdateManyMutationInputSchema: z.ZodType<Prisma.Post_categoryUpdateManyMutationInput> = z.object({
  label: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => EnumPost_category_labelFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_categoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Post_categoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => EnumPost_category_labelFieldUpdateOperationsInputSchema) ]).optional(),
  parent_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LocationCreateInputSchema: z.ZodType<Prisma.LocationCreateInput> = z.object({
  googleId: z.string(),
  latitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  longitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  post: z.lazy(() => PostCreateNestedManyWithoutLocationInputSchema).optional()
}).strict();

export const LocationUncheckedCreateInputSchema: z.ZodType<Prisma.LocationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  googleId: z.string(),
  latitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  longitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  post: z.lazy(() => PostUncheckedCreateNestedManyWithoutLocationInputSchema).optional()
}).strict();

export const LocationUpdateInputSchema: z.ZodType<Prisma.LocationUpdateInput> = z.object({
  googleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  googleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUncheckedUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationCreateManyInputSchema: z.ZodType<Prisma.LocationCreateManyInput> = z.object({
  id: z.number().int().optional(),
  googleId: z.string(),
  latitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  longitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
}).strict();

export const LocationUpdateManyMutationInputSchema: z.ZodType<Prisma.LocationUpdateManyMutationInput> = z.object({
  googleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  googleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageCreateInputSchema: z.ZodType<Prisma.ImageCreateInput> = z.object({
  cloudinary_id: z.string(),
  post: z.lazy(() => PostCreateNestedOneWithoutImagesInputSchema)
}).strict();

export const ImageUncheckedCreateInputSchema: z.ZodType<Prisma.ImageUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  cloudinary_id: z.string(),
  postId: z.number().int()
}).strict();

export const ImageUpdateInputSchema: z.ZodType<Prisma.ImageUpdateInput> = z.object({
  cloudinary_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutImagesNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cloudinary_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageCreateManyInputSchema: z.ZodType<Prisma.ImageCreateManyInput> = z.object({
  id: z.number().int().optional(),
  cloudinary_id: z.string(),
  postId: z.number().int()
}).strict();

export const ImageUpdateManyMutationInputSchema: z.ZodType<Prisma.ImageUpdateManyMutationInput> = z.object({
  cloudinary_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cloudinary_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_commentCreateInputSchema: z.ZodType<Prisma.Post_commentCreateInput> = z.object({
  content: z.string(),
  post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const Post_commentUncheckedCreateInputSchema: z.ZodType<Prisma.Post_commentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  authorId: z.number().int(),
  postId: z.number().int()
}).strict();

export const Post_commentUpdateInputSchema: z.ZodType<Prisma.Post_commentUpdateInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const Post_commentUncheckedUpdateInputSchema: z.ZodType<Prisma.Post_commentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_commentCreateManyInputSchema: z.ZodType<Prisma.Post_commentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  authorId: z.number().int(),
  postId: z.number().int()
}).strict();

export const Post_commentUpdateManyMutationInputSchema: z.ZodType<Prisma.Post_commentUpdateManyMutationInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_commentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Post_commentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  name: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  comments: z.lazy(() => Post_commentCreateNestedManyWithoutAuthorInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  comments: z.lazy(() => Post_commentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  comments: z.lazy(() => Post_commentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  comments: z.lazy(() => Post_commentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const LocationRelationFilterSchema: z.ZodType<Prisma.LocationRelationFilter> = z.object({
  is: z.lazy(() => LocationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => LocationWhereInputSchema).optional().nullable()
}).strict();

export const ImageListRelationFilterSchema: z.ZodType<Prisma.ImageListRelationFilter> = z.object({
  every: z.lazy(() => ImageWhereInputSchema).optional(),
  some: z.lazy(() => ImageWhereInputSchema).optional(),
  none: z.lazy(() => ImageWhereInputSchema).optional()
}).strict();

export const Post_commentListRelationFilterSchema: z.ZodType<Prisma.Post_commentListRelationFilter> = z.object({
  every: z.lazy(() => Post_commentWhereInputSchema).optional(),
  some: z.lazy(() => Post_commentWhereInputSchema).optional(),
  none: z.lazy(() => Post_commentWhereInputSchema).optional()
}).strict();

export const Post_categoryListRelationFilterSchema: z.ZodType<Prisma.Post_categoryListRelationFilter> = z.object({
  every: z.lazy(() => Post_categoryWhereInputSchema).optional(),
  some: z.lazy(() => Post_categoryWhereInputSchema).optional(),
  none: z.lazy(() => Post_categoryWhereInputSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementRelationFilterSchema: z.ZodType<Prisma.Post_asPersonEndorsementRelationFilter> = z.object({
  is: z.lazy(() => Post_asPersonEndorsementWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => Post_asPersonEndorsementWhereInputSchema).optional().nullable()
}).strict();

export const ImageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ImageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_commentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Post_commentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_categoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Post_categoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  contact: z.lazy(() => SortOrderSchema).optional(),
  location_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PostAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  contact: z.lazy(() => SortOrderSchema).optional(),
  location_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  contact: z.lazy(() => SortOrderSchema).optional(),
  location_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostSumOrderByAggregateInputSchema: z.ZodType<Prisma.PostSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  location_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const PostRelationFilterSchema: z.ZodType<Prisma.PostRelationFilter> = z.object({
  is: z.lazy(() => PostWhereInputSchema).optional(),
  isNot: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillListRelationFilterSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillListRelationFilter> = z.object({
  every: z.lazy(() => Post_asPersonEndorsement_skillWhereInputSchema).optional(),
  some: z.lazy(() => Post_asPersonEndorsement_skillWhereInputSchema).optional(),
  none: z.lazy(() => Post_asPersonEndorsement_skillWhereInputSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_asPersonEndorsementCountOrderByAggregateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  avatarStyle: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_asPersonEndorsementAvgOrderByAggregateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_asPersonEndorsementMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_asPersonEndorsementMinOrderByAggregateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_asPersonEndorsementSumOrderByAggregateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillCountOrderByAggregateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillAvgOrderByAggregateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillMinOrderByAggregateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillSumOrderByAggregateInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  as_PersonEndorsement_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPost_category_labelFilterSchema: z.ZodType<Prisma.EnumPost_category_labelFilter> = z.object({
  equals: z.lazy(() => Post_category_labelSchema).optional(),
  in: z.lazy(() => Post_category_labelSchema).array().optional(),
  notIn: z.lazy(() => Post_category_labelSchema).array().optional(),
  not: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => NestedEnumPost_category_labelFilterSchema) ]).optional(),
}).strict();

export const PostListRelationFilterSchema: z.ZodType<Prisma.PostListRelationFilter> = z.object({
  every: z.lazy(() => PostWhereInputSchema).optional(),
  some: z.lazy(() => PostWhereInputSchema).optional(),
  none: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const Post_categoryRelationFilterSchema: z.ZodType<Prisma.Post_categoryRelationFilter> = z.object({
  is: z.lazy(() => Post_categoryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => Post_categoryWhereInputSchema).optional().nullable()
}).strict();

export const PostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_categoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.Post_categoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_categoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.Post_categoryAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_categoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Post_categoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_categoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.Post_categoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_categorySumOrderByAggregateInputSchema: z.ZodType<Prisma.Post_categorySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPost_category_labelWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPost_category_labelWithAggregatesFilter> = z.object({
  equals: z.lazy(() => Post_category_labelSchema).optional(),
  in: z.lazy(() => Post_category_labelSchema).array().optional(),
  notIn: z.lazy(() => Post_category_labelSchema).array().optional(),
  not: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => NestedEnumPost_category_labelWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPost_category_labelFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPost_category_labelFilterSchema).optional()
}).strict();

export const DecimalFilterSchema: z.ZodType<Prisma.DecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict();

export const LocationCountOrderByAggregateInputSchema: z.ZodType<Prisma.LocationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LocationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMinOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationSumOrderByAggregateInputSchema: z.ZodType<Prisma.LocationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DecimalWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional()
}).strict();

export const ImageCountOrderByAggregateInputSchema: z.ZodType<Prisma.ImageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cloudinary_id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ImageAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ImageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cloudinary_id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageMinOrderByAggregateInputSchema: z.ZodType<Prisma.ImageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  cloudinary_id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageSumOrderByAggregateInputSchema: z.ZodType<Prisma.ImageSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_commentCountOrderByAggregateInputSchema: z.ZodType<Prisma.Post_commentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_commentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.Post_commentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_commentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Post_commentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_commentMinOrderByAggregateInputSchema: z.ZodType<Prisma.Post_commentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_commentSumOrderByAggregateInputSchema: z.ZodType<Prisma.Post_commentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  avatarStyle: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationCreateNestedOneWithoutPostInputSchema: z.ZodType<Prisma.LocationCreateNestedOneWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutPostInputSchema),z.lazy(() => LocationUncheckedCreateWithoutPostInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutPostInputSchema).optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional()
}).strict();

export const ImageCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.ImageCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutPostInputSchema),z.lazy(() => ImageCreateWithoutPostInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutPostInputSchema),z.lazy(() => ImageUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutPostInputSchema),z.lazy(() => ImageCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_commentCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.Post_commentCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => Post_commentCreateWithoutPostInputSchema),z.lazy(() => Post_commentCreateWithoutPostInputSchema).array(),z.lazy(() => Post_commentUncheckedCreateWithoutPostInputSchema),z.lazy(() => Post_commentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_commentCreateOrConnectWithoutPostInputSchema),z.lazy(() => Post_commentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_commentCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_categoryCreateNestedManyWithoutPostsInputSchema: z.ZodType<Prisma.Post_categoryCreateNestedManyWithoutPostsInput> = z.object({
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutPostsInputSchema),z.lazy(() => Post_categoryCreateWithoutPostsInputSchema).array(),z.lazy(() => Post_categoryUncheckedCreateWithoutPostsInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutPostsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_categoryCreateOrConnectWithoutPostsInputSchema),z.lazy(() => Post_categoryCreateOrConnectWithoutPostsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPostsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementCreateNestedOneWithoutPostInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementCreateNestedOneWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => Post_asPersonEndorsementCreateWithoutPostInputSchema),z.lazy(() => Post_asPersonEndorsementUncheckedCreateWithoutPostInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Post_asPersonEndorsementCreateOrConnectWithoutPostInputSchema).optional(),
  connect: z.lazy(() => Post_asPersonEndorsementWhereUniqueInputSchema).optional()
}).strict();

export const ImageUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.ImageUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutPostInputSchema),z.lazy(() => ImageCreateWithoutPostInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutPostInputSchema),z.lazy(() => ImageUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutPostInputSchema),z.lazy(() => ImageCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_commentUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.Post_commentUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => Post_commentCreateWithoutPostInputSchema),z.lazy(() => Post_commentCreateWithoutPostInputSchema).array(),z.lazy(() => Post_commentUncheckedCreateWithoutPostInputSchema),z.lazy(() => Post_commentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_commentCreateOrConnectWithoutPostInputSchema),z.lazy(() => Post_commentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_commentCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_categoryUncheckedCreateNestedManyWithoutPostsInputSchema: z.ZodType<Prisma.Post_categoryUncheckedCreateNestedManyWithoutPostsInput> = z.object({
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutPostsInputSchema),z.lazy(() => Post_categoryCreateWithoutPostsInputSchema).array(),z.lazy(() => Post_categoryUncheckedCreateWithoutPostsInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutPostsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_categoryCreateOrConnectWithoutPostsInputSchema),z.lazy(() => Post_categoryCreateOrConnectWithoutPostsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const LocationUpdateOneWithoutPostNestedInputSchema: z.ZodType<Prisma.LocationUpdateOneWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutPostInputSchema),z.lazy(() => LocationUncheckedCreateWithoutPostInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutPostInputSchema).optional(),
  upsert: z.lazy(() => LocationUpsertWithoutPostInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithoutPostInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutPostInputSchema) ]).optional(),
}).strict();

export const ImageUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.ImageUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutPostInputSchema),z.lazy(() => ImageCreateWithoutPostInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutPostInputSchema),z.lazy(() => ImageUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutPostInputSchema),z.lazy(() => ImageCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_commentUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.Post_commentUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_commentCreateWithoutPostInputSchema),z.lazy(() => Post_commentCreateWithoutPostInputSchema).array(),z.lazy(() => Post_commentUncheckedCreateWithoutPostInputSchema),z.lazy(() => Post_commentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_commentCreateOrConnectWithoutPostInputSchema),z.lazy(() => Post_commentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_commentUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => Post_commentUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_commentCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_commentUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => Post_commentUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_commentUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => Post_commentUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_commentScalarWhereInputSchema),z.lazy(() => Post_commentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_categoryUpdateManyWithoutPostsNestedInputSchema: z.ZodType<Prisma.Post_categoryUpdateManyWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutPostsInputSchema),z.lazy(() => Post_categoryCreateWithoutPostsInputSchema).array(),z.lazy(() => Post_categoryUncheckedCreateWithoutPostsInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutPostsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_categoryCreateOrConnectWithoutPostsInputSchema),z.lazy(() => Post_categoryCreateOrConnectWithoutPostsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_categoryUpsertWithWhereUniqueWithoutPostsInputSchema),z.lazy(() => Post_categoryUpsertWithWhereUniqueWithoutPostsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_categoryUpdateWithWhereUniqueWithoutPostsInputSchema),z.lazy(() => Post_categoryUpdateWithWhereUniqueWithoutPostsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_categoryUpdateManyWithWhereWithoutPostsInputSchema),z.lazy(() => Post_categoryUpdateManyWithWhereWithoutPostsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_categoryScalarWhereInputSchema),z.lazy(() => Post_categoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
}).strict();

export const Post_asPersonEndorsementUpdateOneWithoutPostNestedInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUpdateOneWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_asPersonEndorsementCreateWithoutPostInputSchema),z.lazy(() => Post_asPersonEndorsementUncheckedCreateWithoutPostInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Post_asPersonEndorsementCreateOrConnectWithoutPostInputSchema).optional(),
  upsert: z.lazy(() => Post_asPersonEndorsementUpsertWithoutPostInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => Post_asPersonEndorsementWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Post_asPersonEndorsementUpdateWithoutPostInputSchema),z.lazy(() => Post_asPersonEndorsementUncheckedUpdateWithoutPostInputSchema) ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ImageUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutPostInputSchema),z.lazy(() => ImageCreateWithoutPostInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutPostInputSchema),z.lazy(() => ImageUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutPostInputSchema),z.lazy(() => ImageCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_commentUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.Post_commentUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_commentCreateWithoutPostInputSchema),z.lazy(() => Post_commentCreateWithoutPostInputSchema).array(),z.lazy(() => Post_commentUncheckedCreateWithoutPostInputSchema),z.lazy(() => Post_commentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_commentCreateOrConnectWithoutPostInputSchema),z.lazy(() => Post_commentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_commentUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => Post_commentUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_commentCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_commentUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => Post_commentUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_commentUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => Post_commentUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_commentScalarWhereInputSchema),z.lazy(() => Post_commentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_categoryUncheckedUpdateManyWithoutPostsNestedInputSchema: z.ZodType<Prisma.Post_categoryUncheckedUpdateManyWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutPostsInputSchema),z.lazy(() => Post_categoryCreateWithoutPostsInputSchema).array(),z.lazy(() => Post_categoryUncheckedCreateWithoutPostsInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutPostsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_categoryCreateOrConnectWithoutPostsInputSchema),z.lazy(() => Post_categoryCreateOrConnectWithoutPostsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_categoryUpsertWithWhereUniqueWithoutPostsInputSchema),z.lazy(() => Post_categoryUpsertWithWhereUniqueWithoutPostsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_categoryUpdateWithWhereUniqueWithoutPostsInputSchema),z.lazy(() => Post_categoryUpdateWithWhereUniqueWithoutPostsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_categoryUpdateManyWithWhereWithoutPostsInputSchema),z.lazy(() => Post_categoryUpdateManyWithWhereWithoutPostsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_categoryScalarWhereInputSchema),z.lazy(() => Post_categoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostCreateNestedOneWithoutAsPersonEndorsementInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutAsPersonEndorsementInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAsPersonEndorsementInputSchema),z.lazy(() => PostUncheckedCreateWithoutAsPersonEndorsementInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutAsPersonEndorsementInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillCreateNestedManyWithoutAs_PersonEndorsementInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillCreateNestedManyWithoutAs_PersonEndorsementInput> = z.object({
  create: z.union([ z.lazy(() => Post_asPersonEndorsement_skillCreateWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillCreateWithoutAs_PersonEndorsementInputSchema).array(),z.lazy(() => Post_asPersonEndorsement_skillUncheckedCreateWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUncheckedCreateWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_asPersonEndorsement_skillCreateOrConnectWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillCreateOrConnectWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_asPersonEndorsement_skillCreateManyAs_PersonEndorsementInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema),z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedCreateNestedOneWithoutAsPersonEndorsementInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedOneWithoutAsPersonEndorsementInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAsPersonEndorsementInputSchema),z.lazy(() => PostUncheckedCreateWithoutAsPersonEndorsementInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutAsPersonEndorsementInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillUncheckedCreateNestedManyWithoutAs_PersonEndorsementInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUncheckedCreateNestedManyWithoutAs_PersonEndorsementInput> = z.object({
  create: z.union([ z.lazy(() => Post_asPersonEndorsement_skillCreateWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillCreateWithoutAs_PersonEndorsementInputSchema).array(),z.lazy(() => Post_asPersonEndorsement_skillUncheckedCreateWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUncheckedCreateWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_asPersonEndorsement_skillCreateOrConnectWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillCreateOrConnectWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_asPersonEndorsement_skillCreateManyAs_PersonEndorsementInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema),z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUpdateOneWithoutAsPersonEndorsementNestedInputSchema: z.ZodType<Prisma.PostUpdateOneWithoutAsPersonEndorsementNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAsPersonEndorsementInputSchema),z.lazy(() => PostUncheckedCreateWithoutAsPersonEndorsementInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutAsPersonEndorsementInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutAsPersonEndorsementInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithoutAsPersonEndorsementInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAsPersonEndorsementInputSchema) ]).optional(),
}).strict();

export const Post_asPersonEndorsement_skillUpdateManyWithoutAs_PersonEndorsementNestedInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUpdateManyWithoutAs_PersonEndorsementNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_asPersonEndorsement_skillCreateWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillCreateWithoutAs_PersonEndorsementInputSchema).array(),z.lazy(() => Post_asPersonEndorsement_skillUncheckedCreateWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUncheckedCreateWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_asPersonEndorsement_skillCreateOrConnectWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillCreateOrConnectWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_asPersonEndorsement_skillUpsertWithWhereUniqueWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUpsertWithWhereUniqueWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_asPersonEndorsement_skillCreateManyAs_PersonEndorsementInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema),z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema),z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema),z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema),z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_asPersonEndorsement_skillUpdateWithWhereUniqueWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUpdateWithWhereUniqueWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_asPersonEndorsement_skillUpdateManyWithWhereWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUpdateManyWithWhereWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_asPersonEndorsement_skillScalarWhereInputSchema),z.lazy(() => Post_asPersonEndorsement_skillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedUpdateOneWithoutAsPersonEndorsementNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateOneWithoutAsPersonEndorsementNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAsPersonEndorsementInputSchema),z.lazy(() => PostUncheckedCreateWithoutAsPersonEndorsementInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutAsPersonEndorsementInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutAsPersonEndorsementInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithoutAsPersonEndorsementInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAsPersonEndorsementInputSchema) ]).optional(),
}).strict();

export const Post_asPersonEndorsement_skillUncheckedUpdateManyWithoutAs_PersonEndorsementNestedInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUncheckedUpdateManyWithoutAs_PersonEndorsementNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_asPersonEndorsement_skillCreateWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillCreateWithoutAs_PersonEndorsementInputSchema).array(),z.lazy(() => Post_asPersonEndorsement_skillUncheckedCreateWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUncheckedCreateWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_asPersonEndorsement_skillCreateOrConnectWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillCreateOrConnectWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_asPersonEndorsement_skillUpsertWithWhereUniqueWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUpsertWithWhereUniqueWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_asPersonEndorsement_skillCreateManyAs_PersonEndorsementInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema),z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema),z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema),z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema),z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_asPersonEndorsement_skillUpdateWithWhereUniqueWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUpdateWithWhereUniqueWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_asPersonEndorsement_skillUpdateManyWithWhereWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUpdateManyWithWhereWithoutAs_PersonEndorsementInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_asPersonEndorsement_skillScalarWhereInputSchema),z.lazy(() => Post_asPersonEndorsement_skillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_asPersonEndorsementCreateNestedOneWithoutSkillsInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementCreateNestedOneWithoutSkillsInput> = z.object({
  create: z.union([ z.lazy(() => Post_asPersonEndorsementCreateWithoutSkillsInputSchema),z.lazy(() => Post_asPersonEndorsementUncheckedCreateWithoutSkillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Post_asPersonEndorsementCreateOrConnectWithoutSkillsInputSchema).optional(),
  connect: z.lazy(() => Post_asPersonEndorsementWhereUniqueInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementUpdateOneWithoutSkillsNestedInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUpdateOneWithoutSkillsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_asPersonEndorsementCreateWithoutSkillsInputSchema),z.lazy(() => Post_asPersonEndorsementUncheckedCreateWithoutSkillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Post_asPersonEndorsementCreateOrConnectWithoutSkillsInputSchema).optional(),
  upsert: z.lazy(() => Post_asPersonEndorsementUpsertWithoutSkillsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => Post_asPersonEndorsementWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Post_asPersonEndorsementUpdateWithoutSkillsInputSchema),z.lazy(() => Post_asPersonEndorsementUncheckedUpdateWithoutSkillsInputSchema) ]).optional(),
}).strict();

export const PostCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCategoriesInputSchema),z.lazy(() => PostCreateWithoutCategoriesInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => PostUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => PostCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_categoryCreateNestedOneWithoutChildrenInputSchema: z.ZodType<Prisma.Post_categoryCreateNestedOneWithoutChildrenInput> = z.object({
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutChildrenInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutChildrenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Post_categoryCreateOrConnectWithoutChildrenInputSchema).optional(),
  connect: z.lazy(() => Post_categoryWhereUniqueInputSchema).optional()
}).strict();

export const Post_categoryCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.Post_categoryCreateNestedManyWithoutParentInput> = z.object({
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutParentInputSchema),z.lazy(() => Post_categoryCreateWithoutParentInputSchema).array(),z.lazy(() => Post_categoryUncheckedCreateWithoutParentInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_categoryCreateOrConnectWithoutParentInputSchema),z.lazy(() => Post_categoryCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_categoryCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCategoriesInputSchema),z.lazy(() => PostCreateWithoutCategoriesInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => PostUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => PostCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_categoryUncheckedCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.Post_categoryUncheckedCreateNestedManyWithoutParentInput> = z.object({
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutParentInputSchema),z.lazy(() => Post_categoryCreateWithoutParentInputSchema).array(),z.lazy(() => Post_categoryUncheckedCreateWithoutParentInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_categoryCreateOrConnectWithoutParentInputSchema),z.lazy(() => Post_categoryCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_categoryCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumPost_category_labelFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPost_category_labelFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => Post_category_labelSchema).optional()
}).strict();

export const PostUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCategoriesInputSchema),z.lazy(() => PostCreateWithoutCategoriesInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => PostUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => PostCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_categoryUpdateOneWithoutChildrenNestedInputSchema: z.ZodType<Prisma.Post_categoryUpdateOneWithoutChildrenNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutChildrenInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutChildrenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Post_categoryCreateOrConnectWithoutChildrenInputSchema).optional(),
  upsert: z.lazy(() => Post_categoryUpsertWithoutChildrenInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => Post_categoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Post_categoryUpdateWithoutChildrenInputSchema),z.lazy(() => Post_categoryUncheckedUpdateWithoutChildrenInputSchema) ]).optional(),
}).strict();

export const Post_categoryUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.Post_categoryUpdateManyWithoutParentNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutParentInputSchema),z.lazy(() => Post_categoryCreateWithoutParentInputSchema).array(),z.lazy(() => Post_categoryUncheckedCreateWithoutParentInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_categoryCreateOrConnectWithoutParentInputSchema),z.lazy(() => Post_categoryCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_categoryUpsertWithWhereUniqueWithoutParentInputSchema),z.lazy(() => Post_categoryUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_categoryCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_categoryUpdateWithWhereUniqueWithoutParentInputSchema),z.lazy(() => Post_categoryUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_categoryUpdateManyWithWhereWithoutParentInputSchema),z.lazy(() => Post_categoryUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_categoryScalarWhereInputSchema),z.lazy(() => Post_categoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCategoriesInputSchema),z.lazy(() => PostCreateWithoutCategoriesInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => PostUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => PostCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_categoryUncheckedUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.Post_categoryUncheckedUpdateManyWithoutParentNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutParentInputSchema),z.lazy(() => Post_categoryCreateWithoutParentInputSchema).array(),z.lazy(() => Post_categoryUncheckedCreateWithoutParentInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_categoryCreateOrConnectWithoutParentInputSchema),z.lazy(() => Post_categoryCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_categoryUpsertWithWhereUniqueWithoutParentInputSchema),z.lazy(() => Post_categoryUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_categoryCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_categoryWhereUniqueInputSchema),z.lazy(() => Post_categoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_categoryUpdateWithWhereUniqueWithoutParentInputSchema),z.lazy(() => Post_categoryUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_categoryUpdateManyWithWhereWithoutParentInputSchema),z.lazy(() => Post_categoryUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_categoryScalarWhereInputSchema),z.lazy(() => Post_categoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostCreateNestedManyWithoutLocationInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLocationInputSchema),z.lazy(() => PostCreateWithoutLocationInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutLocationInputSchema),z.lazy(() => PostUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutLocationInputSchema),z.lazy(() => PostCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedCreateNestedManyWithoutLocationInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLocationInputSchema),z.lazy(() => PostCreateWithoutLocationInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutLocationInputSchema),z.lazy(() => PostUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutLocationInputSchema),z.lazy(() => PostCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> = z.object({
  set: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  increment: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional()
}).strict();

export const PostUpdateManyWithoutLocationNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLocationInputSchema),z.lazy(() => PostCreateWithoutLocationInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutLocationInputSchema),z.lazy(() => PostUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutLocationInputSchema),z.lazy(() => PostCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyLocationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutLocationInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutLocationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutLocationNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLocationInputSchema),z.lazy(() => PostCreateWithoutLocationInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutLocationInputSchema),z.lazy(() => PostUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutLocationInputSchema),z.lazy(() => PostCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyLocationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutLocationInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutLocationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostCreateNestedOneWithoutImagesInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutImagesInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutImagesInputSchema),z.lazy(() => PostUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutImagesInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const PostUpdateOneRequiredWithoutImagesNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutImagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutImagesInputSchema),z.lazy(() => PostUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutImagesInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutImagesInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithoutImagesInputSchema),z.lazy(() => PostUncheckedUpdateWithoutImagesInputSchema) ]).optional(),
}).strict();

export const PostCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PostUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const Post_commentCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.Post_commentCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => Post_commentCreateWithoutAuthorInputSchema),z.lazy(() => Post_commentCreateWithoutAuthorInputSchema).array(),z.lazy(() => Post_commentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => Post_commentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_commentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => Post_commentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_commentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_commentUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.Post_commentUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => Post_commentCreateWithoutAuthorInputSchema),z.lazy(() => Post_commentCreateWithoutAuthorInputSchema).array(),z.lazy(() => Post_commentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => Post_commentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_commentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => Post_commentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_commentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_commentUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.Post_commentUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_commentCreateWithoutAuthorInputSchema),z.lazy(() => Post_commentCreateWithoutAuthorInputSchema).array(),z.lazy(() => Post_commentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => Post_commentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_commentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => Post_commentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_commentUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => Post_commentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_commentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_commentUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => Post_commentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_commentUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => Post_commentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_commentScalarWhereInputSchema),z.lazy(() => Post_commentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_commentUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.Post_commentUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_commentCreateWithoutAuthorInputSchema),z.lazy(() => Post_commentCreateWithoutAuthorInputSchema).array(),z.lazy(() => Post_commentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => Post_commentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_commentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => Post_commentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_commentUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => Post_commentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_commentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_commentWhereUniqueInputSchema),z.lazy(() => Post_commentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_commentUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => Post_commentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_commentUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => Post_commentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_commentScalarWhereInputSchema),z.lazy(() => Post_commentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPost_category_labelFilterSchema: z.ZodType<Prisma.NestedEnumPost_category_labelFilter> = z.object({
  equals: z.lazy(() => Post_category_labelSchema).optional(),
  in: z.lazy(() => Post_category_labelSchema).array().optional(),
  notIn: z.lazy(() => Post_category_labelSchema).array().optional(),
  not: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => NestedEnumPost_category_labelFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPost_category_labelWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPost_category_labelWithAggregatesFilter> = z.object({
  equals: z.lazy(() => Post_category_labelSchema).optional(),
  in: z.lazy(() => Post_category_labelSchema).array().optional(),
  notIn: z.lazy(() => Post_category_labelSchema).array().optional(),
  not: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => NestedEnumPost_category_labelWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPost_category_labelFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPost_category_labelFilterSchema).optional()
}).strict();

export const NestedDecimalFilterSchema: z.ZodType<Prisma.NestedDecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict();

export const NestedDecimalWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),DecimalJSLikeListSchema,]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional()
}).strict();

export const LocationCreateWithoutPostInputSchema: z.ZodType<Prisma.LocationCreateWithoutPostInput> = z.object({
  googleId: z.string(),
  latitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  longitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
}).strict();

export const LocationUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.LocationUncheckedCreateWithoutPostInput> = z.object({
  id: z.number().optional(),
  googleId: z.string(),
  latitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  longitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
}).strict();

export const LocationCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutPostInputSchema),z.lazy(() => LocationUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const ImageCreateWithoutPostInputSchema: z.ZodType<Prisma.ImageCreateWithoutPostInput> = z.object({
  cloudinary_id: z.string()
}).strict();

export const ImageUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.ImageUncheckedCreateWithoutPostInput> = z.object({
  id: z.number().optional(),
  cloudinary_id: z.string()
}).strict();

export const ImageCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.ImageCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageCreateWithoutPostInputSchema),z.lazy(() => ImageUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const ImageCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.ImageCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ImageCreateManyPostInputSchema),z.lazy(() => ImageCreateManyPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Post_commentCreateWithoutPostInputSchema: z.ZodType<Prisma.Post_commentCreateWithoutPostInput> = z.object({
  content: z.string(),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const Post_commentUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.Post_commentUncheckedCreateWithoutPostInput> = z.object({
  id: z.number().optional(),
  content: z.string(),
  authorId: z.number()
}).strict();

export const Post_commentCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.Post_commentCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => Post_commentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Post_commentCreateWithoutPostInputSchema),z.lazy(() => Post_commentUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const Post_commentCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.Post_commentCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Post_commentCreateManyPostInputSchema),z.lazy(() => Post_commentCreateManyPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Post_categoryCreateWithoutPostsInputSchema: z.ZodType<Prisma.Post_categoryCreateWithoutPostsInput> = z.object({
  label: z.lazy(() => Post_category_labelSchema),
  parent: z.lazy(() => Post_categoryCreateNestedOneWithoutChildrenInputSchema).optional(),
  children: z.lazy(() => Post_categoryCreateNestedManyWithoutParentInputSchema).optional()
}).strict();

export const Post_categoryUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.Post_categoryUncheckedCreateWithoutPostsInput> = z.object({
  id: z.number().optional(),
  label: z.lazy(() => Post_category_labelSchema),
  parent_id: z.number().optional().nullable(),
  children: z.lazy(() => Post_categoryUncheckedCreateNestedManyWithoutParentInputSchema).optional()
}).strict();

export const Post_categoryCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.Post_categoryCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => Post_categoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutPostsInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const UserCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = z.object({
  name: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  comments: z.lazy(() => Post_commentCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.number().optional(),
  name: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  comments: z.lazy(() => Post_commentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const Post_asPersonEndorsementCreateWithoutPostInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementCreateWithoutPostInput> = z.object({
  postId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  skills: z.lazy(() => Post_asPersonEndorsement_skillCreateNestedManyWithoutAs_PersonEndorsementInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUncheckedCreateWithoutPostInput> = z.object({
  id: z.number().optional(),
  postId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  skills: z.lazy(() => Post_asPersonEndorsement_skillUncheckedCreateNestedManyWithoutAs_PersonEndorsementInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => Post_asPersonEndorsementWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Post_asPersonEndorsementCreateWithoutPostInputSchema),z.lazy(() => Post_asPersonEndorsementUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const LocationUpsertWithoutPostInputSchema: z.ZodType<Prisma.LocationUpsertWithoutPostInput> = z.object({
  update: z.union([ z.lazy(() => LocationUpdateWithoutPostInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => LocationCreateWithoutPostInputSchema),z.lazy(() => LocationUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const LocationUpdateWithoutPostInputSchema: z.ZodType<Prisma.LocationUpdateWithoutPostInput> = z.object({
  googleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  googleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.ImageUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImageUpdateWithoutPostInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => ImageCreateWithoutPostInputSchema),z.lazy(() => ImageUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const ImageUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.ImageUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateWithoutPostInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const ImageUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.ImageUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => ImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateManyMutationInputSchema),z.lazy(() => ImageUncheckedUpdateManyWithoutImagesInputSchema) ]),
}).strict();

export const ImageScalarWhereInputSchema: z.ZodType<Prisma.ImageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cloudinary_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const Post_commentUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.Post_commentUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => Post_commentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Post_commentUpdateWithoutPostInputSchema),z.lazy(() => Post_commentUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => Post_commentCreateWithoutPostInputSchema),z.lazy(() => Post_commentUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const Post_commentUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.Post_commentUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => Post_commentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Post_commentUpdateWithoutPostInputSchema),z.lazy(() => Post_commentUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const Post_commentUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.Post_commentUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => Post_commentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Post_commentUpdateManyMutationInputSchema),z.lazy(() => Post_commentUncheckedUpdateManyWithoutCommentsInputSchema) ]),
}).strict();

export const Post_commentScalarWhereInputSchema: z.ZodType<Prisma.Post_commentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Post_commentScalarWhereInputSchema),z.lazy(() => Post_commentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_commentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_commentScalarWhereInputSchema),z.lazy(() => Post_commentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  postId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const Post_categoryUpsertWithWhereUniqueWithoutPostsInputSchema: z.ZodType<Prisma.Post_categoryUpsertWithWhereUniqueWithoutPostsInput> = z.object({
  where: z.lazy(() => Post_categoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Post_categoryUpdateWithoutPostsInputSchema),z.lazy(() => Post_categoryUncheckedUpdateWithoutPostsInputSchema) ]),
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutPostsInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const Post_categoryUpdateWithWhereUniqueWithoutPostsInputSchema: z.ZodType<Prisma.Post_categoryUpdateWithWhereUniqueWithoutPostsInput> = z.object({
  where: z.lazy(() => Post_categoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Post_categoryUpdateWithoutPostsInputSchema),z.lazy(() => Post_categoryUncheckedUpdateWithoutPostsInputSchema) ]),
}).strict();

export const Post_categoryUpdateManyWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.Post_categoryUpdateManyWithWhereWithoutPostsInput> = z.object({
  where: z.lazy(() => Post_categoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Post_categoryUpdateManyMutationInputSchema),z.lazy(() => Post_categoryUncheckedUpdateManyWithoutCategoriesInputSchema) ]),
}).strict();

export const Post_categoryScalarWhereInputSchema: z.ZodType<Prisma.Post_categoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Post_categoryScalarWhereInputSchema),z.lazy(() => Post_categoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_categoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_categoryScalarWhereInputSchema),z.lazy(() => Post_categoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => EnumPost_category_labelFilterSchema),z.lazy(() => Post_category_labelSchema) ]).optional(),
  parent_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const UserUpsertWithoutPostsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPostsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPostsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  comments: z.lazy(() => Post_commentUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  comments: z.lazy(() => Post_commentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementUpsertWithoutPostInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUpsertWithoutPostInput> = z.object({
  update: z.union([ z.lazy(() => Post_asPersonEndorsementUpdateWithoutPostInputSchema),z.lazy(() => Post_asPersonEndorsementUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => Post_asPersonEndorsementCreateWithoutPostInputSchema),z.lazy(() => Post_asPersonEndorsementUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const Post_asPersonEndorsementUpdateWithoutPostInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUpdateWithoutPostInput> = z.object({
  postId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  skills: z.lazy(() => Post_asPersonEndorsement_skillUpdateManyWithoutAs_PersonEndorsementNestedInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  skills: z.lazy(() => Post_asPersonEndorsement_skillUncheckedUpdateManyWithoutAs_PersonEndorsementNestedInputSchema).optional()
}).strict();

export const PostCreateWithoutAsPersonEndorsementInputSchema: z.ZodType<Prisma.PostCreateWithoutAsPersonEndorsementInput> = z.object({
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location: z.lazy(() => LocationCreateNestedOneWithoutPostInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => Post_commentCreateNestedManyWithoutPostInputSchema).optional(),
  categories: z.lazy(() => Post_categoryCreateNestedManyWithoutPostsInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema)
}).strict();

export const PostUncheckedCreateWithoutAsPersonEndorsementInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutAsPersonEndorsementInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location_id: z.number().optional().nullable(),
  author_id: z.number(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => Post_commentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUncheckedCreateNestedManyWithoutPostsInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutAsPersonEndorsementInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutAsPersonEndorsementInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutAsPersonEndorsementInputSchema),z.lazy(() => PostUncheckedCreateWithoutAsPersonEndorsementInputSchema) ]),
}).strict();

export const Post_asPersonEndorsement_skillCreateWithoutAs_PersonEndorsementInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillCreateWithoutAs_PersonEndorsementInput> = z.object({
  label: z.string(),
  level: z.number()
}).strict();

export const Post_asPersonEndorsement_skillUncheckedCreateWithoutAs_PersonEndorsementInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUncheckedCreateWithoutAs_PersonEndorsementInput> = z.object({
  id: z.number().optional(),
  label: z.string(),
  level: z.number()
}).strict();

export const Post_asPersonEndorsement_skillCreateOrConnectWithoutAs_PersonEndorsementInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillCreateOrConnectWithoutAs_PersonEndorsementInput> = z.object({
  where: z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Post_asPersonEndorsement_skillCreateWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUncheckedCreateWithoutAs_PersonEndorsementInputSchema) ]),
}).strict();

export const Post_asPersonEndorsement_skillCreateManyAs_PersonEndorsementInputEnvelopeSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillCreateManyAs_PersonEndorsementInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Post_asPersonEndorsement_skillCreateManyAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillCreateManyAs_PersonEndorsementInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PostUpsertWithoutAsPersonEndorsementInputSchema: z.ZodType<Prisma.PostUpsertWithoutAsPersonEndorsementInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutAsPersonEndorsementInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAsPersonEndorsementInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutAsPersonEndorsementInputSchema),z.lazy(() => PostUncheckedCreateWithoutAsPersonEndorsementInputSchema) ]),
}).strict();

export const PostUpdateWithoutAsPersonEndorsementInputSchema: z.ZodType<Prisma.PostUpdateWithoutAsPersonEndorsementInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutPostNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => Post_commentUpdateManyWithoutPostNestedInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUpdateManyWithoutPostsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutAsPersonEndorsementInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutAsPersonEndorsementInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  author_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => Post_commentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUncheckedUpdateManyWithoutPostsNestedInputSchema).optional()
}).strict();

export const Post_asPersonEndorsement_skillUpsertWithWhereUniqueWithoutAs_PersonEndorsementInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUpsertWithWhereUniqueWithoutAs_PersonEndorsementInput> = z.object({
  where: z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Post_asPersonEndorsement_skillUpdateWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUncheckedUpdateWithoutAs_PersonEndorsementInputSchema) ]),
  create: z.union([ z.lazy(() => Post_asPersonEndorsement_skillCreateWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUncheckedCreateWithoutAs_PersonEndorsementInputSchema) ]),
}).strict();

export const Post_asPersonEndorsement_skillUpdateWithWhereUniqueWithoutAs_PersonEndorsementInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUpdateWithWhereUniqueWithoutAs_PersonEndorsementInput> = z.object({
  where: z.lazy(() => Post_asPersonEndorsement_skillWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Post_asPersonEndorsement_skillUpdateWithoutAs_PersonEndorsementInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUncheckedUpdateWithoutAs_PersonEndorsementInputSchema) ]),
}).strict();

export const Post_asPersonEndorsement_skillUpdateManyWithWhereWithoutAs_PersonEndorsementInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUpdateManyWithWhereWithoutAs_PersonEndorsementInput> = z.object({
  where: z.lazy(() => Post_asPersonEndorsement_skillScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Post_asPersonEndorsement_skillUpdateManyMutationInputSchema),z.lazy(() => Post_asPersonEndorsement_skillUncheckedUpdateManyWithoutSkillsInputSchema) ]),
}).strict();

export const Post_asPersonEndorsement_skillScalarWhereInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Post_asPersonEndorsement_skillScalarWhereInputSchema),z.lazy(() => Post_asPersonEndorsement_skillScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_asPersonEndorsement_skillScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_asPersonEndorsement_skillScalarWhereInputSchema),z.lazy(() => Post_asPersonEndorsement_skillScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  level: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  as_PersonEndorsement_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const Post_asPersonEndorsementCreateWithoutSkillsInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementCreateWithoutSkillsInput> = z.object({
  postId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  post: z.lazy(() => PostCreateNestedOneWithoutAsPersonEndorsementInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementUncheckedCreateWithoutSkillsInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUncheckedCreateWithoutSkillsInput> = z.object({
  id: z.number().optional(),
  postId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  post: z.lazy(() => PostUncheckedCreateNestedOneWithoutAsPersonEndorsementInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementCreateOrConnectWithoutSkillsInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementCreateOrConnectWithoutSkillsInput> = z.object({
  where: z.lazy(() => Post_asPersonEndorsementWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Post_asPersonEndorsementCreateWithoutSkillsInputSchema),z.lazy(() => Post_asPersonEndorsementUncheckedCreateWithoutSkillsInputSchema) ]),
}).strict();

export const Post_asPersonEndorsementUpsertWithoutSkillsInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUpsertWithoutSkillsInput> = z.object({
  update: z.union([ z.lazy(() => Post_asPersonEndorsementUpdateWithoutSkillsInputSchema),z.lazy(() => Post_asPersonEndorsementUncheckedUpdateWithoutSkillsInputSchema) ]),
  create: z.union([ z.lazy(() => Post_asPersonEndorsementCreateWithoutSkillsInputSchema),z.lazy(() => Post_asPersonEndorsementUncheckedCreateWithoutSkillsInputSchema) ]),
}).strict();

export const Post_asPersonEndorsementUpdateWithoutSkillsInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUpdateWithoutSkillsInput> = z.object({
  postId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  post: z.lazy(() => PostUpdateOneWithoutAsPersonEndorsementNestedInputSchema).optional()
}).strict();

export const Post_asPersonEndorsementUncheckedUpdateWithoutSkillsInputSchema: z.ZodType<Prisma.Post_asPersonEndorsementUncheckedUpdateWithoutSkillsInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  post: z.lazy(() => PostUncheckedUpdateOneWithoutAsPersonEndorsementNestedInputSchema).optional()
}).strict();

export const PostCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.PostCreateWithoutCategoriesInput> = z.object({
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location: z.lazy(() => LocationCreateNestedOneWithoutPostInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => Post_commentCreateNestedManyWithoutPostInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  asPersonEndorsement: z.lazy(() => Post_asPersonEndorsementCreateNestedOneWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutCategoriesInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location_id: z.number().optional().nullable(),
  author_id: z.number(),
  as_PersonEndorsement_id: z.number().optional().nullable(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => Post_commentUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutCategoriesInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutCategoriesInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutCategoriesInputSchema),z.lazy(() => PostUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict();

export const Post_categoryCreateWithoutChildrenInputSchema: z.ZodType<Prisma.Post_categoryCreateWithoutChildrenInput> = z.object({
  label: z.lazy(() => Post_category_labelSchema),
  posts: z.lazy(() => PostCreateNestedManyWithoutCategoriesInputSchema).optional(),
  parent: z.lazy(() => Post_categoryCreateNestedOneWithoutChildrenInputSchema).optional()
}).strict();

export const Post_categoryUncheckedCreateWithoutChildrenInputSchema: z.ZodType<Prisma.Post_categoryUncheckedCreateWithoutChildrenInput> = z.object({
  id: z.number().optional(),
  label: z.lazy(() => Post_category_labelSchema),
  parent_id: z.number().optional().nullable(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict();

export const Post_categoryCreateOrConnectWithoutChildrenInputSchema: z.ZodType<Prisma.Post_categoryCreateOrConnectWithoutChildrenInput> = z.object({
  where: z.lazy(() => Post_categoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutChildrenInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutChildrenInputSchema) ]),
}).strict();

export const Post_categoryCreateWithoutParentInputSchema: z.ZodType<Prisma.Post_categoryCreateWithoutParentInput> = z.object({
  label: z.lazy(() => Post_category_labelSchema),
  posts: z.lazy(() => PostCreateNestedManyWithoutCategoriesInputSchema).optional(),
  children: z.lazy(() => Post_categoryCreateNestedManyWithoutParentInputSchema).optional()
}).strict();

export const Post_categoryUncheckedCreateWithoutParentInputSchema: z.ZodType<Prisma.Post_categoryUncheckedCreateWithoutParentInput> = z.object({
  id: z.number().optional(),
  label: z.lazy(() => Post_category_labelSchema),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional(),
  children: z.lazy(() => Post_categoryUncheckedCreateNestedManyWithoutParentInputSchema).optional()
}).strict();

export const Post_categoryCreateOrConnectWithoutParentInputSchema: z.ZodType<Prisma.Post_categoryCreateOrConnectWithoutParentInput> = z.object({
  where: z.lazy(() => Post_categoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutParentInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutParentInputSchema) ]),
}).strict();

export const Post_categoryCreateManyParentInputEnvelopeSchema: z.ZodType<Prisma.Post_categoryCreateManyParentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Post_categoryCreateManyParentInputSchema),z.lazy(() => Post_categoryCreateManyParentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PostUpsertWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostUpdateWithoutCategoriesInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCategoriesInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutCategoriesInputSchema),z.lazy(() => PostUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutCategoriesInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCategoriesInputSchema) ]),
}).strict();

export const PostUpdateManyWithWhereWithoutCategoriesInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutCategoriesInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema),z.lazy(() => PostUncheckedUpdateManyWithoutPostsInputSchema) ]),
}).strict();

export const PostScalarWhereInputSchema: z.ZodType<Prisma.PostScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contact: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  author_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  as_PersonEndorsement_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const Post_categoryUpsertWithoutChildrenInputSchema: z.ZodType<Prisma.Post_categoryUpsertWithoutChildrenInput> = z.object({
  update: z.union([ z.lazy(() => Post_categoryUpdateWithoutChildrenInputSchema),z.lazy(() => Post_categoryUncheckedUpdateWithoutChildrenInputSchema) ]),
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutChildrenInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutChildrenInputSchema) ]),
}).strict();

export const Post_categoryUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.Post_categoryUpdateWithoutChildrenInput> = z.object({
  label: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => EnumPost_category_labelFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  parent: z.lazy(() => Post_categoryUpdateOneWithoutChildrenNestedInputSchema).optional()
}).strict();

export const Post_categoryUncheckedUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.Post_categoryUncheckedUpdateWithoutChildrenInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => EnumPost_category_labelFieldUpdateOperationsInputSchema) ]).optional(),
  parent_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict();

export const Post_categoryUpsertWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.Post_categoryUpsertWithWhereUniqueWithoutParentInput> = z.object({
  where: z.lazy(() => Post_categoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Post_categoryUpdateWithoutParentInputSchema),z.lazy(() => Post_categoryUncheckedUpdateWithoutParentInputSchema) ]),
  create: z.union([ z.lazy(() => Post_categoryCreateWithoutParentInputSchema),z.lazy(() => Post_categoryUncheckedCreateWithoutParentInputSchema) ]),
}).strict();

export const Post_categoryUpdateWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.Post_categoryUpdateWithWhereUniqueWithoutParentInput> = z.object({
  where: z.lazy(() => Post_categoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Post_categoryUpdateWithoutParentInputSchema),z.lazy(() => Post_categoryUncheckedUpdateWithoutParentInputSchema) ]),
}).strict();

export const Post_categoryUpdateManyWithWhereWithoutParentInputSchema: z.ZodType<Prisma.Post_categoryUpdateManyWithWhereWithoutParentInput> = z.object({
  where: z.lazy(() => Post_categoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Post_categoryUpdateManyMutationInputSchema),z.lazy(() => Post_categoryUncheckedUpdateManyWithoutChildrenInputSchema) ]),
}).strict();

export const PostCreateWithoutLocationInputSchema: z.ZodType<Prisma.PostCreateWithoutLocationInput> = z.object({
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  images: z.lazy(() => ImageCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => Post_commentCreateNestedManyWithoutPostInputSchema).optional(),
  categories: z.lazy(() => Post_categoryCreateNestedManyWithoutPostsInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  asPersonEndorsement: z.lazy(() => Post_asPersonEndorsementCreateNestedOneWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutLocationInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutLocationInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  author_id: z.number(),
  as_PersonEndorsement_id: z.number().optional().nullable(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => Post_commentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUncheckedCreateNestedManyWithoutPostsInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutLocationInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutLocationInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutLocationInputSchema),z.lazy(() => PostUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const PostCreateManyLocationInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyLocationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostCreateManyLocationInputSchema),z.lazy(() => PostCreateManyLocationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PostUpsertWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostUpdateWithoutLocationInputSchema),z.lazy(() => PostUncheckedUpdateWithoutLocationInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutLocationInputSchema),z.lazy(() => PostUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutLocationInputSchema),z.lazy(() => PostUncheckedUpdateWithoutLocationInputSchema) ]),
}).strict();

export const PostUpdateManyWithWhereWithoutLocationInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutLocationInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema),z.lazy(() => PostUncheckedUpdateManyWithoutPostInputSchema) ]),
}).strict();

export const PostCreateWithoutImagesInputSchema: z.ZodType<Prisma.PostCreateWithoutImagesInput> = z.object({
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location: z.lazy(() => LocationCreateNestedOneWithoutPostInputSchema).optional(),
  comments: z.lazy(() => Post_commentCreateNestedManyWithoutPostInputSchema).optional(),
  categories: z.lazy(() => Post_categoryCreateNestedManyWithoutPostsInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  asPersonEndorsement: z.lazy(() => Post_asPersonEndorsementCreateNestedOneWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutImagesInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutImagesInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location_id: z.number().optional().nullable(),
  author_id: z.number(),
  as_PersonEndorsement_id: z.number().optional().nullable(),
  comments: z.lazy(() => Post_commentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUncheckedCreateNestedManyWithoutPostsInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutImagesInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutImagesInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutImagesInputSchema),z.lazy(() => PostUncheckedCreateWithoutImagesInputSchema) ]),
}).strict();

export const PostUpsertWithoutImagesInputSchema: z.ZodType<Prisma.PostUpsertWithoutImagesInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutImagesInputSchema),z.lazy(() => PostUncheckedUpdateWithoutImagesInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutImagesInputSchema),z.lazy(() => PostUncheckedCreateWithoutImagesInputSchema) ]),
}).strict();

export const PostUpdateWithoutImagesInputSchema: z.ZodType<Prisma.PostUpdateWithoutImagesInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => Post_commentUpdateManyWithoutPostNestedInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUpdateManyWithoutPostsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  asPersonEndorsement: z.lazy(() => Post_asPersonEndorsementUpdateOneWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutImagesInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutImagesInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  author_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  as_PersonEndorsement_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  comments: z.lazy(() => Post_commentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUncheckedUpdateManyWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateWithoutCommentsInput> = z.object({
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location: z.lazy(() => LocationCreateNestedOneWithoutPostInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutPostInputSchema).optional(),
  categories: z.lazy(() => Post_categoryCreateNestedManyWithoutPostsInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  asPersonEndorsement: z.lazy(() => Post_asPersonEndorsementCreateNestedOneWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location_id: z.number().optional().nullable(),
  author_id: z.number(),
  as_PersonEndorsement_id: z.number().optional().nullable(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUncheckedCreateNestedManyWithoutPostsInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> = z.object({
  name: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.number().optional(),
  name: z.string(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const PostUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const PostUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateWithoutCommentsInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutPostNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutPostNestedInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUpdateManyWithoutPostsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  asPersonEndorsement: z.lazy(() => Post_asPersonEndorsementUpdateOneWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  author_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  as_PersonEndorsement_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUncheckedUpdateManyWithoutPostsNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarStyle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const Post_commentCreateWithoutAuthorInputSchema: z.ZodType<Prisma.Post_commentCreateWithoutAuthorInput> = z.object({
  content: z.string(),
  post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const Post_commentUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.Post_commentUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.number().optional(),
  content: z.string(),
  postId: z.number()
}).strict();

export const Post_commentCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.Post_commentCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => Post_commentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Post_commentCreateWithoutAuthorInputSchema),z.lazy(() => Post_commentUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const Post_commentCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.Post_commentCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Post_commentCreateManyAuthorInputSchema),z.lazy(() => Post_commentCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PostCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> = z.object({
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location: z.lazy(() => LocationCreateNestedOneWithoutPostInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => Post_commentCreateNestedManyWithoutPostInputSchema).optional(),
  categories: z.lazy(() => Post_categoryCreateNestedManyWithoutPostsInputSchema).optional(),
  asPersonEndorsement: z.lazy(() => Post_asPersonEndorsementCreateNestedOneWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location_id: z.number().optional().nullable(),
  as_PersonEndorsement_id: z.number().optional().nullable(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => Post_commentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUncheckedCreateNestedManyWithoutPostsInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const PostCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostCreateManyAuthorInputSchema),z.lazy(() => PostCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Post_commentUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.Post_commentUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => Post_commentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Post_commentUpdateWithoutAuthorInputSchema),z.lazy(() => Post_commentUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => Post_commentCreateWithoutAuthorInputSchema),z.lazy(() => Post_commentUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const Post_commentUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.Post_commentUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => Post_commentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Post_commentUpdateWithoutAuthorInputSchema),z.lazy(() => Post_commentUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const Post_commentUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.Post_commentUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => Post_commentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Post_commentUpdateManyMutationInputSchema),z.lazy(() => Post_commentUncheckedUpdateManyWithoutCommentsInputSchema) ]),
}).strict();

export const PostUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostUpdateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const PostUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema),z.lazy(() => PostUncheckedUpdateManyWithoutPostsInputSchema) ]),
}).strict();

export const ImageCreateManyPostInputSchema: z.ZodType<Prisma.ImageCreateManyPostInput> = z.object({
  id: z.number().int().optional(),
  cloudinary_id: z.string()
}).strict();

export const Post_commentCreateManyPostInputSchema: z.ZodType<Prisma.Post_commentCreateManyPostInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  authorId: z.number().int()
}).strict();

export const ImageUpdateWithoutPostInputSchema: z.ZodType<Prisma.ImageUpdateWithoutPostInput> = z.object({
  cloudinary_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cloudinary_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutImagesInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutImagesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cloudinary_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_commentUpdateWithoutPostInputSchema: z.ZodType<Prisma.Post_commentUpdateWithoutPostInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const Post_commentUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.Post_commentUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_commentUncheckedUpdateManyWithoutCommentsInputSchema: z.ZodType<Prisma.Post_commentUncheckedUpdateManyWithoutCommentsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_categoryUpdateWithoutPostsInputSchema: z.ZodType<Prisma.Post_categoryUpdateWithoutPostsInput> = z.object({
  label: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => EnumPost_category_labelFieldUpdateOperationsInputSchema) ]).optional(),
  parent: z.lazy(() => Post_categoryUpdateOneWithoutChildrenNestedInputSchema).optional(),
  children: z.lazy(() => Post_categoryUpdateManyWithoutParentNestedInputSchema).optional()
}).strict();

export const Post_categoryUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.Post_categoryUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => EnumPost_category_labelFieldUpdateOperationsInputSchema) ]).optional(),
  parent_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  children: z.lazy(() => Post_categoryUncheckedUpdateManyWithoutParentNestedInputSchema).optional()
}).strict();

export const Post_categoryUncheckedUpdateManyWithoutCategoriesInputSchema: z.ZodType<Prisma.Post_categoryUncheckedUpdateManyWithoutCategoriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => EnumPost_category_labelFieldUpdateOperationsInputSchema) ]).optional(),
  parent_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Post_asPersonEndorsement_skillCreateManyAs_PersonEndorsementInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillCreateManyAs_PersonEndorsementInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  level: z.number().int()
}).strict();

export const Post_asPersonEndorsement_skillUpdateWithoutAs_PersonEndorsementInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUpdateWithoutAs_PersonEndorsementInput> = z.object({
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_asPersonEndorsement_skillUncheckedUpdateWithoutAs_PersonEndorsementInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUncheckedUpdateWithoutAs_PersonEndorsementInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_asPersonEndorsement_skillUncheckedUpdateManyWithoutSkillsInputSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUncheckedUpdateManyWithoutSkillsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_categoryCreateManyParentInputSchema: z.ZodType<Prisma.Post_categoryCreateManyParentInput> = z.object({
  id: z.number().int().optional(),
  label: z.lazy(() => Post_category_labelSchema)
}).strict();

export const PostUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.PostUpdateWithoutCategoriesInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutPostNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => Post_commentUpdateManyWithoutPostNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  asPersonEndorsement: z.lazy(() => Post_asPersonEndorsementUpdateOneWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutCategoriesInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  author_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  as_PersonEndorsement_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => Post_commentUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateManyWithoutPostsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutPostsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  author_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  as_PersonEndorsement_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Post_categoryUpdateWithoutParentInputSchema: z.ZodType<Prisma.Post_categoryUpdateWithoutParentInput> = z.object({
  label: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => EnumPost_category_labelFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  children: z.lazy(() => Post_categoryUpdateManyWithoutParentNestedInputSchema).optional()
}).strict();

export const Post_categoryUncheckedUpdateWithoutParentInputSchema: z.ZodType<Prisma.Post_categoryUncheckedUpdateWithoutParentInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => EnumPost_category_labelFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional(),
  children: z.lazy(() => Post_categoryUncheckedUpdateManyWithoutParentNestedInputSchema).optional()
}).strict();

export const Post_categoryUncheckedUpdateManyWithoutChildrenInputSchema: z.ZodType<Prisma.Post_categoryUncheckedUpdateManyWithoutChildrenInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.lazy(() => Post_category_labelSchema),z.lazy(() => EnumPost_category_labelFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateManyLocationInputSchema: z.ZodType<Prisma.PostCreateManyLocationInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  author_id: z.number().int(),
  as_PersonEndorsement_id: z.number().int().optional().nullable()
}).strict();

export const PostUpdateWithoutLocationInputSchema: z.ZodType<Prisma.PostUpdateWithoutLocationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => Post_commentUpdateManyWithoutPostNestedInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUpdateManyWithoutPostsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional(),
  asPersonEndorsement: z.lazy(() => Post_asPersonEndorsementUpdateOneWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutLocationInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutLocationInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  as_PersonEndorsement_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => Post_commentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUncheckedUpdateManyWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutPostInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  as_PersonEndorsement_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Post_commentCreateManyAuthorInputSchema: z.ZodType<Prisma.Post_commentCreateManyAuthorInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  postId: z.number().int()
}).strict();

export const PostCreateManyAuthorInputSchema: z.ZodType<Prisma.PostCreateManyAuthorInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  location_id: z.number().int().optional().nullable(),
  as_PersonEndorsement_id: z.number().int().optional().nullable()
}).strict();

export const Post_commentUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.Post_commentUpdateWithoutAuthorInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const Post_commentUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.Post_commentUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithoutAuthorInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.lazy(() => LocationUpdateOneWithoutPostNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => Post_commentUpdateManyWithoutPostNestedInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUpdateManyWithoutPostsNestedInputSchema).optional(),
  asPersonEndorsement: z.lazy(() => Post_asPersonEndorsementUpdateOneWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  location_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  as_PersonEndorsement_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => Post_commentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  categories: z.lazy(() => Post_categoryUncheckedUpdateManyWithoutPostsNestedInputSchema).optional()
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PostScalarFieldEnumSchema.array().optional(),
}).strict()

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PostScalarFieldEnumSchema.array().optional(),
}).strict()

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PostScalarFieldEnumSchema.array().optional(),
}).strict()

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithAggregationInputSchema.array(),PostOrderByWithAggregationInputSchema ]).optional(),
  by: PostScalarFieldEnumSchema.array(),
  having: PostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict()

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict()

export const Post_asPersonEndorsementFindFirstArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementFindFirstArgs> = z.object({
  select: Post_asPersonEndorsementSelectSchema.optional(),
  include: Post_asPersonEndorsementIncludeSchema.optional(),
  where: Post_asPersonEndorsementWhereInputSchema.optional(),
  orderBy: z.union([ Post_asPersonEndorsementOrderByWithRelationInputSchema.array(),Post_asPersonEndorsementOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_asPersonEndorsementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Post_asPersonEndorsementScalarFieldEnumSchema.array().optional(),
}).strict()

export const Post_asPersonEndorsementFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementFindFirstOrThrowArgs> = z.object({
  select: Post_asPersonEndorsementSelectSchema.optional(),
  include: Post_asPersonEndorsementIncludeSchema.optional(),
  where: Post_asPersonEndorsementWhereInputSchema.optional(),
  orderBy: z.union([ Post_asPersonEndorsementOrderByWithRelationInputSchema.array(),Post_asPersonEndorsementOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_asPersonEndorsementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Post_asPersonEndorsementScalarFieldEnumSchema.array().optional(),
}).strict()

export const Post_asPersonEndorsementFindManyArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementFindManyArgs> = z.object({
  select: Post_asPersonEndorsementSelectSchema.optional(),
  include: Post_asPersonEndorsementIncludeSchema.optional(),
  where: Post_asPersonEndorsementWhereInputSchema.optional(),
  orderBy: z.union([ Post_asPersonEndorsementOrderByWithRelationInputSchema.array(),Post_asPersonEndorsementOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_asPersonEndorsementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Post_asPersonEndorsementScalarFieldEnumSchema.array().optional(),
}).strict()

export const Post_asPersonEndorsementAggregateArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementAggregateArgs> = z.object({
  where: Post_asPersonEndorsementWhereInputSchema.optional(),
  orderBy: z.union([ Post_asPersonEndorsementOrderByWithRelationInputSchema.array(),Post_asPersonEndorsementOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_asPersonEndorsementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Post_asPersonEndorsementGroupByArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementGroupByArgs> = z.object({
  where: Post_asPersonEndorsementWhereInputSchema.optional(),
  orderBy: z.union([ Post_asPersonEndorsementOrderByWithAggregationInputSchema.array(),Post_asPersonEndorsementOrderByWithAggregationInputSchema ]).optional(),
  by: Post_asPersonEndorsementScalarFieldEnumSchema.array(),
  having: Post_asPersonEndorsementScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Post_asPersonEndorsementFindUniqueArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementFindUniqueArgs> = z.object({
  select: Post_asPersonEndorsementSelectSchema.optional(),
  include: Post_asPersonEndorsementIncludeSchema.optional(),
  where: Post_asPersonEndorsementWhereUniqueInputSchema,
}).strict()

export const Post_asPersonEndorsementFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementFindUniqueOrThrowArgs> = z.object({
  select: Post_asPersonEndorsementSelectSchema.optional(),
  include: Post_asPersonEndorsementIncludeSchema.optional(),
  where: Post_asPersonEndorsementWhereUniqueInputSchema,
}).strict()

export const Post_asPersonEndorsement_skillFindFirstArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillFindFirstArgs> = z.object({
  select: Post_asPersonEndorsement_skillSelectSchema.optional(),
  include: Post_asPersonEndorsement_skillIncludeSchema.optional(),
  where: Post_asPersonEndorsement_skillWhereInputSchema.optional(),
  orderBy: z.union([ Post_asPersonEndorsement_skillOrderByWithRelationInputSchema.array(),Post_asPersonEndorsement_skillOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_asPersonEndorsement_skillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Post_asPersonEndorsement_skillScalarFieldEnumSchema.array().optional(),
}).strict()

export const Post_asPersonEndorsement_skillFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillFindFirstOrThrowArgs> = z.object({
  select: Post_asPersonEndorsement_skillSelectSchema.optional(),
  include: Post_asPersonEndorsement_skillIncludeSchema.optional(),
  where: Post_asPersonEndorsement_skillWhereInputSchema.optional(),
  orderBy: z.union([ Post_asPersonEndorsement_skillOrderByWithRelationInputSchema.array(),Post_asPersonEndorsement_skillOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_asPersonEndorsement_skillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Post_asPersonEndorsement_skillScalarFieldEnumSchema.array().optional(),
}).strict()

export const Post_asPersonEndorsement_skillFindManyArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillFindManyArgs> = z.object({
  select: Post_asPersonEndorsement_skillSelectSchema.optional(),
  include: Post_asPersonEndorsement_skillIncludeSchema.optional(),
  where: Post_asPersonEndorsement_skillWhereInputSchema.optional(),
  orderBy: z.union([ Post_asPersonEndorsement_skillOrderByWithRelationInputSchema.array(),Post_asPersonEndorsement_skillOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_asPersonEndorsement_skillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Post_asPersonEndorsement_skillScalarFieldEnumSchema.array().optional(),
}).strict()

export const Post_asPersonEndorsement_skillAggregateArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillAggregateArgs> = z.object({
  where: Post_asPersonEndorsement_skillWhereInputSchema.optional(),
  orderBy: z.union([ Post_asPersonEndorsement_skillOrderByWithRelationInputSchema.array(),Post_asPersonEndorsement_skillOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_asPersonEndorsement_skillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Post_asPersonEndorsement_skillGroupByArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillGroupByArgs> = z.object({
  where: Post_asPersonEndorsement_skillWhereInputSchema.optional(),
  orderBy: z.union([ Post_asPersonEndorsement_skillOrderByWithAggregationInputSchema.array(),Post_asPersonEndorsement_skillOrderByWithAggregationInputSchema ]).optional(),
  by: Post_asPersonEndorsement_skillScalarFieldEnumSchema.array(),
  having: Post_asPersonEndorsement_skillScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Post_asPersonEndorsement_skillFindUniqueArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillFindUniqueArgs> = z.object({
  select: Post_asPersonEndorsement_skillSelectSchema.optional(),
  include: Post_asPersonEndorsement_skillIncludeSchema.optional(),
  where: Post_asPersonEndorsement_skillWhereUniqueInputSchema,
}).strict()

export const Post_asPersonEndorsement_skillFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillFindUniqueOrThrowArgs> = z.object({
  select: Post_asPersonEndorsement_skillSelectSchema.optional(),
  include: Post_asPersonEndorsement_skillIncludeSchema.optional(),
  where: Post_asPersonEndorsement_skillWhereUniqueInputSchema,
}).strict()

export const Post_categoryFindFirstArgsSchema: z.ZodType<Prisma.Post_categoryFindFirstArgs> = z.object({
  select: Post_categorySelectSchema.optional(),
  include: Post_categoryIncludeSchema.optional(),
  where: Post_categoryWhereInputSchema.optional(),
  orderBy: z.union([ Post_categoryOrderByWithRelationInputSchema.array(),Post_categoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_categoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Post_categoryScalarFieldEnumSchema.array().optional(),
}).strict()

export const Post_categoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Post_categoryFindFirstOrThrowArgs> = z.object({
  select: Post_categorySelectSchema.optional(),
  include: Post_categoryIncludeSchema.optional(),
  where: Post_categoryWhereInputSchema.optional(),
  orderBy: z.union([ Post_categoryOrderByWithRelationInputSchema.array(),Post_categoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_categoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Post_categoryScalarFieldEnumSchema.array().optional(),
}).strict()

export const Post_categoryFindManyArgsSchema: z.ZodType<Prisma.Post_categoryFindManyArgs> = z.object({
  select: Post_categorySelectSchema.optional(),
  include: Post_categoryIncludeSchema.optional(),
  where: Post_categoryWhereInputSchema.optional(),
  orderBy: z.union([ Post_categoryOrderByWithRelationInputSchema.array(),Post_categoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_categoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Post_categoryScalarFieldEnumSchema.array().optional(),
}).strict()

export const Post_categoryAggregateArgsSchema: z.ZodType<Prisma.Post_categoryAggregateArgs> = z.object({
  where: Post_categoryWhereInputSchema.optional(),
  orderBy: z.union([ Post_categoryOrderByWithRelationInputSchema.array(),Post_categoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_categoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Post_categoryGroupByArgsSchema: z.ZodType<Prisma.Post_categoryGroupByArgs> = z.object({
  where: Post_categoryWhereInputSchema.optional(),
  orderBy: z.union([ Post_categoryOrderByWithAggregationInputSchema.array(),Post_categoryOrderByWithAggregationInputSchema ]).optional(),
  by: Post_categoryScalarFieldEnumSchema.array(),
  having: Post_categoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Post_categoryFindUniqueArgsSchema: z.ZodType<Prisma.Post_categoryFindUniqueArgs> = z.object({
  select: Post_categorySelectSchema.optional(),
  include: Post_categoryIncludeSchema.optional(),
  where: Post_categoryWhereUniqueInputSchema,
}).strict()

export const Post_categoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Post_categoryFindUniqueOrThrowArgs> = z.object({
  select: Post_categorySelectSchema.optional(),
  include: Post_categoryIncludeSchema.optional(),
  where: Post_categoryWhereUniqueInputSchema,
}).strict()

export const LocationFindFirstArgsSchema: z.ZodType<Prisma.LocationFindFirstArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LocationScalarFieldEnumSchema.array().optional(),
}).strict()

export const LocationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LocationFindFirstOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LocationScalarFieldEnumSchema.array().optional(),
}).strict()

export const LocationFindManyArgsSchema: z.ZodType<Prisma.LocationFindManyArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LocationScalarFieldEnumSchema.array().optional(),
}).strict()

export const LocationAggregateArgsSchema: z.ZodType<Prisma.LocationAggregateArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LocationGroupByArgsSchema: z.ZodType<Prisma.LocationGroupByArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithAggregationInputSchema.array(),LocationOrderByWithAggregationInputSchema ]).optional(),
  by: LocationScalarFieldEnumSchema.array(),
  having: LocationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LocationFindUniqueArgsSchema: z.ZodType<Prisma.LocationFindUniqueArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict()

export const LocationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LocationFindUniqueOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict()

export const ImageFindFirstArgsSchema: z.ZodType<Prisma.ImageFindFirstArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithRelationInputSchema.array(),ImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ImageScalarFieldEnumSchema.array().optional(),
}).strict()

export const ImageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ImageFindFirstOrThrowArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithRelationInputSchema.array(),ImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ImageScalarFieldEnumSchema.array().optional(),
}).strict()

export const ImageFindManyArgsSchema: z.ZodType<Prisma.ImageFindManyArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithRelationInputSchema.array(),ImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ImageScalarFieldEnumSchema.array().optional(),
}).strict()

export const ImageAggregateArgsSchema: z.ZodType<Prisma.ImageAggregateArgs> = z.object({
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithRelationInputSchema.array(),ImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ImageGroupByArgsSchema: z.ZodType<Prisma.ImageGroupByArgs> = z.object({
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithAggregationInputSchema.array(),ImageOrderByWithAggregationInputSchema ]).optional(),
  by: ImageScalarFieldEnumSchema.array(),
  having: ImageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ImageFindUniqueArgsSchema: z.ZodType<Prisma.ImageFindUniqueArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereUniqueInputSchema,
}).strict()

export const ImageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ImageFindUniqueOrThrowArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereUniqueInputSchema,
}).strict()

export const Post_commentFindFirstArgsSchema: z.ZodType<Prisma.Post_commentFindFirstArgs> = z.object({
  select: Post_commentSelectSchema.optional(),
  include: Post_commentIncludeSchema.optional(),
  where: Post_commentWhereInputSchema.optional(),
  orderBy: z.union([ Post_commentOrderByWithRelationInputSchema.array(),Post_commentOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_commentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Post_commentScalarFieldEnumSchema.array().optional(),
}).strict()

export const Post_commentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Post_commentFindFirstOrThrowArgs> = z.object({
  select: Post_commentSelectSchema.optional(),
  include: Post_commentIncludeSchema.optional(),
  where: Post_commentWhereInputSchema.optional(),
  orderBy: z.union([ Post_commentOrderByWithRelationInputSchema.array(),Post_commentOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_commentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Post_commentScalarFieldEnumSchema.array().optional(),
}).strict()

export const Post_commentFindManyArgsSchema: z.ZodType<Prisma.Post_commentFindManyArgs> = z.object({
  select: Post_commentSelectSchema.optional(),
  include: Post_commentIncludeSchema.optional(),
  where: Post_commentWhereInputSchema.optional(),
  orderBy: z.union([ Post_commentOrderByWithRelationInputSchema.array(),Post_commentOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_commentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Post_commentScalarFieldEnumSchema.array().optional(),
}).strict()

export const Post_commentAggregateArgsSchema: z.ZodType<Prisma.Post_commentAggregateArgs> = z.object({
  where: Post_commentWhereInputSchema.optional(),
  orderBy: z.union([ Post_commentOrderByWithRelationInputSchema.array(),Post_commentOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_commentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Post_commentGroupByArgsSchema: z.ZodType<Prisma.Post_commentGroupByArgs> = z.object({
  where: Post_commentWhereInputSchema.optional(),
  orderBy: z.union([ Post_commentOrderByWithAggregationInputSchema.array(),Post_commentOrderByWithAggregationInputSchema ]).optional(),
  by: Post_commentScalarFieldEnumSchema.array(),
  having: Post_commentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Post_commentFindUniqueArgsSchema: z.ZodType<Prisma.Post_commentFindUniqueArgs> = z.object({
  select: Post_commentSelectSchema.optional(),
  include: Post_commentIncludeSchema.optional(),
  where: Post_commentWhereUniqueInputSchema,
}).strict()

export const Post_commentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Post_commentFindUniqueOrThrowArgs> = z.object({
  select: Post_commentSelectSchema.optional(),
  include: Post_commentIncludeSchema.optional(),
  where: Post_commentWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
}).strict()

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
  create: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
  update: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
}).strict()

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict()

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
  where: PostWhereUniqueInputSchema,
}).strict()

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema,PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(),
}).strict()

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z.object({
  where: PostWhereInputSchema.optional(),
}).strict()

export const Post_asPersonEndorsementCreateArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementCreateArgs> = z.object({
  select: Post_asPersonEndorsementSelectSchema.optional(),
  include: Post_asPersonEndorsementIncludeSchema.optional(),
  data: z.union([ Post_asPersonEndorsementCreateInputSchema,Post_asPersonEndorsementUncheckedCreateInputSchema ]),
}).strict()

export const Post_asPersonEndorsementUpsertArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementUpsertArgs> = z.object({
  select: Post_asPersonEndorsementSelectSchema.optional(),
  include: Post_asPersonEndorsementIncludeSchema.optional(),
  where: Post_asPersonEndorsementWhereUniqueInputSchema,
  create: z.union([ Post_asPersonEndorsementCreateInputSchema,Post_asPersonEndorsementUncheckedCreateInputSchema ]),
  update: z.union([ Post_asPersonEndorsementUpdateInputSchema,Post_asPersonEndorsementUncheckedUpdateInputSchema ]),
}).strict()

export const Post_asPersonEndorsementCreateManyArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementCreateManyArgs> = z.object({
  data: z.union([ Post_asPersonEndorsementCreateManyInputSchema,Post_asPersonEndorsementCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Post_asPersonEndorsementDeleteArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementDeleteArgs> = z.object({
  select: Post_asPersonEndorsementSelectSchema.optional(),
  include: Post_asPersonEndorsementIncludeSchema.optional(),
  where: Post_asPersonEndorsementWhereUniqueInputSchema,
}).strict()

export const Post_asPersonEndorsementUpdateArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementUpdateArgs> = z.object({
  select: Post_asPersonEndorsementSelectSchema.optional(),
  include: Post_asPersonEndorsementIncludeSchema.optional(),
  data: z.union([ Post_asPersonEndorsementUpdateInputSchema,Post_asPersonEndorsementUncheckedUpdateInputSchema ]),
  where: Post_asPersonEndorsementWhereUniqueInputSchema,
}).strict()

export const Post_asPersonEndorsementUpdateManyArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementUpdateManyArgs> = z.object({
  data: z.union([ Post_asPersonEndorsementUpdateManyMutationInputSchema,Post_asPersonEndorsementUncheckedUpdateManyInputSchema ]),
  where: Post_asPersonEndorsementWhereInputSchema.optional(),
}).strict()

export const Post_asPersonEndorsementDeleteManyArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsementDeleteManyArgs> = z.object({
  where: Post_asPersonEndorsementWhereInputSchema.optional(),
}).strict()

export const Post_asPersonEndorsement_skillCreateArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillCreateArgs> = z.object({
  select: Post_asPersonEndorsement_skillSelectSchema.optional(),
  include: Post_asPersonEndorsement_skillIncludeSchema.optional(),
  data: z.union([ Post_asPersonEndorsement_skillCreateInputSchema,Post_asPersonEndorsement_skillUncheckedCreateInputSchema ]),
}).strict()

export const Post_asPersonEndorsement_skillUpsertArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUpsertArgs> = z.object({
  select: Post_asPersonEndorsement_skillSelectSchema.optional(),
  include: Post_asPersonEndorsement_skillIncludeSchema.optional(),
  where: Post_asPersonEndorsement_skillWhereUniqueInputSchema,
  create: z.union([ Post_asPersonEndorsement_skillCreateInputSchema,Post_asPersonEndorsement_skillUncheckedCreateInputSchema ]),
  update: z.union([ Post_asPersonEndorsement_skillUpdateInputSchema,Post_asPersonEndorsement_skillUncheckedUpdateInputSchema ]),
}).strict()

export const Post_asPersonEndorsement_skillCreateManyArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillCreateManyArgs> = z.object({
  data: z.union([ Post_asPersonEndorsement_skillCreateManyInputSchema,Post_asPersonEndorsement_skillCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Post_asPersonEndorsement_skillDeleteArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillDeleteArgs> = z.object({
  select: Post_asPersonEndorsement_skillSelectSchema.optional(),
  include: Post_asPersonEndorsement_skillIncludeSchema.optional(),
  where: Post_asPersonEndorsement_skillWhereUniqueInputSchema,
}).strict()

export const Post_asPersonEndorsement_skillUpdateArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUpdateArgs> = z.object({
  select: Post_asPersonEndorsement_skillSelectSchema.optional(),
  include: Post_asPersonEndorsement_skillIncludeSchema.optional(),
  data: z.union([ Post_asPersonEndorsement_skillUpdateInputSchema,Post_asPersonEndorsement_skillUncheckedUpdateInputSchema ]),
  where: Post_asPersonEndorsement_skillWhereUniqueInputSchema,
}).strict()

export const Post_asPersonEndorsement_skillUpdateManyArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillUpdateManyArgs> = z.object({
  data: z.union([ Post_asPersonEndorsement_skillUpdateManyMutationInputSchema,Post_asPersonEndorsement_skillUncheckedUpdateManyInputSchema ]),
  where: Post_asPersonEndorsement_skillWhereInputSchema.optional(),
}).strict()

export const Post_asPersonEndorsement_skillDeleteManyArgsSchema: z.ZodType<Prisma.Post_asPersonEndorsement_skillDeleteManyArgs> = z.object({
  where: Post_asPersonEndorsement_skillWhereInputSchema.optional(),
}).strict()

export const Post_categoryCreateArgsSchema: z.ZodType<Prisma.Post_categoryCreateArgs> = z.object({
  select: Post_categorySelectSchema.optional(),
  include: Post_categoryIncludeSchema.optional(),
  data: z.union([ Post_categoryCreateInputSchema,Post_categoryUncheckedCreateInputSchema ]),
}).strict()

export const Post_categoryUpsertArgsSchema: z.ZodType<Prisma.Post_categoryUpsertArgs> = z.object({
  select: Post_categorySelectSchema.optional(),
  include: Post_categoryIncludeSchema.optional(),
  where: Post_categoryWhereUniqueInputSchema,
  create: z.union([ Post_categoryCreateInputSchema,Post_categoryUncheckedCreateInputSchema ]),
  update: z.union([ Post_categoryUpdateInputSchema,Post_categoryUncheckedUpdateInputSchema ]),
}).strict()

export const Post_categoryCreateManyArgsSchema: z.ZodType<Prisma.Post_categoryCreateManyArgs> = z.object({
  data: z.union([ Post_categoryCreateManyInputSchema,Post_categoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Post_categoryDeleteArgsSchema: z.ZodType<Prisma.Post_categoryDeleteArgs> = z.object({
  select: Post_categorySelectSchema.optional(),
  include: Post_categoryIncludeSchema.optional(),
  where: Post_categoryWhereUniqueInputSchema,
}).strict()

export const Post_categoryUpdateArgsSchema: z.ZodType<Prisma.Post_categoryUpdateArgs> = z.object({
  select: Post_categorySelectSchema.optional(),
  include: Post_categoryIncludeSchema.optional(),
  data: z.union([ Post_categoryUpdateInputSchema,Post_categoryUncheckedUpdateInputSchema ]),
  where: Post_categoryWhereUniqueInputSchema,
}).strict()

export const Post_categoryUpdateManyArgsSchema: z.ZodType<Prisma.Post_categoryUpdateManyArgs> = z.object({
  data: z.union([ Post_categoryUpdateManyMutationInputSchema,Post_categoryUncheckedUpdateManyInputSchema ]),
  where: Post_categoryWhereInputSchema.optional(),
}).strict()

export const Post_categoryDeleteManyArgsSchema: z.ZodType<Prisma.Post_categoryDeleteManyArgs> = z.object({
  where: Post_categoryWhereInputSchema.optional(),
}).strict()

export const LocationCreateArgsSchema: z.ZodType<Prisma.LocationCreateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
}).strict()

export const LocationUpsertArgsSchema: z.ZodType<Prisma.LocationUpsertArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
  create: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
  update: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
}).strict()

export const LocationCreateManyArgsSchema: z.ZodType<Prisma.LocationCreateManyArgs> = z.object({
  data: z.union([ LocationCreateManyInputSchema,LocationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const LocationDeleteArgsSchema: z.ZodType<Prisma.LocationDeleteArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict()

export const LocationUpdateArgsSchema: z.ZodType<Prisma.LocationUpdateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
  where: LocationWhereUniqueInputSchema,
}).strict()

export const LocationUpdateManyArgsSchema: z.ZodType<Prisma.LocationUpdateManyArgs> = z.object({
  data: z.union([ LocationUpdateManyMutationInputSchema,LocationUncheckedUpdateManyInputSchema ]),
  where: LocationWhereInputSchema.optional(),
}).strict()

export const LocationDeleteManyArgsSchema: z.ZodType<Prisma.LocationDeleteManyArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
}).strict()

export const ImageCreateArgsSchema: z.ZodType<Prisma.ImageCreateArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  data: z.union([ ImageCreateInputSchema,ImageUncheckedCreateInputSchema ]),
}).strict()

export const ImageUpsertArgsSchema: z.ZodType<Prisma.ImageUpsertArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereUniqueInputSchema,
  create: z.union([ ImageCreateInputSchema,ImageUncheckedCreateInputSchema ]),
  update: z.union([ ImageUpdateInputSchema,ImageUncheckedUpdateInputSchema ]),
}).strict()

export const ImageCreateManyArgsSchema: z.ZodType<Prisma.ImageCreateManyArgs> = z.object({
  data: z.union([ ImageCreateManyInputSchema,ImageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ImageDeleteArgsSchema: z.ZodType<Prisma.ImageDeleteArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereUniqueInputSchema,
}).strict()

export const ImageUpdateArgsSchema: z.ZodType<Prisma.ImageUpdateArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  data: z.union([ ImageUpdateInputSchema,ImageUncheckedUpdateInputSchema ]),
  where: ImageWhereUniqueInputSchema,
}).strict()

export const ImageUpdateManyArgsSchema: z.ZodType<Prisma.ImageUpdateManyArgs> = z.object({
  data: z.union([ ImageUpdateManyMutationInputSchema,ImageUncheckedUpdateManyInputSchema ]),
  where: ImageWhereInputSchema.optional(),
}).strict()

export const ImageDeleteManyArgsSchema: z.ZodType<Prisma.ImageDeleteManyArgs> = z.object({
  where: ImageWhereInputSchema.optional(),
}).strict()

export const Post_commentCreateArgsSchema: z.ZodType<Prisma.Post_commentCreateArgs> = z.object({
  select: Post_commentSelectSchema.optional(),
  include: Post_commentIncludeSchema.optional(),
  data: z.union([ Post_commentCreateInputSchema,Post_commentUncheckedCreateInputSchema ]),
}).strict()

export const Post_commentUpsertArgsSchema: z.ZodType<Prisma.Post_commentUpsertArgs> = z.object({
  select: Post_commentSelectSchema.optional(),
  include: Post_commentIncludeSchema.optional(),
  where: Post_commentWhereUniqueInputSchema,
  create: z.union([ Post_commentCreateInputSchema,Post_commentUncheckedCreateInputSchema ]),
  update: z.union([ Post_commentUpdateInputSchema,Post_commentUncheckedUpdateInputSchema ]),
}).strict()

export const Post_commentCreateManyArgsSchema: z.ZodType<Prisma.Post_commentCreateManyArgs> = z.object({
  data: z.union([ Post_commentCreateManyInputSchema,Post_commentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Post_commentDeleteArgsSchema: z.ZodType<Prisma.Post_commentDeleteArgs> = z.object({
  select: Post_commentSelectSchema.optional(),
  include: Post_commentIncludeSchema.optional(),
  where: Post_commentWhereUniqueInputSchema,
}).strict()

export const Post_commentUpdateArgsSchema: z.ZodType<Prisma.Post_commentUpdateArgs> = z.object({
  select: Post_commentSelectSchema.optional(),
  include: Post_commentIncludeSchema.optional(),
  data: z.union([ Post_commentUpdateInputSchema,Post_commentUncheckedUpdateInputSchema ]),
  where: Post_commentWhereUniqueInputSchema,
}).strict()

export const Post_commentUpdateManyArgsSchema: z.ZodType<Prisma.Post_commentUpdateManyArgs> = z.object({
  data: z.union([ Post_commentUpdateManyMutationInputSchema,Post_commentUncheckedUpdateManyInputSchema ]),
  where: Post_commentWhereInputSchema.optional(),
}).strict()

export const Post_commentDeleteManyArgsSchema: z.ZodType<Prisma.Post_commentDeleteManyArgs> = z.object({
  where: Post_commentWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()