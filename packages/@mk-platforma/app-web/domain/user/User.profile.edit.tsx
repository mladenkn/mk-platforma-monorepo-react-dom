import { Box } from "@mui/material"
import { Api_outputs } from "~/api/api.infer"

type User = NonNullable<Api_outputs["user"]["single"]>

type Props = {
  user: User
}

export default function User_profile_edit({ user }: Props) {
  return <Box>User_profile_edit {user.id}</Box>
}
