import { GetServerSidePropsContext } from "next"
import User_profile_edit from "../../client/User.profile.edit"
import { session_ss_get } from "../api/auth/[...nextauth]"
import { ComponentProps } from "react"
import { asNonNil, undefinedToNullsDeep } from "@mk-libs/common/common"

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await session_ss_get(ctx.req, ctx.res)
  const props: ComponentProps<typeof User_profile_edit> = {
    user_initial: undefinedToNullsDeep(asNonNil(session?.user)) as any,
  }
  return { props }
}

export default User_profile_edit
