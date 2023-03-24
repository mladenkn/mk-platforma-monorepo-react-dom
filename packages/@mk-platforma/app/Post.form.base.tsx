import { useFormik } from "formik"
import { useCallback } from "react"
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Post_base_zod, Post_base } from "./data/data.types"
import { Box, TextField, SxProps } from "@mui/material"
import CategoriesDropdown from "./Categories.dropdown"


export default function use_Post_form_base(){
  const { values, handleChange, setFieldValue } = useFormik<Omit<Post_base, 'id'>>({
    initialValues: {
      label: '',
      description: '',
      categories: [],
      photos: [],
    },
    validationSchema: toFormikValidationSchema(Post_base_zod),
    onSubmit(){}
  })

  const Label = useCallback(() => (
    <TextField
      label="Naziv"
      variant="outlined"
      name="label"
      value={values.label}
      onChange={handleChange}
    />
  ), [values.label, handleChange])

  const Categories = useCallback(() => (
    <CategoriesDropdown
      value={values.categories}
      onChange={(e, value) => setFieldValue('categories', value)}
    />
  ), [])

  const Description = useCallback(() => (
    <TextField
      label="Opis"
      variant="outlined"
      multiline
      name="description"
      value={values.description}
      onChange={handleChange}
    />
  ), [])

  return {
    Label,
    Categories,
    Description,
  }
}
