import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import data from "./data.json"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Page_base from "./Page.base"

const { jobs } = data


export default function Job_offers() {
  return (
    <Page_base
      pageRootProps={{
        activeTab: 'jobs'
      }}
      items={jobs}
      renderItem={(item, setSelectedItem, selectedItem,) => {
        const isExpanded = item.id === selectedItem
        return (
          <Accordion
            key={item.id}
            sx={{
              maxWidth: 600,
            }}
            expanded={isExpanded}
            onChange={(e, isExpanded) => setSelectedItem(isExpanded ? item.id : undefined)}
          >
            <AccordionSummary sx={{ pl: 1.5, pb: 1 }} expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{item.label}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flex: 1,
                    marginTop: 3,
                    marginRight: 3,
                  }}
                >
                  <Box sx={{ color: "text.secondary", mt: 1, ml: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.3 }}>
                      <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
                      <Typography>{item.location}</Typography>
                    </Box>
                  </Box>
                  {!isExpanded && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {item.photos.map((photo, index) => (
                        <img key={index} width={65} height={65} src={photo} />
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ ml: 16, pb: 3 }}>
              <Typography>{item.description}</Typography>
              <Typography sx={{ mt: 4 }}>Phone number: {item.adOwner.phoneNumber}</Typography>
              <Box sx={{ display: "flex", gap: 1, marginTop: 4 }}>
                {item.photos.map((photo, index) => (
                  <img key={index} width={75} height={75} src={photo} />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        )
      }}
    />
  )
}
