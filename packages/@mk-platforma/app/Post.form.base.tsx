import { useFormik } from "formik"
import { ComponentProps } from "react"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { TextFieldProps } from "@mui/material"
import CategoriesDropdown from "./Categories.dropdown"
import { z } from "zod"

const Post_zod = z.object({
  label: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  categories: z.array(
    z.enum([
      "job",
      "accommodation",
      "personEndorsement",
      "sellable",
      "gathering",
      "gathering/spirituality",
      "gathering/work",
      "gathering/hangout",
    ])
  ),
  location: z.string().optional(),
})

type Post = z.infer<typeof Post_zod>

type Props = {
  initialValues?: Post
}

const initialValues_default = {
  label: "",
  description: "",
  location: "",
  images: [],
  categories: [],
} satisfies Post

// Treba validacija da nemože selektirat bilo koju kombinaciju sekcija

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
        value: values.categories[0],
        onChange: (e, value) => form.setFieldValue("categories", [value]),
      } satisfies Partial<ComponentProps<typeof CategoriesDropdown>>,

      location: {
        label: "Lokacija",
        variant: "outlined",
        name: "location",
        value: values.location,
        onChange: handleChange,
      } satisfies Partial<TextFieldProps>,

      // TODO: images
    },
  }
}
