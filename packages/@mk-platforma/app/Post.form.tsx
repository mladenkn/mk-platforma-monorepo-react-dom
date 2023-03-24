import { SxProps } from "@mui/material"
import { Post_Accommodation_zod } from "./data/data.types"
import use_Post_form_base from "Post.form.base"


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
}
