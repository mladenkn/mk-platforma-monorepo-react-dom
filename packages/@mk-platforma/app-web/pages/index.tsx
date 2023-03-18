import ZaBrata_MK_root from "@mk-platforma/app/ZaBrata.MK.root"
import trpc from "../trpc"

export default function Home(){
  const query = trpc.hello.useQuery()
  return (
    <>
      {query.data}
      <ZaBrata_MK_root />
    </>
  )
}
