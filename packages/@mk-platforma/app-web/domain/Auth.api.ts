import { publicProcedure, router } from "~/api_/api.server.utils"
import "@mk-libs/common/server-only"
import { z } from "zod"

const input_zod = z.string()

export const PASSWORD = "maca i miš"

const Auth_api = router({
  checkPass: publicProcedure.input(input_zod).mutation(async ({ input }) => input === PASSWORD),
})

export default Auth_api
