import { Box, IconButton, Tabs, Tab, Popover } from "@mui/material"
import { useState, MouseEvent, ReactNode, ComponentProps } from "react"
import Post_list_base from "./Post.list.base"
import { Post_common_listItem, Post_common_details } from "./Post.details"
import { Post_expert_listItem } from "./Post.expert.listItem"
import PostAddIcon from "@mui/icons-material/PostAdd"
import Header from "./Header"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import SearchIcon from "@mui/icons-material/Search"
import { allCategories } from "./data.types"
import trpc from "./trpc"
import { Category } from "../api/data/data.types"
import { getCategoryLabel, CategoryIcon } from "./Categories.dropdown"
import { eva } from "@mk-libs/common/common"
import Avatar from "./Avatar"
import { Post_expert } from "../api/data/data.types"

export default function PostList_section() {
  const [activeTab, setActiveTab] = useState<Category>("gathering")

  const [additionalTabsShownAnchorEl, setAdditionalTabsShownAnchorEl] =
    useState<HTMLButtonElement | null>(null)

  function handle_showMoreTabs(event: MouseEvent<HTMLButtonElement>) {
    setAdditionalTabsShownAnchorEl(event.currentTarget)
  }

  const posts = trpc.posts.useQuery({ categories: [activeTab] })

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
          <Categories_tabs
            sx={{ mt: 2, mb: 0.1 }}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            options={allCategories.slice(0, 3)}
          >
            <IconButton onClick={handle_showMoreTabs}>
              <KeyboardArrowDownOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </Categories_tabs>
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
        <Categories_tabs
          sx={{ display: "flex", flexDirection: "column", gap: 2, background: "#2d5be3" }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          orientation="vertical"
          options={allCategories.slice(3)}
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
        {posts.data ? (
          <Post_list_base
            items={posts.data}
            Item={item => {
              switch (
                item.categories[0] // ~ ?
              ) {
                case "personEndorsement":
                  return <Post_expert_listItem {...(item as any)} />
                default:
                  return <Post_common_listItem {...item} />
              }
            }}
            Item_details={item => (
              <Post_common_details
                {...item}
                label_left={eva(() => {
                  if (item.categories[0] === "personEndorsement") {
                    const item_ = item as Post_expert
                    return (
                      <Avatar sx={{ mr: 2, ...item_.avatarStyle }} letter={item_.firstName[0]} />
                    )
                  }
                })}
              />
            )}
          />
        ) : (
          <>Učitavanje...</>
        )}
      </Box>
    </Box>
  )
}

type SectionTabs_props = ComponentProps<typeof Tabs> & {
  activeTab?: Category
  setActiveTab(c: Category): void
  options: Category[]
  children?: ReactNode
  tabProps?: Partial<ComponentProps<typeof Tab>>
}

function Categories_tabs({
  activeTab,
  setActiveTab,
  children,
  options,
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
      {options.map(tab => (
        <Tab
          sx={{
            textTransform: "none",
            fontSize: 18,
            color: "white",
            ".Mui-selected": {
              color: "white !important",
            },
          }}
          label={getCategoryLabel(tab)}
          value={tab}
          icon={<CategoryIcon name={tab} />}
          {...tabProps}
        />
      ))}
      {children}
    </Tabs>
  )
}
