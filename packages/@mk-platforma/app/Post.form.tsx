import { Box, SxProps } from "@mui/material"
import { Category, Post_Accommodation_zod, Post_Expert } from "./data/data.types"
import use_Post_form_base from "Post.form.base"
import { useState } from "react"
import { eva } from "@mk-libs/common/common"
import CategoriesDropdown from "Categories.dropdown"


type Props = {
  sx?: SxProps
}

export default function PostForm({ sx }: Props) {
  const accomodationForm = use_Post_form_base({
    zodSchema: Post_Accommodation_zod.omit({ categories: true }),
    initialValues: {
      location: '',
      postAuthor: {
        phoneNumber: '',
      },
    }
  })

  const expertForm = use_Post_form_base({
    zodSchema: Post_Expert.omit({ categories: true }),
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

  return (
    <Box>
    </Box>
  )
}
