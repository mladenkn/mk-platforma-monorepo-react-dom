import { z } from "zod"
import { publicProcedure, router } from "../trpc.utils"
import Post_api_create from "./Post.api.create"
import { Post, PrismaClient } from "@prisma/client"
import { Post_category_labelSchema } from "../prisma/generated/zod"
import { assertIsNonNil } from "@mk-libs/common/common"
import { Post_single_details_PostSelect } from "../client/Post.single.details"
import { PostList_section_PostSelect } from "../client/Post.list.section"
import type { Prisma } from "@prisma/client"

const db = new PrismaClient()

const Post_api = router({
  many: publicProcedure
    .input(
      z.object({
        categories: z.array(Post_category_labelSchema).optional(),
      })
    )
    .query(async ({ input }) => {
      const posts = await db.post.findMany({
        where: {
          categories: input.categories && {
            some: {
              label: input.categories[0],
            },
          },
        },
        select: PostList_section_PostSelect,
      })
      return posts
    }),

  single: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const post = await db.post.findUnique({
        where: { id: input.id },
        select: Post_single_details_PostSelect,
      })
      assertIsNonNil(post)
      return {
        ...post,
        comments: post.comments.map(c => ({
          ...c,
          canEdit: true,
          canDelete: true,
        })),
      }
    }),

  create: Post_api_create,
})

function Post_single<TMapped>(
  select: Prisma.PostSelect,
  map?: (post?: Partial<Post> | null) => TMapped
) {
  return publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const post = await db.post.findUnique({
        where: { id: input.id },
        select,
      })
      return map ? map(post) : post
    })
}

const single1 = Post_single(Post_single_details_PostSelect, () => ({}))

function createMethod(inner: any) {
  return async <TOutput>(select: any, map?: any): Promise<TOutput> => {
    const data = await inner(select)
    return map ? map(data) : data
  }
}

// @ts-ignore
const post_single2_base = createMethod(select =>
  publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const post = await db.post.findUnique({
        where: { id: input.id },
        select,
      })
      return post
    })
)

const Database_createMethods = {
  post: {
    findUnique:
      (inner: any) =>
      <TMoreArgs extends Partial<Prisma.PostFindUniqueArgs>>(args: Partial<TMoreArgs>) =>
      (input: any) =>
        createMethod(inner(args)) as any as Promise<Prisma.PostGetPayload<TMoreArgs>>,
  },
}

const Database = {
  post: Database_createMethods.post.findUnique(post_single2_base)({
    select: Post_single_details_PostSelect,
  }),
}

const a = Database.post({})

// const post_single_2 = createMethod(post_single2_base)<
//   Prisma.PostGetPayload<{ select: typeof Post_single_details_PostSelect }>
// >(Post_single_details_PostSelect)

export default Post_api
