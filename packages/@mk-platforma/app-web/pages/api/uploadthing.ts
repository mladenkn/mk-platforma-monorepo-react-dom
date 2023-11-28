import { createNextPageApiHandler } from "uploadthing/next-legacy"
import { ourFileRouter } from "~/file.upload"

const handler: any = createNextPageApiHandler({
  router: ourFileRouter,
})

export default handler
