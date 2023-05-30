import { GetServerSidePropsContext } from "next"
import User_profile from "../../domain/user/User.profile"
import { Api_ss } from "../../api_/api.root"
import db from "../../prisma/instance"
import { user_ss_get } from "../api/auth/[...nextauth]"
import { typeCheck } from "@mk-libs/common/common"
import { ComponentProps } from "react"

export async function getServerSideProps({ query, req, res }: GetServerSidePropsContext) {
  const user_id = parseInt(query.id as string)
  const user_ = await user_ss_get(req, res)
  const user = await Api_ss({ db, user: user_ }).user.single_withPosts(user_id)
  if (user)
    return {
      props: typeCheck<ComponentProps<typeof User_profile>>({
        user_initial: user,
      }),
    }
  else return { notFound: true }
}

export default User_profile
