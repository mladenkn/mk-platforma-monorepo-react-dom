import { Typography } from "@mui/material"
import Layout from "./Layout"
import { Header, Header_moreOptions, Header_home } from "./Header"

export default function TermsAndCodnitions() {
  return (
    <Layout
      header={
        <Header sx={{ py: 2 }}>
          <Header_home />
          <Typography variant="h3" sx={{ color: "white" }}>
            Uvjeti i pravila korištenja
          </Typography>
          <Header_moreOptions exclude={["other.privacyPolicy"]} />
        </Header>
      }
      content={
        <Typography variant="body1" sx={{ p: 1, pr: 2 }}>
          U izradi
        </Typography>
      }
    />
  )
}
