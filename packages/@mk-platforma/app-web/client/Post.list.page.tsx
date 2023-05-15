import { Box, Drawer, Fab, Paper, Typography } from "@mui/material"
import Api from "../api.client"
import React, { useEffect, useState } from "react"
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
import { useCategory } from "./Categories.common"
import { Category_labelType } from "../prisma/generated/zod"
import { use_setUrlParams_shallow } from "../utils"
import Post_list_page_header from "./Post.list.page.header"
import { use_cookie } from "../cookies"
import { Api_outputs } from "../api.utils"
import Categories_selector_aside from "./Categories.selector.aside"
import Layout from "./Layout"
import Link from "next/link"
import { Post_listItem } from "./Post.listItem"
import { flatMap } from "lodash"

type Category_model = Api_outputs["category"]["many"][number]

export type PostList_section_Props = {
  selectedCategory_initial?: { id: number; label: Category_labelType } | null
  // posts_initial: Api_outputs["post"]["list"]["fieldSet_main"]
  categories_initial: Category_model[]
  location_initial: number | null
  location_radius_initial: number | null
}

export default function Post_list_page({
  selectedCategory_initial,
  categories_initial,
  // posts_initial,
  location_initial,
  location_radius_initial,
}: PostList_section_Props) {
  const [selectedCategory_id, setSelectedCategory] = useState(selectedCategory_initial?.id)
  const [search, set_search] = useState<string | null>(null)
  const [selectedLocation, set_selectedLocation] = use_cookie(
    "Post_list__location",
    location_initial
  )
  const [selectedLocation_radius_km, set__selectedLocation_radius_km] = use_cookie(
    "Post_list__location_radius",
    location_radius_initial
  )

  const categories = Api.category.many.useQuery(undefined, { initialData: categories_initial })
  const selectedCategory = useCategory(selectedCategory_id)

  const posts = Api.post.list.fieldSet_main.useInfiniteQuery(
    {
      categories: selectedCategory_id ? [selectedCategory_id] : [],
      search: search === null ? undefined : search,
      location: selectedLocation ?? undefined,
      location_radius: selectedLocation_radius_km ?? undefined,
    },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      // initialData: { pages: [posts_initial.items], pageParams: undefined },
    }
  )
  const posts_data = flatMap(posts.data?.pages, page => page.items)

  const [sectionsDrawer_isActive, set_SectionsDrawer_isActive] = useState(false)

  const setUrlParams_shallow = use_setUrlParams_shallow()

  function onCategorySelect(category: Category_model) {
    setUrlParams_shallow({ category: category.label })
    if (!category.children?.length) set_SectionsDrawer_isActive(false)
    setSelectedCategory(selectedCategory.data?.id === category.id ? undefined : category.id)
  }

  function handleScroll() {
    console.log(73)
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      posts.isLoading
    ) {
      console.log(79)
    }
    console.log(81)
    posts.fetchNextPage()
  }

  useEffect(() => {
    console.log(86)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [posts.isLoading])

  return (
    <>
      <Layout
        onlyContentScrollable
        header={
          <Post_list_page_header
            search={search}
            set_search={set_search}
            selectedCategory={selectedCategory as any}
            onShowCategories={() => set_SectionsDrawer_isActive(true)}
            selectedLocation={selectedLocation || null}
            set_selectedLocation={set_selectedLocation}
            selectedLocation_radius_km={selectedLocation_radius_km || null}
            set__selectedLocation_radius_km={set__selectedLocation_radius_km}
          />
        }
        content={
          posts_data ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                my: 1,
              }}
            >
              {posts_data.map(item => (
                <Link key={item.id} href={`/post/${item.id}`} style={{ textDecoration: "none" }}>
                  <Paper sx={{ p: 1.5, display: "flex", cursor: "pointer", borderRadius: 2 }}>
                    <Post_listItem {...item} location={item.location?.name} />
                  </Paper>
                </Link>
              ))}
            </Box>
          ) : (
            <Typography>Učitavanje...</Typography>
          )
        }
        fab={({ sx }) => (
          <Fab
            color="primary"
            sx={{ ...sx, bottom: 14, right: 14 }}
            onClick={() => set_SectionsDrawer_isActive(true)}
          >
            <ManageSearchIcon />
          </Fab>
        )}
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
    </>
  )
}
