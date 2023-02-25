import { Box, Typography } from "@mui/material"
import LocationIcon from "@mui/icons-material/LocationOn"
import data from "./data.json"
import Page_base from "./Page.base"

const { jobs } = data


export default function Job_offers() {
  return (
    <Page_base
      pageRootProps={{
        activeTab: 'jobs'
      }}
      items={jobs}
      renderListItem={item => (
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
            <Box sx={{ display: "flex", gap: 1 }}>
              {item.photos.map((photo, index) => (
                <img key={index} width={65} height={65} src={photo} />
              ))}
            </Box>
          </Box>
        </Box>
      )}
      renderDetails={item => (
        <>
          <Typography>{item.description}</Typography>
          <Typography sx={{ mt: 4 }}>Phone number: {item.adOwner.phoneNumber}</Typography>
          <Box sx={{ display: "flex", gap: 1, marginTop: 4 }}>
            {item.photos.map((photo, index) => (
              <img key={index} width={75} height={75} src={photo} />
            ))}
          </Box>
        </>
      )}
    />
  )
}
