import { GetServerSidePropsContext } from "next"
import User_profile from "../../client/User.profile"
import { Api_ss } from "../../api/api.root"
import db from "../../prisma/instance"
import { user_id_ss_get } from "../api/auth/[...nextauth]"
import { typeCheck } from "@mk-libs/common/common"
import { ComponentProps } from "react"

export async function getServerSideProps({ query, req, res }: GetServerSidePropsContext) {
  const user_id = parseInt(query.id as string)
  const userId = await user_id_ss_get(req, res)
  const user = await Api_ss({ db, userId }).user.single_withPosts(user_id)
  if (user)
    return {
      props: typeCheck<ComponentProps<typeof User_profile>>({
        user_initial: user,
      }),
    }
  else return { notFound: true }
}

export default User_profile
