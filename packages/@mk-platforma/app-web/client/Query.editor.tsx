import { withNoNils } from "@mk-libs/common/array"
import { Input, Box, Typography, Breadcrumbs, IconButton, useTheme } from "@mui/material"
import { useState } from "react"
import { CategoryIcon, getCategoryLabel, useCategory } from "./Categories.common"
import Api from "./trpc.client"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import SearchIcon from "@mui/icons-material/Search"
import { Categories_selector_aside_CategoryModel } from "./Categories.selector.aside"

type Props = {
  search: string
  setSearch(s: string): void
  selectedCategory?: number
  set_selectedCategory(
    c?: Omit<Categories_selector_aside_CategoryModel, "parent" | "children">
  ): void
}

export default function Query_editor({
  search,
  setSearch,
  selectedCategory: selectedCategory_id,
  set_selectedCategory,
}: Props) {
  const filteredCategories = Api.post.category.many.useQuery({
    search,
    parent: selectedCategory_id ? { id: selectedCategory_id } : null,
  })

  const selectedCategory = useCategory(selectedCategory_id)
  const path = withNoNils(
    [
      selectedCategory.data,
      selectedCategory.data?.parent,
      selectedCategory.data?.parent?.parent,
    ].reverse()
  )

  function onBack() {
    set_selectedCategory(selectedCategory.data?.parent || undefined)
  }

  const { typography, spacing } = useTheme()

  return (
    <Box sx={{ display: "flex", flexDirection: "column", pl: 1, pr: 2 }}>
      <Input
        placeholder="Pretraži"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ color: "white", mb: 0.0, fontSize: typography.h5 }}
        disableUnderline
        startAdornment={<SearchIcon sx={{ mr: 2 }} />}
      />
      <Box sx={{ background: "white", height: spacing(0.1), mb: 3, color: "white" }} />
      {path.length ? (
        <Box sx={{ display: "flex", alignItems: "center", ml: -1, gap: 1.5, mb: 2 }}>
          <IconButton sx={{ color: "white" }} onClick={onBack}>
            <ArrowBackIosOutlinedIcon fontSize="small" />
          </IconButton>
          <Breadcrumbs
            separator={
              <Box sx={{ color: "white", fontSize: typography.h4, fontWeight: 900, mx: 0.5 }}>
                /
              </Box>
            }
          >
            {path.map(category => (
              <Typography
                key={category.id}
                variant="h5"
                sx={{
                  display: "flex",
                  gap: 1.5,
                  alignItems: "center",
                  color: "white",
                }}
                color="text.primary"
              >
                <CategoryIcon sx={{ color: "white" }} fontSize="medium" name={category.label} />
                {getCategoryLabel(category.label)}
              </Typography>
            ))}
          </Breadcrumbs>
        </Box>
      ) : (
        <></>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, ml: 2 }}>
        {filteredCategories.data?.map(category => (
          <Box
            key={category.id}
            sx={{ display: "flex", alignItems: "center", gap: 1.3, cursor: "pointer" }}
            onClick={() => set_selectedCategory(category)}
          >
            <CategoryIcon sx={{ color: "white" }} name={category.label} />
            <Typography sx={{ color: "white" }} variant="h5">
              {getCategoryLabel(category.label)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
