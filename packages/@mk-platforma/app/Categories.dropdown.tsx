import { ThemeProvider, createTheme, Autocomplete, Box, TextField, SxProps } from "@mui/material"
import { CategoryIcon, getCategoryLabel, allCategories } from "./Categories.common"
import { ReactElement } from "react"
import type { Category } from "../api/data/data.types"

type CategoriesDropdown_Props = {
  sx?: SxProps
  value?: Category
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
              startAdornment: value ? <CategoryIcon sx={{ ml: 1, mr: 1.5 }} name={value} /> : <></>,
            }}
            placeholder="Kategorije"
          />
        )}
        value={value ? { id: value, label: getCategoryLabel(value) } : undefined}
        onChange={(event, value) => onChange(event, value?.id)}
        {...props}
      />
    </ThemeProvider>
  )
}
