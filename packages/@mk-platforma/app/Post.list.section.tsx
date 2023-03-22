import { Box, IconButton, Fab, ThemeProvider, Autocomplete, TextField, SxProps, createTheme } from "@mui/material"
import { useState } from "react"
import data from "./data/data.json"
import Post_list_base from "./Post.list.base"
import { Post_common_listItem, Post_common_listItem_details } from "./Post.common.listItem"
import { Post_expert_listItem } from "./Post.expert.listItem"
import PostAddIcon from "@mui/icons-material/PostAdd"
import Header from "./Header"
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
import { Category } from "./data/data.types"
import HandymanIcon from "@mui/icons-material/Handyman"
import BedIcon from "@mui/icons-material/Bed"
import EngineeringIcon from "@mui/icons-material/Engineering"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import GroupsIcon from "@mui/icons-material/Groups"


type Option = { id: Category; label: string }

const allCategories: Category[] = ["job", "accommodation", "personEndorsement", "sellable", "gathering"]

export default function PostList_section() {
  const [selectedCategory, setSelectedCategory] = useState<Option | undefined | null>({
    id: "gathering",
    label: getCategoryLabel("gathering"),
  })
  const [categoriesSelector_active, setCategoriesSelector_active] = useState(false)

  const filteredPosts = selectedCategory
    ? data.allPosts.filter(post => selectedCategory.id === post.type)
    : data.allPosts

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
      }}
    >
      <Header
        right={
          <a href="/post/create" style={{ textDecoration: "none" }}>
            <IconButton sx={{ display: "flex", gap: 1 }}>
              <PostAddIcon sx={{ color: "white", width: 30, height: 30 }} />
            </IconButton>
          </a>
        }
      />
      <Fab
        sx={{ position: "absolute", bottom: 6, right: 6 }}
        color="primary"
        onClick={() => setCategoriesSelector_active(true)}
        size="large"
      >
        <ManageSearchIcon />
      </Fab>
      {/* {selectedCategory ? (
        <Box
          sx={{ fontSize: 42, mt: 2.5, px: 2, display: "flex", gap: 0.7, alignItems: "end" }}
          onClick={() => setCategoriesSelector_active(true)}
        >
          <CategoryIcon sx={{ fontSize: 42 }} category={selectedCategory.id} />
          {selectedCategory.label}
        </Box>
      ) : (
        <></>
      )} */}
      <Box sx={{ mx: 2, mt: 3, }}>
        <ThemeProvider theme={createTheme({ spacing: 8, })}>
          <Autocomplete
            fullWidth
            sx={{ 
              '.MuiAutocomplete-popupIndicator': {
                mb: 2,
              },
              '.MuiAutocomplete-clearIndicator': {
                mb: 2,
              },
              '.MuiAutocomplete-popupIndicator svg': {
                fontSize: 30,
              },
              '.MuiAutocomplete-clearIndicator svg': {
                fontSize: 24,
              },
            }}
            disablePortal
            value={selectedCategory}
            options={allCategories.map(c => ({ id: c, label: getCategoryLabel(c) }))}
            onChange={(event, newValue) => setSelectedCategory(newValue)}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <CategoryIcon category={option.id} sx={{ fontSize: 26, mr: 2, }} />
                {option.label}
              </Box>
            )}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                sx={{
                  fontSize: 36,
                }}
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    fontSize: 36,
                  },
                  startAdornment: selectedCategory ? <CategoryIcon sx={{ fontSize: 36, mr: 2, }} category={selectedCategory.id} /> : <></>,
                }}
              />
            )}
          />
        </ThemeProvider>
      </Box>
      <Box
        sx={{
          mt: 3.5,
          pb: 3,
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          minHeight: 0,
        }}
      >
        <Post_list_base
          items={filteredPosts}
          Item={item => {
            switch (item.type) {
              case "personEndorsement":
                return <Post_expert_listItem {...(item as any)} />
              case "sellable":
                return <Post_common_listItem {...(item as any)} imageAtStart={item.mainImage} />
              default:
                return <Post_common_listItem {...(item as any)} />
            }
          }}
          Item_details={item => {
            switch (item.type) {
              case "personEndorsement":
                return <Post_common_listItem_details label={`${item.firstName} ${item.lastName}`} {...item} />
              case "sellable":
                return <Post_common_listItem_details {...(item as any)} />
              default:
                return <Post_common_listItem_details {...(item as any)} />
            }
          }}
        />
      </Box>
    </Box>
  )
}

function getCategoryLabel(category: Category) {
  switch (category) {
    case "accommodation":
      return "Smještaji"
    case "sellable":
      return "Nabava"
    case "personEndorsement":
      return "Majstori"
    case "gathering":
      return "Okupljanja"
    case "job":
      return "Poslovi"
  }
}

function CategoryIcon({ category, sx }: { category: Category; sx?: SxProps }) {
  switch (category) {
    case "accommodation":
      return <BedIcon sx={sx} />
    case "sellable":
      return <ShoppingCartIcon sx={sx} />
    case "personEndorsement":
      return <EngineeringIcon sx={sx} />
    case "gathering":
      return <GroupsIcon sx={sx} />
    case "job":
      return <HandymanIcon sx={sx} />
  }
}
