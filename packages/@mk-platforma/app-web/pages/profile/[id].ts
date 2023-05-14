import { GetServerSidePropsContext } from "next"
import User_profile from "../../client/User.profile"
import { Api_ss } from "../../api/api.root"
import db from "../../prisma/instance"

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const user_id = parseInt(query.id as string)
  return {
    props: {
      user_initial: await Api_ss({ db, userId: 1 }).user.single_withPosts(user_id),
    },
  }
}

export default User_profile
