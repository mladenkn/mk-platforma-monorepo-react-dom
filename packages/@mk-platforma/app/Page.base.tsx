import { asNonNil } from "@mk-libs/common/common"
import { OverridableProps } from "@mk-libs/react-common/types"
import { SearchRounded as SearchRoundedIcon } from "@mui/icons-material"
import { Box, Input } from "@mui/material"
import { Layout1_list_sx } from "./layout1"
import { ReactElement, useState } from "react"
import { PageRoot } from "./common"


type Item = {
  id: number
}

type Props<TItem extends Item> = {
  pageRootProps: OverridableProps<typeof PageRoot, "activeTab">
  items: TItem[]
  renderItem(items: TItem, setSelectedItem: (item?: number) => void, selectedItem?: number): ReactElement
}

export default function Page_base<TItem extends Item>({ pageRootProps, items, renderItem }: Props<TItem>){
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
        {items.map(item => renderItem(item, setSelectedItem, selectedItem))}
      </Box>
    </PageRoot>
  )
}
