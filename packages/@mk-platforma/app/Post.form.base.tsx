import { useFormik } from "formik"
import { ComponentProps, useCallback } from "react"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { Post_base, Post_base_zod } from "./data/data.types"
import { SxProps, TextField, TextFieldProps } from "@mui/material"
import CategoriesDropdown from "./Categories.dropdown"

export type Post_form_base_input = Omit<Post_base, "id"> & {
  location: string
}

type Props = {
  initialValues?: Post_form_base_input
}

const initialValues_default = {
  label: "",
  description: "",
  categories: [],
  location: "",
  photos: [],
} satisfies Post_form_base_input

export default function use_Post_form_base({ initialValues = initialValues_default }: Props) {
  const form = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(Post_base_zod),
    onSubmit() {},
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
      } satisfies Partial<TextFieldProps>,

      description: {
        label: "Opis",
        variant: "outlined",
        multiline: true,
        name: "description",
        value: values.description,
        onChange: handleChange,
      } satisfies Partial<TextFieldProps>,

      categories: {
        value: values.categories,
        onChange: (e, value) => form.setFieldValue("categories", value),
      } satisfies Partial<ComponentProps<typeof CategoriesDropdown>>,

      location: {
        label: "Lokacija",
        variant: "outlined",
        name: "location",
        value: values.location,
        onChange: handleChange,
      } satisfies Partial<TextFieldProps>,

      // TODO: photos
    },
  }
}
