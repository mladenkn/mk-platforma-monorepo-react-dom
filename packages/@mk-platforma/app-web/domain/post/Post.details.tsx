import {
  Box,
  SxProps,
  Typography,
  Paper,
  Input,
  Avatar,
  useTheme,
  IconButton,
  Button,
} from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import HandymanIcon from "@mui/icons-material/Handyman"
import React, { useState } from "react"
import Carousel from "react-material-ui-carousel"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import DeleteIcon from "@mui/icons-material/Delete"
import Link from "next/link"
import { Api_outputs } from "~/api_/api.infer"
import { Comment_listItem } from "~/domain/Comment.listItem"
import Api from "~/api_/api.client"
import { useRouter } from "next/router"
import EditIcon from "@mui/icons-material/Edit"
import { orderBy } from "lodash"
import ConfirmModal from "../common"

export type Post_single_details_PostModel = NonNullable<Api_outputs["post"]["single"]>

type Post_single_details_Props = Post_single_details_PostModel & {
  sx?: SxProps
  usePaperSections?: boolean
}

export default function Post_details({
  sx,
  id,
  title,
  location,
  images,
  description,
  contact,
  usePaperSections,
  comments,
  expertEndorsement,
  author,
  canComment,
  canEdit,
  canDelete,
  categories,
  isDeleted,
}: Post_single_details_Props) {
  const Container = (usePaperSections ? Paper : Box) as typeof Box
  const {} = useTheme()
  const { typography } = useTheme()

  const avatarProps = categories.some(c => c.label === "job_demand")
    ? {
        sx: expertEndorsement!.avatarStyle as object,
        children: expertEndorsement!.firstName[0] + expertEndorsement!.lastName[0],
      }
    : {
        sx: author.avatarStyle as object,
        children: author.name?.[0],
      }

  const [deleteInitiated, setDeleteInitiated] = useState(false)

  const deletePost = Api.post.delete.useMutation()
  const router = useRouter()
  async function handle_delete() {
    await deletePost.mutateAsync(id)
    router.back()
  }

  return (
    <Box data-testid="Post_single_details" sx={sx}>
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isDeleted === true ? <Box sx={{ mr: 2, color: "red" }}>IZBRISANO</Box> : undefined}
            {canEdit ? (
              <IconButton>
                <Link
                  href={`/post/edit/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <EditIcon />
                </Link>
              </IconButton>
            ) : undefined}
            {deleteInitiated ? (
              <ConfirmModal
                message={`Jeste li sigurni da želi izbrisati objavu ${title}?`}
                onConfirm={handle_delete}
                onCancel={() => setDeleteInitiated(false)}
              />
            ) : undefined}
            {!isDeleted && canDelete ? (
              <IconButton
                data-testid="Post_single_details__delete"
                onClick={() => setDeleteInitiated(true)}
              >
                <DeleteIcon />
              </IconButton>
            ) : undefined}
          </Box>
        </Box>
        {images.length ? (
          <Carousel
            sx={{ mt: 1.5, mb: 5 }}
            NextIcon={<NavigateNextIcon />}
            PrevIcon={<NavigateBeforeIcon />}
            interval={30000}
            animation="slide"
            fullHeightHover
          >
            {orderBy(images, i => i.isMain, "desc").map(image => (
              <img
                key={image.id}
                style={{ overflow: "auto", height: 340, width: "100%", objectFit: "contain" }}
                src={image.url}
              />
            ))}
          </Carousel>
        ) : undefined}
        <Typography>{description}</Typography>
        {expertEndorsement?.skills?.length ? (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
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
        ) : undefined}
        {contact ? <Typography sx={{ mt: 4 }}>Kontakt: {contact}</Typography> : <></>}
      </Container>
      {canComment && (
        <Container sx={{ borderRadius: 2, mt: 2, p: 1, display: "flex", gap: 1 }}>
          <Avatar children={avatarProps.children} sx={{ mr: 1, ...avatarProps.sx }} />
          <Input sx={{ flex: 1 }} placeholder="Komentiraj" multiline />
          <Button>Objavi</Button>
        </Container>
      )}
      {comments?.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
          {comments.map(comment => (
            <Container key={comment.id} sx={{ p: 2, borderRadius: 2 }}>
              <Comment_listItem comment={comment} />
            </Container>
          ))}
        </Box>
      ) : undefined}
    </Box>
  )
}
