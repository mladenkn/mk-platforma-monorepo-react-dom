import { Box, Drawer, Typography, Fab, useTheme, Container, Input, IconButton } from "@mui/material"
import Post_list_base from "./Post.list.base"
import { Post_single_listItem } from "./Post.single.listItem"
import { Post_single_listItem_personEndorsement } from "./Post.single.listItem.personEndorsement"
import Api from "./trpc.client"
import { shallowPick } from "@mk-libs/common/common"
import Categories_selector_aside, {
  Categories_selector_aside_CategoryModel,
} from "./Categories.selector.aside"
import React, { useState } from "react"
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
import { getCategoryLabel, CategoryIcon, useCategory } from "./Categories.common"
import { Header_root, Header_moreOptions } from "./Header"
import type { Prisma } from "@prisma/client"
import { Post_category_labelType } from "../prisma/generated/zod"
import { use_setUrlParams_shallow } from "../utils"
import Post_list_section_header from "./Post.list.section.header"

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
  const [search, set_search] = useState<string | null>(null)
  const [selectedLocation, set_selectedLocation] = useState<number | null>(null)

  const [selectedLocation_radius_km, set__selectedLocation_radius_km] = useState<number | null>(
    null
  )

  const categories = Api.post.category.many.useQuery(undefined, { initialData: categories_initial })
  const selectedCategory = useCategory(selectedCategory_id)

  const posts = Api.post.list.fieldSet_main.useQuery(
    {
      categories: selectedCategory_id ? [selectedCategory_id] : [],
      search: search === null ? undefined : search,
      location: selectedLocation ?? undefined,
      location_radius: selectedLocation_radius_km ?? undefined,
    },
    { initialData: posts_initial }
  )

  const [sectionsDrawer_isActive, set_SectionsDrawer_isActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState<number>()

  const setUrlParams_shallow = use_setUrlParams_shallow()

  function onCategorySelect(category: Categories_selector_aside_CategoryModel) {
    setUrlParams_shallow({ category: category.label })
    if (!category.children?.length) set_SectionsDrawer_isActive(false)
    setSelectedCategory(selectedCategory.data?.id === category.id ? undefined : category.id)
  }

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
      <Post_list_section_header
        search={search}
        set_search={set_search}
        selectedCategory={selectedCategory as any}
        onShowCategories={() => set_SectionsDrawer_isActive(true)}
        selectedLocation={selectedLocation}
        set_selectedLocation={set_selectedLocation}
        selectedLocation_radius_km={selectedLocation_radius_km}
        set__selectedLocation_radius_km={set__selectedLocation_radius_km}
      />
      {sectionsDrawer_isActive && (
        <Drawer open onClose={() => set_SectionsDrawer_isActive(false)}>
          {categories.data && (
            <Categories_selector_aside
              categories={categories.data}
              selectedItem={selectedCategory.data?.id}
              onSelect={onCategorySelect}
              onBack={() => setSelectedCategory(undefined)}
            />
          )}
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
          flexDirection: "column",
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
