import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Box,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material"
import { getCategoryLabel, CategoryIcon } from "./Categories.common"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import React, { ReactNode } from "react"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import type { Prisma } from "@prisma/client"
import { eva } from "@mk-libs/common/common"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export const Categories_selector_aside_Category_queryParams = {
  select: {
    id: true,
    label: true,
    parent: {
      select: {
        id: true,
        label: true,
      },
    },
  },
} satisfies Prisma.Post_categoryArgs

export type Categories_selector_aside_CategoryModelCategory = Prisma.Post_categoryGetPayload<
  typeof Categories_selector_aside_Category_queryParams
>

type Props = {
  categories: Categories_selector_aside_CategoryModelCategory[]
  selectedItem?: number
  onSelect?(c: Categories_selector_aside_CategoryModelCategory): void
  onBack(): void
}

export default function Categories_selector_aside({
  selectedItem: selectedItem_id,
  onSelect,
  onBack,
  categories,
}: Props) {
  const { palette, typography } = useTheme()

  const selectedItem = eva(() => {
    const selectedItem = categories.find(c => c.id === selectedItem_id)
    return selectedItem
      ? {
          ...selectedItem,
          children: categories.filter(c => c.parent?.id === selectedItem_id),
        }
      : undefined
  })

  const cateogires_displayed = eva(() => {
    if (selectedItem?.parent)
      return categories.filter(category => category.parent?.id === selectedItem.parent?.id)
    else if (selectedItem?.children.length)
      return categories.filter(category => category.parent?.id === selectedItem_id)
    else if (selectedItem) return categories.filter(category => !category.parent)
    else return categories.filter(c => !c.parent)
  })

  const selectedItem_main = eva(() => {
    if (selectedItem?.children?.length) return selectedItem
    else if (cateogires_displayed?.length && cateogires_displayed[0].parent)
      return cateogires_displayed[0].parent
    else return null
  })

  function getChildrenOf(id: number) {
    return categories.filter(c => c.parent?.id === id)
  }

  function renderCategory(
    category: Omit<Categories_selector_aside_CategoryModelCategory, "parent">,
    startAdornament?: ReactNode,
    endAdornament?: ReactNode
  ) {
    return (
      <ListItem key={category.id} disablePadding secondaryAction={endAdornament}>
        <ListItemButton sx={{ px: 0 }} onClick={() => onSelect && onSelect(category as any)}>
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
      <a style={{ color: "white", textDecoration: "none" }} href="/">
        <Typography variant="h2" fontWeight={400}>
          ZaBrata
        </Typography>
        <Box sx={{ color: "white" }}>
          <Typography variant="h4" fontWeight={400}>
            Loza kontribucionizma
          </Typography>
        </Box>
      </a>
      <List sx={{ mt: 4 }} disablePadding>
        {rootItem ? (
          renderCategory(
            rootItem,
            <IconButton onClick={onBack}>
              <ArrowBackIosOutlinedIcon sx={{ color: "white", mr: 2 }} />
            </IconButton>,
            <ExpandMoreIcon />
          )
        ) : (
          <></>
        )}
        {selectedItem?.parent ? (
          <>
            <Collapse in={true} timeout="auto" unmountOnExit sx={{ pl: 4 }}>
              <List component="div" disablePadding>
                {getChildrenOf(selectedItem.parent!.id).map(c => renderCategory(c))}
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
        {!selectedItem || !selectedItem?.children || selectedItem?.parent ? (
          categories.filter(c => !c.parent).map(c => renderCategory(c))
        ) : (
          <></>
        )}
      </List>
    </Box>
  )
}
