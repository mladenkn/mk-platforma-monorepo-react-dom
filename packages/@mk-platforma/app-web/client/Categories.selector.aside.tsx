import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Box,
  Typography,
} from "@mui/material"
import { getCategoryLabel, CategoryIcon } from "./Categories.common"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import React from "react"
import Api from "./trpc.client"
import { mapQueryData } from "../utils"

type Props = { selectedItem?: number }

export default function Categories_selector_aside({ selectedItem: selectedItem_id }: Props) {
  const { palette, typography } = useTheme()
  const categories = Api.post.category.many.useQuery()

  const selectedItem = mapQueryData(categories, categories => {
    const selectedItem = categories.find(c => c.id === selectedItem_id)
    return {
      ...selectedItem,
      children: categories.filter(c => c.parent?.id === selectedItem_id),
    }
  })

  const cateogires_displayed = mapQueryData(selectedItem, selectedItem => {
    if (selectedItem?.parent)
      return categories.data!.filter(category => category.id === selectedItem.parent?.id)
    else if (selectedItem.children.length)
      return categories.data!.filter(category => category.parent?.id === selectedItem_id)
    else if (selectedItem) return categories.data!.filter(category => !category.parent)
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
      {selectedItem.data?.children?.length ? (
        <Box sx={{ display: "flex", alignItems: "center", mt: 4, mb: 1, ml: 1 }}>
          <CategoryIcon
            sx={{ fontSize: typography.h3, color: "white", mr: 1 }}
            name={selectedItem.data.label!}
          />
          <Typography sx={{ color: "white", fontSize: typography.h5 }}>
            {getCategoryLabel(selectedItem.data.label!)}
          </Typography>
        </Box>
      ) : (
        <></>
      )}
      <List sx={{ ml: 1 }} disablePadding>
        {cateogires_displayed.isLoading && "Učitavanje..."}
        {cateogires_displayed.data?.map(category => (
          <ListItem
            key={category.id}
            disablePadding
            secondaryAction={
              selectedItem_id === category.id ? (
                <RadioButtonCheckedIcon sx={{ color: "white" }} />
              ) : undefined
            }
          >
            <ListItemButton href={`?category=${category.label}`} sx={{ px: 0 }}>
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
      </List>
    </Box>
  )
}
