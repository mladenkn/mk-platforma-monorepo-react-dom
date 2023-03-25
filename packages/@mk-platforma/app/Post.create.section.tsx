import { Box, IconButton, SxProps } from "@mui/material"
import Header from "./Header"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import use_Post_form from "./Post.form.2"

type Props = {
  sx?: SxProps
}

export default function Post_create_section({ sx }: Props) {
  const form = use_Post_form({  })

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", ...sx }}>
      <Header
        sx={{ mb: 5 }}
        right={
          <a href="/" style={{ textDecoration: "none" }}>
            <IconButton sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ color: "white", fontSize: 20 }}>Oglasi</Box>
              <ListAltOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </a>
        }
      />
      <Box sx={{ px: 3 }}>
        <Box sx={{ fontSize: 38, mb: 5 }}>Novi oglas</Box>
        <form.baseForm.components.Label />
        <form.baseForm.components.Categories />
        <form.baseForm.components.Description />
        <form.baseForm.components.Location />
        {form.expertForm.isActive ? (
          <>
            <form.expertForm.components.FirstName />
            <form.expertForm.components.LastName />
            <form.expertForm.components.Skills />    
          </>
        ) : <></>}
      </Box>
    </Box>
  )
}
