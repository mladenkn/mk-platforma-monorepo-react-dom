import { Input, Box } from '@mui/joy'
import SearchRounded from '@mui/icons-material/SearchRounded'


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
      <Box>
        {experts.map(expert => (
          <Box>
            <Box>{expert.firstName}{' '}{expert.lastName}</Box>
            <Box>{expert.area}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}