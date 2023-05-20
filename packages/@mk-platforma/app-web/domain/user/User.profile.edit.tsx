import { Paper } from "@mui/material"
import Api from "~/api/api.client"
import { Api_outputs } from "~/api/api.infer"
import Layout from "../Layout"
import { Header_full_common } from "../Header"

type User = NonNullable<Api_outputs["user"]["single"]>

type Props = {
  user_initial: User
}

export default function User_profile_edit({ user_initial }: Props) {
  const user = Api.user.single.useQuery(user_initial.id, { initialData: user_initial })
  return (
    <Layout
      header={<Header_full_common moreOptions_props={{ exclude: ["profile"] }} />}
      content={<Paper sx={{ width: "100%" }}>{JSON.stringify(user.data, null, 2)}</Paper>}
    />
  )
}
