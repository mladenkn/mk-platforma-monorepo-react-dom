import { Box } from "@mui/material"
import { Post_common_listItem_details } from "./Post.common.listItem"
import generateGatherings from "./data/data.gathering"


export default function Post_details_section(){
  return (
    <Box>
      <Post_common_listItem_details {...generateGatherings()[0]} />
    </Box>
  )
}
