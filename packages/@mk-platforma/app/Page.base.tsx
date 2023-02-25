import { OverridableProps } from "@mk-libs/react-common/types"
import { SearchRounded as SearchRoundedIcon } from "@mui/icons-material"
import { Input, Box, Paper } from "@mui/material"
import { Layout1_list_sx } from "./layout1"
import { ReactElement, useState } from "react"
import { PageRoot } from "./common"


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
  const [selectedItem, setSelectedItem] = useState<number>()

  return (
    <PageRoot {...pageRootProps}>
      <Input
        sx={{ pb: 0.7, mb: 5, width: 350 }}
        autoFocus
        placeholder="Pretraži majstore"
        startAdornment={<SearchRoundedIcon sx={{ mr: 2 }} />}
      />
      <Box sx={Layout1_list_sx}>
        {items.map(item => {
          const isSelected = selectedItem === item.id
          return (
            <Paper
              key={item.id}
              sx={{ p: 3, display: 'flex', flex: 1, width: 600, }}
              onClick={() => setSelectedItem(item.id)}
            >
              {renderListItem(item)}
            </Paper>
          )
        })}
      </Box>
    </PageRoot>
  )
}
