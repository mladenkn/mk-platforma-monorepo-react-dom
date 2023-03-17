import { Tabs as TabsMui, Tab, Box } from "@mui/material"
import { Layout1_root_sx } from "./layout1"
import { useState } from "react"
import Item_sale from "./Item.sale"
import Expert_search from "./Expert.search"
import Job_offers from "./Job.offers"


type Tab = "buying-selling" | "experts" | "jobs"

export default function ZaBrata_MK_root(){
  const [activeTab, setActiveTab] = useState<Tab>('jobs')

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
      <TabsMui value={activeTab} centered onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab sx={{ textTransform: "none" }} label="Poslovi" value="jobs" />
        <Tab sx={{ textTransform: "none" }} label="Majstori" value="experts" />
        <Tab sx={{ textTransform: "none" }} label="Nabava" value="buying-selling" />
      </TabsMui>
      <Box sx={Layout1_root_sx}>
        {activeTab === 'buying-selling' ? <Item_sale /> : <></>}
        {activeTab === 'experts' ? <Expert_search /> : <></>}
        {activeTab === 'jobs' ? <Job_offers /> : <></>}
      </Box>
    </Box>
  )
}
