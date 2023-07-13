import { Autocomplete, Box, TextField, SxProps, useTheme } from "@mui/material"
import React, { ReactElement, useState } from "react"
import Api from "../api_/api.client"
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined"
import { Api_outputs } from "~/api_/api.infer"

type CategoriesDropdown_Props = {
  sx?: SxProps
  value?: number
  onChange(c?: number): void
  disabled?: boolean
}

type Location = Api_outputs["location"]["many"][number]

export default function Location_Dropdown({
  sx,
  value,
  onChange,
  ...props
}: CategoriesDropdown_Props): ReactElement {
  const {} = useTheme()

  const [search, setSearch] = useState("")
  const suggestions = Api.location.many.useQuery({ query: search })
  const selectedLocation = Api.location.single.useQuery({ id: value! }, { enabled: !!value })

  console.log(28, suggestions.data)

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
      sx={sx}
      loading={suggestions.isLoading}
      options={suggestions.data?.map(getLocationOptions) || []}
      renderOption={(props, option) => (
        <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
          {option.label}
        </Box>
      )}
      classes={{
        popper: "location-dropdown-popper",
      }}
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
            name: "location",
          }}
        />
      )}
      value={value_option}
      onChange={(event, value) => onChange(value?.id)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      {...props}
    />
  )
}
