import HandymanIcon from "@mui/icons-material/Handyman"
import BedIcon from "@mui/icons-material/Bed"
import EngineeringIcon from "@mui/icons-material/Engineering"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import GroupsIcon from "@mui/icons-material/Groups"
import { ThemeProvider, createTheme, Autocomplete, Box, TextField, SxProps } from "@mui/material"
import { Category, allCategories } from "./data.types"
import { ReactElement } from "react"

type CategoriesDropdown_Props = {
  sx?: SxProps
  value: Category
  onChange(event: any, c?: Category): void
}

export default function CategoriesDropdown({
  sx,
  value,
  onChange,
  ...props
}: CategoriesDropdown_Props): ReactElement {
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
        options={allCategories.map(c => ({ id: c, label: getCategoryLabel(c) }))}
        renderOption={(props, option) => (
          <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
            <CategoryIcon name={option.id} sx={{ fontSize: 26, mr: 2 }} />
            {option.label}
          </Box>
        )}
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
            placeholder="Kategorije"
          />
        )}
        value={value ? { id: value, label: getCategoryLabel(value) } : undefined}
        onChange={(event, value) =>
          onChange(
            event,
            value?.id
          )
        }
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
    case "job":
      return "Poslovi"
    case "gathering":
      return "Okupljanja"
    case "gathering/spirituality":
      return "Duhovna okupljanja"
    case "gathering/work":
      return "Radne akcije"
    case "gathering/hangout":
      return "Druženja"
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
    case "job":
      return <HandymanIcon sx={sx} />
    case "gathering":
      return <GroupsIcon sx={sx} />
    case "gathering/spirituality":
      return <GroupsIcon sx={sx} />
    case "gathering/work":
      return <GroupsIcon sx={sx} />
    case "gathering/hangout":
      return <GroupsIcon sx={sx} />
    default:
      throw new Error("Category name not matched")
  }
}
