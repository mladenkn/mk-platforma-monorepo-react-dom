import { Box, useTheme, Avatar, Input, Drawer, Typography, Fab } from "@mui/material"
import Post_list_base from "./Post.list.base"
import { Post_common_listItem, Post_common_details } from "./Post.single"
import { Post_expert_listItem } from "./Post.expert.listItem"
import trpc from "./trpc"
import type { Category, Post_base } from "../data/data.types"
import { castIf, eva } from "@mk-libs/common/common"
import { Post_expert } from "../data/data.types"
import { Comment_listItem } from "./Comment.common"
import Categories_selector_aside from "./Categories.selector.aside"
import { useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import { getCategoryLabel, CategoryIcon } from "./Categories.common"
import { Header_root, Header_moreOptions } from "./Header"

type Props = { selectedCategory: Category; posts_initial: Post_base[] }

export default function PostList_section({ selectedCategory, posts_initial }: Props) {
  const posts = trpc.posts.useQuery(
    { categories: selectedCategory ? [selectedCategory] : [] },
    { initialData: posts_initial }
  )

  const [sectionsDrawer_isActive, set_SectionsDrawer_isActive] = useState(false)

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
      <Header_root sx={{ pl: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "white",
            gap: 2.5,
          }}
          onClick={() => set_SectionsDrawer_isActive(true)}
        >
          <CategoryIcon fontSize="large" name={selectedCategory} />
          <Typography variant="h2" fontWeight={400}>
            {getCategoryLabel(selectedCategory)}
          </Typography>
        </Box>
        <Header_moreOptions options={["post.create", "profile"]} />
      </Header_root>
      {sectionsDrawer_isActive && (
        <Drawer open onClose={() => set_SectionsDrawer_isActive(false)}>
          <Categories_selector_aside />
        </Drawer>
      )}
      <Fab
        color="primary"
        sx={{ position: "absolute", bottom: 14, right: 14 }}
        onClick={() => set_SectionsDrawer_isActive(true)}
      >
        <MenuIcon />
      </Fab>
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
