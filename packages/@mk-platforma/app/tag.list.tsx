import { Box, SxProps, Chip, useTheme } from "@mui/material"
import { ComponentProps, ReactNode } from "react"
import { omit } from 'lodash'
import { getTagLabel } from "./tag.utils"


type Tag = { id: number, value: string, parent?: Tag | null }

type TagPropsValue = Partial<ComponentProps<typeof Chip>> & {
  onDelete?(tag: Tag): void
}

type Props = {
  sx?: SxProps
  tags: Tag[]
  TagProps?: TagPropsValue | ((tag: Tag, index: number) => TagPropsValue)
  separator?: ReactNode
  onClick?: ComponentProps<typeof Box>['onClick']
}

export default function TagList({ sx, tags, separator, TagProps: _TagProps = {}, onClick, }: Props){
  const { spacing } = useTheme()

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', ...sx }} onClick={onClick}>
      {tags.map((tag, index) => {
        const { onDelete, ...TagProps } = typeof _TagProps === 'function' ? _TagProps(tag, index) : _TagProps
        return (
          <Box key={index} sx={{ display: 'flex', gap: 1 }}>
            <Chip
              sx={{
                height: spacing(3),
                '&:hover, &:focus': {
                  cursor: 'pointer'
                },
                fontSize: spacing(1.6),
                ...TagProps.sx
              }}
              label={getTagLabel(tag)}
              {...omit(TagProps, 'sx')}
              // onClick={(a) => console.log('sadfsdf', a)}
              onDelete={onDelete && (() => onDelete(tag))}
            />
            {index !== tags.length - 1 && separator}
          </Box>
        )
      })}
    </Box>
  )
}
