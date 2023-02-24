import { Box, SxProps } from "@mui/material"
import { CSSProperties } from "react"

type ContactAvatarProps =
  | {
      sx?: SxProps
      letter: string
      imageUrl?: string
    }
  | {
      style?: CSSProperties
      imageUrl: string
      letter?: undefined
    }

export default function Avatar({ imageUrl, letter, ...props }: ContactAvatarProps) {
  if (imageUrl) return <img style={(props as any).style} src={imageUrl} />
  else if (letter)
    return (
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          width: 52,
          height: 52,
          fontSize: 22,
          fontWeight: 600,
          ...(props as any).sx,
        }}
      >
        {letter}
      </Box>
    )
  else throw new Error("Case not supported")
}
