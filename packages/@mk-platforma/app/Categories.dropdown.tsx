import HandymanIcon from "@mui/icons-material/Handyman"
import BedIcon from "@mui/icons-material/Bed"
import EngineeringIcon from "@mui/icons-material/Engineering"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import GroupsIcon from "@mui/icons-material/Groups"
import { ThemeProvider, createTheme, Autocomplete, Box, TextField, SxProps } from "@mui/material"
import { Category, allCategories } from "./data/data.types"


type Option = { id: Category, label: string }

type CategoriesDropdown_Props = {
  value?: Option[]
  onChange?(c?: Option[]): void
}

export default function CategoriesDropdown({ value, onChange, }: CategoriesDropdown_Props) {
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
          '.MuiChip-root': {
            fontSize: 16,
          },
        }}
        multiple
        value={value}
        options={allCategories.map(c => ({ id: c, label: getCategoryLabel(c) }))}
        onChange={(event, newValue) => onChange && onChange(newValue)}
        renderOption={(props, option) => (
          <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
            <CategoryIcon category={option.id} sx={{ fontSize: 26, mr: 2 }} />
            {option.label}
          </Box>
        )}
        renderInput={params => (
          <TextField
            {...params}
            sx={{
              fontSize: 18,
            }}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              sx: {
                fontSize: 18,
              },
            }}
          />
        )}
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

export function CategoryIcon({ category, sx }: { category: Category; sx?: SxProps }) {
  switch (category) {
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
  }
}