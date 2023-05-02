import { IconButton, Typography, Input, useTheme, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { Header_root } from "./Header"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import Api from "./trpc.client"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import React, { useState } from "react"
import DoneIcon from "@mui/icons-material/Done"

type Props = {
  selectedLocation: number | null
  set_selectedLocation(l: number | null): void
  selectedLocation_radius_km: number | null
  set__selectedLocation_radius_km(v: number | null): void
  onClose(): void
}

export default function Location_select_screen({
  selectedLocation: selectedLocation_id,
  set_selectedLocation,
  selectedLocation_radius_km,
  set__selectedLocation_radius_km,
  onClose,
}: Props) {
  const [location_search, set__location_search] = useState("")
  const location_suggestions = Api.location.many.useQuery({ query: location_search })
  const selectedLocation = Api.location.single.useQuery(
    { id: selectedLocation_id! },
    { enabled: !!selectedLocation_id }
  )

  const { typography } = useTheme()

  function handleClose() {
    set_selectedLocation(null)
    onClose()
  }

  function handle_location_unselect() {
    set_selectedLocation(null)
    set__selectedLocation_radius_km(null)
  }

  const selectedLocation_input_value = selectedLocation_id
    ? selectedLocation_radius_km ?? 50
    : undefined

  console.log(selectedLocation_input_value)

  return (
    <Box>
      <Header_root sx={{ pl: 1, pr: 1.5 }}>
        <IconButton onClick={handleClose}>
          <ArrowBackIosOutlinedIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography sx={{ color: "white" }} variant="h4">
          Odaberi lokaciju
        </Typography>
        <IconButton onClick={onClose}>
          <DoneIcon sx={{ color: "white" }} />
        </IconButton>
      </Header_root>
      <Box sx={{ px: 2, mt: 2, mb: 2 }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Input
            sx={{ mb: 3, width: "100%", fontSize: typography.h5, flex: 4.55 }}
            placeholder="Pretraži"
            value={location_search}
            onChange={e => set__location_search(e.target.value)}
            startAdornment={<SearchIcon sx={{ mr: 1.5 }} />}
          />
          <Input
            sx={{ flex: 1, mb: 3, fontSize: typography.h5 }}
            placeholder="Radius"
            type="number"
            endAdornment={
              selectedLocation_input_value ? (
                <Typography color="text.secondary">km</Typography>
              ) : undefined
            }
            value={selectedLocation_input_value}
            onChange={e => set__selectedLocation_radius_km(parseInt(e.target.value))}
          />
        </Box>
        {selectedLocation.data && (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 4 }}>
            <ArrowRightIcon />
            <Typography sx={{ mr: 6 }} variant="h4" key={selectedLocation.data?.id}>
              {selectedLocation.data?.name}
            </Typography>
            <DoneIcon sx={{ mr: 3 }} />
            <IconButton onClick={handle_location_unselect}>
              <CloseIcon />
            </IconButton>
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
                <Box
                  key={location.id}
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                  onClick={() => set_selectedLocation(location.id)}
                >
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
