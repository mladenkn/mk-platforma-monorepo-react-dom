import { OverridableProps } from "@mk-libs/react-common/types"
import { SearchRounded as SearchRoundedIcon } from "@mui/icons-material"
import { Accordion, AccordionSummary, AccordionDetails, Box, Input } from "@mui/material"
import { Layout1_list_sx } from "./layout1"
import { ReactElement, useState } from "react"
import { PageRoot } from "./common"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"


type Item = {
  id: number
}

type Props<TItem extends Item> = {
  pageRootProps: OverridableProps<typeof PageRoot, "activeTab">
  items: TItem[]
  renderListItem(item: TItem, isSelected: boolean): ReactElement
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
            <Accordion
              key={item.id}
              sx={{
                maxWidth: 600,
              }}
              expanded={isSelected}
              onChange={(e, isSelected) => setSelectedItem(isSelected ? item.id : undefined)}
            >
              <AccordionSummary sx={{ pl: 1.5, pb: 1 }} expandIcon={<ExpandMoreIcon />}>
                {renderListItem(item, isSelected)}
              </AccordionSummary>
              <AccordionDetails sx={{ ml: 16 }}>
                {renderDetails(item)}
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Box>
    </PageRoot>
  )
}
