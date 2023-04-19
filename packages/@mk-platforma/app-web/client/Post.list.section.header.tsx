import React, { useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import { getCategoryLabel, CategoryIcon } from "./Categories.common"
import { Header_root, Header_moreOptions } from "./Header"
import { Container, Box, Typography, IconButton, useTheme, Input } from "@mui/material"
import { UseQueryResult } from "@tanstack/react-query"
import { Post_category_label } from "@prisma/client"

type Props = {
  onShowCategories(): void
  selectedCategory: UseQueryResult<{ label: Post_category_label }>
}

export default function Post_list_section_header({ selectedCategory, onShowCategories }: Props) {
  const [search, set_search] = useState<null | "">(null)
  const { typography, spacing } = useTheme()

  return (
    <Header_root sx={{ pb: 1 }}>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "white",
              gap: 2.5,
              width: "100%",
            }}
            onClick={onShowCategories}
          >
            {selectedCategory.data ? (
              <CategoryIcon fontSize="large" name={selectedCategory.data.label} />
            ) : (
              <MenuIcon fontSize="large" />
            )}
            <Typography variant="h2" fontWeight={400}>
              {selectedCategory.data ? (
                getCategoryLabel(selectedCategory.data.label)
              ) : (
                <a style={{ color: "white", textDecoration: "none" }} href="/">
                  <Typography variant="h3">ZaBrata</Typography>
                  <Box sx={{ color: "white" }}>
                    <Typography variant="h5">Loza kontribucionizma</Typography>
                  </Box>
                </a>
              )}
            </Typography>
          </Box>
          <IconButton onClick={() => set_search("")}>
            <SearchIcon sx={{ color: "white", fontSize: typography.h4 }} />
          </IconButton>
          <Header_moreOptions options={["post.create", "profile", "devContact"]} />
        </Box>
        <Box sx={{ mt: 0.5, display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <IconButton sx={{ color: "white", fontSize: typography.h6 }}>
              50 km
              <KeyboardArrowDownOutlinedIcon />
            </IconButton>
            <IconButton sx={{ color: "white", fontSize: typography.h6 }}>
              <LocationOnIcon /> Novi Vinodolski
              <KeyboardArrowDownOutlinedIcon sx={{ ml: 0.5 }} />
            </IconButton>
          </Box>
          {search !== null && (
            <Box sx={{ mt: 1, mb: 1 }}>
              <Input
                placeholder="Pretraži"
                sx={{ color: "white", fontSize: typography.h5, width: "100%" }}
                disableUnderline
                startAdornment={<SearchIcon sx={{ mr: 2 }} />}
                endAdornment={
                  <IconButton onClick={() => set_search(null)}>
                    <CloseIcon sx={{ color: "white" }} />
                  </IconButton>
                }
              />
              <Box sx={{ background: "white", height: spacing(0.1), color: "white" }} />
            </Box>
          )}
        </Box>
      </Container>
    </Header_root>
  )
}
