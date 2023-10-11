import type { AppType } from "next/app"
import Api from "~/api_/api.client"
import "../styles.global.css"
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import Head from "next/head"
import { SessionProvider } from "next-auth/react"
import { SnackbarProvider } from "notistack"

const theme = responsiveFontSizes(createTheme())

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={(pageProps as any).session}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <Head>
            <title>Pametni oglasi</title>
          </Head>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
export default Api.withTRPC(MyApp)
