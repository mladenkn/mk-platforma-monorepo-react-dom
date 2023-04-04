import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { allCategories, getCategoryLabel, CategoryIcon } from "./Categories.common"

type Props = {}

export default function Categories_selector_aside({}: Props) {
  return (
    <List sx={{ background: "#2d5be3", pr: 3, height: "100%" }}>
      {allCategories.map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <CategoryIcon name={text} />
            </ListItemIcon>
            <ListItemText sx={{ color: "white" }} primary={getCategoryLabel(text)} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
