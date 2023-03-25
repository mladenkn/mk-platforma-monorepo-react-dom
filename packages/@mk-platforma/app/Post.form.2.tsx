import { SxProps, TextField } from "@mui/material"
import use_Post_form_base, { Post_form_base_input } from "./Post.form.2.base"
import { useCallback } from "react"
import { useFormik } from "formik"
import { Category } from "./data/data.types"


type Props = {
  base_initialValues?: Post_form_base_input
  expert_initialValues?: {
    firstName: string
    lastName: string
    skills: string
  }
}

const base_initialValues_default = {
  label: '',
  description: '',
  location: '',
  categories: [] as Category[],
  photos: [] as string[],
}

const expert_initialValues_default = {
  firstName: '',
  lastName: '',
  skills: '',
}

export default function use_Post_form({
  base_initialValues = base_initialValues_default,
  expert_initialValues = expert_initialValues_default,
}: Props) {
  const baseForm = use_Post_form_base({ initialValues: base_initialValues })

  const expertForm = useFormik({
    initialValues: expert_initialValues,
    onSubmit(){}
  })

  const Expert_firstName = useCallback((sx?: SxProps) => (
    <TextField
      {...{
        sx,
        label: "Ime",
        variant: "outlined",
        name: "firstName",
        value: expertForm.values.firstName,
        onChange: expertForm.handleChange,
      }}
    />
  ), [expertForm.values.firstName, expertForm.handleChange])

  const Expert_lastName = useCallback((sx?: SxProps) => (
    <TextField
      {...{
        sx,
        label: "Prezime",
        variant: "outlined",
        name: "firstName",
        value: expertForm.values.lastName,
        onChange: expertForm.handleChange,
      }}      
    />
  ), [expertForm.values.lastName, expertForm.handleChange])

  const Expert_skills = useCallback((sx?: SxProps) => ( // need array
    <TextField
      {...{
        sx,
        label: "Prezime",
        variant: "outlined",
        name: "firstName",
        value: expertForm.values.skills,
        onChange: expertForm.handleChange,
      }}
    />
  ), [expertForm.values.skills, expertForm.handleChange])

  return {
    baseForm,
    expertForm: {
      isActive: baseForm.control.values.categories.includes('personEndorsement'),
      control: expertForm,
      components: {
        FirstName: Expert_firstName,
        LastName: Expert_lastName,
        Skills: Expert_skills,
      },
    }
  }
}
