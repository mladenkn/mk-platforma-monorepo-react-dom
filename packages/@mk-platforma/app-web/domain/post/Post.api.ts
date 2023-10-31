import { z } from "zod"
import { authorizedRoute, publicProcedure, router } from "~/api_/api.server.utils"
import Post_api_create from "./Post.api.create"
import "@mk-libs/common/server-only"
import Post_api_update from "./Post.api.update"
import { and, desc, eq, ilike, inArray, lt, or } from "drizzle-orm"
import { Image, Location, Post } from "~/domain/post/Post.schema"
import { Category, CategoryToPost } from "../category/Category.schema"
import { shallowPick } from "@mk-libs/common/common"
import { groupBy } from "lodash"
import { withNoNils } from "@mk-libs/common/array"
import {
  Post_content_personEndorsement,
  Post_content_personEndorsement_skill,
} from "./Post.expertEndorsement.schema"

const Input_zod = z.object({
  categories: z.array(z.number()).optional(),
  search: z.string().optional().default(""),
  location: z.number().optional(),
  location_radius: z.number().optional().default(50),
  cursor: z.number().min(1).optional(),
})

const Post_api = router({
  list: router({
    fieldSet_main: publicProcedure.input(Input_zod).query(async ({ ctx, input }) => {
      const limit = 20

      const rows = await ctx.db
        .select({
          id: Post.id,
          title: Post.title,
          location: shallowPick(Location, "id", "name"),
          image: shallowPick(Image, "id", "url", "isMain"),
          content_personEndorsement: shallowPick(
            Post_content_personEndorsement,
            "firstName",
            "lastName",
            "avatarStyle",
          ),
          content_personEndorsement_skill: shallowPick(
            Post_content_personEndorsement_skill,
            "id",
            "label",
            "level",
          ),
        })
        .from(Post)
        .leftJoin(Location, eq(Post.location_id, Location.id))
        .leftJoin(Image, eq(Post.id, Image.post_id))
        .leftJoin(
          Post_content_personEndorsement,
          eq(Post.id, Post_content_personEndorsement.post_id),
        )
        .leftJoin(CategoryToPost, eq(Post.id, CategoryToPost.post_id))
        .leftJoin(Category, eq(Category.id, CategoryToPost.category_id))
        .leftJoin(
          Post_content_personEndorsement_skill,
          eq(
            Post_content_personEndorsement.id,
            Post_content_personEndorsement_skill.post_personEndorsement_id,
          ),
        )
        .where(
          and(
            eq(Post.isDeleted, false),
            input.cursor ? lt(Post.id, input.cursor) : undefined,
            or(
              ilike(Post.title, `%${input.search}%`),
              ilike(Post.description, `%${input.search}%`),
              ilike(Post.contact, `%${input.search}%`),
              ilike(Post_content_personEndorsement_skill.label, `%${input.search}%`),
            ),
            input.categories?.length
              ? or(
                  inArray(Category.id, input.categories),
                  inArray(Category.parent_id, input.categories),
                )
              : undefined,
          ),
        )
        .orderBy(desc(Post.id))
        .limit(limit + 1)
      // TODO: fali filter po lokaciji

      const nextCursor = rows.length > limit ? rows.pop()!.id : null

      const grouped = groupBy(rows, "id")
      const items = Object.entries(grouped).map(([post_id, entry]) => ({
        id: parseInt(post_id),
        title: entry[0].title,
        location: entry[0].location,
        expertEndorsement: entry[0].content_personEndorsement && {
          ...entry[0].content_personEndorsement,
          skills: withNoNils(entry.map(e => e.content_personEndorsement_skill)),
        },
        images: withNoNils(entry.map(e => e.image)),
      }))

      return { items, nextCursor }
    }),
  }),

  single: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const post_data = await ctx.db.query.Post.findFirst({
        where: eq(Post.id, input.id),
        ...Post_select,
        columns: {
          ...Post_select.columns,
          isDeleted: true,
          description: true,
          contact: true,
        },
        with: {
          ...Post_select.with,
          categoryToPost: {
            with: {
              category: {
                columns: {
                  id: true,
                  code: true,
                },
              },
            },
          },
          author: {
            columns: {
              id: true,
              name: true,
              avatarStyle: true,
            },
          },
        },
      })

      if (!post_data) return null

      return {
        ...post_data,
        categories: post_data.categoryToPost.map(ct => ct.category),
        canEdit: ctx.user?.canMutate ? post_data.author!.id === ctx.user?.id : false,
        canComment: ctx.user?.canMutate ?? false,
        canDelete: ctx.user?.canMutate ? post_data.author!.id === ctx.user?.id : false,
      }
    }),

  create: Post_api_create,
  update: Post_api_update,

  delete: authorizedRoute(u => u.canMutate)
    .input(z.number())
    .mutation(({ ctx, input }) =>
      ctx.db.update(Post).set({ isDeleted: true }).where(eq(Post.id, input)),
    ),
})

const Post_select = {
  columns: {
    id: true,
    title: true,
  },
  with: {
    location: {
      columns: {
        id: true,
        name: true,
      },
    },
    images: {
      columns: {
        isMain: true,
        id: true,
        url: true,
      },
    },
    content_personEndorsement: {
      columns: {
        firstName: true,
        lastName: true,
        avatarStyle: true,
      },
      with: {
        skills: {
          columns: {
            id: true,
            label: true,
            level: true,
          },
        },
      },
    },
  },
} as const

export default Post_api

// const locations = await eva(async () => {
//   if (input.location) {
//     const { longitude, latitude } = await db.location
//       .findUnique({ where: { id: input.location } })
//       .then(asNonNil)
//     return await db.$queryRaw<{ id: number }[]>`
//       SELECT id FROM "Location" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, ${input.location_radius} * 1000)
//     `
//   }
// })
