import HandymanIcon from "@mui/icons-material/Handyman"
import BedIcon from "@mui/icons-material/Bed"
import EngineeringIcon from "@mui/icons-material/Engineering"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import GroupsIcon from "@mui/icons-material/Groups"
import { ThemeProvider, createTheme, Autocomplete, Box, TextField, SxProps } from "@mui/material"
import { ReactElement } from "react"
import sections from "./data/data.sections"
import { Category } from "./data/data.types"

type CategoriesDropdown_Props = {
  sx?: SxProps
  value?: number[]
  onChange(event: any, c?: number[]): void
}

export default function CategoriesDropdown({
  sx,
  value,
  onChange,
  ...props
}: CategoriesDropdown_Props): ReactElement {
  const selectedSections = sections.filter(s => value?.includes(s.id))

  return (
    <ThemeProvider theme={createTheme({ spacing: 8 })}>
      <Autocomplete
        fullWidth
        sx={{
          ".MuiAutocomplete-popupIndicator": {
            mb: 2,
          },
          ".MuiAutocomplete-clearIndicator": {
            mb: 2,
          },
          ".MuiAutocomplete-popupIndicator svg": {
            fontSize: 26,
          },
          ".MuiAutocomplete-clearIndicator svg": {
            fontSize: 26,
          },
          ".MuiChip-root": {
            fontSize: 16,
          },
          ...sx,
        }}
        options={sections}
        renderOption={(props, option) => {
          return (
            <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
              <CategoryIcon name={option.iconName} sx={{ fontSize: 26, mr: 2 }} />
              {option.label}
            </Box>
          )
        }}
        renderInput={params => (
          <TextField
            {...params}
            sx={{
              fontSize: 16,
            }}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              sx: {
                fontSize: 16,
              },
            }}
            placeholder="Sekcije"
          />
        )}
        value={selectedSections}
        onChange={(e, value) =>
          onChange(
            e,
            value?.map(o => o.id)
          )
        }
        multiple
        {...props}
      />
    </ThemeProvider>
  )
}

export function getCategoryLabel(category: Category) {
  switch (category) {
    case "accommodation":
      return "Smještaji"
    case "sellable":
      return "Nabava"
    case "personEndorsement":
      return "Majstori"
    case "gathering":
      return "Okupljanja"
    case "job":
      return "Poslovi"
  }
}

export function CategoryIcon({ name, sx }: { name: Category; sx?: SxProps }) {
  switch (name) {
    case "accommodation":
      return <BedIcon sx={sx} />
    case "sellable":
      return <ShoppingCartIcon sx={sx} />
    case "personEndorsement":
      return <EngineeringIcon sx={sx} />
    case "gathering":
      return <GroupsIcon sx={sx} />
    case "job":
      return <HandymanIcon sx={sx} />
    default:
      throw new Error("Category name not matched")
  }
}
