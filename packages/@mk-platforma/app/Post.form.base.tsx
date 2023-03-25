import { useFormik } from "formik"
import { useCallback, useState } from "react"
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Category, Post_base } from "./data/data.types"
import { TextField } from "@mui/material"
import { Diff } from "utility-types"
import { z } from "zod"
import CategoriesDropdown from "Categories.dropdown"


type Props<TFields extends Omit<Post_base, 'id' | 'categories'>> = {
  initialValues: Diff<TFields, Post_base> & Partial<Post_base>
  zodSchema: z.ZodSchema<TFields>
}

export default function use_Post_form_base<TFields extends Omit<Post_base, 'id' | 'categories'>>({ initialValues, zodSchema }: Props<TFields>){
  const form = useFormik<TFields>({
    initialValues: ({
      label: '',
      description: '',
      photos: [],
      ...initialValues,
    } as any) as TFields,
    validationSchema: toFormikValidationSchema(zodSchema),
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
