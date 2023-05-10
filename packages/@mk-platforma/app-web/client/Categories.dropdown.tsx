import { Autocomplete, Box, TextField, SxProps, useTheme } from "@mui/material"
import { CategoryIcon, getCategoryLabel } from "./Categories.common"
import React, { ReactElement } from "react"
import Api from "./api.client"
import { Category_labelType } from "../prisma/generated/zod"

type CategoriesDropdown_Props = {
  sx?: SxProps
  value?: number
  onChange(c?: number): void
}

type Category = {
  id: number
  label: Category_labelType
}

export default function CategoryDropdown({
  sx,
  value,
  onChange,
  ...props
}: CategoriesDropdown_Props): ReactElement {
  const { typography } = useTheme()
  const categories = Api.category.many.useQuery()

  function findCategory(id: number) {
    return categories.data?.find(c => c.id === id)
  }
  function getCategoryOption(cat: Category) {
    return {
      id: cat.id,
      dbLabel: cat.label,
      label: getCategoryLabel(cat.label),
    }
  }
  const value_option =
    value && categories.data ? getCategoryOption(findCategory(value)!) : undefined

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
      loading={categories.isLoading}
      options={categories.data?.map(getCategoryOption) || []}
      renderOption={(props, option) => (
        <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
          <CategoryIcon fontSize="medium" name={option.dbLabel} sx={{ mr: 2 }} />
          {option.label}
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment:
              value && categories.data ? (
                <CategoryIcon sx={{ ml: 1, mr: 1.5 }} name={findCategory(value)!.label} />
              ) : (
                <></>
              ),
          }}
          placeholder="Kategorija"
        />
      )}
      value={value_option || null}
      onChange={(e, value) => onChange(value?.id)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      {...props}
    />
  )
}
