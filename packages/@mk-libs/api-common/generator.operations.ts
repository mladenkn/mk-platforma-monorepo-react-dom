import { lowerFirst, toLower } from "lodash"
import { capitalize } from "@mk-libs/common/string"

export function getFindManyCodeForModel(model: string) {
  const modelCapitalized = capitalize(model)
  const modelLowerFirst = lowerFirst(model)
  return `export const createDbAccessor_${modelCapitalized}_getMany =
  <TZodInput extends ZodType<any, any, any>, TFirstParams extends Prisma.${modelCapitalized}FindManyArgs>(zodInput: TZodInput, getFirstParams: (ctx: Omit<ApiContext, 'db'>, input: z.infer<TZodInput>) => TFirstParams, options?: { postExecute?: (ctx: ApiContext, input: z.infer<TZodInput>) => void }) =>
    {
      const getResolver = <TSecondParams extends Prisma.${modelCapitalized}FindManyArgs>(getSecondParams?: ((ctx: Omit<ApiContext, 'db'>, input: z.infer<TZodInput>) => TSecondParams) | TSecondParams) =>
        {
          const resolver = (ctx: ApiContext, input: z.infer<TZodInput>) => {
            const firstParams = getFirstParams(ctx, input)
            const secondParams = typeof getSecondParams === 'function' ? getSecondParams(ctx, input) : (getSecondParams || {})
            const paramsMerged = { ...firstParams, ...secondParams }
            const result = ctx.db.${modelLowerFirst}.findMany(paramsMerged)
            options?.postExecute && options.postExecute(ctx, input)
            return (result as any) as Promise<Prisma.${modelCapitalized}GetPayload<TFirstParams & TSecondParams>[]>
          }
          resolver.zodInput = zodInput
          return resolver
        }
      
      getResolver.zodInput = zodInput
      return getResolver
    }`
}

export function getCreateCodeForModel(model: string) {
  const modelCapitalized = capitalize(model)
  const modelLowerFirst = lowerFirst(model)
  return `export const createDbAccessor_${modelCapitalized}_create =
  <TZodInput extends ZodType<any, any, any>, TFirstParams extends Prisma.${modelCapitalized}CreateArgs>(zodInput: TZodInput, getFirstParams: (ctx: Omit<ApiContext, 'db'>, input: z.infer<TZodInput>) => TFirstParams) =>
    {
      const getResolver = <TSecondParams extends Partial<Prisma.${modelCapitalized}CreateArgs>>(getSecondParams?: ((ctx: Omit<ApiContext, 'db'>, input: z.infer<TZodInput>) => TSecondParams) | TSecondParams) =>
        {
          const resolver = (ctx: ApiContext, input: z.infer<TZodInput>) => {
            const firstParams = getFirstParams(ctx, input)
            const secondParams = typeof getSecondParams === 'function' ? getSecondParams(ctx, input) : (getSecondParams || {})
            const paramsMerged = { ...firstParams, ...secondParams }
            const result = ctx.db.${modelLowerFirst}.create(paramsMerged)
            return (result as any) as Promise<Prisma.${modelCapitalized}GetPayload<TFirstParams & TSecondParams>>
          }
          resolver.zodInput = zodInput
          return resolver
        }

      getResolver.zodInput = zodInput
      return getResolver
    }`
}

export function getUpdateCodeForModel(model: string) {
  const modelCapitalized = capitalize(model)
  const modelLowerFirst = lowerFirst(model)
  return `export const createDbAccessor_${modelCapitalized}_update =
  <TZodInput extends ZodType<any, any, any>, TFirstParams extends Prisma.${modelCapitalized}UpdateArgs>(zodInput: TZodInput, getFirstParams: (ctx: Omit<ApiContext, 'db'>, input: z.infer<TZodInput>) => TFirstParams) =>
    {
      const getResolver = <TSecondParams extends Partial<Prisma.${modelCapitalized}UpdateArgs>>(getSecondParams?: ((ctx: Omit<ApiContext, 'db'>, input: z.infer<TZodInput>) => TSecondParams) | TSecondParams) =>
        {
          const resolver =  (ctx: ApiContext, input: z.infer<TZodInput>) => {
            const firstParams = getFirstParams(ctx, input)
            const secondParams = typeof getSecondParams === 'function' ? getSecondParams(ctx, input) : (getSecondParams || {})
            const paramsMerged = { ...firstParams, ...secondParams }
            const result = ctx.db.${modelLowerFirst}.update(paramsMerged)
            return (result as any) as Promise<Prisma.${modelCapitalized}GetPayload<TFirstParams & TSecondParams>>
          }
          resolver.zodInput = zodInput
          return resolver
        }

      getResolver.zodInput = zodInput
      return getResolver
    }`
}
