import { z } from "zod"
import { User_profile_section_select } from "../client/User.profile"
import { publicProcedure, router } from "../trpc.server.utils"

export const User_api = router({
  single: publicProcedure.input(z.number()).query(({ ctx, input }) =>
    ctx.db.user.findUnique({
      where: { id: input },
      ...User_profile_section_select,
    })
  ),
})
