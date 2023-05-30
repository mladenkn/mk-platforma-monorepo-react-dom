import { GetServerSidePropsContext } from "next"
import User_profile from "../../domain/user/User.profile"
import { Api_ss } from "../../api_/api.root"
import db from "../../prisma/instance"
import { user_ss_get } from "../api/auth/[...nextauth]"
import { typeCheck } from "@mk-libs/common/common"
import { ComponentProps } from "react"
import { create_getServerSideProps } from "~/create.getServerSideProps"

const a = create_getServerSideProps(async (ctx, session, params) => {
  const user_id = parseInt(ctx.query.id as string)
  const user = await Api_ss({ db, user: session.user! }).user.single_withPosts(user_id)
  if (user)
    return {
      props: typeCheck<ComponentProps<typeof User_profile>>({
        user_initial: user,
      }),
    }
  else return { notFound: true }
})

export default User_profile
