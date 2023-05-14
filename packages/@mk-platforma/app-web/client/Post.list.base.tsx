import { Box, Link, Paper } from "@mui/material"
import { ComponentType } from "react"
import React from "react"

type Item = {
  id: number
}

export type Section_base_Props<TItem extends Item> = {
  items: TItem[]
  Item: ComponentType<TItem>
}

export default function Post_list_base<TItem extends Item>({
  items,
  Item,
}: Section_base_Props<TItem>) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      {items.map(item => (
        <Link href={`/post/${item.id}`} style={{ textDecoration: "none" }}>
          <Paper key={item.id} sx={{ p: 1.5, display: "flex", cursor: "pointer", borderRadius: 2 }}>
            <Item {...item} />
          </Paper>
        </Link>
      ))}
    </Box>
  )
}
