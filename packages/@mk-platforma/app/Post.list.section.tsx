import { Box, IconButton, Fab, Dialog, Autocomplete, TextField } from "@mui/material"
import { useState } from "react"
import data from "./data/data.json"
import Post_list_base from "./Post.list.base"
import { Post_common_listItem, Post_common_listItem_details } from "./Post.common.listItem"
import { Post_expert_listItem } from "./Post.expert.listItem"
import PostAddIcon from '@mui/icons-material/PostAdd'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import Header from "./Header"
import ManageSearchIcon from '@mui/icons-material/ManageSearch'


type Category = "jobs" | "accommodations" | "experts" | "buying-selling" |  "gathering"
const allCategories: Category[] = ["jobs", "accommodations", "experts", "buying-selling",  "gathering"]

export default function PostList_section(){
  const [activeTab, setActiveTab] = useState<Category>('accommodations')
  const [categoriesSelector_active, setCategoriesSelector_active] = useState(false)

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: '100%',
      }}
    >
      <Header
        right={
          <a href="/post/create" style={{ textDecoration: 'none', }}>
            <IconButton sx={{ display: 'flex', gap: 1, }}>
              <PostAddIcon sx={{ color: 'white', width: 30, height: 30 }} />
            </IconButton>
          </a>
        }
      />
      <Fab
        sx={{ position: 'absolute', bottom: 6, right: 6, }}
        color="primary"
        onClick={() => setCategoriesSelector_active(true)}
        size="large"
      >
        <ManageSearchIcon />
      </Fab>
      {categoriesSelector_active ? (
          <Dialog open onClose={() => setCategoriesSelector_active(false)}>
            <Box sx={{ p: 3, width: 320, height: 400, }}>
              <Box sx={{ fontSize: 24, mb: 4.5 }}>Odaberite kategorije</Box>
              <CategorySelector_dropdown />
            </Box>
          </Dialog>
        ) :
        <></>
      }
      <Box
        sx={{
          mt: 4,
          pb: 3,
          px: 2,
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

function CategorySelector_dropdown(){
  return (
    <Autocomplete
      fullWidth
      open
      sx={{ mb: 3, }}
      disablePortal
      options={allCategories.map(c => ({ id: c, label: getCategoryLabel(c) }))}
      renderInput={params => (
        <TextField
          {...params}
          label={"Kategorija"}
          variant="standard"
        />
      )}
    />
  )
}

function getCategoryLabel(category: Category){
  switch(category){
    case 'accommodations': return 'Smještaji'
    case 'buying-selling': return 'Nabava'
    case 'experts': return 'Majstori'
    case 'gathering': return 'Okupljanja'
    case 'jobs': return 'Poslovi'
  }
}
