import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab_ from "@mui/material/Tab"
import { useState } from "react"
import { styled } from "@mui/material"
import Expert_search from "./Expert.search"
import Item_sale from "./Item.sale"
import Job_offers from "./Job.offers"

type Tab = "buying-selling" | "experts" | "jobs"

export default function Home_section() {
  const [value, setValue] = useState<Tab>("jobs")

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        mb: 4,
      }}
    >
      <Tabs value={value} onChange={(e, value) => setValue(value)} centered>
        <Tab label="Kupoprodaja" value="buying-selling" />
        <Tab label="Majstori" value="experts" />
        <Tab label="Poslovi" value="jobs" />
      </Tabs>
      {value === "buying-selling" && <Item_sale />}
      {value === "experts" && <Expert_search />}
      {value === "jobs" && <Job_offers />}
    </Box>
  )
}

const Tab = styled(Tab_)({
  textTransform: "none",
})
