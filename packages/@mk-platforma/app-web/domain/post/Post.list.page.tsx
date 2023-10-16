import { Box, Drawer, Fab, Typography, useTheme } from "@mui/material"
import React, { useState } from "react"
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
import Post_list_page_header from "./Post.list.page.header"
import { Api_outputs } from "~/api_/api.infer"
import Link from "next/link"
import { Post_listItem } from "./Post.listItem"
import { flatMap } from "lodash"
import { useDebounceCallback } from "@react-hook/debounce"
import use_history_uniques from "@mk-libs/react-common/use.history.uniques"
import Api from "~/api_/api.client"
import { use_cookie } from "~/cookies"
import { use_setUrlParams_shallow } from "~/utils.client"
import Layout from "~/domain/Layout"
import Categories_selector_aside from "~/domain/category/Category.selector.aside"
import { Post_listItem_personEndorsement } from "./Post.listItem.personEndorsement"
import { Category_label_zod, type Category_label } from "../category/Category.types"
import { useSearchParams } from "next/navigation"

type Category_model = Api_outputs["category"]["many"][number]

export type PostList_section_Props = {
  selectedCategory_initial?: { id: number; label: Category_label } | null
  posts_initial: Api_outputs["post"]["list"]["fieldSet_main"]["items"]
  categories_initial: Category_model[]
  location_initial: number | null
  location_radius_initial: number | null
}

export default function Post_list_page({
  categories_initial,
  posts_initial,
  location_initial,
  location_radius_initial,
}: PostList_section_Props) {
  const [search, set_search] = useState<string | null>(null) // TODO: url param
  const [selectedLocation, set_selectedLocation] = use_cookie(
    "Post_list__location",
    location_initial,
  ) // TODO: url param
  const [selectedLocation_radius_km, set__selectedLocation_radius_km] = use_cookie(
    "Post_list__location_radius",
    location_radius_initial,
  )

  const categories_query = Api.category.many.useQuery(undefined, {
    initialData: categories_initial,
  })
  const searchParams = useSearchParams()

  const category_label_searchParam = searchParams.get("category")
  const selectedCategory_label =
    category_label_searchParam && Category_label_zod.parse(category_label_searchParam)
  const category_selected = categories_query.data?.find(c => c.label === selectedCategory_label)

  const setUrlParams_shallow = use_setUrlParams_shallow()

  const posts = Api.post.list.fieldSet_main.useInfiniteQuery(
    {
      categories: category_selected ? [category_selected.id] : [],
      search: search === null ? undefined : search,
      location: selectedLocation ?? undefined,
      location_radius: selectedLocation_radius_km ?? undefined,
    },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      // initialData: { pages: [posts_initial.items], pageParams: undefined },
    },
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

  // TODO: treba bit bolje, imaju dobri alati za query param state
  function onCategorySelect(category?: Category_model) {
    console.log(90, category)
    if (!category) {
      setUrlParams_shallow({ category: undefined })
      set_SectionsDrawer_isActive(false)
      return
    }
    setUrlParams_shallow({ category: category.label })
    if (!category.children?.length) set_SectionsDrawer_isActive(false)
  }

  const {} = useTheme()

  return (
    <>
      <Layout
        onlyContentScrollable
        header={
          <Post_list_page_header
            search={search}
            set_search={set_search}
            selectedCategory={category_selected}
            onShowCategories={() => set_SectionsDrawer_isActive(true)}
            selectedLocation={selectedLocation || null}
            set_selectedLocation={set_selectedLocation}
            selectedLocation_radius_km={selectedLocation_radius_km || null}
            set__selectedLocation_radius_km={set__selectedLocation_radius_km}
          />
        }
        contentWrapper_props={{
          sx: {
            mb: 1,
          },
          onScroll: handleScroll,
        }}
        content={
          posts_data ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.25,
                width: "100%",
                mt: 1,
                pl: 1,
                pr: 1.5,
              }}
            >
              {posts_data.map(item => (
                <Link key={item.id} href={`/post/${item.id}`} style={{ textDecoration: "none" }}>
                  {item.expertEndorsement ? (
                    <Post_listItem_personEndorsement
                      {...item.expertEndorsement}
                      location={item.location}
                    />
                  ) : (
                    <Post_listItem
                      {...item}
                      location={item.location?.name}
                      image={item.images?.find(i => i.isMain) || item.images?.[0]}
                    />
                  )}
                </Link>
              ))}
            </Box>
          ) : (
            <Typography>Učitavanje...</Typography>
          )
        }
        fab={({ sx }) => (
          <Fab color="primary" sx={sx} onClick={() => set_SectionsDrawer_isActive(true)}>
            <ManageSearchIcon />
          </Fab>
        )}
      />
      {sectionsDrawer_isActive && (
        <Drawer open onClose={() => set_SectionsDrawer_isActive(false)}>
          {categories_query.data && (
            <Categories_selector_aside
              categories={categories_query.data}
              selectedItem={category_selected?.id}
              onSelect={onCategorySelect}
              onBack={() => onCategorySelect(undefined)}
            />
          )}
        </Drawer>
      )}
    </>
  )
}
