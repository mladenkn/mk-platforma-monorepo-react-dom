import { Tabs as TabsMui, Tab, Box } from "@mui/material"
import { Layout1_root_sx } from "./layout1"
import { useState } from "react"
import Item_sale from "./Item.sale"
import Expert_search from "./Expert.search"
import EventOrJobs_list from "./EventOrJobs_list"
import data from "./data.json"
import { faker } from "@faker-js/faker"


type Tab = "buying-selling" | "experts" | "jobs" | "gathering/work-action" | "gathering/hangout" | "gathering/spiritual"

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
        <Tab sx={{ textTransform: "none" }} label="@Poslovi" value="jobs" />
        <Tab sx={{ textTransform: "none" }} label="@Majstori" value="experts" />
        <Tab sx={{ textTransform: "none" }} label="@Nabava" value="buying-selling" />
        <Tab sx={{ textTransform: "none" }} label="@Okupljanje / @RadnaAkcija" value="gathering/work-action" />
        <Tab sx={{ textTransform: "none" }} label="@Okupljanje, @Druženje" value="gathering/hangout" />
        <Tab sx={{ textTransform: "none" }} label="@Okupljanje, @Duhovnost" value="gathering/spiritual" />
      </TabsMui>
      <Box sx={Layout1_root_sx}>
        {activeTab === 'jobs' ? <EventOrJobs_list items={data.jobs} /> : <></>}
        {activeTab === 'experts' ? <Expert_search /> : <></>}
        {activeTab === 'buying-selling' ? <Item_sale /> : <></>}
        {activeTab === 'gathering/work-action' ? <EventOrJobs_list items={(data.gathering_work_action)} /> : <></>}
        {activeTab === 'gathering/hangout' ? <EventOrJobs_list items={(data.gathering_hangout)} /> : <></>}
        {activeTab === 'gathering/spiritual' ? <EventOrJobs_list items={(data.gathering_spiritual)} /> : <></>}
      </Box>
    </Box>
  )
}
