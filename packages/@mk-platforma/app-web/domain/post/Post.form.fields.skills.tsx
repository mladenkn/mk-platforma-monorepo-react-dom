import { Box, SxProps, TextField, Typography, useTheme, IconButton } from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import HandymanIcon from "@mui/icons-material/Handyman"
import RemoveIcon from "@mui/icons-material/Remove"

type Skill = {
  label: string
  level?: number | null
}

type Props = {
  sx?: SxProps
  value: Skill[]
  onChange(event: any): void
  namePrefix?: string
  addItem(i: Skill): void
  removeItem(i: number): void
}

export default function Post_form_fields_skills({
  sx,
  value,
  namePrefix,
  onChange,
  addItem,
  removeItem,
}: Props) {
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
        {value.map(({ label, level }, index) => (
          <Box key={index} sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Vještina"
              value={label}
              name={`${namePrefix}.${index}.label`}
              onChange={onChange}
            />
            <TextField
              sx={{ width: 80 }}
              label="Level"
              type="number"
              value={level}
              name={`${namePrefix}.${index}.level`}
              onChange={onChange}
            />
            <IconButton onClick={() => removeItem(index)}>
              <RemoveIcon sx={{ fontSize: typography.h3 }} />
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
