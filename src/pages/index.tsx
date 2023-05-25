import Head from 'next/head'
import styles from '@/styles/Index.module.css'
import { EquipmentBlock } from '@/components/equipment-block'
import useSWRImmutable from 'swr'
import { APIGetEquipment } from "@/types/equipment";

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function Home() {
  const { data, mutate } = useSWRImmutable<APIGetEquipment>('/api/getEquipment', fetcher)

  const totalValue = data?.equipment.reduce((acc, cur) => (acc + Number(cur.price)), 0) ?? 0

  data?.equipment.map((item) => {
    console.log(item.price)
  })

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
        {data &&
          <div>
            {data.equipment.map((item) => (<EquipmentBlock key={item.link} equipment={item} />))}
          </div>
        }
        <div>Total: {totalValue}</div>
      </main>
    </>
  )
}
