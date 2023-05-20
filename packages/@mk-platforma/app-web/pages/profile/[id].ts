import { GetServerSidePropsContext } from "next"
import User_profile from "../../modules/user/User.profile"
import { Api_ss } from "../../api/api.root"
import db from "../../prisma/instance"
import { user_id_ss_get } from "../api/auth/[...nextauth]"
import { typeCheck } from "@mk-libs/common/common"
import { ComponentProps } from "react"

export async function getServerSideProps({ query, req, res }: GetServerSidePropsContext) {
  const user_id = parseInt(query.id as string)
  const user_current_id = await user_id_ss_get(req, res)
  const user = await Api_ss({ db, user_id: user_current_id }).user.single_withPosts(user_id)
  if (user)
    return {
      props: typeCheck<ComponentProps<typeof User_profile>>({
        user_initial: user,
      }),
    }
  else return { notFound: true }
}

export default User_profile
