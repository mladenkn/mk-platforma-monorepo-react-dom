import React, { useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import { Box, Typography, IconButton, useTheme, Input, Dialog } from "@mui/material"
import { UseQueryResult } from "@tanstack/react-query"
import Api from "~/api_/api.client"
import { eva } from "@mk-libs/common/common"
import { getCategoryLabel, CategoryIcon } from "~/domain/category/Category.common"
import { LogoLink } from "~/domain/common"
import { Header_moreOptions } from "~/domain/Header"
import Location_select_page from "~/domain/Location.select.page"
import type { Category_code } from "~/domain/category/Category.types"

type Props = {
  onShowCategories(): void
  selectedCategory?: { code: Category_code } | null
  search: string | null
  set_search(s: string | null): void
  selectedLocation: number | null
  set_selectedLocation(l: number | null): void
  selectedLocation_radius_km: number | null
  set__selectedLocation_radius_km(v: number | null): void
}

export default function Post_list_page_header({
  selectedCategory,
  onShowCategories,
  search,
  set_search,
  selectedLocation: selectedLocation_id,
  set_selectedLocation,
  selectedLocation_radius_km,
  set__selectedLocation_radius_km,
}: Props) {
  const { typography, spacing, palette } = useTheme()

  const heading = selectedCategory ? getCategoryLabel(selectedCategory.code) : <LogoLink />
  const heading_size = typeof heading === "string" ? heading.length : 100
  const searchAndMore_position = heading_size > 13 ? "down" : "up"

  const searchAndMore = (
    <Box sx={{ display: "flex" }}>
      <IconButton onClick={() => set_search(search === null ? "" : null)}>
        <SearchIcon sx={{ color: "white", fontSize: typography.h4 }} />
      </IconButton>
      <Header_moreOptions exclude={["post.list"]} />
    </Box>
  )

  const [locationSelect_isActive, set_locationSelect_isActive] = useState(false)

  const selectedLocation = Api.location.single.useQuery(
    { id: selectedLocation_id! },
    { enabled: !!selectedLocation_id },
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
    <>
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          pt: 1.2,
          pb: 1,
          pl: 2,
          background: palette.primary.main,
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
                {selectedCategory ? (
                  <CategoryIcon
                    sx={{ cursor: "pointer" }}
                    fontSize="large"
                    name={selectedCategory.code}
                  />
                ) : (
                  <MenuIcon sx={{ cursor: "pointer" }} fontSize="large" fontWeight={400} />
                )}
                {selectedCategory ? (
                  <Typography variant="h2" fontWeight={400} sx={{ cursor: "default" }}>
                    {getCategoryLabel(selectedCategory.code)}
                  </Typography>
                ) : (
                  <LogoLink />
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
      </Box>
    </>
  )
}
