import { IconButton, Typography, Input, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import Api from "~/api.trpc/api.client"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import React, { useEffect, useState } from "react"
import DoneIcon from "@mui/icons-material/Done"
import { useFormik } from "formik"
import { z } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { match, P } from "ts-pattern"
import Layout from "./Layout"
import { Header } from "./Header"
import { Header_back } from "./Header"

type Props = {
  location_initial: number | null
  location_radius_initial: number | null
  onBack(): void
  onDone(location: number | null, location_radius: number | null): void
}

const form_zod = z
  .object({
    location: z.number(),
    radius: z.number().gte(1),
  })
  .or(
    z.object({
      location: z.null(),
      radius: z.null(),
    }),
  )

// TODO: error message za radius

export default function Location_select_page({
  location_initial,
  location_radius_initial,
  onBack,
  onDone,
}: Props) {
  const form = useFormik({
    initialValues: {
      location: location_initial,
      radius: location_radius_initial,
    },
    onSubmit() {},
    validationSchema: toFormikValidationSchema(form_zod),
  })

  useEffect(() => {
    const newValues = match(form.values)
      .with({ location: P.number, radius: null }, v => ({ location: v.location, radius: 50 }))
      .otherwise(v => v)
    form.setValues(newValues)
  }, [form.values])

  const [location_search, set__location_search] = useState("")
  const location_suggestions = Api.location.many.useQuery({ query: location_search })
  const selectedLocation = Api.location.single.useQuery(
    { id: form.values.location! },
    { enabled: !!form.values.location },
  )

  const { typography } = useTheme()

  function handle_location_unselect() {
    form.setValues({ location: null, radius: null })
  }

  const selectedLocation_input_radius_value = form.values.location ? form.values.radius ?? 50 : ""

  async function handleDone() {
    const a = form_zod.safeParse(form.values)
    if (a.success) onDone(form.values.location, form.values.radius)
  }

  return (
    <Layout
      header={
        <Header sx={{ display: "flex", justifyContent: "space-between" }}>
          <Header_back onClick={onBack} />
          <Typography sx={{ color: "white" }} variant="h4">
            Odaberi lokaciju
          </Typography>
          <IconButton onClick={handleDone}>
            <DoneIcon sx={{ color: "white" }} />
          </IconButton>
        </Header>
      }
      content={
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
                selectedLocation_input_radius_value ? (
                  <Typography color="text.secondary">km</Typography>
                ) : undefined
              }
              value={selectedLocation_input_radius_value}
              name="radius"
              onChange={form.handleChange}
              inputProps={{
                min: 1,
              }}
            />
          </Box>
          {!form.isValid && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5">Problemi sa unosom:</Typography>
              <Box sx={{ ml: 2 }}>
                {form.errors.location && (
                  <Typography variant="h5">{form.errors.location}</Typography>
                )}
                {form.errors.radius && (
                  <Typography sx={{ fontSize: 22, color: "red" }}>
                    Radius: {form.errors.radius}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
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
                ?.filter(l => l.id !== form.values.location)
                .map(location => (
                  <Box
                    key={location.id}
                    sx={{ display: "flex", gap: 1, alignItems: "center", cursor: "pointer" }}
                    onClick={() => form.setFieldValue("location", location.id)}
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
      }
    />
  )
}
