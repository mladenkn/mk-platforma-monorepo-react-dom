import { useFormik } from "formik"
import React, { useEffect } from "react"
import { TextField, Box, SxProps } from "@mui/material"
import { z } from "zod"
import Post_form_images from "./Post.form.images"
import Location_Dropdown from "~/domain/Location.dropdown"
import { useCategory } from "~/domain/category/Category.common"
import Category_dropdown from "~/domain/category/Category.dropdown"
import { Post_api_cu_input } from "./Post.api.cu.input"

type Values = z.infer<typeof Post_api_cu_input>

type Props<TValues extends Values> = {
  sx?: SxProps
  eachField?: {
    disabled?: boolean
  }
  form: ReturnType<typeof useFormik<TValues>>
}

export default function Post_form_fields<TValues extends Values>({
  sx,
  eachField = { disabled: false },
  form,
}: Props<TValues>) {
  const { values, handleChange, setFieldValue } = form

  const selectedCategory = useCategory(
    values.categories?.length ? values.categories[0].id : undefined
  )
  const isExpert = selectedCategory.data?.label === "job_demand"
  useEffect(() => {
    if (isExpert && !values.expertEndorsement) {
      setFieldValue("expertEndorsement", { firstName: "", lastName: "", skills: [] })
    } else if (!isExpert) {
      setFieldValue("expertEndorsement", undefined)
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
        {...eachField}
      />
      <Category_dropdown
        value={values.categories?.length ? values.categories[0].id : undefined}
        onChange={value => setFieldValue("categories", [{ id: value }])}
        disabled={eachField.disabled}
      />
      <TextField
        label="Opis"
        variant="outlined"
        name="description"
        value={values.description}
        onChange={handleChange}
        multiline
        {...eachField}
      />
      <TextField
        label="Kontakt"
        variant="outlined"
        name="contact"
        value={values.contact}
        onChange={handleChange}
        {...eachField}
      />
      <Location_Dropdown
        value={values.location?.id}
        onChange={value => setFieldValue("location.id", value)}
        disabled={eachField.disabled}
      />
      {isExpert && values.expertEndorsement && (
        <>
          <TextField
            label="Ime"
            variant="outlined"
            name="expertEndorsement.firstName"
            value={values.expertEndorsement.firstName}
            onChange={handleChange}
            {...eachField}
          />
          <TextField
            label="Prezime"
            variant="outlined"
            name="expertEndorsement.lastName"
            value={values.expertEndorsement.lastName}
            onChange={handleChange}
            {...eachField}
          />
        </>
      )}
      <Post_form_images images={values.images || []} />
    </Box>
  )
}
