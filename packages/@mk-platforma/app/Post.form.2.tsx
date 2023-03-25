import { Box, SxProps } from "@mui/material"
import { Category, Post_Accommodation_zod, Post_Expert } from "./data/data.types"
import use_Post_form_base from "Post.form.base.2"
import { useCallback, useState } from "react"
import { eva } from "@mk-libs/common/common"
import CategoriesDropdown from "Categories.dropdown"


type Props = {
  sx?: SxProps
}

export default function PostForm({ sx }: Props) {
  const baseForm = use_Post_form_base()

  return (
    <Box>
    </Box>
  )
}
