import { TextFieldProps } from "@mui/material"
import { useFormik } from "formik"


type Props = {
  initialValues?: {
    firstName: string
    lastName: string
    skills: string
  }
}

const initialValues_default = {
  firstName: '',
  lastName: '',
  skills: '',
}

export default function use_Post_form_onlyExpert({
  initialValues = initialValues_default,
}: Props) {
  const expertForm = useFormik({
    initialValues,
    onSubmit(){}
  })

  return {
    control: expertForm,
    components_props: {
      firstName: {
        label: "Ime",
        variant: "outlined",
        name: "firstName",
        value: expertForm.values.firstName,
        onChange: expertForm.handleChange,
      } satisfies Partial<TextFieldProps>,

      lastName: {
        label: "Prezime",
        variant: "outlined",
        name: "firstName",
        value: expertForm.values.lastName,
        onChange: expertForm.handleChange,
      } satisfies Partial<TextFieldProps>,
      
      skills: {
        label: "Skills",
        variant: "outlined",
        name: "firstName",
        value: expertForm.values.skills,
        onChange: expertForm.handleChange,
      } satisfies Partial<TextFieldProps>,
    },
  }
}
