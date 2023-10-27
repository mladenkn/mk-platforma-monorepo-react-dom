import { Autocomplete, Box, TextField, useTheme } from "@mui/material"
import { CategoryIcon } from "./Category.common"
import React, { ComponentProps, ReactElement } from "react"
import Api from "~/api_/api.client"
import { Api_outputs } from "~/api_/api.infer"
import { eva } from "~/../../@mk-libs/common/common"

type Category = Api_outputs["category"]["many"][number]

function category_to_option(cat: Category) {
  const group = eva(() => {
    if (cat.children?.length) return cat.label
    if (cat.parent?.label) return cat.parent.label
    else return ""
  })
  return {
    id: cat.id,
    children: cat.children,
    code: cat.code,
    icon: cat.icon,
    group,
    label: cat.children?.length ? cat.label + " ostalo" : cat.label,
  } as const
}

type Option = ReturnType<typeof category_to_option>

type CategoriesDropdown_Props = Omit<
  ComponentProps<typeof Autocomplete<Option>>,
  "options" | "renderInput" | "value"
> & {
  value?: number
  textFieldProps?: ComponentProps<typeof TextField>
}

export default function Category_dropdown({
  sx,
  value,
  onChange,
  textFieldProps,
  ...props
}: CategoriesDropdown_Props): ReactElement {
  const {} = useTheme()
  const options_premap = Api.category.many.useQuery()

  const options = options_premap.data?.map(category_to_option).sort((a, b) => {
    if (a.children?.length && a.group === b.group) return 1
    if (b.children?.length && a.group === b.group) return -1
    return -b.group.localeCompare(a.group)
  })

  const value_option = value && options ? options.find(c => c.id === value)! : undefined

  return (
    <Autocomplete
      fullWidth
      sx={sx}
      classes={{
        popper: "category-dropdown-popper",
      }}
      loading={options_premap.isLoading}
      options={options || []}
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
            name={option.icon}
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
            startAdornment: value_option ? (
              <CategoryIcon sx={{ ml: 1, mr: 1.5 }} name={value_option.icon} />
            ) : undefined,
            name: "category",
          }}
          placeholder="Kategorija"
          {...textFieldProps}
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
