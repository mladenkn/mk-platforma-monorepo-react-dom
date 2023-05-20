import { Box, SxProps, Typography, Paper, Input, Avatar, useTheme, IconButton } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import HandymanIcon from "@mui/icons-material/Handyman"
import React, { ReactNode } from "react"
import Carousel from "react-material-ui-carousel"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import DeleteIcon from "@mui/icons-material/Delete"
import Link from "next/link"
import { Api_outputs } from "~/api/api.infer"
import DataOrQuery from "~/utils"
import { Comment_listItem } from "~/modules/Comment.listItem"

export type Post_single_details_PostModel = NonNullable<Api_outputs["post"]["single"]>

type Post_single_details_Props = Post_single_details_PostModel & {
  sx?: SxProps
  editAction?: ReactNode
  usePaperSections?: boolean
}

export default function Post_single_details({
  sx,
  title,
  location,
  images,
  description,
  contact,
  editAction,
  usePaperSections,
  comments,
  expertEndorsement,
  author,
}: Post_single_details_Props) {
  const Container = (usePaperSections ? Paper : Box) as typeof Box

  const {} = useTheme()

  const { typography } = useTheme()

  const avatarProps = expertEndorsement
    ? {
        sx: expertEndorsement.avatarStyle as object,
        children: expertEndorsement.firstName[0] + expertEndorsement.lastName[0],
      }
    : {
        sx: author.avatarStyle as object,
        children: author.name?.[0],
      }

  return (
    <Box sx={sx}>
      <Container sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Link style={{ textDecoration: "none" }} href={`/profile/${author.id}`}>
              <Avatar sx={{ mr: 2, ...avatarProps.sx }} children={avatarProps.children} />
            </Link>
            <Box>
              <Typography fontWeight={500} variant="h4">
                {title}
              </Typography>
              {location && (
                <Box sx={{ color: "text.secondary", mt: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.3 }}>
                    <LocationIcon fontSize="medium" sx={{ mr: 1 }} />
                    <Typography fontSize="large">{location.name}</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          <Box>
            {editAction}
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Carousel
          sx={{ mt: 1.5, mb: 5 }}
          NextIcon={<NavigateNextIcon />}
          PrevIcon={<NavigateBeforeIcon />}
          interval={30000}
          animation="slide"
          fullHeightHover
        >
          {images.map(image => (
            <img
              key={image.id}
              style={{ overflow: "auto", height: 340, width: "100%", objectFit: "contain" }}
              src={image.url}
            />
          ))}
        </Carousel>
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
