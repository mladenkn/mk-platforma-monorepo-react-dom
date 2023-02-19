import { Input, Box } from '@mui/joy'
import SearchRounded from '@mui/icons-material/SearchRounded'


export default function ExpertSearch(){
  return (
    <Box>
      <Input
        autoFocus
        placeholder="Pretraži majstore"
        startDecorator={<SearchRounded />}
      />
    </Box>
  )
}