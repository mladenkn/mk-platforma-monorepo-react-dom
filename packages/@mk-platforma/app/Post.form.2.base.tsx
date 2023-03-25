import { useFormik } from "formik"
import { ComponentProps, useCallback } from "react"
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

  const labelProps = {
    label: "Naziv",
    variant: "outlined",
    name: "label",
    value: values.label,
    onChange: handleChange,
  }

  const descriptionProps = {
    label: "Opis",
    variant: "outlined",
    multiline: true,
    name: "description",
    value: values.description,
    onChange: handleChange,
  }

  const categoriesProps = {
    value: values.categories,
    onChange: (e, value) => form.setFieldValue('categories', value),
  } satisfies ComponentProps<typeof CategoriesDropdown>

  const locationProps = {
    label: "Lokacija",
    variant: "outlined",
    name: "location",
    value: values.location,
    onChange: handleChange,
  }

  return {
    control: form,
    components: {
      labelProps,
      descriptionProps,
      categoriesProps,
      locationProps,
    },
  }
}
