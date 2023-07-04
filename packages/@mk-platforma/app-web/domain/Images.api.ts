import { authorizedRoute, router } from "~/api_/api.server.utils"
import { ImageSchema } from "../prisma/generated/zod"
import "@mk-libs/common/server-only"
import { z } from "zod"

const input_zod = z.array(
  ImageSchema.pick({
    uploadthing_key: true,
    url: true,
  })
)

const Image_api = router({
  create: authorizedRoute(u => u.canMutate)
    .input(input_zod)
    .mutation(async ({ ctx, input }) => {
      const images = await Promise.all(input.map(image => ctx.db.image.create({ data: image })))
      return images
    }),
})

export default Image_api
