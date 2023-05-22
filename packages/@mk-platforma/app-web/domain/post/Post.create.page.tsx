import { useRouter } from "next/router"
import React from "react"
import Post_form from "./Post.form"
import { IconButton, useTheme } from "@mui/material"
import { Header, Header_moreOptions } from "../Header"
import Layout from "../Layout"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import { LogoLink } from "../common"

type Props = {}

export default function Post_create_page({}: Props) {
  function onSubmit() {}

  const { breakpoints } = useTheme()

  return (
    <Layout
      header={
        <Header>
          <IconButton sx={{ color: "white", mr: 1.5 }} onClick={useRouter().back}>
            <ArrowBackIosOutlinedIcon />
          </IconButton>
          <LogoLink />
          <Header_moreOptions exclude={["other.contact"]} />
        </Header>
      }
      content={
        <Post_form
          sx={{
            gap: 2,
            p: 2,
            mx: 1,
            mt: 1,
            width: "100%",
            [breakpoints.up("md")]: { mx: 0 },
          }}
          title="Novi oglas"
          onSubmit={onSubmit}
          onCancel={useRouter().back}
        />
      }
    />
  )
}
