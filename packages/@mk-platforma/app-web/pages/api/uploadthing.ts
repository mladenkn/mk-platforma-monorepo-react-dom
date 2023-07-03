import { createNextPageApiHandler } from "uploadthing/next-legacy"

import { ourFileRouter } from "~/uploadthing"

const handler: any = createNextPageApiHandler({
  router: ourFileRouter,
})

export default handler
