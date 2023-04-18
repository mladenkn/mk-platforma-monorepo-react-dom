import { withNoNils } from "@mk-libs/common/array"
import { Input, Box, Typography, Breadcrumbs, IconButton } from "@mui/material"
import { useState } from "react"
import { CategoryIcon, getCategoryLabel, useCategory } from "./Categories.common"
import Api from "./trpc.client"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import SearchIcon from "@mui/icons-material/Search"

type Props = {}

export default function Query_editor({}: Props) {
  const [search, setSearch] = useState("")
  const [selectedCategory_id, set_selectedCategory] = useState<number>()

  const filteredCategories = Api.post.category.many.useQuery({
    search,
    parent: { id: selectedCategory_id },
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
    set_selectedCategory(selectedCategory.data?.parent?.id)
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", pl: 1, pr: 2 }}>
      <Input
        placeholder="Pretraži"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ color: "white", mb: 0.5 }}
        disableUnderline
        startAdornment={<SearchIcon sx={{ mr: 2 }} />}
      />
      <Box sx={{ background: "white", height: 1.1, mb: 3, color: "white" }} />
      {path.length ? (
        <Box sx={{ display: "flex", alignItems: "center", ml: -1, gap: 1.5, mb: 2 }}>
          <IconButton sx={{ color: "white" }} onClick={onBack}>
            <ArrowBackIosOutlinedIcon />
          </IconButton>
          <Breadcrumbs>
            {path.map((category, index) => (
              <Typography
                key={category.id}
                variant="h4"
                sx={{ display: "flex", gap: 1.5, alignItems: "center", color: "white" }}
                color="text.primary"
              >
                <CategoryIcon sx={{ color: "white" }} fontSize="large" name={category.label} />
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
            sx={{ display: "flex", alignItems: "center", gap: 1.3 }}
            onClick={() => set_selectedCategory(category.id)}
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
