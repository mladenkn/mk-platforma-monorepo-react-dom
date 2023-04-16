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
} from "@mui/material"
import { getCategoryLabel, CategoryIcon } from "./Categories.common"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import React from "react"
import Api from "./trpc.client"
import { mapQueryData } from "../utils"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import type { Post_category_label } from "@prisma/client"
import { useRouter } from "next/router"

type Category = {
  id: number
  label: Post_category_label
}

type Props = { selectedItem?: number; onSelect?(id: Category): void; onBack(): void }

export default function Categories_selector_aside({
  selectedItem: selectedItem_id,
  onSelect,
  onBack,
}: Props) {
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
      return categories.data!.filter(category => category.parent?.id === selectedItem.parent?.id)
    else if (selectedItem?.children.length)
      return categories.data!.filter(category => category.parent?.id === selectedItem_id)
    else if (selectedItem) return categories.data!.filter(category => !category.parent)
  })

  const selectedItem_main = mapQueryData(selectedItem, selectedItem => {
    if (selectedItem?.children?.length) return selectedItem
    else if (cateogires_displayed.data![0].parent) return cateogires_displayed.data![0].parent
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
      {selectedItem_main.data ? (
        <Box
          sx={{
            mb: 2,
            mt: 4,
            display: "flex",
            alignItems: "center",
            ml: -1,
          }}
        >
          <IconButton sx={{ mr: 1.2 }} onClick={onBack}>
            <ArrowBackIosOutlinedIcon sx={{ color: "white" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderBottomColor: "white",
              borderBottomWidth: 2.5,
              borderBottomStyle: "solid",
              maxWidth: 200,
              flex: 1,
              pl: 1,
            }}
          >
            <CategoryIcon
              sx={{ fontSize: typography.h3, color: "white", mr: 2 }}
              name={selectedItem_main.data.label!}
            />
            <Typography sx={{ color: "white", fontSize: typography.h5 }}>
              {getCategoryLabel(selectedItem_main.data.label!)}
            </Typography>
          </Box>
        </Box>
      ) : (
        <></>
      )}
      <List sx={{ ml: 2, mt: 4 }} disablePadding>
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
            <ListItemButton sx={{ px: 0 }} onClick={() => onSelect && onSelect(category)}>
              <ListItemIcon sx={{ color: "white" }}>
                <CategoryIcon sx={{ fontSize: typography.h4 }} name={category.label} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "white", ".MuiListItemText-primary": { fontSize: typography.h6 } }}
                primary={getCategoryLabel(category.label)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
