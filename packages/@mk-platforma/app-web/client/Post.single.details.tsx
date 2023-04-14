import { Box, SxProps, Typography, Paper, Input, Avatar, useTheme } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import { Comment_listItem } from "./Comment.common"
import HandymanIcon from "@mui/icons-material/Handyman"
import DataOrQuery from "../utils"
import { UseQueryResult } from "@tanstack/react-query"
import type { Prisma } from "@prisma/client"
import React, { ReactNode } from "react"

export const Post_single_details_PostSelect = {
  id: true,
  title: true,
  categories: {
    select: {
      id: true,
      label: true,
    },
  },
  location: {
    select: {
      id: true,
      name: true,
    },
  },
  contact: true,
  description: true,
  images: {
    select: {
      id: true,
      url: true,
    },
  },
  expertEndorsement: {
    select: {
      firstName: true,
      lastName: true,
      avatarStyle: true,
      skills: {
        select: {
          id: true,
          label: true,
          level: true,
        },
      },
    },
  },
  comments: {
    select: {
      id: true,
      content: true,
      author: {
        select: {
          name: true,
          avatarStyle: true,
        },
      },
    },
  },
} satisfies Prisma.PostSelect

type Post_base = Prisma.PostGetPayload<{ select: typeof Post_single_details_PostSelect }>
type Comment = Post_base["comments"][number] & {
  canEdit?: boolean
  canDelete?: boolean
}
export type Post_common_listItem_details_PostModel = Omit<Post_base, "comments"> & {
  comments?: Comment[] | UseQueryResult<Comment[]>
}

type Post_common_listItem_details_Props = Post_common_listItem_details_PostModel & {
  sx?: SxProps
  title_right?: ReactNode
  usePaperSections?: boolean
}

export default function Post_single_details({
  sx,
  title,
  location,
  images,
  description,
  contact,
  title_right,
  usePaperSections,
  comments,
  expertEndorsement,
}: Post_common_listItem_details_Props) {
  const mainImage = images[0]
  const Container = (usePaperSections ? Paper : Box) as typeof Box
  const { typography } = useTheme()

  return (
    <Box sx={sx}>
      <Container sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            {expertEndorsement && (
              <Avatar
                sx={{ mr: 2, ...(expertEndorsement.avatarStyle as object) }}
                children={expertEndorsement.firstName[0] + expertEndorsement.lastName[0]}
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
                    <Typography>{location.name}</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          {title_right}
        </Box>
        {mainImage && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4, mt: 3 }}>
            <img style={{ overflow: "auto" }} src={mainImage.url} />
          </Box>
        )}
        <Typography>{description}</Typography>
        {expertEndorsement?.skills?.length ? (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", alignItems: "start" }}>
              <HandymanIcon sx={{ mt: 0.5, mr: 2, fontSize: typography.h5 }} />
              <Box>
                {expertEndorsement.skills.map(s => (
                  <Typography key={s.label}>
                    {s.label}
                    {` `}({s.level}/5)
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <></>
        )}
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
      <Container sx={{ borderRadius: 2, mt: 2, p: 1, display: "flex" }}>
        <Avatar children="MK" sx={{ background: "blue", color: "white", mr: 2 }} />
        <Input sx={{ flex: 1 }} placeholder="Komentiraj" multiline />
      </Container>
      {comments && (
        <DataOrQuery
          input={comments}
          render={comments =>
            comments?.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
                {comments.map(comment => (
                  <Container key={comment.id} sx={{ p: 2, borderRadius: 2 }}>
                    <Comment_listItem comment={comment} />
                  </Container>
                ))}
              </Box>
            ) : (
              <></>
            )
          }
        />
      )}
    </Box>
  )
}
