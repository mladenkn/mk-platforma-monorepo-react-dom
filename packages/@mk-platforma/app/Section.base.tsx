import { OverridableProps } from "@mk-libs/react-common/types"
import { SearchRounded as SearchRoundedIcon } from "@mui/icons-material"
import { Input, Box, Paper, Dialog } from "@mui/material"
import { Layout1_list_sx } from "./layout1"
import { ReactElement, useState } from "react"
import { Section_layout } from "./common"
import { asNonNil } from "@mk-libs/common/common"


type Item = {
  id: number
}

type Props<TItem extends Item> = {
  pageRootProps: OverridableProps<typeof Section_layout, "activeTab">
  items: TItem[]
  renderListItem(item: TItem): ReactElement
  renderDetails(item: TItem): ReactElement
}

export default function Section_base<TItem extends Item>({ pageRootProps, items, renderListItem, renderDetails }: Props<TItem>){
  const [_selectedItem, setSelectedItem] = useState<number>()
  const selectedItem = _selectedItem ? asNonNil(items.find(e => e.id === _selectedItem)) : undefined

  return (
    <Section_layout {...pageRootProps}>
      <Input
        sx={{ pb: 0.7, mb: 5, width: 350 }}
        autoFocus
        placeholder="Pretraži majstore"
        startAdornment={<SearchRoundedIcon sx={{ mr: 2 }} />}
      />
      <Box sx={Layout1_list_sx}>
        {items.map(item => (
          <Paper
            key={item.id}
            sx={{ p: 3, display: 'flex', flex: 1, width: 600, cursor: 'pointer' }}
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
    </Section_layout>
  )
}
