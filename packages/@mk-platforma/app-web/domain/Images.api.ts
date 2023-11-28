import { authorizedRoute, router } from "~/api.trpc/api.server.utils"
import { ImageSchema } from "../prisma/generated/zod"
import "@mk-libs/common/server-only"
import { z } from "zod"
import { Image } from "~/domain/post/Post.schema"

const input_zod = z.array(
  ImageSchema.pick({
    uploadthing_key: true,
    url: true,
  }),
)

const Image_api = router({
  create: authorizedRoute(u => u.canMutate)
    .input(input_zod)
    .mutation(({ ctx, input }) => ctx.db.insert(Image).values(input).returning()),
})

export default Image_api
