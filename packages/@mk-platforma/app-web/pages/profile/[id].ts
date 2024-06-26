import User_profile from "../../domain/user/User.profile"
import { typeCheck } from "@mk-libs/common/common"
import { ComponentProps } from "react"
import ss_props_get_create_full from "~/ss.props"
import { z } from "zod"

export const getServerSideProps = ss_props_get_create_full(
  {
    queryParams: z.object({ id: z.number() }),
  },
  async ({ api }, params) => {
    const user = await api.user.single_withPosts(params.id)
    if (user)
      return {
        props: typeCheck<ComponentProps<typeof User_profile>>({
          user_initial: user,
        }),
      }
    else return { notFound: true, props: {} }
  },
)

export default User_profile
