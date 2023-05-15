import { Typography } from "@mui/material"
import Layout from "./Layout"

export default function TermsAndCodnitions() {
  return (
    <Layout
      header={<Typography>Uvjeti i pravila korištenja</Typography>}
      content={<Typography sx={{ p: 1, pr: 2 }}>U izradi</Typography>}
    />
  )
}
