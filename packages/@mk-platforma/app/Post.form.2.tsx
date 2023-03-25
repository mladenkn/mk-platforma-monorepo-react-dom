import { Box, SxProps, TextField } from "@mui/material"
import { Category, Post_Accommodation_zod, Post_Expert } from "./data/data.types"
import use_Post_form_base from "Post.form.2.base."
import { useCallback, useState } from "react"
import { eva } from "@mk-libs/common/common"
import CategoriesDropdown from "Categories.dropdown"
import { useFormik } from "formik"


type Props = {
  sx?: SxProps
}

export default function PostForm({ sx }: Props) {
  const baseForm = use_Post_form_base()

  const expertForm = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      skills: [] as string[],
    },
    onSubmit(){}
  })
  const isExpert = baseForm.control.values.categories.includes('personEndorsement')

  const {
    Label, Categories, Description, Location
  } = baseForm.components

  return (
    <Box>
      <Label sx={{ mb: 2 }} />
      <Categories />
      <Description />
      <Location />
      {isExpert ? (
        <>
          <TextField
            sx={sx}
            label="Ime"
            variant="outlined"
            name="firstName"
            value={expertForm.values.firstName}
            onChange={expertForm.handleChange}
          />
          <TextField
            sx={sx}
            label="Prezime"
            variant="outlined"
            name="lastName"
            value={expertForm.values.lastName}
            onChange={expertForm.handleChange}
          />
        </>
      ) : <></>}
    </Box>
  )
}
