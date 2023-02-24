import { Input, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import SearchRounded from '@mui/icons-material/SearchRounded'
import LocationIcon from '@mui/icons-material/LocationOn'
import data from "./data.json"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState } from 'react'
import { asNonNil } from '@mk-libs/common/common'
import { Layout1_list_sx, Layout1_root_sx } from './layout1'

const { jobs } = data


export default function Job_offers(){
  const [_selectedItem, setSelectedItem] = useState<number>()
  const selectedItem = _selectedItem ? asNonNil(jobs.find(e => e.id === _selectedItem)) : undefined

  return (
    <Box sx={Layout1_root_sx}>
      <Input
        sx={{ pb: 0.7, mb: 6, width: 350 }}
        autoFocus
        placeholder="Pretraži"
        startAdornment={<SearchRounded sx={{ mr: 2 }} />}
      />
      <Box sx={Layout1_list_sx}>
        {jobs.map(item => {
          return (
            <Accordion
              key={item.id}
              expanded={item.id === selectedItem?.id}
              onChange={(e, isExpanded) => setSelectedItem(isExpanded ? item.id : undefined)}
            >
              <AccordionSummary sx={{ pl: 1.5, pb: 1, }} expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                    {item.title}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flex: 1, marginTop: 3, marginRight: 3, }}>
                    <Box sx={{ color: 'text.secondary', mt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.3, }}>
                        <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1, }} />
                        <Typography>{item.location}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, }}>
                      {item.photos.map(photo => (
                        <img
                          style={{
                            width: 65,
                            height: 65
                          }}
                          src={photo}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ ml: 16, }}>
                <Typography>
                  {item.description}
                </Typography>
                <Typography sx={{ mt: 4 }}>
                  Phone number: {item.adOwner.phoneNumber}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Box>
    </Box>
  )
}
