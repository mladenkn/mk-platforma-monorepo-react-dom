import Home_section from '@mk-platforma/app/Home.section'
import { CssVarsProvider } from '@mui/joy/styles'
import '@fontsource/public-sans' // TODO: in pages/app.tsx

export default function Home() {
  return (
    <CssVarsProvider>
      <Home_section />
    </CssVarsProvider>
  )
}
