import { FieldArray, FormikProps, ErrorMessage } from "formik"
import React, { useEffect } from "react"
import { TextField, Box, SxProps, useTheme } from "@mui/material"
import { z } from "zod"
import Post_form_images from "./Post.form.images"
import Location_Dropdown from "~/domain/Location.dropdown"
import { useCategory } from "~/domain/category/Category.common"
import Category_dropdown from "~/domain/category/Category.dropdown"
import Post_form_fields_skills from "./Post.form.fields.skills"
import { Post_api_cu_input } from "./Post.api.cu.input"

type Values = z.infer<typeof Post_api_cu_input>

type Props<TValues extends Values> = {
  sx?: SxProps
  eachField?: {
    disabled?: boolean
  }
  form: FormikProps<TValues>
}

export default function Post_form_fields<TValues extends Values>({
  sx,
  eachField = { disabled: false },
  form,
}: Props<TValues>) {
  const { values, handleChange, setFieldValue, errors, handleBlur, touched } = form

  const selectedCategory = useCategory(
    values.categories?.length ? values.categories[0].id : undefined,
  )
  const isExpert = selectedCategory.data ? selectedCategory.data.code === "job_demand" : undefined
  useEffect(() => {
    if (isExpert && !values.content_personEndorsement) {
      setFieldValue("content_personEndorsement", { firstName: "", lastName: "", skills: [] })
    } else if (isExpert === false) {
      setFieldValue("content_personEndorsement", undefined)
    }
  }, [isExpert])

  const { palette } = useTheme()

  return (
    <Box sx={sx}>
      <TextField
        label="Naziv"
        variant="outlined"
        name="title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.title && !!errors.title}
        helperText={touched.title && (errors.title as string)}
        {...eachField}
      />
      <Category_dropdown
        value={values.categories?.length ? values.categories[0].id : undefined}
        onChange={(e, option) => setFieldValue("categories", [{ id: option?.id }])}
        disabled={eachField.disabled}
        textFieldProps={{
          onBlur: handleBlur,
          error: touched.categories && !!errors.categories,
          helperText: touched.categories && (errors.categories as string),
        }}
      />
      <TextField
        label="Opis"
        variant="outlined"
        name="description"
        value={values.description}
        onChange={handleChange}
        multiline
        onBlur={handleBlur}
        error={touched.description && !!errors.description}
        helperText={touched.description && (errors.description as string)}
        {...eachField}
      />
      <TextField
        label="Kontakt"
        variant="outlined"
        name="contact"
        value={values.contact}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.contact && !!errors.contact}
        helperText={touched.contact && (errors.contact as string)}
        {...eachField}
      />
      <Location_Dropdown
        value={values.location?.id}
        onChange={value => setFieldValue("location.id", value)}
        disabled={eachField.disabled}
      />
      {isExpert && values.content_personEndorsement && (
        <>
          <TextField
            label="Ime"
            variant="outlined"
            name="content_personEndorsement.firstName"
            value={values.content_personEndorsement.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              (touched.content_personEndorsement as any)?.firstName &&
              !!(errors.content_personEndorsement as any)?.firstName
            }
            helperText={
              (touched.content_personEndorsement as any)?.firstName &&
              (errors.content_personEndorsement as any)?.firstName
            }
            {...eachField}
          />
          <TextField
            label="Prezime"
            variant="outlined"
            name="content_personEndorsement.lastName"
            value={values.content_personEndorsement.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              (touched.content_personEndorsement as any)?.lastName &&
              !!(errors.content_personEndorsement as any)?.lastName
            }
            helperText={
              (touched.content_personEndorsement as any)?.lastName &&
              (errors.content_personEndorsement as any)?.lastName
            }
            {...eachField}
          />
          <FieldArray
            name="content_personEndorsement.skills"
            render={helpers => (
              <Post_form_fields_skills
                sx={{ ml: 0.5, mt: 0.75 }}
                value={values.content_personEndorsement!.skills || []}
                onChange={handleChange}
                namePrefix="content_personEndorsement.skills"
                addItem={helpers.push}
                removeItem={helpers.remove}
              />
            )}
          />
        </>
      )}
      <FieldArray
        name="images"
        render={helpers => (
          <Post_form_images
            images={values.images || []}
            addItem={helpers.push}
            removeItem={helpers.remove}
            onChange={handleChange}
            namePrefix="images"
          />
        )}
      />
      <ErrorMessage name="images" />
    </Box>
  )
}
