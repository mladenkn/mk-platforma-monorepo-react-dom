import { Box, SxProps, TextField, Typography, useTheme } from "@mui/material"

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
  const { typography } = useTheme()
  return (
    <Box sx={sx}>
      <Typography
        sx={{ fontSize: typography.h6, fontWeight: typography.fontWeightRegular, opacity: 0.8 }}
      >
        Vještine
      </Typography>
      <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
        <TextField label="Vještina" />
        <TextField sx={{ width: 100 }} label="Level" type="number" />
      </Box>
    </Box>
  )
}
