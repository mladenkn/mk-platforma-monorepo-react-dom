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
import { allCategories, getCategoryLabel, CategoryIcon } from "./Categories.common"

type Props = {}

export default function Categories_selector_aside({}: Props) {
  const { palette, typography } = useTheme()
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
        {allCategories.map(category => (
          <ListItem key={category} disablePadding>
            <ListItemButton href={`?category=${category}`} sx={{ px: 0 }}>
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
    </Box>
  )
}
