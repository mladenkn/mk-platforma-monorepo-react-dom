import { Box, useTheme } from "@mui/material"
import PostForm from "./post.form"
import Header from './header'


export default function Post_create_section(){
  const theme = useTheme()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Header
        sx={{ mb: 5, }}
      />
      <Box sx={{ px: 3, }}>
        <Box sx={{ fontSize: 34, mb: 5 }}>Novi oglas</Box>
        <PostForm />
      </Box>
    </Box> 
  ) 
}
