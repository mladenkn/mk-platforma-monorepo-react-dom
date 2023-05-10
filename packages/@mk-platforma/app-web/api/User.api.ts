import { z } from "zod"
import { publicProcedure, router } from "../api.server.utils"

export const User_api = router({
  single: publicProcedure.input(z.number()).query(({ ctx, input }) =>
    ctx.db.user.findUnique({
      where: { id: input },
      select: {
        id: true,
        name: true,
        avatarStyle: true,
        posts: {
          select: {
            id: true,
            title: true,
            categories: {
              select: {
                id: true,
                label: true,
              },
            },
          },
        },
      },
    })
  ),
})
