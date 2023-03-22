import {
  Box,
  IconButton,
  ThemeProvider,
  Autocomplete,
  TextField,
  SxProps,
  createTheme,
  Tabs,
  Tab,
  Input,
  Popover,
  Button,
} from "@mui/material"
import { useState, MouseEvent } from "react"
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
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import GroupsIcon from "@mui/icons-material/Groups"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import SearchIcon from "@mui/icons-material/Search"

type Option = { id: Category; label: string }

const allCategories: Category[] = ["job", "accommodation", "personEndorsement", "sellable", "gathering"]

export default function PostList_section() {
  const [selectedCategory, setSelectedCategory] = useState<Option | undefined | null>({
    id: "gathering",
    label: getCategoryLabel("gathering"),
  })
  const [search, setSearch] = useState("")
  const [activeSearch, _setActiveSearch] = useState<"byCategory" | "byString">("byCategory")

  const [tab, setTab] = useState<Category>("accommodation")
  const [additionalTabsShown, setAdditionalTabsShown] = useState(false)
  const [additionalTabsShownAnchorEl, setAdditionalTabsShownAnchorEl] = useState<HTMLButtonElement | null>(
    null
  )

  function handle_showMoreTabs(event: MouseEvent<HTMLButtonElement>) {
    setAdditionalTabsShownAnchorEl(event.currentTarget)
  }

  function setActiveSearch(category: "byCategory" | "byString") {
    if (category === "byCategory") setSearch("")
    else setSelectedCategory(undefined)

    _setActiveSearch(category)
  }

  const filteredPosts = selectedCategory ? data.allPosts.filter(post => tab === post.type) : data.allPosts

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
          <Box sx={{ pr: 1 }}>
            <a href="/post/create" style={{ textDecoration: "none" }}>
              <IconButton sx={{ p: 1 }}>
                <PostAddIcon sx={{ color: "white", fontSize: 30 }} />
              </IconButton>
            </a>
            <IconButton sx={{ p: 1 }}>
              <SearchIcon sx={{ color: "white", fontSize: 30 }} />
            </IconButton>
          </Box>
        }
        bottom={
          <Tabs
            sx={{
              px: 1,
              mt: 2,
              mb: 0.1,
              ".MuiTabs-indicator": {
                background: "white",
                height: 3,
              },
              ".Mui-selected": {
                color: "white !important",
              },
            }}
            value={tab}
            centered
            onChange={(e, newValue) => setTab(newValue)}
            variant="fullWidth"
          >
            {allCategories.slice(0, 3).map(category => (
              <Tab
                sx={{
                  textTransform: "none",
                  fontSize: 18,
                  color: "white",
                  ".Mui-selected": {
                    color: "white !important",
                  },
                }}
                label={getCategoryLabel(category)}
                value={category}
                icon={<CategoryIcon category={category} />}
              />
            ))}
            <IconButton onClick={handle_showMoreTabs}>
              <KeyboardArrowDownOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </Tabs>
        }
      />
      <Popover
        open={!!additionalTabsShownAnchorEl}
        anchorEl={additionalTabsShownAnchorEl}
        onClose={() => setAdditionalTabsShownAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            left: "unset !important",
            right: 0,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.4, display: "flex", flexDirection: "column", gap: 2 }}>
          {allCategories.slice(3).map(category => (
            <Box sx={{ display: "flex", gap: 2, fontSize: 20 }} onClick={() => setTab(category)}>
              <CategoryIcon category={category} />
              <Box sx={{}}>{getCategoryLabel(category)}</Box>
            </Box>
          ))}
        </Box>
      </Popover>
      {/* {activeSearch == 'byString' && (
        <Box sx={{ mx: 2, mt: 3, display: 'flex', alignItems: 'center', gap: 3, }}>
          <Input
            autoFocus
            sx={{ pb: 0.7, mb: 2, width: "100%" }}
            placeholder="Pretraži"
            startAdornment={<SearchRoundedIcon sx={{ mr: 2 }} />}
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />
          <IconButton onClick={() => setActiveSearch('byCategory')}>
            <ManageSearchIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
      )}
      {activeSearch == 'byCategory' && (
        <Box sx={{ mx: 2, mt: 3, display: 'flex', alignItems: 'end', gap: 3, }}>
          <CategoriesDropdown
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <IconButton onClick={() => setActiveSearch('byString')}>
            <SearchRoundedIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
      )} */}
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          minHeight: 0,
          background: "#E4E6EB",
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

type CategoriesDropdown_Props = {
  selectedCategory?: Option | null
  setSelectedCategory(c?: Option | null): void
}

function CategoriesDropdown({ selectedCategory, setSelectedCategory }: CategoriesDropdown_Props) {
  return (
    <ThemeProvider theme={createTheme({ spacing: 8 })}>
      <Autocomplete
        fullWidth
        sx={{
          ".MuiAutocomplete-popupIndicator": {
            mb: 2,
          },
          ".MuiAutocomplete-clearIndicator": {
            mb: 2,
          },
          ".MuiAutocomplete-popupIndicator svg": {
            fontSize: 30,
          },
          ".MuiAutocomplete-clearIndicator svg": {
            fontSize: 24,
          },
        }}
        value={selectedCategory}
        options={allCategories.map(c => ({ id: c, label: getCategoryLabel(c) }))}
        onChange={(event, newValue) => setSelectedCategory(newValue)}
        renderOption={(props, option) => (
          <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
            <CategoryIcon category={option.id} sx={{ fontSize: 26, mr: 2 }} />
            {option.label}
          </Box>
        )}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            sx={{
              fontSize: 32,
            }}
            InputProps={{
              ...params.InputProps,
              sx: {
                fontSize: 32,
              },
              startAdornment: selectedCategory ? (
                <CategoryIcon sx={{ fontSize: 32, mr: 2 }} category={selectedCategory.id} />
              ) : (
                <></>
              ),
            }}
          />
        )}
      />
    </ThemeProvider>
  )
}
