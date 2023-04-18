import { withNoNils } from "@mk-libs/common/array"
import { Input, Box, Typography, Breadcrumbs } from "@mui/material"
import { useState } from "react"
import { mapQueryData } from "../utils"
import { CategoryIcon, getCategoryLabel, useCategory } from "./Categories.common"
import Api from "./trpc.client"

type Props = {}

export default function Query_editor({}: Props) {
  const [search, setSearch] = useState("")
  const [selectedCategory_id, set_selectedCategory] = useState<number>()

  const categories = Api.post.category.many.useQuery({
    search,
    parent: { id: selectedCategory_id },
  })

  const selectedCategory = useCategory(selectedCategory_id)
  const path = withNoNils(
    [selectedCategory.data, selectedCategory.data?.parent, selectedCategory.data?.parent?.parent]
      .filter(i => i)
      .reverse()
  )

  console.log(29, selectedCategory_id, selectedCategory, path, categories)

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Input placeholder="Pretraži" value={search} onChange={e => setSearch(e.target.value)} />
      <Breadcrumbs sx={{ mt: 4, ml: 0.5 }}>
        {path.map((category, index) => (
          <Typography
            key={category.id}
            variant="h5"
            sx={{ display: "flex", gap: 1.5 }}
            color="text.primary"
          >
            <CategoryIcon name={category.label} />
            {getCategoryLabel(category.label)}
          </Typography>
        ))}
      </Breadcrumbs>
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 1.5, ml: 0.5 }}>
        {categories.data?.map(category => (
          <Box
            key={category.id}
            sx={{ display: "flex", alignItems: "center", gap: 1.3 }}
            onClick={() => set_selectedCategory(category.id)}
          >
            <CategoryIcon name={category.label} />
            <Typography variant="h5">{getCategoryLabel(category.label)}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
