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
import type { Post_category_labelType } from "../prisma/generated/zod"
import { allCategories, getCategoryLabel, CategoryIcon } from "./Categories.common"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import React from "react"
import Api from "./trpc.client"

type Props = { selectedItem?: Post_category_labelType }

export default function Categories_selector_aside({ selectedItem }: Props) {
  const { palette, typography } = useTheme()
  const categories = Api.post.category.many.useQuery()
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
        {categories.isLoading && "Učitavanje..."}
        {categories.data?.map(category => (
          <ListItem
            key={category.id}
            disablePadding
            secondaryAction={
              selectedItem === category.label ? (
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
