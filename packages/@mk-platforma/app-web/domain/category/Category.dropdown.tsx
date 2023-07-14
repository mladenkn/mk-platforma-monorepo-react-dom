import { Autocomplete, Box, TextField, SxProps, useTheme } from "@mui/material"
import { CategoryIcon, getCategoryLabel } from "./Category.common"
import React, { ComponentProps, ReactElement } from "react"
import Api from "~/api_/api.client"
import { Api_outputs } from "~/api_/api.infer"
import { eva } from "~/../../@mk-libs/common/common"
import { Category_label } from "@prisma/client"

type Category = Api_outputs["category"]["many"][number]

function getCategoryOption(cat: Category) {
  const group = eva(() => {
    if (cat.children?.length) return getCategoryLabel(cat.label)
    if (cat.parent) return getCategoryLabel(cat.parent.label)
    else return ""
  })
  return {
    id: cat.id,
    children: cat.children,
    dbLabel: cat.label,
    label: cat.children?.length
      ? getCategoryLabel(cat.label) + " ostalo"
      : getCategoryLabel(cat.label),
    group,
  } as const
}

type Option = ReturnType<typeof getCategoryOption>

type CategoriesDropdown_Props = Omit<
  ComponentProps<typeof Autocomplete<Option>>,
  "options" | "renderInput" | "value"
> & {
  value?: number
}

export default function Category_dropdown({
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
  const value_option =
    value && categories.data ? getCategoryOption(findCategory(value)!) : undefined

  const options =
    categories.data?.map(getCategoryOption).sort((a, b) => {
      if (a.children?.length && a.group === b.group) return 1
      if (b.children?.length && a.group === b.group) return -1
      return -b.group.localeCompare(a.group)
    }) || []

  return (
    <Autocomplete
      fullWidth
      sx={sx}
      classes={{
        popper: "category-dropdown-popper",
      }}
      loading={categories.isLoading}
      options={options}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{
            "& > img": { mr: 2, flexShrink: 0 },
            opacity: option.children?.length ? 0.85 : undefined,
          }}
          {...props}
        >
          <CategoryIcon
            fontSize="medium"
            name={option.dbLabel}
            sx={{ mr: 2, opacity: option.children?.length ? 0.85 : undefined }}
          />
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
                <CategoryIcon
                  sx={{ ml: 1, mr: 1.5 }}
                  name={value_option?.label as Category_label}
                />
              ) : undefined,
            name: "category",
          }}
          placeholder="Kategorija"
        />
      )}
      value={value_option || null}
      onChange={onChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      groupBy={o => o.group}
      {...props}
    />
  )
}
