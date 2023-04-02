import {
  Box,
  IconButton,
  Tabs,
  Tab,
  Popover,
  TabProps,
  useTheme,
  Avatar,
  Input,
} from "@mui/material"
import { useState, MouseEvent, ReactNode, ComponentProps } from "react"
import Post_list_base from "./Post.list.base"
import { Post_common_listItem, Post_common_details } from "./Post.details"
import { Post_expert_listItem } from "./Post.expert.listItem"
import PostAddIcon from "@mui/icons-material/PostAdd"
import Header from "./Header"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import SearchIcon from "@mui/icons-material/Search"
import trpc from "./trpc"
import type { Category } from "../api/data/data.types"
import { getCategoryLabel, CategoryIcon, allCategories } from "./Categories.common"
import { castIf, eva } from "@mk-libs/common/common"
import { Post_expert } from "../api/data/data.types"
import Link from "next/link"
import { Comment_listItem } from "./Comment.common"

export default function PostList_section({ initialTab }: { initialTab?: Category }) {
  const [activeTab, setActiveTab] = useState<Category | undefined>(initialTab)

  const [additionalTabsShownAnchorEl, setAdditionalTabsShownAnchorEl] =
    useState<HTMLButtonElement | null>(null)

  function handle_showMoreTabs(event: MouseEvent<HTMLButtonElement>) {
    setAdditionalTabsShownAnchorEl(event.currentTarget)
  }

  const posts = trpc.posts.useQuery({ categories: activeTab ? [activeTab] : [] })

  const { typography } = useTheme()

  return (
    <Box
      sx={{
        width: "100%",
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
                <PostAddIcon sx={{ color: "white", fontSize: typography.h4 }} />
              </IconButton>
            </a>
            <IconButton sx={{ p: 1 }}>
              <SearchIcon sx={{ color: "white", fontSize: typography.h4 }} />
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
                  return <Post_expert_listItem {...(item as Post_expert)} />
                default:
                  return <Post_common_listItem {...item} />
              }
            }}
            Item_details={item => (
              <Box display="flex" flexDirection={item.comments?.length ? "row" : "column"}>
                <Post_common_details
                  {...item}
                  label_left={eva(() => {
                    if (castIf<Post_expert>(item, item.categories[0] === "personEndorsement")) {
                      return (
                        <Avatar
                          sx={{ mr: 2, ...item.avatarStyle }}
                          children={item.firstName[0] + item.lastName[0]}
                        />
                      )
                    }
                  })}
                />
                <Box sx={{ mr: 2 }}>
                  <Box sx={{ borderRadius: 2, mt: 4, display: "flex", mb: 6 }}>
                    <Avatar children="MK" sx={{ background: "blue", color: "white", mr: 2 }} />
                    <Input sx={{ flex: 1 }} placeholder="Komentiraj" multiline />
                  </Box>
                  {item.comments?.length ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
                      {item.comments.map(comment => (
                        <Comment_listItem comment={comment} />
                      ))}
                    </Box>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
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
  const theme = useTheme()

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
        <LinkTab
          sx={{
            textTransform: "none",
            fontSize: theme.typography.h6,
            color: "white",
            ".Mui-selected": {
              color: "white !important",
            },
            fontWeight: 400,
          }}
          label={getCategoryLabel(tab)}
          value={tab}
          icon={<CategoryIcon name={tab} />}
          linkProps={{
            href: {
              query: { name: tab },
            },
          }}
          onClick={() => setActiveTab(tab)}
          {...tabProps}
        />
      ))}
      {children}
    </Tabs>
  )
}

function LinkTab(props: TabProps & { linkProps: ComponentProps<typeof Link> }) {
  return <Tab component={linkProps => <Link {...linkProps} {...props.linkProps} />} {...props} />
}
