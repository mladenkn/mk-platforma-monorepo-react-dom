import { Input, Box, Typography, List, ListItem, ListItemButton } from '@mui/joy'
import SearchRounded from '@mui/icons-material/SearchRounded'
import { ComponentProps, useState } from 'react'
import LocationIcon from '@mui/icons-material/LocationOn'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import { asNonNil, generateArray } from "@mk-libs/common/common"
import { faker } from '@faker-js/faker'


const jobs = ['računalni programer', 'odvjetnik', 'zidar', 'vodoinstalater', 'fasader']

let id = 1
const experts = generateArray(() => ({ 
  id: id++,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  area: faker.address.city(),
  occupations: [faker.helpers.arrayElement(jobs)],
  description: faker.lorem.text(),
  phone: faker.phone.number(),
}), 5)

export default function ExpertSearch(){
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
            <ListItemButton sx={{ mb: 2, }} onClick={() => setSelectedExpert(expert.id)}>
              <ListItem sx={{ flexDirection: 'column', alignItems: 'start' }}>
                <Text level="h2" sx={{ mb: 1 }}>{expert.firstName}{' '}{expert.lastName}</Text>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.3, }}>
                  <LocationIcon sx={{ mr: 1 }} />
                  <Text level="h4" fontSize="md">{expert.area}</Text>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <WorkOutlineIcon sx={{ mr: 1 }} />
                  <Text level="h4" fontSize="md">{expert.occupations.join(', ')}</Text>
                </Box>
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box sx={{ mt: 9, ml: 3, }}>        
        {selectedExpert ? (
            <>
              <Text level="h4" fontSize="md">{selectedExpert.description}</Text>
              <Text level="h4" fontSize="md" sx={{ mt: 4 }}>Phone: {selectedExpert.phone}</Text>
            </>
          ) : 
          undefined
        }
      </Box>
    </Box>
  )
}

function Text(props: ComponentProps<typeof Typography>){
  return (
    <Typography
      component="div"
      fontSize="lg"
      textColor="text.primary"
      {...props}
    />
  )
}
