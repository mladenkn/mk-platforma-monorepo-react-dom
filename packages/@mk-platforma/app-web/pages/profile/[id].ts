import { GetServerSidePropsContext } from "next"
import User_profile from "../../client/User.profile"
import { Api_ss } from "../../api/api.root"
import db from "../../prisma/instance"
import { user_id_ss_get_temp } from "../api/auth/[...nextauth]"

export async function getServerSideProps({ query, req, res }: GetServerSidePropsContext) {
  const user_id = parseInt(query.id as string)
  const userId = await user_id_ss_get_temp(req, res)
  return {
    props: {
      user_initial: await Api_ss({ db, userId }).user.single_withPosts(user_id),
    },
  }
}

export default User_profile
