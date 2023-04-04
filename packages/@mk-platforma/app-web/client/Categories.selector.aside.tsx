import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"

type Props = {}

export default function Categories_selector_aside({}: Props) {
  return (
    <List sx={{ background: "#2d5be3", pr: 3, height: "100%" }}>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText sx={{ color: "white" }} primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
