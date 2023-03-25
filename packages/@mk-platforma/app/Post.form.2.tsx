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

export default function use_Post_form({ sx }: Props) {
  const baseForm = use_Post_form_base()

  const expertForm = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      skills: [] as string[],
    },
    onSubmit(){}
  })

  const Expert_firstName = useCallback(() => (
    <TextField
      sx={sx}
      label="Ime"
      variant="outlined"
      name="firstName"
      value={expertForm.values.firstName}
      onChange={expertForm.handleChange}
    />
  ), [expertForm.values.firstName, expertForm.handleChange])

  const Expert_lastName = useCallback(() => (
    <TextField
      sx={sx}
      label="Prezime"
      variant="outlined"
      name="firstName"
      value={expertForm.values.lastName}
      onChange={expertForm.handleChange}
    />
  ), [expertForm.values.lastName, expertForm.handleChange])


  return {
    baseForm,
    expertForm: {
      control: expertForm,
      components: {
        Expert_firstName,
        Expert_lastName,
      },
    }
  }
}
