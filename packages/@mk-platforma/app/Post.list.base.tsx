import { SearchRounded as SearchRoundedIcon } from "@mui/icons-material"
import { Input, Box, Paper, Dialog } from "@mui/material"
import { ComponentType, useMemo, useState } from "react"
import { asNonNil } from "@mk-libs/common/common"
import { useRouter } from "next/navigation"

type Item = {
  id: number
}

export type Section_base_Props<TItem extends Item> = {
  items: TItem[]
  Item: ComponentType<TItem>
  Item_details: ComponentType<TItem>
}

export default function Post_list_base<TItem extends Item>({
  items,
  Item: ListItem,
  Item_details: ListItem_details,
}: Section_base_Props<TItem>) {
  const [filter, setFilter] = useState("")
  const filteredItems = useMemo(
    () => items.filter(item => JSON.stringify(item).includes(filter)),
    [items, filter]
  )

  const [_selectedItem, setSelectedItem] = useState<number>()
  const selectedItem = _selectedItem ? asNonNil(items.find(e => e.id === _selectedItem)) : undefined

  const isMobile = true // TODO
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
        {filteredItems.map(item => (
          <Paper
            key={item.id}
            sx={{ p: 1.5, display: "flex", cursor: "pointer", borderRadius: 2 }}
            onClick={() => onItemClick(item)}
          >
            <ListItem {...item} />
          </Paper>
        ))}
      </Box>
      {selectedItem && (
        <Dialog open onClose={() => setSelectedItem(undefined)}>
          <ListItem_details {...selectedItem} />
        </Dialog>
      )}
    </>
  )
}
