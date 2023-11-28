import { z } from "zod"
import { authorizedRoute, publicProcedure, router } from "~/api.trpc/api.server.utils"
import "@mk-libs/common/server-only"
import { shallowPick } from "@mk-libs/common/common"
import { Comment } from "~/domain/post/Post.schema"
import { and, desc, eq } from "drizzle-orm"

const Comment_api = router({
  many: publicProcedure
    .input(
      z.object({
        post_id: z.number(),
      }),
    )
    .query(({ ctx: { user, db }, input }) =>
      db.query.Comment.findMany({
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
        where: and(eq(Comment.post_id, input.post_id), eq(Comment.isDeleted, false)),
        orderBy: desc(Comment.id),
      }).then(comments =>
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
      ctx.db.insert(Comment).values({ ...input, author_id: ctx.user.id }),
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
      ctx.db
        .update(Comment)
        .set(shallowPick(input, "content", "isDeleted"))
        .where(and(eq(Comment.id, input.id), eq(Comment.author_id, ctx.user.id))),
    ),
})

export default Comment_api
