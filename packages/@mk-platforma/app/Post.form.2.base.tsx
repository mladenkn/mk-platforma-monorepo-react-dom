import { useFormik } from "formik"
import { useCallback } from "react"
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Post_base, Post_base_zod } from "./data/data.types"
import { SxProps, TextField } from "@mui/material"
import CategoriesDropdown from "./Categories.dropdown"


type WithSx = {
  sx?: SxProps
}

export type Post_form_base_input = Omit<Post_base, 'id'> & {
  location: string
}

type Props = {
  initialValues: Omit<Post_form_base_input, 'id'>
}

export default function use_Post_form_base({ initialValues }: Props){
  const form = useFormik({
    initialValues,
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
  ), [values.description, handleChange])

  const Categories = useCallback(({ sx }: WithSx) => (
    <CategoriesDropdown
      sx={sx}
      value={values.categories}
      onChange={(e, value) => form.setFieldValue('categories', value)}
    />
  ), [values.categories, form.setFieldValue])

  const Location = useCallback(({ sx }: WithSx) => (
    <TextField
      sx={sx}
      label="Lokacija"
      variant="outlined"
      name="location"
      value={values.location}
      onChange={handleChange}
    />    
  ), [values.location, handleChange])

  return {
    control: form,
    components: {
      Label,
      Description,
      Categories,
      Location,
    },
  }
}
