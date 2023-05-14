import React, { ComponentProps, useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import { getCategoryLabel, CategoryIcon } from "./Categories.common"
import { Header_root, Header_moreOptions } from "./Header"
import { Container, Box, Typography, IconButton, useTheme, Input, Dialog } from "@mui/material"
import { UseQueryResult } from "@tanstack/react-query"
import { Category_label } from "@prisma/client"
import Location_select_page from "./Location.select.page"
import Api from "../api.client"
import { eva } from "@mk-libs/common/common"

type Props = {
  onShowCategories(): void
  selectedCategory: UseQueryResult<{ label: Category_label } | null>
  search: string | null
  set_search(s: string | null): void
  selectedLocation: number | null
  set_selectedLocation(l: number | null): void
  selectedLocation_radius_km: number | null
  set__selectedLocation_radius_km(v: number | null): void
}

export default function Post_list_section_header({
  selectedCategory,
  onShowCategories,
  search,
  set_search,
  selectedLocation: selectedLocation_id,
  set_selectedLocation,
  selectedLocation_radius_km,
  set__selectedLocation_radius_km,
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

  const selectedLocation = Api.location.single.useQuery(
    { id: selectedLocation_id! },
    { enabled: !!selectedLocation_id }
  )

  const location_radius = eva(() => {
    if (!selectedLocation_id) return undefined
    else return selectedLocation_radius_km!
  })

  const location_text = selectedLocation_id ? selectedLocation.data?.name : "Postavi lokaciju"

  function handle_location_set(location: number | null, radius: number | null) {
    set_selectedLocation(location)
    set__selectedLocation_radius_km(radius)
    set_locationSelect_isActive(false)
  }

  return (
    <Header_root sx={{ pb: 1 }}>
      {locationSelect_isActive && (
        <Dialog open fullScreen>
          <Location_select_page
            location_initial={selectedLocation_id}
            location_radius_initial={selectedLocation_radius_km}
            onBack={() => set_locationSelect_isActive(false)}
            onDone={handle_location_set}
          />
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
                <LocationOnIcon sx={{ mr: 0.75 }} /> {location_text}
                <KeyboardArrowDownOutlinedIcon sx={{ ml: 0.5 }} />
              </IconButton>
              {location_radius && (
                <IconButton
                  sx={{ color: "white", fontSize: typography.h6 }}
                  onClick={() => set_locationSelect_isActive(true)}
                >
                  {location_radius} km
                  <KeyboardArrowDownOutlinedIcon />
                </IconButton>
              )}
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
