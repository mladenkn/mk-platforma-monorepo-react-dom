import { Input, Box, Typography, List, ListItem, ListItemButton, } from '@mui/material'
import SearchRounded from '@mui/icons-material/SearchRounded'
import { useState } from 'react'
import LocationIcon from '@mui/icons-material/LocationOn'
import HandymanIcon from '@mui/icons-material/Handyman'
import { asNonNil } from "@mk-libs/common/common"
import { experts } from "./data.json"


export default function Expert_search(){
  const [_selectedExpert, setSelectedExpert] = useState<number>()
  const selectedExpert = _selectedExpert ? asNonNil(experts.find(e => e.id === _selectedExpert)) : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ minWidth: 500 }}>
        <Input
          autoFocus
          placeholder="Pretraži majstore"
          startDecorator={<SearchRounded />}
        />
        <List sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {experts.map(expert => (
            <ListItemButton key={expert.id} sx={{ mb: 2, }} onClick={() => setSelectedExpert(expert.id)}>
              <ListItem sx={{ flexDirection: 'column', alignItems: 'start' }}>
                <Typography fontWeight={600} fontSize="lg" sx={{ mb: 1 }}>{expert.firstName}{' '}{expert.lastName}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.3, }}>
                  <LocationIcon sx={{ mr: 1 }} />
                  <Typography>{expert.area}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <HandymanIcon sx={{ mr: 1 }} />
                  <Typography>{expert.occupations.join(', ')}</Typography>
                </Box>
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box sx={{ mt: 9, ml: 3, }}>
        {selectedExpert && (
          <>
            <Typography>{selectedExpert.description}</Typography>
            <Typography sx={{ mt: 4 }}>Mobitel/telefon: {selectedExpert.phone}</Typography>
          </>
        )}
      </Box>
    </Box>
  )
}
