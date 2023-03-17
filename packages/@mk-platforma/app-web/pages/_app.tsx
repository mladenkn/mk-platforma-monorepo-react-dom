import type { AppType } from 'next/app'
import { trpc } from '../trpc'
import "../styles.global.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}
export default trpc.withTRPC(MyApp)
