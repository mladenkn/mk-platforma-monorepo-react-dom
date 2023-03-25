import { SxProps } from "@mui/material"
import { Category, Post_Accommodation_zod, Post_Expert } from "./data/data.types"
import use_Post_form_base from "Post.form.base"
import { useState } from "react"
import { eva } from "@mk-libs/common/common"


type Props = {
  sx?: SxProps
}

export default function PostForm({ sx }: Props) {
  const accomodationForm = use_Post_form_base({
    zodSchema: Post_Accommodation_zod,
    initialValues: {
      location: '',
      postAuthor: {
        phoneNumber: '',
      },
    }
  })

  const expertForm = use_Post_form_base({
    zodSchema: Post_Expert,
    initialValues: {
      endorsedPerson: {
        phoneNumber: '',
        location: '',
        firstName: '',
        lastName: '',
        skills: [],
        avatarStyle: '',
      }
    }
  })

  const [_form, _setForm] = useState<Category>()

  const form = eva(() => {
    switch(_form){
      case 'accommodation': return accomodationForm
      case 'personEndorsement': return expertForm
      case undefined: return undefined
      default: throw new Error()
    }
  })

  const a = form!.control.values.categories

  return <></>
}
