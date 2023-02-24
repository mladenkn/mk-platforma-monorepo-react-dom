import { Tabs as TabsMui, Tab, Box } from "@mui/material"
import { ReactNode } from "react"


type Tab = "buying-selling" | "experts" | "jobs"

type Props = {
  children: ReactNode
  activeTab: Tab
}

export default function PageRoot({ activeTab, children }: Props){
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
        <Tab sx={{ textTransform: "none" }} label="Kupoprodaja" value="buying-selling" />
        <Tab sx={{ textTransform: "none" }} label="Majstori" value="experts" />
        <Tab sx={{ textTransform: "none" }} label="Poslovi" value="jobs" />
      </TabsMui>
      {children}
    </Box>
  )
}
