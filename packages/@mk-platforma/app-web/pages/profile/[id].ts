import User_profile from "../../domain/user/User.profile"
import { Api_ss } from "../../api_/api.root"
import db from "../../prisma/instance"
import { typeCheck } from "@mk-libs/common/common"
import { ComponentProps } from "react"
import { create_getServerSideProps } from "~/create.getServerSideProps"
import { z } from "zod"

export const getServerSideProps = create_getServerSideProps(
  {
    queryParams: z.object({ id: z.number() }),
    requireAuth: true,
  },
  async (ctx, session, params) => {
    const user = await Api_ss({ db, user: session.user! }).user.single_withPosts(params.id)
    if (user)
      return {
        props: typeCheck<ComponentProps<typeof User_profile>>({
          user_initial: user,
        }),
      }
    else return { notFound: true }
  }
)

export default User_profile
