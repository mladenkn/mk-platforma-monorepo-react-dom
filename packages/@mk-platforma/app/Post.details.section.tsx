import { Post_common_details } from "./Post.common.listItem"
import { useRouter } from "next/router"
import Header from "./Header"
import { Box, IconButton } from "@mui/material"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import trpc from "./trpc"
import EditIcon from "@mui/icons-material/Edit"

export default function Post_details_section() {
  const router = useRouter()
  const itemId = parseInt(router.query.id as string)!
  const post = trpc.post_single.useQuery({ id: itemId })
  return (
    <Box>
      <Header
        right={
          <a href="/" style={{ textDecoration: "none" }}>
            <IconButton sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ color: "white", fontSize: 20 }}>Oglasi</Box>
              <ListAltOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </a>
        }
      />
      {post.data ? (
        <Post_common_details
          {...(post.data as any)}
          label_right={
            <IconButton>
              <EditIcon />
            </IconButton>
          }
        />
      ) : "Učitavanje..."}
    </Box>
  )
}
