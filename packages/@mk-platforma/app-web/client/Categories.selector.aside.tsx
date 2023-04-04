import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import { allCategories, getCategoryLabel, CategoryIcon } from "./Categories.common"

type Props = {}

export default function Categories_selector_aside({}: Props) {
  const { palette } = useTheme()
  return (
    <List sx={{ background: palette.primary.main, pr: 3, height: "100%" }}>
      {allCategories.map(category => (
        <ListItem key={category} disablePadding>
          <ListItemButton href={`?/category=${category}`}>
            <ListItemIcon sx={{ color: "white" }}>
              <CategoryIcon name={category} />
            </ListItemIcon>
            <ListItemText sx={{ color: "white" }} primary={getCategoryLabel(category)} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
