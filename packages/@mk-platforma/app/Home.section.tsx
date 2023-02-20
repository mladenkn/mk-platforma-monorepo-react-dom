import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab_ from '@mui/material/Tab'
import { useState } from 'react'
import { styled, Typography } from '@mui/material'
import Expert_search from './Expert.search'


type Tab = 'buying' | 'selling' | 'lookingForJob' | 'offeringJob'

export default function CenteredTabs() {
  const [value, setValue] = useState<Tab>('lookingForJob')

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={(e, value) => setValue(value)} centered>
        <Tab label="Kupujem" value="buying" />
        <Tab label="Prodajem" value="selling" />
        <Tab label="Tražim posao" value="lookingForJob" />
        <Tab label="Nudim posao" value="offeringJob" />
      </Tabs>
      {value === 'buying' && (
        <Box>
          <Typography>Buying tab</Typography>
        </Box>
      )}
      {value === 'selling' && (
        <Box>
          <Typography>Selling tab</Typography>
        </Box>
      )}
      {value === 'lookingForJob' && (
        <Expert_search />
      )}
      {value === 'offeringJob' && (
        <Box>
          <Typography>offeringJob tab</Typography>
        </Box>
      )}
    </Box>
  )
}

const Tab = styled(Tab_)({
  textTransform: 'none'
})