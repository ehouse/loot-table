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
  const { data, mutate } = useSWRImmutable<APIGetEquipment>({ url: '/api/getEquipment', filter: JSON.stringify({ level: levelSelect }), book: 'core' }, fetcher)

  const totalValue = data?.equipment.reduce((acc, cur) => (acc + Number(cur.price)), 0) ?? 0

  return (
    <>
      <Head>
        <title>LootTable</title>
        <meta name="description" content="Quickly generate loot drops for Pathfinder 2nd Edition encounters." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/ssw0czr.css" />
      </Head>
      <main className={styles.main}>
        <button onClick={() => { mutate() }}>Refresh</button>
        <LevelSelect setLevel={setLevelSelect} levelSelect={levelSelect} />
        <EquipmentList data={data} />
        <div>Total: {totalValue}</div>
      </main>
    </>
  )
}
