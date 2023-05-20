import { GetServerSidePropsContext } from "next"
import { undefinedToNullsDeep } from "@mk-libs/common/common"
import { create_getServerSideProps } from "~/create.getServerSideProps"
import User_profile_edit from "~/domain/user/User.profile.edit"
import { session_ss_get } from "~/pages/api/auth/[...nextauth]"

export const getServerSideProps = create_getServerSideProps(
  async (ctx: GetServerSidePropsContext) => {
    const session = await session_ss_get(ctx.req, ctx.res)
    const props = {
      user_initial: undefinedToNullsDeep(session?.user!),
    }
    return { props }
  }
)

export default User_profile_edit
