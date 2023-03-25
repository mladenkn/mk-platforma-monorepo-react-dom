import { Box, SxProps } from "@mui/material"
import { Category, Post_Accommodation_zod, Post_Expert } from "./data/data.types"
import use_Post_form_base from "Post.form.2.base."
import { useCallback, useState } from "react"
import { eva } from "@mk-libs/common/common"
import CategoriesDropdown from "Categories.dropdown"
import { useFormik } from "formik"


type Props = {
  sx?: SxProps
}

const form_baseProps = {
  label: true,
  description: true,
  photos: true,
  categories: true,
}

export default function PostForm({ sx }: Props) {
  const baseForm = use_Post_form_base()
  const accommodationForm = useFormik({
    initialValues: {
      location: '',
    },
    onSubmit(){}
  })

  return (
    <Box>
      <baseForm.components.Label sx={{ mb: 2 }} />
      <baseForm.components.Categories />
      <baseForm.components.Description />
    </Box>
  )
}
