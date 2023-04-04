import { Box, IconButton, useTheme, Avatar, Input } from "@mui/material"
import Post_list_base from "./Post.list.base"
import { Post_common_listItem, Post_common_details } from "./Post.details"
import { Post_expert_listItem } from "./Post.expert.listItem"
import PostAddIcon from "@mui/icons-material/PostAdd"
import Header from "./Header"
import SearchIcon from "@mui/icons-material/Search"
import trpc from "./trpc"
import type { Category } from "../data/data.types"
import { castIf, eva } from "@mk-libs/common/common"
import { Post_expert } from "../data/data.types"
import { Comment_listItem } from "./Comment.common"
import Post_list_section_categories_tabs from "./Post.list.section.categories.tabs"

export default function PostList_section({ initialTab }: { initialTab: Category }) {
  const activeTab = initialTab
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
        bottom={<Post_list_section_categories_tabs sx={{ mt: 2, mb: 0.1 }} activeTab={activeTab} />}
      />
      <Box
        sx={{
          p: 1,
          display: "flex",
          flex: 1,
          minHeight: 0,
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
                        <Comment_listItem key={comment.id} comment={comment} />
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
