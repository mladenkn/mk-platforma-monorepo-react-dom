import { useFormik } from "formik"
import { useCallback } from "react"
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Post_base, Post_base_zod } from "./data/data.types"
import { SxProps, TextField } from "@mui/material"
import CategoriesDropdown from "Categories.dropdown"


type WithSx = {
  sx?: SxProps
}

type Input = Post_base & {
  location: string
}

export default function use_Post_form_base(){
  const form = useFormik<Omit<Input, 'id'>>({
    initialValues: {
      label: '',
      description: '',
      photos: [],
      categories: [],
      location: '',
    },
    validationSchema: toFormikValidationSchema(Post_base_zod),
    onSubmit(){}
  })

  const { values, handleChange } = form

  const Label = useCallback(({ sx }: WithSx) => (
    <TextField
      sx={sx}
      label="Naziv"
      variant="outlined"
      name="label"
      value={values.label}
      onChange={handleChange}
    />
  ), [values.label, handleChange])

  const Description = useCallback(({ sx }: WithSx) => (
    <TextField
      sx={sx}
      label="Opis"
      variant="outlined"
      multiline
      name="description"
      value={values.description}
      onChange={handleChange}
    />
  ), [])

  const Categories = useCallback(({ sx }: WithSx) => (
    <CategoriesDropdown
      sx={sx}
      value={form.values.categories}
      onChange={(e, value) => form.setFieldValue('categories', value)}
    />
  ), [])

  return {
    control: form,
    components: {
      Label,
      Description,
      Categories,
    },
  }
}
