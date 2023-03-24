import { Box, TextField, SxProps } from "@mui/material"
import CategoriesDropdown from "./Categories.dropdown"
import { useFormik } from "formik"
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Post_base_zod, Post_base } from "./data/data.types"


type Props = {
  sx?: SxProps
}

export default function PostForm({ sx }: Props) {
  const { values, handleChange, setFieldValue } = useFormik<Omit<Post_base, 'id'>>({
    initialValues: {
      label: '',
      description: '',
      categories: [],
      photos: [],
    },
    validationSchema: toFormikValidationSchema(Post_base_zod),
    onSubmit(){}
  })

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, ...sx }}>
      <TextField
        label="Naziv"
        variant="outlined"
        name="label"
        value={values.label}
        onChange={handleChange}
      />
      <CategoriesDropdown
        value={values.categories}
        onChange={(e, value) => setFieldValue('categories', value)}
      />
      <TextField
        label="Opis"
        variant="outlined"
        multiline
        name="description"
        value={values.description}
        onChange={handleChange}
      />
    </Box>
  )
}
