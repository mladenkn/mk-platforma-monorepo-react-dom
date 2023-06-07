import { Box, SxProps, TextField, Typography, useTheme, IconButton } from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          sx={{ fontSize: typography.h6, fontWeight: typography.fontWeightRegular, opacity: 0.8 }}
        >
          Vještine
        </Typography>
        <IconButton>
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
        <TextField label="Vještina" />
        <TextField sx={{ width: 100 }} label="Level" type="number" />
      </Box>
    </Box>
  )
}
