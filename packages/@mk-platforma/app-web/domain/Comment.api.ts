import { z } from "zod"
import { authorizedRoute, publicProcedure, router } from "~/api_/api.server.utils"
import { SuperData_mapper, SuperData_query } from "~/api_/api.SuperData"
import "@mk-libs/common/server-only"
import { shallowPick } from "@mk-libs/common/common"
import { comment } from "~/drizzle/schema"
import { and, desc, eq } from "drizzle-orm"
import { measurePerformance } from "@mk-libs/common/debug"

const Comment_api_many = SuperData_mapper(
  z.object({
    post_id: z.number(),
  }),
  async (_, input) => ({
    where: {
      post_id: input.post_id,
      isDeleted: false,
    },
    orderBy: {
      id: "desc" as "desc",
    },
  }),
)

const Comment_api = router({
  many: publicProcedure
    .input(
      z.object({
        post_id: z.number(),
      }),
    )
    .query(({ ctx: { user, db_drizzle }, input }) =>
      db_drizzle.query.comment
        .findMany({
          columns: {
            id: true,
            content: true,
          },
          with: {
            author: {
              columns: {
                avatarStyle: true,
                name: true,
                id: true,
              },
            },
          },
          where: and(eq(comment.postId, input.post_id), eq(comment.isDeleted, false)),
          orderBy: desc(comment.id),
        })
        .then(comments =>
          comments.map(c => ({
            ...c,
            canEdit: user?.canMutate ? c.author.id === user?.id : false,
            canDelete: user?.canMutate ? c.author.id === user?.id : false,
          })),
        ),
    ),

  create: authorizedRoute(u => u.canMutate && !!u.name)
    .input(
      z.object({
        content: z.string().min(1),
        post_id: z.number(),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.db.comment.create({ data: { ...input, author_id: ctx.user.id } }),
    ),

  update: authorizedRoute(u => u.canMutate && !!u.name)
    .input(
      z.object({
        id: z.number(),
        content: z.string().min(1).optional(),
        isDeleted: z.boolean().optional(),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.db.comment.update({
        where: { id: input.id, author_id: ctx.user.id },
        data: shallowPick(input, "content", "isDeleted"),
      }),
    ),
})

export default Comment_api
