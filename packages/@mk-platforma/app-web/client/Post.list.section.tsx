import { Box, Typography, Fab, Container } from "@mui/material"
import Post_list_base from "./Post.list.base"
import { Post_single_listItem } from "./Post.single.listItem"
import { Post_single_listItem_personEndorsement } from "./Post.single.listItem.personEndorsement"
import Api from "./trpc.client"
import { shallowPick } from "@mk-libs/common/common"
import { Categories_selector_aside_CategoryModel } from "./Categories.selector.aside"
import React, { useState } from "react"
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
import { getCategoryLabel, CategoryIcon, useCategory } from "./Categories.common"
import { Header_root, Header_moreOptions } from "./Header"
import type { Prisma } from "@prisma/client"
import { Post_category_labelType } from "../prisma/generated/zod"
import { use_setUrlParams_shallow } from "../utils"
import { BottomSheet } from "./BottomSheet"
import Layout1 from "./Layout1"
import { Backdrop } from "./common"
import Query_editor from "./Query.editor"

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

export type PostList_section_Props = {
  selectedCategory_initial?: { id: number; label: Post_category_labelType } | null
  posts_initial: Post[]
  categories_initial: Categories_selector_aside_CategoryModel[]
}

export default function PostList_section({
  selectedCategory_initial,
  categories_initial,
  posts_initial,
}: PostList_section_Props) {
  const [selectedCategory_id, setSelectedCategory] = useState(selectedCategory_initial?.id)
  const [search, setSearch] = useState("")

  const selectedCategory = useCategory(selectedCategory_id)

  const posts = Api.post.many.useQuery(
    { categories: selectedCategory_id ? [selectedCategory_id] : [], search },
    { initialData: posts_initial }
  )

  const [queryEditor_isActive, set_queryEditor_isActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState<number>()

  const setUrlParams_shallow = use_setUrlParams_shallow()

  function onCategorySelect(
    category?: Omit<Categories_selector_aside_CategoryModel, "parent" | "children">
  ) {
    setUrlParams_shallow({ category: category?.label })
    setSelectedCategory(selectedCategory.data?.id === category?.id ? undefined : category?.id)
  }

  return (
    <Layout1
      header={({ sx }) => (
        <Header_root sx={{ ...sx, pl: 1 }}>
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
            >
              {selectedCategory.data ? (
                <CategoryIcon fontSize="large" name={selectedCategory.data.label} />
              ) : (
                <></>
              )}
              <Typography variant="h2" fontWeight={400}>
                {selectedCategory.data ? (
                  getCategoryLabel(selectedCategory.data.label)
                ) : (
                  <a style={{ color: "white", textDecoration: "none" }} href="/">
                    <Typography variant="h3">ZaBrata</Typography>
                    <Box sx={{ color: "white" }}>
                      <Typography variant="h5">Loza kontribucionizma</Typography>
                    </Box>
                  </a>
                )}
              </Typography>
            </Box>
            <Header_moreOptions options={["post.create", "profile", "devContact"]} />
          </Container>
        </Header_root>
      )}
      content={({ sx }) => (
        <Container
          maxWidth="md"
          sx={{
            p: 1,
            pt: 2,
            display: "flex",
            flex: 1,
            minHeight: 0,
            ...sx,
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
      )}
      fav={({ sx }) =>
        !queryEditor_isActive && (
          <Fab color="primary" sx={sx} onClick={() => set_queryEditor_isActive(true)}>
            <ManageSearchIcon />
          </Fab>
        )
      }
      bottomSheet={({ sx }) =>
        queryEditor_isActive && (
          <BottomSheet sx={{ background: "#1976d2", ...sx }}>
            <Query_editor
              search={search}
              setSearch={setSearch}
              selectedCategory={selectedCategory_id}
              set_selectedCategory={onCategorySelect}
            />
          </BottomSheet>
        )
      }
      backdrop={() =>
        queryEditor_isActive && <Backdrop onClick={() => set_queryEditor_isActive(false)} />
      }
    />
  )
}
