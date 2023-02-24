import { Input, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import SearchRounded from "@mui/icons-material/SearchRounded"
import { useState } from "react"
import LocationIcon from "@mui/icons-material/LocationOn"
import HandymanIcon from "@mui/icons-material/Handyman"
import { asNonNil } from "@mk-libs/common/common"
import data from "./data.json"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Layout1_root_sx, Layout1_list_sx } from "./layout1"
import Avatar from "./avatar"
import { faker } from "@faker-js/faker"

const { experts } = data

function randomColor() {
  return faker.helpers.arrayElement([
    { background: "green", color: "white" },
    { background: "yellow" },
    { background: "red", color: "white" },
    { background: "blue", color: "white" },
    { background: "orange" },
  ])
}

export default function Expert_search() {
  const [_selectedExpert, setSelectedExpert] = useState<number>()
  const selectedExpert = _selectedExpert ? asNonNil(experts.find(e => e.id === _selectedExpert)) : undefined

  return (
    <Box sx={Layout1_root_sx}>
      <Input
        sx={{ pb: 0.7, mb: 5, width: 350 }}
        autoFocus
        placeholder="Pretraži majstore"
        startAdornment={<SearchRounded sx={{ mr: 2 }} />}
      />
      <Box sx={Layout1_list_sx}>
        {experts.map(expert => {
          const isExpanded = expert.id === selectedExpert?.id
          return (
            <Accordion
              sx={{ width: "100%" }}
              key={expert.id}
              expanded={expert.id === selectedExpert?.id}
              onChange={(e, isExpanded) => setSelectedExpert(isExpanded ? expert.id : undefined)}
            >
              <AccordionSummary sx={{ pl: 1.5 }} expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      marginRight: 4,
                      ...randomColor(),
                    }}
                    letter={expert.firstName[0]}
                  />
                  <Typography sx={{ fontWeight: 600, fontSize: 16, width: 115 }}>
                    {expert.firstName} {expert.lastName}
                  </Typography>
                  <Box
                    sx={{
                      pl: 1,
                      ml: 10,
                      color: !isExpanded ? "text.secondary" : undefined,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.3 }}>
                      <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
                      <Typography>{expert.location}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <HandymanIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
                      <Typography>{expert.occupations.join(", ")}</Typography>
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ ml: 25, mt: 3 }}>
                <Typography>{expert.description}</Typography>
                <Typography sx={{ mt: 4 }}>Mobitel/telefon: {expert.adOwner.phoneNumber}</Typography>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Box>
    </Box>
  )
}
