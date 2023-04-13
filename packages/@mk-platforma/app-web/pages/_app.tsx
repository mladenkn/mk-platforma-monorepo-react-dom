import type { AppType } from "next/app"
import Api from "../client/trpc.client"
import "../styles.global.css"
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

const theme = responsiveFontSizes(createTheme())

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default Api.withTRPC(MyApp)
