import { publicProcedure, router } from "../trpc.server.utils"

const Location_api = router({
  many: publicProcedure.query(({ ctx }) =>
    ctx.db.location.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  ),
})

export default Location_api
