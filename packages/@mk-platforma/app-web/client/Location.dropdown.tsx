import { Autocomplete, Box, TextField, SxProps, useTheme } from "@mui/material"
import React, { ReactElement, useState } from "react"
import Api from "./trpc.client"
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined"

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

  const [search, setSearch] = useState("")
  const locations = Api.location.many.useQuery({ query: search })

  function findLocation(id: number) {
    return locations.data?.find(c => c.id === id)
  }

  function getLocationOptions(cat: Location) {
    return {
      id: cat.id,
      label: cat.name,
    }
  }

  const value_option =
    value && locations.data ? getLocationOptions(findLocation(value)!) : undefined

  return (
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
      options={locations.data?.map(getLocationOptions) || []}
      renderOption={(props, option) => (
        <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
          {option.label}
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Lokacija"
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            ...params.InputProps,
            startAdornment: <LocationOnIcon sx={{ ml: 0.5, mr: 0.75 }} />,
          }}
        />
      )}
      value={value_option || null}
      onChange={(event, value) => onChange(event, value?.id)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      {...props}
    />
  )
}
