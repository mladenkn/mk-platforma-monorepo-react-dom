import { Box } from "@mui/material";
import PostForm from "./post.form";

export default function Post_create_section(){
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', }}>
      <PostForm />
    </Box> 
  ) 
}