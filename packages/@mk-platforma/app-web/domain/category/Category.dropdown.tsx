import { Autocomplete, Box, TextField, SxProps, useTheme } from "@mui/material"
import { CategoryIcon, getCategoryLabel } from "./Category.common"
import React, { ReactElement } from "react"
import Api from "~/api_/api.client"
import { Api_outputs } from "~/api_/api.infer"

type CategoriesDropdown_Props = {
  sx?: SxProps
  value?: number
  onChange(c?: number): void
  disabled?: boolean
}

type Category = Api_outputs["category"]["many"][number]

type Category_mapped = {
  id: number
  label: string
  dbLabel: Category["label"]
  parent?: Category_mapped | null
}

export default function CategoryDropdown({
  sx,
  value,
  onChange,
  ...props
}: CategoriesDropdown_Props): ReactElement {
  const {} = useTheme()
  const categories = Api.category.many.useQuery()

  function findCategory(id: number) {
    return categories.data?.find(c => c.id === id)
  }
  function getCategoryOption(cat: Category): Category_mapped {
    return {
      id: cat.id,
      dbLabel: cat.label,
      label: getCategoryLabel(cat.label),
      parent: cat.parent && getCategoryOption(cat.parent as Category),
    }
  }
  const value_option =
    value && categories.data ? getCategoryOption(findCategory(value)!) : undefined

  const options =
    categories.data
      ?.sort((a, b) => -(b.parent?.label ?? "").localeCompare(a.parent?.label ?? ""))
      .map(getCategoryOption) ?? []

  return (
    <Autocomplete
      fullWidth
      sx={sx}
      loading={categories.isLoading}
      options={options}
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
              ) : undefined,
          }}
          placeholder="Kategorija"
        />
      )}
      value={value_option || null}
      onChange={(e, value) => onChange(value?.id)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      groupBy={o => o.parent?.label || ""}
      {...props}
    />
  )
}
