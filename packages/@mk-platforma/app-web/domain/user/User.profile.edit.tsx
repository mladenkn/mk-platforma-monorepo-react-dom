import { IconButton, Paper, TextField, Typography, Box, useTheme } from "@mui/material"
import Api from "~/api_/api.client"
import { Api_outputs } from "~/api_/api.infer"
import Layout from "../Layout"
import { Header, Header_back, Header_moreOptions } from "../Header"
import { LogoLink } from "../common"
import DoneIcon from "@mui/icons-material/Done"
import { asNonNil } from "~/../../@mk-libs/common/common"
import { useState } from "react"

type User = NonNullable<Api_outputs["user"]["single"]>

type Props = {
  user_initial: User
}

export default function User_profile_edit({ user_initial }: Props) {
  const user = Api.user.single.useQuery(user_initial.id, { initialData: user_initial })
  const user_data = asNonNil(user.data)
  const [user_name, set__user_name] = useState(user_data.name || "")

  const mutation = Api.user.update.useMutation()
  function updateUser() {
    mutation.mutateAsync({ name: user_name })
  }

  const { palette } = useTheme()

  return (
    <Layout
      header={
        <Header>
          <Header_back />
          <LogoLink />
          <Header_moreOptions exclude={["profile"]} />
        </Header>
      }
      content={
        <Paper sx={{ width: "100%", p: 2, pb: 3.5, m: 1 }}>
          <Typography variant="h4">Uređivanje profila</Typography>
          <Box sx={{ display: "flex", mt: 3 }}>
            <TextField
              label="Korisničko ime"
              value={user_name}
              onChange={e => set__user_name(e.target.value)}
            />
            <IconButton sx={{ ml: 2 }} onClick={updateUser}>
              <DoneIcon />
            </IconButton>
          </Box>
          {mutation.isError && (
            <Typography sx={{ color: palette.error.main }}>{mutation.error.message}</Typography>
          )}
        </Paper>
      }
    />
  )
}
