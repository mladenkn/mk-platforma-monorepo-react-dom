import React from "react"
import { Box, Drawer, Typography, Fab } from "@mui/material"
import Post_list_base from "./Post.list.base"
import { Post_single_listItem } from "./Post.single.listItem"
import Post_single_details from "./Post.single.details"
import { Post_single_listItem_personEndorsement } from "./Post.single.listItem.personEndorsement"
import Api from "./trpc.client"
import { shallowPick } from "@mk-libs/common/common"
import Categories_selector_aside from "./Categories.selector.aside"
import { useState } from "react"
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
import { getCategoryLabel, CategoryIcon } from "./Categories.common"
import { Header_root, Header_moreOptions } from "./Header"
import type { Post_category_labelType } from "../prisma/generated/zod"
import type { Prisma } from "@prisma/client"

export const PostList_section_PostSelect = {
  id: true,
  title: true,
  description: true,
  contact: true,
  location: {
    select: {
      name: true,
    },
  },
  images: {
    select: {
      id: true,
      url: true,
    },
  },
  asPersonEndorsement: {
    select: {
      firstName: true,
      lastName: true,
      avatarStyle: true,
      skills: {
        select: {
          id: true,
          label: true,
          level: true,
        },
      },
    },
  },
} satisfies Prisma.PostSelect

type Post = Prisma.PostGetPayload<{
  select: typeof PostList_section_PostSelect
}>

type Props = { selectedCategory: Post_category_labelType; posts_initial: Post[] }

export default function PostList_section({ selectedCategory, posts_initial }: Props) {
  const posts = Api.post.many.useQuery(
    { categories: selectedCategory ? [selectedCategory] : [] },
    { initialData: posts_initial }
  )

  const [sectionsDrawer_isActive, set_SectionsDrawer_isActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState<number>()

  const details_comments = Api.post.comment.many.useQuery(
    { post_id: selectedItem! },
    { enabled: !!selectedItem }
  )

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
        <Header_moreOptions options={["post.create", "profile", "devContact"]} />
      </Header_root>
      {sectionsDrawer_isActive && (
        <Drawer open onClose={() => set_SectionsDrawer_isActive(false)}>
          <Categories_selector_aside selectedItem={selectedCategory} />
        </Drawer>
      )}
      <Fab
        color="primary"
        sx={{ position: "absolute", bottom: 14, right: 14 }}
        onClick={() => set_SectionsDrawer_isActive(true)}
      >
        <ManageSearchIcon />
      </Fab>
      <Box
        sx={{
          p: 1,
          pt: 2,
          display: "flex",
          flex: 1,
          minHeight: 0,
        }}
      >
        {posts.data ? (
          <Post_list_base
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            items={posts.data}
            Item={item => {
              if (item.asPersonEndorsement) {
                return (
                  <Post_single_listItem_personEndorsement
                    {...shallowPick(
                      item.asPersonEndorsement,
                      "firstName",
                      "lastName",
                      "skills",
                      "avatarStyle"
                    )}
                    location={item.location}
                  />
                )
              } else return <Post_single_listItem {...item} location={item.location?.name} />
            }}
            Item_details={post => <Post_single_details {...post} comments={details_comments} />}
          />
        ) : (
          <>Učitavanje...</>
        )}
      </Box>
    </Box>
  )
}
