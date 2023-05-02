import React, { useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import { getCategoryLabel, CategoryIcon } from "./Categories.common"
import { Header_root, Header_moreOptions } from "./Header"
import { Container, Box, Typography, IconButton, useTheme, Input, Dialog } from "@mui/material"
import { UseQueryResult } from "@tanstack/react-query"
import { Post_category_label } from "@prisma/client"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import Api from "./trpc.client"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"

type Props = {
  onShowCategories(): void
  selectedCategory: UseQueryResult<{ label: Post_category_label } | null>
  search: string | null
  set_search(s: string | null): void
  selectedLocation?: number
  set_selectedLocation(l?: number): void
}

export default function Post_list_section_header({
  selectedCategory,
  onShowCategories,
  search,
  set_search,
  selectedLocation: selectedLocation_id,
  set_selectedLocation,
}: Props) {
  const { typography, spacing } = useTheme()

  const heading = selectedCategory.data ? (
    getCategoryLabel(selectedCategory.data.label)
  ) : (
    <a style={{ color: "white", textDecoration: "none" }} href="/">
      <Typography variant="h2" fontWeight={400}>
        ZaBrata
      </Typography>
      <Box sx={{ color: "white" }}>
        <Typography variant="h4" fontWeight={400}>
          Loza kontribucionizma
        </Typography>
      </Box>
    </a>
  )
  const heading_size = typeof heading === "string" ? heading.length : 100
  const searchAndMore_position = heading_size > 13 ? "down" : "up"

  const searchAndMore = (
    <Box sx={{ display: "flex" }}>
      <IconButton onClick={() => set_search(search === null ? "" : null)}>
        <SearchIcon sx={{ color: "white", fontSize: typography.h4 }} />
      </IconButton>
      <Header_moreOptions options={["post.create", "profile", "devContact"]} />
    </Box>
  )

  const [locationSelect_isActive, set_locationSelect_isActive] = useState(false)

  const [location_search, set__location_search] = useState("")
  const suggestions = Api.location.many.useQuery({ query: location_search })
  const selectedLocation = Api.location.single.useQuery(
    { id: selectedLocation_id! },
    { enabled: !!selectedLocation_id }
  )

  return (
    <Header_root sx={{ pb: 1 }}>
      {locationSelect_isActive && (
        <Dialog open fullScreen>
          <Box>
            <Header_root sx={{ pl: 1, pr: 1.5 }}>
              <IconButton onClick={() => set_locationSelect_isActive(false)}>
                <ArrowBackIosOutlinedIcon sx={{ color: "white" }} />
              </IconButton>
              <Typography sx={{ color: "white" }} variant="h4">
                Odaberi lokaciju
              </Typography>
              <IconButton onClick={() => set_locationSelect_isActive(false)}>
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Header_root>
            <Box sx={{ px: 2, mt: 2 }}>
              <Input
                sx={{ mb: 3, width: "100%", fontSize: typography.h5 }}
                placeholder="Pretraži"
                value={location_search}
                onChange={e => set__location_search(e.target.value)}
              />
              {suggestions.isLoading ? (
                <Typography>Loading...</Typography>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {suggestions.data?.map(location => (
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <ArrowRightIcon />
                      <Typography variant="h4" key={location.id}>
                        {location.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Dialog>
      )}
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
                justifyContent: "space-between",
                flex: 1,
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
                    <Typography variant="h2" fontWeight={400}>
                      ZaBrata
                    </Typography>
                    <Box sx={{ color: "white" }}>
                      <Typography variant="h4" fontWeight={400}>
                        Loza kontribucionizma
                      </Typography>
                    </Box>
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
              <IconButton
                sx={{ color: "white", fontSize: typography.h6 }}
                onClick={() => set_locationSelect_isActive(true)}
              >
                <LocationOnIcon /> Split
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
                sx={{ color: "white", fontSize: typography.h5, width: "100%" }}
                value={search}
                onChange={e => set_search(e.target.value)}
                placeholder="Pretraži"
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
