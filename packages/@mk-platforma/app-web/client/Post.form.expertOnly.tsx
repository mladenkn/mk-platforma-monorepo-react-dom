import { TextFieldProps } from "@mui/material"
import React from "react"
import { z } from "zod"
import { Post_api_cu_input_base } from "../api/Post.api.cu.input"

type Input = z.infer<typeof Post_api_cu_input_base>["asPersonEndorsement"]

type Props = {
  values: Input
}

export default function Post_form_expertOnly({ values }: Props) {
  return {
    components_props: {
      firstName: {
        label: "Ime",
        variant: "outlined",
        name: "firstName",
        value: values.firstName,
        onChange: handleChange,
      } satisfies Partial<TextFieldProps>,

      lastName: {
        label: "Prezime",
        variant: "outlined",
        name: "lastName",
        value: values.lastName,
        onChange: handleChange,
      } satisfies Partial<TextFieldProps>,
    },
  }
}
