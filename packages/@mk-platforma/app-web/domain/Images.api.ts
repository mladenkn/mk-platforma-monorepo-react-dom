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
  upsert: authorizedRoute(u => u.canMutate)
    .input(input_zod)
    .mutation(async ({ ctx, input }) => {
      const images = await Promise.all(
        input.map(image =>
          ctx.db.image.upsert({
            where: { url: image.url, uploadthing_key: image.uploadthing_key || undefined },
            update: image,
            create: image,
          })
        )
      )
      return images
    }),
})

export default Image_api
