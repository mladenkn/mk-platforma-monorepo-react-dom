import { Box } from "@mui/material"
import PostForm from "./post.form"
import Header from './header'


export default function Post_create_section(){
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Header sx={{ mb: 4, }} />
      <PostForm />
    </Box> 
  ) 
}
