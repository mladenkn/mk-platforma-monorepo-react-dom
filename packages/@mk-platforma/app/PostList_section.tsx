import { Tabs as TabsMui, Tab, Box } from "@mui/material"
import { useState } from "react"
import data from "./data/data.json"
import Post_list_base from "./Post.list.base"
import { Post_common_listItem, Post_common_listItem_details } from "./Post.common.listItem"
import { Post_expert_listItem } from "./Post.expert.listItem"


type Tab = "jobs" | "accommodations" | "experts" | "buying-selling" |  "gathering"

export default function PostList_section(){
  const [activeTab, setActiveTab] = useState<Tab>('jobs')

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: '100%',
        px: 2,
      }}
    >
      <TabsMui value={activeTab} centered onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab sx={{ textTransform: "none" }} label="@Poslovi" value="jobs" />
        <Tab sx={{ textTransform: "none" }} label="@Smještaji" value="accommodations" />
        <Tab sx={{ textTransform: "none" }} label="@Majstori" value="experts" />
        <Tab sx={{ textTransform: "none" }} label="@Nabava" value="buying-selling" />
        <Tab sx={{ textTransform: "none" }} label="@Okupljanje" value="gathering" />
      </TabsMui>
      <Box
        sx={{
          pt: 7,
          pb: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          minHeight: 0,
        }}
      >
        {activeTab === 'jobs' ? (
          <Post_list_base
            items={data.jobs}
            Item={Post_common_listItem}
            Item_details={Post_common_listItem_details}
          />
        ) : <></>}
        {activeTab === 'accommodations' ? (
          <Post_list_base
            items={data.accommodations} 
            Item={Post_common_listItem}
            Item_details={Post_common_listItem_details}
          />
        ) : <></>}
        {activeTab === 'experts' ? (                
          <Post_list_base
            items={data.experts}
            Item={item => <Post_expert_listItem {...item} />}
            Item_details={item => (
              <Post_common_listItem_details label={`${item.firstName} ${item.lastName}`} {...item} />
            )}
          />
        ) : <></>}
        {activeTab === 'buying-selling' ? (
          <Post_list_base
            items={data.sellableItems}
            Item={item => <Post_common_listItem {...item} imageAtStart={item.mainImage} />}
            Item_details={item => <Post_common_listItem_details {...item} />}
          />
        ) : <></>}
        {activeTab === 'gathering' ? (
          <Post_list_base
            items={data.gatherings}
            Item={Post_common_listItem}
            Item_details={Post_common_listItem_details}
          />
        ) : <></>}
      </Box>
    </Box>
  )
}
