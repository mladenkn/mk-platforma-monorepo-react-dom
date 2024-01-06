import { IconButton, Paper, TextField, Typography, Box } from "@mui/material"
import Api from "~/api.trpc/api.client"
import { Api_outputs } from "~/api.trpc/api.infer"
import Layout from "../Layout"
import { Header, Header_back, Header_moreOptions } from "../Header"
import { LogoLink, Warning_noUsername, use_noUsername_isDisplayed } from "../common"
import DoneIcon from "@mui/icons-material/Done"
import { asNonNil } from "~/../../@mk-libs/common/common"
import { useState } from "react"
import { useRouter } from "next/router"
import useTheme from "~/theme/theme"

type User = NonNullable<Api_outputs["user"]["single"]>

type Props = {
  user_initial: User
}

// ima bug
export default function User_profile_edit({ user_initial }: Props) {
  const user = Api.user.single.useQuery(user_initial.id, { initialData: user_initial })
  const user_data = asNonNil(user.data)
  console.log(21, user_data)
  const [user_name, set__user_name] = useState(user_data.name || "")

  const router = useRouter()
  const mutation = Api.user.update.useMutation()
  async function handleDone() {
    if (user_data.name !== user_name) {
      await mutation.mutateAsync({ name: user_name })
    }
    router.push(`/profile/${user_data.id}`)
  }

  const { typography, palette: paletteGeneric } = useTheme()
  const noUsername_isDisplayed = use_noUsername_isDisplayed()

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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h4">Uređivanje profila</Typography>
              {noUsername_isDisplayed && <Warning_noUsername sx={{ mt: 2 }} />}
            </Box>
            <IconButton sx={{ ml: 2 }} onClick={handleDone}>
              <DoneIcon sx={{ fontSize: typography.h4 }} />
            </IconButton>
          </Box>

          <TextField
            sx={{ mt: 3 }}
            label="Korisničko ime"
            value={user_name}
            onChange={e => set__user_name(e.target.value)}
          />
          {mutation.isError && (
            <Typography sx={{ color: paletteGeneric.error.main }}>
              {mutation.error.message}
            </Typography>
          )}
        </Paper>
      }
    />
  )
}
