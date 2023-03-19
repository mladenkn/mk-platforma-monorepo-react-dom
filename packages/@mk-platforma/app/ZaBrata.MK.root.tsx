import { Tabs as TabsMui, Tab, Box } from "@mui/material"
import { Layout1_root_sx } from "./layout1"
import { useState } from "react"
import Item_sale from "./Item.sale"
import Expert_search from "./Expert.search"
import data from "./data/data.json"
import Section_base from "./Section.base"
import { MostCommonListItem, MostCommonListItem_details } from "./MostCommonListItem"


type Tab = "jobs" | "accommodations" | "experts" | "buying-selling" |  "gathering"

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
        <Tab sx={{ textTransform: "none" }} label="@Smještaj" value="accommodations" />
        <Tab sx={{ textTransform: "none" }} label="@Majstori" value="experts" />
        <Tab sx={{ textTransform: "none" }} label="@Nabava" value="buying-selling" />
        <Tab sx={{ textTransform: "none" }} label="@Okupljanje" value="gathering" />
      </TabsMui>
      <Box sx={Layout1_root_sx}>
        {activeTab === 'jobs' ? (
          <Section_base
            items={data.jobs} 
            renderListItem={item => <MostCommonListItem {...item} />}
            renderDetails={item => <MostCommonListItem_details {...item} />}
          />
        ) : <></>}
        {activeTab === 'accommodations' ? (
          <Section_base
            items={data.accommodations} 
            renderListItem={item => <MostCommonListItem {...item} />}
            renderDetails={item => <MostCommonListItem_details {...item} />}
          />
        ) : <></>}
        {activeTab === 'experts' ? <Expert_search /> : <></>}
        {activeTab === 'buying-selling' ? <Item_sale /> : <></>}
        {activeTab === 'gathering' ? (
          <Section_base
            items={data.gatherings}
            renderListItem={item => <MostCommonListItem {...item} />}
            renderDetails={item => <MostCommonListItem_details {...item} />}
          />
        ) : <></>}
      </Box>
    </Box>
  )
}
