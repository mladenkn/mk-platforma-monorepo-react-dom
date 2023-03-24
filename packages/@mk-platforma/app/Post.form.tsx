import { SxProps } from "@mui/material"
import { Category, Post_Accommodation_zod, Post_PersonEndorsement } from "./data/data.types"
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

  const personEndorsementForm = use_Post_form_base({
    zodSchema: Post_PersonEndorsement,
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

  const [currentForm, setCurrentForm] = useState<Category>()

  const baseElements = eva(() => {
    switch(currentForm){
      case 'accommodation': return accomodationForm;
      case 'personEndorsement': return personEndorsementForm;
      case undefined: return undefined
      default: throw new Error()
    }
  })
}
