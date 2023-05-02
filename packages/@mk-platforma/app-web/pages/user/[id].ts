import { GetServerSidePropsContext } from "next"
import User_profile from "../../client/User.profile"
import { Api_ss } from "../../trpc.server"
import db from "../../prisma/instance"

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const user_id = parseInt(query.id as string)
  return {
    props: {
      user_initial: await Api_ss({ db, userId: 1 }).user.single(user_id),
    },
  }
}

export default User_profile