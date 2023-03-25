import { useFormik } from "formik"
import { useCallback } from "react"
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Post_base_zod } from "./data/data.types"
import { TextField } from "@mui/material"


export default function use_Post_form_base(){
  const form = useFormik({
    initialValues: {
      label: '',
      description: '',
      photos: [],
      categories: [],
    },
    validationSchema: toFormikValidationSchema(Post_base_zod),
    onSubmit(){}
  })

  const { values, handleChange } = form

  const Label = useCallback(() => (
    <TextField
      label="Naziv"
      variant="outlined"
      name="label"
      value={values.label}
      onChange={handleChange}
    />
  ), [values.label, handleChange])

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
    control: form,
    components: {
      Label,
      Description,
    },
  }
}
