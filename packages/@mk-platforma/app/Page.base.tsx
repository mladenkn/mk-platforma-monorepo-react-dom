import { asNonNil } from "@mk-libs/common/common"
import { OverridableProps } from "@mk-libs/react-common/types"
import { SearchRounded as SearchRoundedIcon } from "@mui/icons-material"
import { Input } from "@mui/material"
import { ReactElement, useState } from "react"
import { PageRoot } from "./common"


type Item = {
  id: number
}

type Props = {
  pageRootProps: OverridableProps<typeof PageRoot, "activeTab">
  children: ReactElement
  items: Item[]
}

export default function Page_base({ pageRootProps, children, items }: Props){
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
    </PageRoot>
  )
}
