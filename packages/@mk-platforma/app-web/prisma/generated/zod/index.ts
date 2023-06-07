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

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','label','parent_id']);

export const CommentScalarFieldEnumSchema = z.enum(['id','content','author_id','post_id']);

export const ImageScalarFieldEnumSchema = z.enum(['id','cloudinary_id','post_id','url']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]);

export const LocationScalarFieldEnumSchema = z.enum(['id','google_id','latitude','longitude','name']);

export const PostScalarFieldEnumSchema = z.enum(['id','title','description','contact','location_id','author_id','expertEndorsement_id','isDeleted']);

export const Post_ExpertEndorsementScalarFieldEnumSchema = z.enum(['id','post_id','firstName','lastName','avatarStyle']);

export const Post_ExpertEndorsement_skillScalarFieldEnumSchema = z.enum(['id','label','level','expertEndorsement_id']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','avatarStyle','email','emailVerified','canMutate']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const Category_labelSchema = z.enum(['job','job_demand','accommodation','accommodation_demand','sellable','sellable_demand','sellable_food','sellable_clothes','sellable_furniture','sellable_tool','sellable_gadget','sellable_buildingMaterial','gathering','gathering_spirituality','gathering_work','gathering_hangout']);

export type Category_labelType = `${z.infer<typeof Category_labelSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string().nullish(),
  contact: z.string(),
  location_id: z.number().int().nullish(),
  author_id: z.number().int(),
  expertEndorsement_id: z.number().int().nullish(),
  isDeleted: z.boolean(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// POST EXPERT ENDORSEMENT SCHEMA
/////////////////////////////////////////

export const Post_ExpertEndorsementSchema = z.object({
  id: z.number().int(),
  post_id: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  avatarStyle: InputJsonValue,
})

export type Post_ExpertEndorsement = z.infer<typeof Post_ExpertEndorsementSchema>

/////////////////////////////////////////
// POST EXPERT ENDORSEMENT SKILL SCHEMA
/////////////////////////////////////////

export const Post_ExpertEndorsement_skillSchema = z.object({
  id: z.number().int(),
  label: z.string(),
  level: z.number().int(),
  expertEndorsement_id: z.number().int().nullish(),
})

export type Post_ExpertEndorsement_skill = z.infer<typeof Post_ExpertEndorsement_skillSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  label: Category_labelSchema,
  id: z.number().int(),
  parent_id: z.number().int().nullish(),
})

export type Category = z.infer<typeof CategorySchema>

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
  cloudinary_id: z.string().nullish(),
  post_id: z.number().int().nullish(),
  url: z.string(),
})

export type Image = z.infer<typeof ImageSchema>

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.number().int(),
  content: z.string(),
  author_id: z.number().int(),
  post_id: z.number().int(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string().nullish(),
  avatarStyle: InputJsonValue,
  email: z.string().nullish(),
  emailVerified: z.coerce.date().nullish(),
  canMutate: z.boolean(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.number().int(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().int().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.number().int(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>
