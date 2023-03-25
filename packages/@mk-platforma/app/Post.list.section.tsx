import { Box, IconButton, Tabs, Tab, Popover } from "@mui/material"
import { useState, MouseEvent, ReactNode, ComponentProps } from "react"
import data from "./data/data.json"
import Post_list_base from "./Post.list.base"
import { Post_common_listItem, Post_common_listItem_details } from "./Post.common.listItem"
import { Post_expert_listItem } from "./Post.expert.listItem"
import PostAddIcon from "@mui/icons-material/PostAdd"
import Header from "./Header"
import { Category, allCategories } from "./data/data.types"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import SearchIcon from "@mui/icons-material/Search"
import { getCategoryLabel, CategoryIcon } from "./Categories.dropdown"

type Option = { id: Category; label: string }

export default function PostList_section() {
  const [selectedCategory, setSelectedCategory] = useState<Option | undefined | null>({
    id: "gathering",
    label: getCategoryLabel("gathering"),
  })
  const [search, setSearch] = useState("")
  const [activeSearch, _setActiveSearch] = useState<"byCategory" | "byString">("byCategory")

  const [tab, setTab] = useState<Category>("accommodation")
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

  const filteredPosts = selectedCategory
    ? data.allPosts.filter(post => post.categories.includes(tab))
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
          <SectionTabs
            sx={{ mt: 2, mb: 0.1 }}
            activeTab={tab}
            setActiveTab={setTab}
            tabs={allCategories.slice(0, 3)}
          >
            <IconButton onClick={handle_showMoreTabs}>
              <KeyboardArrowDownOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </SectionTabs>
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
        <SectionTabs
          sx={{ display: "flex", flexDirection: "column", gap: 2, background: "#2d5be3" }}
          tabs={allCategories.slice(3)}
          activeTab={tab}
          setActiveTab={setTab}
          orientation="vertical"
        />
      </Popover>
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
            switch (
              item.categories[0] // problem
            ) {
              case "personEndorsement":
                return <Post_expert_listItem {...(item as any)} />
              case "sellable":
                return <Post_common_listItem {...(item as any)} imageAtStart={item.mainImage} />
              default:
                return <Post_common_listItem {...(item as any)} />
            }
          }}
          Item_details={item => {
            switch (
              item.categories[0] // problem
            ) {
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

type SectionTabs_props = ComponentProps<typeof Tabs> & {
  activeTab: Category
  setActiveTab(c: Category): void
  children?: ReactNode
  tabs: Category[]
  tabProps?: Partial<ComponentProps<typeof Tab>>
}

function SectionTabs({
  activeTab,
  setActiveTab,
  children,
  tabs,
  sx,
  tabProps,
  ...otherProps
}: SectionTabs_props) {
  return (
    <Tabs
      sx={{
        px: 1,
        ".MuiTabs-indicator": {
          background: "white",
          height: 3,
        },
        ".Mui-selected": {
          color: "white !important",
        },
        ...sx,
      }}
      value={activeTab}
      centered
      onChange={(e, newValue) => setActiveTab(newValue)}
      variant="fullWidth"
      {...otherProps}
    >
      {tabs.map(category => (
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
          {...tabProps}
        />
      ))}
      {children}
    </Tabs>
  )
}
