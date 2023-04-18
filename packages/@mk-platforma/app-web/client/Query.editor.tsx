import { Input, Box, Typography } from "@mui/material"
import { useState } from "react"
import { CategoryIcon, getCategoryLabel } from "./Categories.common"
import Api from "./trpc.client"

type Props = {}

export default function Query_editor({}: Props) {
  const [search, setSearch] = useState("")
  const categories = Api.post.category.many.useQuery({ search })
  return (
    <>
      <Input placeholder="Pretraži" value={search} onChange={e => setSearch(e.target.value)} />
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 1.5, ml: 0.5 }}>
        {categories.data?.map(category => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.3 }}>
            <CategoryIcon name={category.label} />
            <Typography variant="h5">{getCategoryLabel(category.label)}</Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}
