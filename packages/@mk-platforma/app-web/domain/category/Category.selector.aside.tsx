import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Box,
  IconButton,
  Collapse,
} from "@mui/material"
import { getCategoryLabel, CategoryIcon } from "./Category.common"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import React, { ReactNode } from "react"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import { eva } from "@mk-libs/common/common"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import type { Api_outputs } from "~/api_/api.infer"
import { LogoLink } from "~/domain/common"

type Category_model = Api_outputs["category"]["single"]

type Props = {
  categories: Category_model[]
  selectedItem?: number
  onSelect?(c: Category_model): void
  onBack(): void
}

export default function Categories_selector_aside({
  selectedItem: selectedItem_id,
  onSelect,
  onBack,
  categories,
}: Props) {
  const { palette, typography, breakpoints } = useTheme()

  const selectedItem = eva(() => {
    const selectedItem = categories.find(c => c.id === selectedItem_id)
    return selectedItem
      ? {
          ...selectedItem,
          children: categories.filter(c => c.parent?.id === selectedItem_id),
        }
      : undefined
  })

  function getChildrenOf(id: number) {
    return categories.filter(c => c.parent?.id === id)
  }

  function renderCategory(
    category: Category_model,
    startAdornament?: ReactNode,
    endAdornament?: ReactNode,
  ) {
    return (
      <ListItem key={category.id} disablePadding secondaryAction={endAdornament}>
        <ListItemButton sx={{ px: 0 }} onClick={() => onSelect && onSelect(category)}>
          {startAdornament}
          <ListItemIcon>
            <CategoryIcon sx={{ fontSize: typography.h3, color: "white" }} name={category.label} />
          </ListItemIcon>
          <ListItemText
            sx={{ color: "white", ".MuiListItemText-primary": { fontSize: typography.h5 } }}
            primary={getCategoryLabel(category.label)}
          />
        </ListItemButton>
      </ListItem>
    )
  }

  const rootItem = eva(() => {
    if (selectedItem?.children?.length) return selectedItem
    else selectedItem?.parent
    return selectedItem?.parent
  })

  return (
    <Box sx={{ background: palette.primary.main, height: "100%", p: 3 }}>
      <LogoLink />
      <List sx={{ mt: 4 }} disablePadding>
        {rootItem ? (
          renderCategory(
            rootItem as any,
            <IconButton
              onClick={e => {
                onBack()
                e.stopPropagation()
              }}
            >
              <ArrowBackIosOutlinedIcon sx={{ color: "white", mr: 2 }} />
            </IconButton>,
            <ExpandMoreIcon sx={{ color: "white" }} />,
          )
        ) : (
          <></>
        )}
        {selectedItem?.parent ? (
          <>
            <Collapse in={true} timeout="auto" unmountOnExit sx={{ pl: 4 }}>
              <List component="div" disablePadding>
                {getChildrenOf(selectedItem.parent!.id).map(category =>
                  renderCategory(
                    category,
                    undefined,
                    selectedItem?.id === category.id ? (
                      <RadioButtonCheckedIcon sx={{ color: "white" }} />
                    ) : (
                      <></>
                    ),
                  ),
                )}
              </List>
            </Collapse>
          </>
        ) : (
          <></>
        )}
        {selectedItem?.children.length ? (
          <>
            <Collapse in={true} timeout="auto" unmountOnExit sx={{ pl: 4 }}>
              <List component="div" disablePadding>
                {selectedItem?.children?.map(c => renderCategory(c))}
              </List>
            </Collapse>
          </>
        ) : (
          <></>
        )}
        {!selectedItem || (selectedItem?.children?.length === 0 && !selectedItem?.parent) ? (
          categories
            .filter(c => !c.parent)
            .map(category =>
              renderCategory(
                category,
                undefined,
                selectedItem?.id === category.id ? (
                  <RadioButtonCheckedIcon sx={{ color: "white" }} />
                ) : undefined,
              ),
            )
        ) : (
          <></>
        )}
      </List>
    </Box>
  )
}
