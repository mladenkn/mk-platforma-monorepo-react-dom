import { useFormik } from "formik"
import React from "react"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { TextField } from "@mui/material"
import { z } from "zod"
import { Post_api_cu_input_base } from "../api/Post.api.cu.input"
import Location_Dropdown from "./Location.dropdown"
import CategoriesDropdown from "./Categories.dropdown"

type PostInput = z.infer<typeof Post_api_cu_input_base>

type Props = {
  initialValues?: Partial<PostInput>
}

const initialValues_default = {
  title: "",
  description: "",
  contact: "",
  location: undefined,
  categories: [],
} satisfies Partial<PostInput>

// Treba validacija da nemože selektirat bilo koju kombinaciju sekcija

export default function Post_form_fields({ initialValues = initialValues_default }: Props) {
  const form = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(Post_api_cu_input_base),
    onSubmit() {},
  })

  const { values, handleChange, setFieldValue } = form

  console.log(35, values)

  return (
    <>
      <TextField
        label="Naziv"
        variant="outlined"
        name="title"
        value={values.title}
        onChange={handleChange}
      />
      <CategoriesDropdown
        value={values.categories?.length ? values.categories[0].id : undefined}
        onChange={value => setFieldValue("categories", [{ id: value }])}
      />
      <TextField
        label="Opis"
        variant="outlined"
        name="description"
        value={values.description}
        onChange={handleChange}
      />
      <TextField
        label="Kontakt"
        variant="outlined"
        name="contact"
        value={values.contact}
        onChange={handleChange}
      />
      <Location_Dropdown onChange={value => setFieldValue("location.name", value)} />
    </>
  )
}
