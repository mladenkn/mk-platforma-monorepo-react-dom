import { Box, SxProps, Typography } from "@mui/material"

type Skill = {
  label: string
  level: number
}

type Props = {
  sx?: SxProps
  value: Skill[]
  onChange(v: Skill[]): void
}

export default function Post_form_fields_skills({ sx }: Props) {
  return (
    <Box sx={sx}>
      <Typography>Vještine</Typography>
    </Box>
  )
}
