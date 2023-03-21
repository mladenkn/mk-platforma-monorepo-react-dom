import { TextField, Chip, SxProps } from '@mui/material'
import { Autocomplete } from '@mui/material'
import { ComponentProps, ReactNode } from 'react'
import { AsyncOperation } from '@mk-libs/async-operation/async-operation.types'
import AddIcon from '@mui/icons-material/Add'
import { useTheme } from "@mk-docs/app/theme"
import { omit } from 'lodash'
import TagList from './tag.list'
import { getTagLabel } from './tag.utils'
import useControllableState from '@mk-libs/react-common/use-controllable-state'


export type TagsListEdit_props_Tag = { id: number, value: string, parent?: TagsListEdit_props_Tag | null }

export type TagsListEditPresenter_props = {
  sx?: SxProps
  value: TagsListEdit_props_Tag[]
  placeholder?: string
  tagSeparator?: ReactNode
  suggestions: AsyncOperation<TagsListEdit_props_Tag[]>
  active?: boolean
  search?: string
  selectedTagsProps?: Partial<ComponentProps<typeof Chip>>
  textFieldProps?: ComponentProps<typeof TextField>
  setSearch?(value: string): void
  onActiveChange?(active: boolean): void
  onChange(value: (string | TagsListEdit_props_Tag)[]): void
}

export default function TagsListEditPresenter({
  sx,
  value,
  placeholder,
  tagSeparator,
  suggestions,
  active: _active,
  search,
  selectedTagsProps,
  textFieldProps,
  setSearch,
  onActiveChange,
  onChange,
}: TagsListEditPresenter_props){
  const [active, setIsActive] = useControllableState(
    _active || false,
    onActiveChange
  )

  const { palette, sizing } = useTheme()

  return (
    <Autocomplete
      sx={sx}
      size='small'
      multiple
      options={suggestions.data || []}
      openOnFocus
      open={active}
      onOpen={() => setIsActive(true)}
      onClose={() => setIsActive(false)}
      loading={suggestions.status === 'PENDING'}
      ListboxProps={{
        sx: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 0.3,
          px: 0.5,
        }
      } as any}
      renderOption={(tagProps, tag: TagsListEdit_props_Tag) => (
        <Chip          
          {...omit(tagProps, 'className') as any}
          sx={{
            fontSize: sizing(1.8),
            height: sizing(2.9),
            cursor: 'pointer',
            mr: 0.5,
            mb: 0.5,
          }}
          icon={(tag as any).isNewTagSuggestion && <AddIcon />}
          label={getTagLabel(tag)}
        />
      )}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      freeSolo
      renderTags={(value, getTagProps) => (
        <TagList
          tags={value}
          separator={tagSeparator}
          TagProps={(tag, index) => ({
            ...getTagProps({ index }),
            ...omit(selectedTagsProps, 'sx'),
            sx: {
              background: palette.secondary.dark,
              ...selectedTagsProps?.sx
            },
          })}
        />
      )}
      renderInput={params => (
        <TextField
          sx={textFieldProps?.sx}
          {...params}
          size='small'
          placeholder={placeholder}
          value={search}
          onChange={e => setSearch && setSearch(e.target.value)}
          {...omit(textFieldProps, 'sx')}
          onClick={() => setIsActive(true)}
        />
      )}
      getOptionLabel={tag => typeof tag === 'string' ? tag : tag.value}
    />
  )
}
