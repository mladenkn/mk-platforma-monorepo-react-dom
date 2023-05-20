import { useFormik } from "formik"
import React, { useEffect } from "react"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { TextField, Box, SxProps, IconButton, useTheme } from "@mui/material"
import { z } from "zod"
import { Post_api_cu_input_base } from "../api/Post.api.cu.input"
import Location_Dropdown from "./Location.dropdown"
import CategoriesDropdown from "./Categories.dropdown"
import { useCategory } from "./Categories.common"
import Post_form_images from "./Post.form.images"

type PostInput = z.infer<typeof Post_api_cu_input_base>

type Props = {
  sx?: SxProps
  initialValues?: Partial<PostInput>
}

const initialValues_default = {
  title: "",
  description: "",
  contact: "",
  location: undefined,
  categories: [],
} satisfies Partial<PostInput>

export default function Post_form_fields({ sx, initialValues = initialValues_default }: Props) {
  const form = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(Post_api_cu_input_base),
    onSubmit() {},
  })

  const { values, handleChange, setFieldValue } = form

  const selectedCategory = useCategory(
    values.categories?.length ? values.categories[0].id : undefined
  )
  const isExpert = selectedCategory.data?.label === "job_demand"
  useEffect(() => {
    if (!values.expertEndorsement) {
      setFieldValue("expertEndorsement", { firstName: "", lastName: "", skills: [] })
    }
  }, [isExpert])

  return (
    <Box sx={sx}>
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
        multiline
      />
      <TextField
        label="Kontakt"
        variant="outlined"
        name="contact"
        value={values.contact}
        onChange={handleChange}
      />
      <Location_Dropdown
        value={values.location?.id}
        onChange={value => setFieldValue("location.id", value)}
      />
      {isExpert && values.expertEndorsement && (
        <>
          <TextField
            label="Ime"
            variant="outlined"
            name="expertEndorsement.firstName"
            value={values.expertEndorsement.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Prezime"
            variant="outlined"
            name="expertEndorsement.lastName"
            value={values.expertEndorsement.lastName}
            onChange={handleChange}
          />
        </>
      )}
      <Post_form_images images={values.images || []} />
    </Box>
  )
}
