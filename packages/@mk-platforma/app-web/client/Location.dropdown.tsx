import {
  ThemeProvider,
  createTheme,
  Autocomplete,
  Box,
  TextField,
  SxProps,
  useTheme,
} from "@mui/material"
import React, { ReactElement } from "react"
import Api from "./trpc.client"

type CategoriesDropdown_Props = {
  sx?: SxProps
  value?: number
  onChange(event: any, c?: number): void
}

type Location = {
  id: number
  name: string
}

export default function Location_Dropdown({
  sx,
  value,
  onChange,
  ...props
}: CategoriesDropdown_Props): ReactElement {
  const { typography } = useTheme()
  const locations = Api.location.many.useQuery()

  function findCategory(id: number) {
    return locations.data?.find(c => c.id === id)
  }
  function getCategoryOption(cat: Location) {
    return {
      id: cat.id,
      label: cat.name,
    }
  }
  const value_option = value && locations.data ? getCategoryOption(findCategory(value)!) : undefined

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
        loading={locations.isLoading}
        options={locations.data?.map(getCategoryOption) || []}
        renderOption={(props, option) => (
          <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
            {option.label}
          </Box>
        )}
        renderInput={params => (
          <TextField {...params} variant="outlined" placeholder="Kategorija" />
        )}
        value={value_option}
        onChange={(event, value) => onChange(event, value?.id)}
        {...props}
      />
    </ThemeProvider>
  )
}
