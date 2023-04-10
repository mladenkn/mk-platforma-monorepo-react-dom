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

export const LocationScalarFieldEnumSchema = z.enum(['id','google_id','latitude','longitude','name']);

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
  location_id: z.number().int().nullish(),
  author_id: z.number().int(),
  as_PersonEndorsement_id: z.number().int().nullish(),
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
  as_PersonEndorsement_id: z.number().int().nullish(),
})

export type Post_asPersonEndorsement_skill = z.infer<typeof Post_asPersonEndorsement_skillSchema>

/////////////////////////////////////////
// POST CATEGORY SCHEMA
/////////////////////////////////////////

export const Post_categorySchema = z.object({
  label: Post_category_labelSchema,
  id: z.number().int(),
  parent_id: z.number().int().nullish(),
})

export type Post_category = z.infer<typeof Post_categorySchema>

/////////////////////////////////////////
// LOCATION SCHEMA
/////////////////////////////////////////

export const LocationSchema = z.object({
  id: z.number().int(),
  google_id: z.string(),
  latitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: "Field 'latitude' must be a Decimal. Location: ['Models', 'Location']",  }),
  longitude: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: "Field 'longitude' must be a Decimal. Location: ['Models', 'Location']",  }),
  name: z.string(),
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
