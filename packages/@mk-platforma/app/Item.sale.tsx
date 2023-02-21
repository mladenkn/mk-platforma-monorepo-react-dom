import { Input, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import SearchRounded from '@mui/icons-material/SearchRounded'
import LocationIcon from '@mui/icons-material/LocationOn'
import HandymanIcon from '@mui/icons-material/Handyman'
import data from "./data.json"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"


export default function Item_sale(){
  return (
    <Box sx={{ px: 4, pt: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box>
        <Input
          sx={{ pb: 0.7, mb: 6, width: 350 }}
          autoFocus
          placeholder="Pretraži majstore"
          startAdornment={<SearchRounded sx={{ mr: 2 }} />}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 700, }}>
          {data.experts.map(expert => {
            return (
              <Accordion>
                <AccordionSummary sx={{ pl: 1.5 }} expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 16, width: 115 }}>
                      {expert.firstName}{' '}{expert.lastName}
                    </Typography>
                    <Box sx={{ pl: 1, ml: 10, color: 'text.secondary' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.3, }}>
                        <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1, }} />
                        <Typography>{expert.area}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <HandymanIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
                        <Typography>{expert.occupations.join(', ')}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ ml: 25, mt: 3 }}>
                  details todo
                </AccordionDetails>
              </Accordion>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
