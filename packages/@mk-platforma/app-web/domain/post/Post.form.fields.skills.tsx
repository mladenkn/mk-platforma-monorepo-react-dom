import { Box, SxProps, TextField, Typography, useTheme, IconButton } from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import HandymanIcon from "@mui/icons-material/Handyman"

type Skill = {
  label: string
  level?: number | null
}

type Props = {
  sx?: SxProps
  value: Skill[]
  onChange(v: Skill[]): void
}

export default function Post_form_fields_skills({ sx, value, onChange }: Props) {
  const { typography } = useTheme()
  return (
    <Box sx={sx}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "min-content 1fr min-content",
          alignItems: "center",
          opacity: 0.8,
        }}
      >
        <HandymanIcon sx={{ mr: 1.5, fontSize: typography.h5 }} />
        <Typography sx={{ fontSize: typography.h5, fontWeight: typography.fontWeightRegular }}>
          Vještine
        </Typography>
      </Box>
      <Box sx={{ mt: 2, display: "column", gap: 1 }}>
        {value.map(({ label, level }) => (
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField label="Vještina" value={label} />
            <TextField sx={{ width: 80 }} label="Level" type="number" value={level} />
            <IconButton>
              <AddCircleOutlineIcon sx={{ fontSize: typography.h3 }} />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField label="Vještina" />
        <TextField sx={{ width: 80 }} label="Level" type="number" />
        <IconButton>
          <AddCircleOutlineIcon sx={{ fontSize: typography.h3 }} />
        </IconButton>
      </Box>
    </Box>
  )
}
