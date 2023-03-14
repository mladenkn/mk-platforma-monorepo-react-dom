import { OverridableProps } from "@mk-libs/react-common/types"
import { SearchRounded as SearchRoundedIcon } from "@mui/icons-material"
import { Input, Box, Paper, Dialog } from "@mui/material"
import { Layout1_list_sx } from "./layout1"
import { ReactElement, useMemo, useState } from "react"
import { ZaBrata_MK_root } from "./ZaBrata.MK.root"
import { asNonNil } from "@mk-libs/common/common"


type Item = {
  id: number
}

type Props<TItem extends Item> = {
  pageRootProps: OverridableProps<typeof ZaBrata_MK_root, "activeTab">
  items: TItem[]
  renderListItem(item: TItem): ReactElement
  renderDetails(item: TItem): ReactElement
}

export default function Section_base<TItem extends Item>({ pageRootProps, items, renderListItem, renderDetails }: Props<TItem>){
  const [filter, setFilter] = useState('')
  const filteredItems = useMemo(() => items.filter(item => JSON.stringify(item).includes(filter)), [items, filter])

  const [_selectedItem, setSelectedItem] = useState<number>()
  const selectedItem = _selectedItem ? asNonNil(items.find(e => e.id === _selectedItem)) : undefined

  return (
    <ZaBrata_MK_root {...pageRootProps}>
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
            {renderListItem(item)}
          </Paper>
        ))}
      </Box>
      {selectedItem && (
        <Dialog open onClose={() => setSelectedItem(undefined)}>
          {renderDetails(selectedItem)}
        </Dialog>
      )}
    </ZaBrata_MK_root>
  )
}
