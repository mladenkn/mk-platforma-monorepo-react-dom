import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab_ from '@mui/material/Tab'
import { useState } from 'react'
import { styled, Typography } from '@mui/material'
import Expert_search from './Expert.search'
import Item_sale from './Item.sale'


type Tab = 'buying' | 'selling' | 'experts' | 'jobs'

export default function CenteredTabs() {
  const [value, setValue] = useState<Tab>('experts')

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={(e, value) => setValue(value)} centered>
        <Tab label="Kupujem" value="buying" />
        <Tab label="Prodajem" value="selling" />
        <Tab label="Majstori" value="experts" />
        <Tab label="Poslovi" value="jobs" />
      </Tabs>
      {value === 'buying' && (
        <Box>
          <Typography>Buying tab</Typography>
        </Box>
      )}
      {value === 'selling' && <Item_sale />}
      {value === 'experts' && <Expert_search />}
      {value === 'jobs' && (
        <Box>
          <Typography>jobs tab</Typography>
        </Box>
      )}
    </Box>
  )
}

const Tab = styled(Tab_)({
  textTransform: 'none',
})