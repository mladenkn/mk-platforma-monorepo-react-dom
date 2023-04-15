import { Autocomplete, Box, TextField, SxProps, useTheme } from "@mui/material"
import React, { ReactElement, useState } from "react"
import Api from "./trpc.client"
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined"
import type { Prisma } from "@prisma/client"

type CategoriesDropdown_Props = {
  sx?: SxProps
  value?: number
  onChange(event: any, c?: number): void
}

export const Location_Dropdown_locationsQuery = {
  select: {
    id: true,
    name: true,
  },
  take: 10,
} satisfies Prisma.LocationFindManyArgs

type Location = Prisma.LocationGetPayload<typeof Location_Dropdown_locationsQuery>

export default function Location_Dropdown({
  sx,
  value,
  onChange,
  ...props
}: CategoriesDropdown_Props): ReactElement {
  const { typography } = useTheme()

  const [search, setSearch] = useState("")
  const suggestions = Api.location.many.useQuery({ query: search })
  const selectedLocation = Api.location.single.useQuery({ id: value! }, { enabled: !!value })

  function getLocationOptions(cat: Location) {
    return {
      id: cat.id,
      label: cat.name,
    }
  }

  const value_option =
    (value && selectedLocation.data && getLocationOptions(selectedLocation.data)) || null

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
      loading={suggestions.isLoading}
      options={suggestions.data?.map(getLocationOptions) || []}
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
      value={value_option}
      onChange={(event, value) => onChange(event, value?.id)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      {...props}
    />
  )
}
