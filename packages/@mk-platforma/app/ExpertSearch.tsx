import { Input, Box, Typography } from '@mui/joy'
import SearchRounded from '@mui/icons-material/SearchRounded'
import { ComponentProps } from 'react'


const experts = [
  {
    firstName: 'Mladen',
    lastName: 'Knezović',
    area: 'Split i okolica',
  },
  {
    firstName: 'Ante',
    lastName: 'Klinčić',
    area: 'Split i okolica',
  },
  {
    firstName: 'Tomislav',
    lastName: 'Horaček',
    area: 'Zagreb',
  },
  {
    firstName: 'Ante',
    lastName: 'Franić',
    area: 'Osijek',
  },
  {
    firstName: 'Jure',
    lastName: 'Matinović',
    area: 'Osijek',
  },
]

export default function ExpertSearch(){
  return (
    <Box>
      <Input
        autoFocus
        placeholder="Pretraži majstore"
        startDecorator={<SearchRounded />}
      />
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, }}>
        {experts.map(expert => (
          <Box sx={{ mb: 2 }}>
            <Text level="h2" sx={{ mb: 1 }}>{expert.firstName}{' '}{expert.lastName}</Text>
            <Text level="h4">{expert.area}</Text>
          </Box>
        ))}
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