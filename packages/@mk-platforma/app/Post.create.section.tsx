import { Box, IconButton, colors, useTheme } from "@mui/material"
import PostForm from "./post.form"
import Header from './header'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

export default function Post_create_section(){
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Header
        sx={{ mb: 5, }}
        right={
          <IconButton sx={{ display: 'flex', gap: 1, }}>
            <Box sx={{ color: 'white', fontSize: 20, }}>Oglasi</Box>
            <ListAltOutlinedIcon sx={{ color: 'white' }} />
          </IconButton>
        }
      />
      <Box sx={{ px: 3, }}>
        <Box sx={{ fontSize: 38, mb: 5 }}>Novi oglas</Box>
        <PostForm />
      </Box>
    </Box> 
  ) 
}
