import type { AppProps } from 'next/app'
import "../styles.global.css"
import '@fontsource/public-sans' // TODO: in pages/app.tsx


export default function AppRoot({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
