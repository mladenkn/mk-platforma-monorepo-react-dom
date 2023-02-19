import { Input, Box, Typography, List, ListItem, ListItemButton } from '@mui/joy'
import SearchRounded from '@mui/icons-material/SearchRounded'
import { ComponentProps, useState } from 'react'
import LocationIcon from '@mui/icons-material/LocationOn'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'


const experts = [
  {
    id: 1,
    firstName: 'Mladen',
    lastName: 'Knezović',
    area: 'Split i okolica',
    occupations: ['računalni programer'],
  },
  {
    id: 2,
    firstName: 'Ante',
    lastName: 'Klinčić',
    area: 'Split i okolica',
    occupations: ['odvjetnik'],
  },
  {
    id: 3,
    firstName: 'Tomislav',
    lastName: 'Horaček',
    area: 'Zagreb',
    occupations: ['zidar'],
  },
  {
    id: 4,
    firstName: 'Ante',
    lastName: 'Franić',
    area: 'Osijek',
    occupations: ['vodoinstalater'],
  },
  {
    id: 5,
    firstName: 'Jure',
    lastName: 'Matinović',
    area: 'Osijek',
    occupations: ['fasader'],
  },
  // {
  //   id: 6,
  //   firstName: 'Stipe',
  //   lastName: 'Jurić',
  //   area: 'Osijek',
  //   occupations: ['keramičar'],
  // },
]

export default function ExpertSearch(){
  const [selectedExpert, setSelectedExpert] = useState<number>()

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
                  <Text level="h4">{expert.area}</Text>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <WorkOutlineIcon sx={{ mr: 1 }} />
                  <Text level="h4">{expert.occupations.join(', ')}</Text>
                </Box>
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box>
        
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