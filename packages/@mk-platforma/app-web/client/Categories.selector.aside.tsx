import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import { allCategories, getCategoryLabel, CategoryIcon } from "./Categories.common"

type Props = {}

export default function Categories_selector_aside({}: Props) {
  const { palette, typography } = useTheme()
  return (
    <List sx={{ background: palette.primary.main, pl: 1, pr: 3, height: "100%" }}>
      {allCategories.map(category => (
        <ListItem key={category} disablePadding>
          <ListItemButton href={`?/category=${category}`}>
            <ListItemIcon sx={{ color: "white" }}>
              <CategoryIcon sx={{ fontSize: typography.h3 }} name={category} />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "white", ".MuiListItemText-primary": { fontSize: typography.h5 } }}
              primary={getCategoryLabel(category)}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
