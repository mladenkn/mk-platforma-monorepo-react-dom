import { Box, TextField, SxProps } from "@mui/material"
import CategoriesDropdown from "./Categories.dropdown"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Post_base_zod, Post_base } from "./data/data.types"
import { useEffect } from "react"


type Props = {
  sx?: SxProps
}

export default function PostForm({ sx }: Props) {
  const { register, getValues } = useForm<Post_base>({
    resolver: zodResolver(Post_base_zod),
  })

  useEffect(() => {
    // setInterval(() => console.log(getValues(), []), 1000)
  })  

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, ...sx }}>
      <TextField label="Naziv" variant="outlined" {...register('label')} />
      <CategoriesDropdown />
      <TextField label="Lokacija" variant="outlined" {...register('location')} />
      <TextField label="Opis" variant="outlined" multiline {...register('description')} />
      <TextField label="Broj mobitela" variant="outlined" {...register('phoneNumber')} />
    </Box>
  )
}
