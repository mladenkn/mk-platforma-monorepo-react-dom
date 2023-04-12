import {
  ThemeProvider,
  createTheme,
  Autocomplete,
  Box,
  TextField,
  SxProps,
  useTheme,
} from "@mui/material"
import { CategoryIcon, getCategoryLabel, allCategories } from "./Categories.common"
import React, { ReactElement } from "react"
import type { Post_category_labelType } from "../prisma/generated/zod"

type CategoriesDropdown_Props = {
  sx?: SxProps
  value?: Post_category_labelType
  onChange(event: any, c?: Post_category_labelType): void
}

export default function CategoryDropdown({
  sx,
  value,
  onChange,
  ...props
}: CategoriesDropdown_Props): ReactElement {
  const { typography } = useTheme()

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
            fontSize: typography.h4,
          },
          ".MuiAutocomplete-clearIndicator svg": {
            fontSize: typography.h4,
          },
          ...sx,
        }}
        options={allCategories.map(c => ({ id: c, label: getCategoryLabel(c) }))}
        renderOption={(props, option) => (
          <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
            <CategoryIcon fontSize="medium" name={option.id} sx={{ mr: 2 }} />
            {option.label}
          </Box>
        )}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: value ? <CategoryIcon sx={{ ml: 1, mr: 1.5 }} name={value} /> : <></>,
            }}
            placeholder="Kategorija"
          />
        )}
        value={value ? { id: value, label: getCategoryLabel(value) } : undefined}
        onChange={(event, value) => onChange(event, value?.id)}
        {...props}
      />
    </ThemeProvider>
  )
}
