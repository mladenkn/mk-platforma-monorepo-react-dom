import { Box, Drawer, Typography, Fab, IconButton, Container } from "@mui/material"
import Post_list_base from "./Post.list.base"
import { Post_single_listItem } from "./Post.single.listItem"
import { Post_single_listItem_personEndorsement } from "./Post.single.listItem.personEndorsement"
import Api from "./trpc.client"
import { shallowPick } from "@mk-libs/common/common"
import Categories_selector_aside from "./Categories.selector.aside"
import React, { useState, useEffect } from "react"
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
import { getCategoryLabel, CategoryIcon } from "./Categories.common"
import { Header_root, Header_moreOptions } from "./Header"
import type { Prisma } from "@prisma/client"
import { Post_category_labelType } from "../prisma/generated/zod"

export const PostList_section_PostSelect = {
  id: true,
  title: true,
  location: {
    select: {
      id: true,
      name: true,
    },
  },
  images: {
    select: {
      id: true,
      url: true,
    },
  },
  expertEndorsement: {
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

type Props = {
  selectedCategory: { id: number; label: Post_category_labelType }
  posts_initial: Post[]
}

export default function PostList_section({ selectedCategory, posts_initial }: Props) {
  const posts = Api.post.many.useQuery(
    { categories: selectedCategory.id ? [selectedCategory.id] : [] },
    { initialData: posts_initial }
  )

  const ctx = Api.useContext()
  useEffect(() => {
    ctx.post.category.many.prefetch()
  }, [])

  const [sectionsDrawer_isActive, set_SectionsDrawer_isActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState<number>()

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
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "white",
              gap: 2.5,
              width: "100%",
            }}
            onClick={() => set_SectionsDrawer_isActive(true)}
          >
            {selectedCategory && <CategoryIcon fontSize="large" name={selectedCategory.label} />}
            <Typography variant="h2" fontWeight={400}>
              {selectedCategory && getCategoryLabel(selectedCategory.label)}
            </Typography>
          </Box>
          <Header_moreOptions options={["post.create", "profile", "devContact"]} />
        </Container>
      </Header_root>
      {sectionsDrawer_isActive && (
        <Drawer open onClose={() => set_SectionsDrawer_isActive(false)}>
          <Categories_selector_aside selectedItem={selectedCategory.id} />
        </Drawer>
      )}
      <Fab
        color="primary"
        sx={{ position: "absolute", bottom: 14, right: 14 }}
        onClick={() => set_SectionsDrawer_isActive(true)}
      >
        <ManageSearchIcon />
      </Fab>
      <Container
        maxWidth="md"
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
              if (item.expertEndorsement) {
                return (
                  <Post_single_listItem_personEndorsement
                    {...shallowPick(
                      item.expertEndorsement,
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
          />
        ) : (
          <>Učitavanje...</>
        )}
      </Container>
    </Box>
  )
}
