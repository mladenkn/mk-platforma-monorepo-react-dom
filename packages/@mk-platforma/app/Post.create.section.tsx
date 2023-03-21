import { Box, colors, useTheme } from "@mui/material"
import PostForm from "./post.form"
import Header from './header'


export default function Post_create_section(){
  const theme = useTheme()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Header
        sx={{ mb: 4, }}
        right={
          <Box sx={{ fontSize: 25, color: colors.pink[100] }}>Novi oglas</Box>
        }
      />
      <PostForm />
    </Box> 
  ) 
}
