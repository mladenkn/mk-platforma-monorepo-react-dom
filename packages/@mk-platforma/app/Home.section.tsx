import Box from '@mui/joy/Box'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import Typography from '@mui/joy/Typography'
import Expert_search from './Expert.search'
import { useState } from 'react'


export default function TabsPageExample() {
  const [index, setIndex] = useState(2)
  return (
    <Box
      sx={{
        bgcolor: 'background.body',
        flexGrow: 1,
        overflowX: 'hidden',
        borderRadius: 'md',
      }}
    >
      <Tabs
        aria-label="Pipeline"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
        sx={{ '--Tabs-gap': '0px' }}
      >
        <TabList
          variant="plain"
          sx={{
            width: '100%',
            maxWidth: 400,
            mx: 'auto',
            pt: 2,
            alignSelf: 'flex-start',
            [`& .${tabClasses.root}`]: {
              bgcolor: 'transparent',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'transparent',
              },
              [`&.${tabClasses.selected}`]: {
                color: 'primary.plainColor',
                fontWeight: 'lg',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  zIndex: 1,
                  bottom: '-1px',
                  left: 'var(--List-item-paddingLeft)',
                  right: 'var(--List-item-paddingRight)',
                  height: '3px',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  bgcolor: 'primary.500',
                },
              },
            },
          }}
        >
          <Tab>Kupujem</Tab>
          <Tab>Prodajem</Tab>
          <Tab>Nudim posao</Tab>
          <Tab>Tražim posao</Tab>
        </TabList>
        <Box
          sx={(theme) => ({
            '--bg': theme.vars.palette.background.level3,
            height: '1px',
            background: 'var(--bg)',
            boxShadow: '0 0 0 100vmax var(--bg)',
            clipPath: 'inset(0 -100vmax)',
          })}
        />
        <Box
          sx={(theme) => ({
            '--bg': theme.vars.palette.background.surface,
            background: 'var(--bg)',
            boxShadow: '0 0 0 100vmax var(--bg)',
            clipPath: 'inset(0 -100vmax)',
            px: 4,
            pt: 4,
            pb: 2,
          })}
        >
          <TabPanel value={0}>
            <Typography
              level="h2"
              component="div"
              fontSize="lg"
              mb={2}
              textColor="text.primary"
            >
              Kupujem panel
            </Typography>
          </TabPanel>
          <TabPanel value={1}>
            <Typography
              level="h2"
              component="div"
              fontSize="lg"
              mb={2}
              textColor="text.primary"
            >
              Prodajem panel
            </Typography>
          </TabPanel>
          <TabPanel value={2}>
            <Expert_search />
          </TabPanel>
          <TabPanel value={3}>
          <Typography
              level="h2"
              component="div"
              fontSize="lg"
              mb={2}
              textColor="text.primary"
            >
              Tražim posao panel
            </Typography>
          </TabPanel>
        </Box>
      </Tabs>
    </Box>
  )
}