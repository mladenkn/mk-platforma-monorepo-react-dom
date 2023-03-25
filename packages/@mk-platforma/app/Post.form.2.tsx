import { SxProps, TextField } from "@mui/material"
import use_Post_form_base, { Post_form_base_input } from "Post.form.2.base."
import { useCallback } from "react"
import { useFormik } from "formik"


type Props = {
  sx?: SxProps
  base_initialValues: Post_form_base_input
}

export default function use_Post_form({ sx, base_initialValues }: Props) {
  const baseForm = use_Post_form_base({ initialValues: base_initialValues })

  const expertForm = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      skills: '',
    },
    onSubmit(){}
  })

  const Expert_firstName = useCallback(() => (
    <TextField
      sx={sx}
      label="Ime"
      variant="outlined"
      name="firstName"
      value={expertForm.values.firstName}
      onChange={expertForm.handleChange}
    />
  ), [expertForm.values.firstName, expertForm.handleChange])

  const Expert_lastName = useCallback(() => (
    <TextField
      sx={sx}
      label="Prezime"
      variant="outlined"
      name="firstName"
      value={expertForm.values.lastName}
      onChange={expertForm.handleChange}
    />
  ), [expertForm.values.lastName, expertForm.handleChange])

  const Expert_skills = useCallback(() => ( // need array
    <TextField
      sx={sx}
      label="Prezime"
      variant="outlined"
      name="firstName"
      value={expertForm.values.skills}
      onChange={expertForm.handleChange}
    />
  ), [expertForm.values.skills, expertForm.handleChange])

  return {
    baseForm,
    expertForm: {
      control: expertForm,
      components: {
        FirstName: Expert_firstName,
        LastName: Expert_lastName,
        Skills: Expert_skills,
      },
    }
  }
}
