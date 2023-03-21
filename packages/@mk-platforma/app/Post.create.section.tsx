import { Box, IconButton, SxProps } from "@mui/material"
import PostForm from "./Post.form"
import Header from './Header'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'


type Props = {
  sx?: SxProps
}

export default function Post_create_section({ sx }: Props){
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', ...sx }}>
      <Header
        sx={{ mb: 5, }}
        right={
          <a href="/" style={{ textDecoration: 'none', }}>
            <IconButton sx={{ display: 'flex', gap: 1, }}>
              <Box sx={{ color: 'white', fontSize: 20, }}>Oglasi</Box>
              <ListAltOutlinedIcon sx={{ color: 'white' }} />
            </IconButton>
          </a>
        }
      />
      <Box sx={{ px: 3, }}>
        <Box sx={{ fontSize: 38, mb: 5 }}>Novi oglas</Box>
        <PostForm />
      </Box>
    </Box> 
  ) 
}
