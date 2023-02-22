import { Input, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import SearchRounded from '@mui/icons-material/SearchRounded'
import LocationIcon from '@mui/icons-material/LocationOn'
import HandymanIcon from '@mui/icons-material/Handyman'
import data from "./data.json"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState } from 'react'
import { asNonNil } from '@mk-libs/common/common'

const { sellableItems } = data


export default function Item_sale(){
  const [_selectedItem, setSelectedItem] = useState<number>()
  const selectedItem = _selectedItem ? asNonNil(sellableItems.find(e => e.id === _selectedItem)) : undefined

  return (
    <Box sx={{ px: 4, pt: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box>
        <Input
          sx={{ pb: 0.7, mb: 6, width: 350 }}
          autoFocus
          placeholder="Pretraži"
          startAdornment={<SearchRounded sx={{ mr: 2 }} />}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 700, }}>
          {sellableItems.map(item => {
            return (
              <Accordion 
                expanded={item.id === selectedItem?.id}
                onChange={(e, isExpanded) => setSelectedItem(isExpanded ? item.id : undefined)}
              >
                <AccordionSummary sx={{ pl: 1.5 }} expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', flex: 1 }}>
                    <img src={item.imageUrl} width={100} height={100} />
                    <Box sx={{ marginLeft: 3 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                        {item.title}
                      </Typography>
                      <Box sx={{ color: 'text.secondary', mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.3, }}>
                          <LocationIcon style={{ width: 17, height: 17 }} sx={{ mr: 1, }} />
                          <Typography>{item.area}</Typography>
                        </Box>
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
    </Box>
  )
}
