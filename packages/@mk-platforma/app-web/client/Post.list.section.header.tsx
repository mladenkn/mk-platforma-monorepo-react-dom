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
  selectedCategory: UseQueryResult<{ label: Post_category_label } | null>
  search: string
  set_search(s: string): void
}

export default function Post_list_section_header({
  selectedCategory,
  onShowCategories,
  search,
  set_search,
}: Props) {
  const { typography, spacing } = useTheme()

  const heading = selectedCategory.data
    ? getCategoryLabel(selectedCategory.data.label)
    : "Domaći oglasnik"
  const searchAndMore_position = heading.length > 13 ? "down" : "up"

  const searchAndMore = (
    <Box sx={{ display: "flex" }}>
      <IconButton onClick={() => set_search("")}>
        <SearchIcon sx={{ color: "white", fontSize: typography.h4 }} />
      </IconButton>
      <Header_moreOptions options={["post.create", "profile", "devContact"]} />
    </Box>
  )

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
              justifyContent: "space-between",
              color: "white",
              width: "100%",
            }}
            onClick={onShowCategories}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", gap: 2.5, alignItems: "center" }}>
                {selectedCategory.data ? (
                  <CategoryIcon fontSize="large" name={selectedCategory.data.label} />
                ) : (
                  <MenuIcon fontSize="large" fontWeight={400} />
                )}
                {selectedCategory.data ? (
                  <Typography variant="h2" fontWeight={400}>
                    {getCategoryLabel(selectedCategory.data.label)}
                  </Typography>
                ) : (
                  <a style={{ color: "white", textDecoration: "none" }} href="/">
                    <Typography sx={{ fontSize: 42 }} fontWeight={400}>
                      Domaći oglasnik
                    </Typography>
                  </a>
                )}
              </Box>
              {searchAndMore_position === "up" && searchAndMore}
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 1.5, display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: searchAndMore_position === "up" ? "row-reverse" : "row",
              justifyContent: searchAndMore_position === "down" ? "space-between" : undefined,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <IconButton sx={{ color: "white", fontSize: typography.h6 }}>
                <LocationOnIcon /> Novi Vinodolski
                <KeyboardArrowDownOutlinedIcon sx={{ ml: 0.5 }} />
              </IconButton>
              <IconButton sx={{ color: "white", fontSize: typography.h6 }}>
                50 km
                <KeyboardArrowDownOutlinedIcon />
              </IconButton>
            </Box>
            {searchAndMore_position === "down" && searchAndMore}
          </Box>
          {search !== null && (
            <Box sx={{ mt: 1, mb: 1 }}>
              <Input
                placeholder="Pretraži"
                sx={{ color: "white", fontSize: typography.h5, width: "100%" }}
                disableUnderline
                startAdornment={<SearchIcon sx={{ mr: 2 }} />}
                endAdornment={
                  <IconButton onClick={() => set_search("")}>
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
