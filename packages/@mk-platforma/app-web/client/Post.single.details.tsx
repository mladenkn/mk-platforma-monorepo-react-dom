import { Box, SxProps, Typography, Paper, Input, Avatar } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import { ReactNode } from "react"
import { Comment_listItem } from "./Comment.common"
import { Post_asPersonEndorsement, Post_asPersonEndorsement_skill } from "../prisma/generated/zod"

type Post_image = {
  url: string
  isMain?: string
}

type Post_common_listItem_details_Props = {
  sx?: SxProps
  title: string
  location?: string
  images?: Post_image[]
  description: string
  contact?: string
  title_right?: ReactNode
  afterDescription?: ReactNode
  comments?: {
    id: number
    author: {
      avatarStyle: object
      userName: string
    }
    content: string
    canEdit?: boolean
    canDelete?: boolean
  }[]
  usePaperSections?: boolean
  asPersonEndorsement?:
    | (Pick<Post_asPersonEndorsement, "firstName" | "lastName" | "avatarStyle"> & {
        skills: Pick<Post_asPersonEndorsement_skill, "id" | "label" | "level">[]
      })
    | null
}

export default function Post_single_details({
  sx,
  title,
  location,
  images,
  description,
  contact,
  title_right,
  afterDescription,
  usePaperSections,
  comments,
  asPersonEndorsement,
}: Post_common_listItem_details_Props) {
  const mainImage = images?.length ? images?.find(image => image.isMain) || images[0] : null

  const Container = (usePaperSections ? Paper : Box) as typeof Box

  return (
    <Box sx={sx}>
      <Container>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            {asPersonEndorsement && (
              <Avatar
                sx={{ mr: 2, ...(asPersonEndorsement.avatarStyle as object) }}
                children={asPersonEndorsement.firstName[0] + asPersonEndorsement.lastName[0]}
              />
            )}
            <Box>
              <Typography fontWeight={500} variant="h5">
                {title}
              </Typography>
              {location && (
                <Box sx={{ color: "text.secondary" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.3 }}>
                    <LocationIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography>{location}</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          {title_right}
        </Box>
        {mainImage && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4, mt: 3 }}>
            <img src={mainImage.url} />
          </Box>
        )}
        <Typography>{description}</Typography>
        {afterDescription}
        {contact ? <Typography sx={{ mt: 4 }}>Kontakt: {contact}</Typography> : <></>}
        {!!images?.length && (
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", marginTop: 4 }}>
              {images
                .filter(p => p)
                .map((image, index) => (
                  <img key={index} width={100} height={100} src={image.url} />
                ))}
            </Box>
          </Box>
        )}
      </Container>
      <Container sx={{ borderRadius: 2, p: 2, mt: 4, display: "flex" }}>
        <Avatar children="MK" sx={{ background: "blue", color: "white", mr: 2 }} />
        <Input sx={{ flex: 1 }} placeholder="Komentiraj" multiline />
      </Container>
      {comments?.length ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
          {comments.map(comment => (
            <Container key={comment.id} sx={{ p: 2, borderRadius: 2 }}>
              <Comment_listItem comment={comment} />
            </Container>
          ))}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  )
}
