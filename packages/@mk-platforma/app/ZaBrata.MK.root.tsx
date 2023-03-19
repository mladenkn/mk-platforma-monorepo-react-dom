import { Tabs as TabsMui, Tab, Box } from "@mui/material"
import { Layout1_root_sx } from "./layout1"
import { useState } from "react"
import Item_sale from "./Item.sale"
import Expert_search from "./Expert.search"
import data from "./data/data.json"
import Section_base from "./Section.base"
import { EventOrJob_list_item, EventOrJob_list_ItemDetails } from "./EventOrJob"


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
        {activeTab === 'jobs' ? (
          <Section_base
            items={data.jobs} 
            renderListItem={item => <EventOrJob_list_item {...item} />}
            renderDetails={item => <EventOrJob_list_ItemDetails {...item} />}
          />
        ) : <></>}
        {activeTab === 'experts' ? <Expert_search /> : <></>}
        {activeTab === 'buying-selling' ? <Item_sale /> : <></>}
        {activeTab === 'gathering/work-action' ? (
          <Section_base
            items={(data.gathering_workAction)}
            renderListItem={item => <EventOrJob_list_item {...item} />}
            renderDetails={item => <EventOrJob_list_ItemDetails {...item} />}
          />
        ) : <></>}
        {activeTab === 'gathering/hangout' ? (
          <Section_base
            items={(data.gathering_hangout)}
            renderListItem={item => <EventOrJob_list_item {...item} />}
            renderDetails={item => <EventOrJob_list_ItemDetails {...item} />}
          />
        ) : <></>}
        {activeTab === 'gathering/spiritual' ? (
          <Section_base
            items={(data.gathering_spiritual)}
            renderListItem={item => <EventOrJob_list_item {...item} />}
            renderDetails={item => <EventOrJob_list_ItemDetails {...item} />}          
          />
        ) : <></>}
      </Box>
    </Box>
  )
}
