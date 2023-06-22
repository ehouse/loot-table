import { useState } from 'react'
import Head from 'next/head'
import useSWRImmutable from 'swr/immutable'
import { APIGetEquipment } from "@/types/equipment";
import { LevelSelect } from '@/components/level-select'
import { EquipmentList } from '@/components/equipment-list'
import { ViewItemProvider } from '@/context/view-item';


const fetcher = (args: { url: string, filter: string, book: string }) => {
  let filterString = '?filter=' + encodeURI(args.filter) + '&book=' + encodeURI(args.book)
  return fetch(args.url + filterString).then(r => r.json())
}

export default function Home() {
  const [levelSelect, setLevelSelect] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const { data, mutate, isLoading } = useSWRImmutable<APIGetEquipment>({ url: '/api/getEquipment', filter: JSON.stringify({ level: levelSelect }), book: 'core' }, fetcher)

  return (
    <>
      <Head>
        <title>LootTable</title>
        <meta name="description" content="Quickly generate loot drops for Pathfinder 2nd Edition encounters." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewItemProvider>
        <main css={{ width: '768px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          <LevelSelect setLevel={setLevelSelect} levelSelect={levelSelect} />
          <div css={{ paddingTop: '2rem', color: 'rgba(255,255,255,0.7)' }}>Total: {totalValue / 100} GP</div>
          <EquipmentList loading={isLoading} serverState={data} serverRefetch={mutate} setTotalValue={setTotalValue} />
        </main>
      </ViewItemProvider>
    </>
  )
}
