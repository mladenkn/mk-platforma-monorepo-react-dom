import { OverridableProps } from "@mk-libs/react-common/types"
import { SearchRounded as SearchRoundedIcon } from "@mui/icons-material"
import { Input, Box, Paper, Dialog } from "@mui/material"
import { Layout1_list_sx } from "./layout1"
import { ReactElement, useState } from "react"
import { PageRoot } from "./common"
import { asNonNil } from "@mk-libs/common/common"


type Item = {
  id: number
}

type Props<TItem extends Item> = {
  pageRootProps: OverridableProps<typeof PageRoot, "activeTab">
  items: TItem[]
  renderListItem(item: TItem): ReactElement
  renderDetails(item: TItem): ReactElement
}

export default function Page_base<TItem extends Item>({ pageRootProps, items, renderListItem, renderDetails }: Props<TItem>){
  const [_selectedItem, setSelectedItem] = useState<number>()
  const selectedItem = _selectedItem ? asNonNil(items.find(e => e.id === _selectedItem)) : undefined

  return (
    <PageRoot {...pageRootProps}>
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
            sx={{ p: 3, display: 'flex', flex: 1, width: 600, }}
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
    </PageRoot>
  )
}
