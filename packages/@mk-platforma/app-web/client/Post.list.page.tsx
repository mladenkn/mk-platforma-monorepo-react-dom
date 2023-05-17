import { Box, Drawer, Fab, Paper, Typography } from "@mui/material"
import Api from "../api.client"
import React, { useState } from "react"
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
import { useDebounceCallback } from "@react-hook/debounce"
import use_history_uniques from "@mk-libs/react-common/use.history.uniques"

type Category_model = Api_outputs["category"]["many"][number]

export type PostList_section_Props = {
  selectedCategory_initial?: { id: number; label: Category_labelType } | null
  posts_initial: Api_outputs["post"]["list"]["fieldSet_main"]["items"]
  categories_initial: Category_model[]
  location_initial: number | null
  location_radius_initial: number | null
}

export default function Post_list_page({
  selectedCategory_initial,
  categories_initial,
  posts_initial,
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
  const posts_isFirstLoading = use_history_uniques(posts.status).every(s => s === "loading")
  const posts_data = posts_isFirstLoading
    ? posts_initial
    : flatMap(posts.data?.pages, page => page.items)
  const posts_fetchNextPage_debounced = useDebounceCallback(posts.fetchNextPage, 500)

  function handleScroll(e: any) {
    const diff = e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight)
    const isOnBottom = diff < 100
    const lastPage = posts.data?.pages[posts.data?.pages.length - 1]
    if (isOnBottom && !posts.isLoading && lastPage?.nextCursor) {
      posts_fetchNextPage_debounced()
    }
  }

  const [sectionsDrawer_isActive, set_SectionsDrawer_isActive] = useState(false)

  const setUrlParams_shallow = use_setUrlParams_shallow()
  // ovde bug?
  function onCategorySelect(category: Category_model) {
    setUrlParams_shallow({ category: category.label })
    if (!category.children?.length) set_SectionsDrawer_isActive(false)
    setSelectedCategory(selectedCategory.data?.id === category.id ? undefined : category.id)
  }

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
        contentWrapper_props={{
          sx: {
            flexDirection: "column",
            gap: 1.25,
            my: 1,
            pl: 0.5,
            pr: 1,
          },
          onScroll: handleScroll,
        }}
        content={
          posts_data ? (
            <>
              {posts_data.map(item => (
                <Link key={item.id} href={`/post/${item.id}`} style={{ textDecoration: "none" }}>
                  <Paper sx={{ p: 1.5, display: "flex", cursor: "pointer", borderRadius: 2 }}>
                    <Post_listItem {...item} location={item.location?.name} />
                  </Paper>
                </Link>
              ))}
            </>
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
