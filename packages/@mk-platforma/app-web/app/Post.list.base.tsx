import { Box, Paper, Dialog, useTheme, useMediaQuery, SxProps } from "@mui/material"
import { ComponentType, useState } from "react"
import { asNonNil } from "@mk-libs/common/common"
import { useRouter } from "next/navigation"
import type { Id } from "../../api/data/data.types"

type Item = {
  id: Id
}

export type Section_base_Props<TItem extends Item> = {
  items: TItem[]
  Item: ComponentType<TItem>
  Item_details: ComponentType<TItem & { sx?: SxProps }>
}

export default function Post_list_base<TItem extends Item>({
  items,
  Item,
  Item_details,
}: Section_base_Props<TItem>) {
  const [_selectedItem, setSelectedItem] = useState<Id>()
  const selectedItem = _selectedItem ? asNonNil(items.find(e => e.id === _selectedItem)) : undefined

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")) // TODO

  const router = useRouter()
  function onItemClick(item: Item) {
    if (isMobile) router.push(`/post/${item.id}`)
    else setSelectedItem(item.id)
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflowY: "auto",
          flex: 1,
          minHeight: 0,
          width: "100%",
        }}
      >
        {items.map(item => (
          <Paper
            key={item.id}
            sx={{ p: 1.5, display: "flex", cursor: "pointer", borderRadius: 2 }}
            onClick={() => onItemClick(item)}
          >
            <Item {...item} />
          </Paper>
        ))}
      </Box>
      {selectedItem && (
        <Dialog open onClose={() => setSelectedItem(undefined)} maxWidth="lg">
          <Item_details sx={{ p: 3 }} {...selectedItem} />
        </Dialog>
      )}
    </>
  )
}
