import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Link,
  Paper,
  Typography,
  useTheme,
} from "@mui/material"
import Api from "~/api_/api.client"
import { asNonNil } from "@mk-libs/common/common"
import React, { useState } from "react"
import { Header, Header_back, Header_moreOptions } from "~/domain/Header"
import Layout from "~/domain/Layout"
import ConfirmModal, { LogoLink } from "../common"
import { useRouter } from "next/router"
import { orderBy } from "lodash"
import Carousel from "react-material-ui-carousel"
import LocationIcon from "@mui/icons-material/LocationOn"
import HandymanIcon from "@mui/icons-material/Handyman"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Api_outputs } from "~/api_/api.infer"
import Comment_list from "../Comment.list"

export type Post_single_details_PostModel = NonNullable<Api_outputs["post"]["single"]>

export default function Post_details_page({
  post_initial,
}: {
  post_initial: Post_single_details_PostModel
}) {
  const postQuery = Api.post.single.useQuery({ id: post_initial.id }, { initialData: post_initial })
  const post = asNonNil(postQuery.data)

  const {
    id,
    title,
    location,
    images,
    description,
    contact,
    expertEndorsement,
    author,
    canComment,
    canEdit,
    canDelete,
    isDeleted,
  } = post

  const {} = useTheme()
  const { typography } = useTheme()

  const [deleteInitiated, setDeleteInitiated] = useState(false)

  const deletePost = Api.post.delete.useMutation()
  const router = useRouter()
  async function handle_delete() {
    await deletePost.mutateAsync(id)
    router.back()
  }

  return (
    <Layout
      header={
        <Header>
          <Header_back />
          <LogoLink />
          <Header_moreOptions />
        </Header>
      }
      content={
        <Box data-testid="Post_single_details" sx={{ p: 1, width: "100%" }}>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "space-between" }}
            >
              <Box sx={{ display: "flex" }}>
                <Link style={{ textDecoration: "none" }} href={`/profile/${author.id}`}>
                  <Avatar sx={{ mr: 2, ...author.avatarStyle }} children={author.name?.[0]} />
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
                    message="Da li ste sigurni da želi izbrisati ovu objavu?"
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
          </Paper>
          <Comment_list post_id={id} canComment={canComment} />
        </Box>
      }
    />
  )
}
