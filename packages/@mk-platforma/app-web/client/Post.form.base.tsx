import { useFormik } from "formik"
import React, { ComponentProps } from "react"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { TextFieldProps, TextField, Box } from "@mui/material"
import CategoryDropdown from "./Categories.dropdown"
import { z } from "zod"
import { Post_category_labelSchema } from "../prisma/generated/zod"

const Post_zod = z.object({
  title: z.string(),
  description: z.string(),
  categories: z.array(Post_category_labelSchema),
  location: z.string().optional(),
  contact: z.string().optional(),
})

type Post = z.infer<typeof Post_zod>

type Props = {
  initialValues?: Post
}

const initialValues_default = {
  title: "",
  description: "",
  location: "",
  categories: [],
} satisfies Post

// Treba validacija da nemože selektirat bilo koju kombinaciju sekcija

export function Post_form_base({ initialValues = initialValues_default }: Props) {
  const form = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(Post_zod),
    onSubmit() {},
  })

  const { values, handleChange } = form

  return (
    <Box>
      <TextField
        label="Naziv"
        variant="outlined"
        name="title"
        value={values.title}
        onChange={handleChange}
      />
      <TextField
        label="Opis"
        variant="outlined"
        name="description"
        value={values.description}
        onChange={handleChange}
      />
      <TextField
        label="Lokacija"
        variant="outlined"
        name="location"
        value={values.location}
        onChange={handleChange}
      />
      <TextField
        label="Kontakt"
        variant="outlined"
        name="contact"
        value={values.contact}
        onChange={handleChange}
      />
    </Box>
  )
}

export default function use_Post_form_base({ initialValues = initialValues_default }: Props) {
  const form = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(Post_zod),
    onSubmit() {},
  })

  const { values, handleChange } = form

  return {
    control: form,
    components_props: {
      label: {
        label: "Naziv",
        variant: "outlined",
        name: "title",
        value: values.title,
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

      category: {
        // value: values.categories[0],
        onChange: (e, value) => form.setFieldValue("categories", [value]),
      } satisfies Partial<ComponentProps<typeof CategoryDropdown>>,

      location: {
        label: "Lokacija",
        variant: "outlined",
        name: "location",
        value: values.location,
        onChange: handleChange,
      } satisfies Partial<TextFieldProps>,

      contact: {
        label: "Kontakt",
        variant: "outlined",
        name: "contact",
        value: values.contact,
        onChange: handleChange,
      } satisfies Partial<TextFieldProps>,

      // TODO: images, contact
    },
  }
}
