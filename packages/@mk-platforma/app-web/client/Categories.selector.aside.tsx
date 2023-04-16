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
import React from "react"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import type { Prisma } from "@prisma/client"
import { eva } from "@mk-libs/common/common"

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
      <List sx={{ mt: 4, ml: 1 }} disablePadding>
        {categories
          .filter(c => !c.parent)
          .map(category => (
            <ListItem
              key={category.id}
              disablePadding
              secondaryAction={
                selectedItem?.id === category.id ? (
                  <RadioButtonCheckedIcon sx={{ color: "white" }} />
                ) : undefined
              }
            >
              <ListItemButton sx={{ px: 0 }} onClick={() => onSelect && onSelect(category)}>
                <ListItemIcon sx={{ color: "white" }}>
                  <CategoryIcon sx={{ fontSize: typography.h3 }} name={category.label} />
                </ListItemIcon>
                <ListItemText
                  sx={{ color: "white", ".MuiListItemText-primary": { fontSize: typography.h5 } }}
                  primary={getCategoryLabel(category.label)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        {selectedItem?.children?.length ? (
          <Collapse in={true} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <CategoryIcon sx={{ fontSize: typography.h3 }} name={selectedItem.label} />
                </ListItemIcon>
                <ListItemText primary={getCategoryLabel(selectedItem.label)} />
              </ListItemButton>
            </List>
          </Collapse>
        ) : (
          <></>
        )}
      </List>
    </Box>
  )
}
