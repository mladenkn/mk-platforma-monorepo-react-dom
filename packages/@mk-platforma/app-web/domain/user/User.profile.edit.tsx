import { IconButton, Paper, TextField, Typography, Box } from "@mui/material"
import Api from "~/api_/api.client"
import { Api_outputs } from "~/api_/api.infer"
import Layout from "../Layout"
import { Header, Header_back, Header_moreOptions } from "../Header"
import { LogoLink } from "../common"
import DoneIcon from "@mui/icons-material/Done"

type User = NonNullable<Api_outputs["user"]["single"]>

type Props = {
  user_initial: User
}

export default function User_profile_edit({ user_initial }: Props) {
  const user = Api.user.single.useQuery(user_initial.id, { initialData: user_initial })
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
            <TextField label="Korisničko ime" />
            <IconButton sx={{ ml: 2 }}>
              <DoneIcon />
            </IconButton>
          </Box>
        </Paper>
      }
    />
  )
}
