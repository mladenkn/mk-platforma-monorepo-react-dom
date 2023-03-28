import { useFormik } from "formik"
import { ComponentProps } from "react"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { Post_base, Post_base_zod } from "./data/data.types"
import { TextFieldProps } from "@mui/material"
import SectionsDropdown from "./Sections.dropdown"

export type Post_form_base_input = Omit<Post_base, "id" | "categories"> & {
  location: string
  sections?: number[]
}

type Props = {
  initialValues?: Post_form_base_input
}

const initialValues_default = {
  label: "",
  description: "",
  location: "",
  photos: [],
} satisfies Post_form_base_input

// Treba validacija da nemože selektirat bilo koju kombinaciju kategorija

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

      section: {
        value: values.sections,
        onChange: (e, value) => form.setFieldValue("sections", value),
      } satisfies Partial<ComponentProps<typeof SectionsDropdown>>,

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
