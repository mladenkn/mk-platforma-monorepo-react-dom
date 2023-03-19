import { Tabs as TabsMui, Tab, Box } from "@mui/material"
import { Layout1_root_sx } from "./layout1"
import { useState } from "react"
import { Post_product_listItem, Post_product_listItem_details } from "./Post.product.listItem"
import data from "./data/data.json"
import Section_base from "./Section.base"
import { Post_common_listItem, MostCommonListItem_details } from "./Post.common.listItem"
import { Post_expert_listItem, Post_expert_listItem_details } from "./Post.expert.listItem"


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
            Item={Post_common_listItem}
            Item_details={MostCommonListItem_details}
          />
        ) : <></>}
        {activeTab === 'accommodations' ? (
          <Section_base
            items={data.accommodations} 
            Item={Post_common_listItem}
            Item_details={MostCommonListItem_details}
          />
        ) : <></>}
        {activeTab === 'experts' ? (                
          <Section_base
            items={data.experts}
            Item={Post_expert_listItem}
            Item_details={Post_expert_listItem_details}
          />
        ) : <></>}
        {activeTab === 'buying-selling' ? (
          <Section_base
            items={data.sellableItems}
            Item={Post_product_listItem}
            Item_details={Post_product_listItem_details}
          />
        ) : <></>}
        {activeTab === 'gathering' ? (
          <Section_base
            items={data.gatherings}
            Item={Post_common_listItem}
            Item_details={MostCommonListItem_details}
          />
        ) : <></>}
      </Box>
    </Box>
  )
}
