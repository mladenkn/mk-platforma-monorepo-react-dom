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
  ListItem: ComponentType<TItem>
  ListItem_details: ComponentType<TItem>
}

export default function Section_base<TItem extends Item>({ items, ListItem, ListItem_details }: Section_base_Props<TItem>){
  const [filter, setFilter] = useState('')
  const filteredItems = useMemo(() => items.filter(item => JSON.stringify(item).includes(filter)), [items, filter])

  const [_selectedItem, setSelectedItem] = useState<number>()
  const selectedItem = _selectedItem ? asNonNil(items.find(e => e.id === _selectedItem)) : undefined

  return (
    <>
      <Input
        sx={{ pb: 0.7, mb: 5, width: 350 }}
        autoFocus
        placeholder="Pretraži"
        startAdornment={<SearchRoundedIcon sx={{ mr: 2 }} />}
        value= {filter}
        onChange={(e: any) => setFilter(e.target.value)}
      />
      <Box sx={Layout1_list_sx}>
        {filteredItems.map(item => (
          <Paper
            key={item.id}
            sx={{ p: 3, display: 'flex', width: 600, cursor: 'pointer' }}
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
