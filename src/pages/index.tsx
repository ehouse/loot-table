import { useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Index.module.css'
import useSWRImmutable from 'swr/immutable'
import { APIGetEquipment } from "@/types/equipment";
import { LevelSelect } from '@/components/level-select'
import { EquipmentList } from '@/components/equipment-list'

const fetcher = (args: { url: string, filter: string, book: string }) => {
  let filterString = '?filter=' + args.filter + '&book=' + args.book
  return fetch(args.url + filterString).then(r => r.json())
}

export default function Home() {
  const [levelSelect, setLevelSelect] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const { data, mutate } = useSWRImmutable<APIGetEquipment>({ url: '/api/getEquipment', filter: JSON.stringify({ level: levelSelect }), book: 'core' }, fetcher)

  const refreshData = () => { mutate() }

  return (
    <>
      <Head>
        <title>LootTable</title>
        <meta name="description" content="Quickly generate loot drops for Pathfinder 2nd Edition encounters." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <LevelSelect setLevel={setLevelSelect} levelSelect={levelSelect} />
        <div css={{ paddingTop: '2rem', color: 'rgba(255,255,255,0.7)' }}>Total: {totalValue / 100} GP</div>
        <EquipmentList data={data} refresh={refreshData} setTotalValue={setTotalValue} />
      </main>
    </>
  )
}
