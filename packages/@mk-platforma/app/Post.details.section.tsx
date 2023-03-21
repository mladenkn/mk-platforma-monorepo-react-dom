import { Post_common_listItem_details } from "./Post.common.listItem"
import data from "./data/data.json"
import { useRouter } from 'next/router'
import Header from "./Header"
import { Box, IconButton } from "@mui/material"
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'


export default function Post_details_section(){
  const router = useRouter()
  const itemId = parseInt(router.query.id as string)!
  const item = data.gatherings.find(g => g.id === itemId)
  return (
    <Box>
      <Header
        right={
          <a href="/" style={{ textDecoration: 'none', }}>
            <IconButton sx={{ display: 'flex', gap: 1, }}>
              <Box sx={{ color: 'white', fontSize: 20, }}>Oglasi</Box>
              <ListAltOutlinedIcon sx={{ color: 'white' }} />
            </IconButton>
          </a>
        }
      />
      {item ? <Post_common_listItem_details {...item!} /> : 'Objava nije pronađena'}
    </Box>    
  )
}
