import { GetServerSidePropsContext } from "next"
import User_profile_edit from "../../client/User.profile.edit"
import { session_ss_get } from "../api/auth/[...nextauth]"

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await session_ss_get(ctx.req, ctx.res)
  return {
    props: {},
  }
}

export default User_profile_edit
