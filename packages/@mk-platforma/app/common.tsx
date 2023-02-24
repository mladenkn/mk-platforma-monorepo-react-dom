import { Tabs as TabsMui, Tab, Box } from "@mui/material"
import { Layout1_root_sx } from "./layout1"
import { ReactNode } from "react"


type Tab = "buying-selling" | "experts" | "jobs"

type Props = {
  children: ReactNode
  activeTab: Tab
}

export function PageRoot({ activeTab, children }: Props){
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
      <TabsMui value={activeTab} centered>
        <Tab sx={{ textTransform: "none" }} component="a" label="Kupoprodaja" value="buying-selling" href="kupi" />
        <Tab sx={{ textTransform: "none" }} component="a" label="Majstori" value="experts" href="majstori" />
        <Tab sx={{ textTransform: "none" }} component="a" label="Poslovi" value="jobs" href="poslovi" />
      </TabsMui>
      <Box sx={Layout1_root_sx}>
        {children}
      </Box>      
    </Box>
  )
}
