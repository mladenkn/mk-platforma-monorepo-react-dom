import { IconButton, Typography, Input, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { Header_root } from "./Header"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import Api from "./trpc.client"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import React, { useState } from "react"
import { mapQueryData } from "../utils"

type Props = {
  selectedLocation?: number
  set_selectedLocation(l?: number): void
  onClose(): void
}

export default function Location_select_screen({
  selectedLocation: selectedLocation_id,
  onClose,
}: Props) {
  const [location_search, set__location_search] = useState("")
  const location_suggestions = Api.location.many.useQuery({ query: location_search })
  const selectedLocation = Api.location.single.useQuery(
    { id: selectedLocation_id! },
    { enabled: !!selectedLocation_id }
  )

  const { typography } = useTheme()

  return (
    <Box>
      <Header_root sx={{ pl: 1, pr: 1.5 }}>
        <IconButton onClick={onClose}>
          <ArrowBackIosOutlinedIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography sx={{ color: "white" }} variant="h4">
          Odaberi lokaciju
        </Typography>
        <IconButton onClick={onClose}>
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
        {selectedLocation.data && (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <ArrowRightIcon />
            <Typography variant="h4" key={selectedLocation.data?.id}>
              {selectedLocation.data?.name}
            </Typography>
          </Box>
        )}
        {location_suggestions.isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {location_suggestions.data
              ?.filter(l => l.id !== selectedLocation_id)
              .map(location => (
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
  )
}
