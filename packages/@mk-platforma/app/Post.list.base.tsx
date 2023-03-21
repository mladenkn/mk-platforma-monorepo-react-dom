import { SearchRounded as SearchRoundedIcon } from "@mui/icons-material"
import { Input, Box, Paper, Dialog } from "@mui/material"
import { Layout1_list_sx } from "./layout1"
import { ComponentType, useMemo, useState } from "react"
import { asNonNil } from "@mk-libs/common/common"


type Item = {
  id: number
}

export type Section_base_Props<TItem extends Item> = {
  items: TItem[]
  Item: ComponentType<TItem>
  Item_details: ComponentType<TItem>
}

export default function Post_list_base<TItem extends Item>({ items, Item: ListItem, Item_details: ListItem_details }: Section_base_Props<TItem>){
  const [filter, setFilter] = useState('')
  const filteredItems = useMemo(() => items.filter(item => JSON.stringify(item).includes(filter)), [items, filter])

  const [_selectedItem, setSelectedItem] = useState<number>()
  const selectedItem = _selectedItem ? asNonNil(items.find(e => e.id === _selectedItem)) : undefined

  return (
    <>
      <Input
        sx={{ pb: 0.7, mb: 5 }}
        autoFocus
        placeholder="Pretraži"
        startAdornment={<SearchRoundedIcon sx={{ mr: 2 }} />}
        value= {filter}
        onChange={(e: any) => setFilter(e.target.value)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          py: 0.25,
          px: 1.25,
          overflowY: "auto",
          flex: 1,
          minHeight: 0,
        }}
      >
        {filteredItems.map(item => (
          <Paper
            key={item.id}
            sx={{ p: 3, display: 'flex', cursor: 'pointer' }}
            onClick={() => setSelectedItem(item.id)}
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
