import { useFormik } from "formik"
import { ComponentProps, useCallback } from "react"
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Post_base, Post_base_zod } from "./data/data.types"
import { SxProps, TextField, TextFieldProps } from "@mui/material"
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

  return {
    control: form,
    components_props: {
      label: {
        label: "Naziv",
        variant: "outlined",
        name: "label",
        value: values.label,
        onChange: handleChange,
      } satisfies TextFieldProps,

      description: {
        label: "Opis",
        variant: "outlined",
        multiline: true,
        name: "description",
        value: values.description,
        onChange: handleChange,
      } satisfies TextFieldProps,

      categories: {
        value: values.categories,
        onChange: (e, value) => form.setFieldValue('categories', value),
      } satisfies ComponentProps<typeof CategoriesDropdown>,

      location: {
        label: "Lokacija",
        variant: "outlined",
        name: "location",
        value: values.location,
        onChange: handleChange,
      } satisfies TextFieldProps,
    },
  }
}
