import { Input, Box, Typography, List, ListItem, ListItemButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import SearchRounded from '@mui/icons-material/SearchRounded'
import { useState } from 'react'
import LocationIcon from '@mui/icons-material/LocationOn'
import HandymanIcon from '@mui/icons-material/Handyman'
import { asNonNil } from "@mk-libs/common/common"
import data from "./data.json"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"


export default function Expert_search(){
  const [_selectedExpert, setSelectedExpert] = useState<number>()
  const selectedExpert = _selectedExpert ? asNonNil(data.experts.find(e => e.id === _selectedExpert)) : undefined

  return (
    <Box sx={{ px: 4, pt: 4 }}>
      <Input
        sx={{ pb: 0.7, ml: 1, mb: 3 }}
        autoFocus
        placeholder="Pretraži majstore"
        startAdornment={<SearchRounded sx={{ mr: 2 }} />}
      />
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 450 }}>
        {data.experts.map(expert => (
          <Accordion
            expanded={expert.id === selectedExpert?.id}
            onChange={(e, isExpanded) => setSelectedExpert(isExpanded ? expert.id : undefined)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Box>
                <Typography sx={{ }}>
                  {expert.firstName}{' '}{expert.lastName}
                </Typography>
                <Box sx={{ mt: 2, ml: 0.5, }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.3, color: 'text.secondary' }}>
                    <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1, }} />
                    <Typography>{expert.area}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <HandymanIcon style={{ width: 17, height: 17 }} sx={{ mr: 1 }} />
                    <Typography>{expert.occupations.join(', ')}</Typography>
                  </Box>
                </Box>             
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ color: 'text.secondary' }}>
              <Typography>{expert.description}</Typography>
              <Typography sx={{ mt: 4 }}>Mobitel/telefon: {expert.phone}</Typography>                  
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}
