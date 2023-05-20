import { Typography } from "@mui/material"
import Layout from "./Layout"

export default function TermsAndCodnitions() {
  return (
    <Layout
      header={
        <Typography variant="h3" sx={{ color: "white", py: 2 }}>
          Uvjeti i pravila korištenja
        </Typography>
      }
      content={
        <Typography variant="body1" sx={{ p: 1, pr: 2 }}>
          U izradi
        </Typography>
      }
    />
  )
}
