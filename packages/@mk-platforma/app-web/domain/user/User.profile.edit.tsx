import { Box } from "@mui/material"
import Api from "~/api/api.client"
import { Api_outputs } from "~/api/api.infer"
import { asNonNil, undefinedToNullsDeep } from "@mk-libs/common/common"
import { create_getServerSideProps } from "~/create.getServerSideProps"

type User = NonNullable<Api_outputs["user"]["single"]>

type Props = {
  user_initial: User
}

export default function User_profile_edit({ user_initial }: Props) {
  const user = Api.user.single.useQuery(user_initial.id, { initialData: user_initial })
  return <Box>User_profile_edit {user.data?.id}</Box>
}

export const User_profile_edit__getServerSideProps = create_getServerSideProps(
  async (_, session) => ({
    props: {
      user_initial: undefinedToNullsDeep(asNonNil(session.user)),
    },
  })
)
