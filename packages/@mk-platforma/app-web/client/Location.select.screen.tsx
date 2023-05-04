import { IconButton, Typography, Input, useTheme, Container } from "@mui/material"
import { Box } from "@mui/system"
import { Header_root } from "./Header"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import Api from "./trpc.client"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import React, { useState } from "react"
import DoneIcon from "@mui/icons-material/Done"
import { match, P } from "ts-pattern"

type Props = {
  location_initial: number | null
  location_radius_initial: number | null
  onBack(): void
  onDone(location: number | null, location_radius: number | null): void
}

export default function Location_select_screen({
  location_initial,
  location_radius_initial,
  onBack,
  onDone,
}: Props) {
  const [location_id, set_location] = useState<number | null>(location_initial)
  const [location_radius, set_location_radius] = useState<number | null>(location_radius_initial)

  const [location_search, set__location_search] = useState("")
  const location_suggestions = Api.location.many.useQuery({ query: location_search })
  const selectedLocation = Api.location.single.useQuery(
    { id: location_id! },
    { enabled: !!location_id }
  )

  const { typography } = useTheme()

  function handle_location_unselect() {
    set_location(null)
    set_location_radius(null)
  }

  const selectedLocation_input_radius_value = location_id ? location_radius ?? 50 : ""

  function handleDone() {
    // match({ selectedLocation_id, selectedLocation_radius })
    //   .with({ selectedLocation_id: null }, () => onDone(null, null) )
    //   .with({ selectedLocation_id: P.number, selectedLocation_radius: P.union(P.nullish, P.when(radius => radius !== null && radius < 1)) }, () => {})
    //   .with({ selectedLocation_id: P.number, selectedLocation_radius: P.union(P.number, P.when(radius => radius > 0)) }, () => onDone())
  }

  return (
    <Box>
      <Header_root sx={{}}>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: 1,
            pr: 1.5,
          }}
          maxWidth="md"
        >
          <IconButton onClick={onBack}>
            <ArrowBackIosOutlinedIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography sx={{ color: "white" }} variant="h4">
            Odaberi lokaciju
          </Typography>
          <IconButton onClick={handleDone}>
            <DoneIcon sx={{ color: "white" }} />
          </IconButton>
        </Container>
      </Header_root>
      <Container sx={{ px: 2, mt: 2, mb: 2 }} maxWidth="md">
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
              selectedLocation_input_radius_value ? (
                <Typography color="text.secondary">km</Typography>
              ) : undefined
            }
            value={selectedLocation_input_radius_value}
            onChange={e => set_location_radius(parseInt(e.target.value))}
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
              ?.filter(l => l.id !== location_id)
              .map(location => (
                <Box
                  key={location.id}
                  sx={{ display: "flex", gap: 1, alignItems: "center", cursor: "pointer" }}
                  onClick={() => set_location(location.id)}
                >
                  <ArrowRightIcon />
                  <Typography variant="h4" key={location.id}>
                    {location.name}
                  </Typography>
                </Box>
              ))}
          </Box>
        )}
      </Container>
    </Box>
  )
}
