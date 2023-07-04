import { authorizedRoute, router } from "~/api_/api.server.utils"
import { ImageSchema } from "../prisma/generated/zod"
import "@mk-libs/common/server-only"

const input_zod = ImageSchema.pick({
  uploadthing_key: true,
  url: true,
})

const Image_api = router({
  create: authorizedRoute(u => u.canMutate)
    .input(input_zod)
    .mutation(({ ctx, input }) => ctx.db.image.create({ data: input })),
})

export default Image_api
