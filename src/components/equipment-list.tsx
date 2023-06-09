import { useEffect, useState } from 'react'

import { EquipmentBlock } from '@/components/equipment-block'
import { APIGetEquipment, Equipment } from "@/types/equipment";

const MoreButton = (props: { increaseDisplayCount: () => void }) => (
    <button onClick={props.increaseDisplayCount} css={{ padding: '0px 24px', fontSize: '24px', border: '0' }}>+</button>
)

export function EquipmentList(props: { loading: boolean, data: APIGetEquipment | undefined, refresh: () => void, setTotalValue: (arg0: number) => void }) {
    const [displayCount, setDisplayCount] = useState(5)
    const { data, setTotalValue } = props

    useEffect(() => {
        // Short circuit if empty or null value
        if (typeof data === 'undefined' || data?.equipment.length === 0) {
            return
        }

        const totalValue = data.equipment.slice(0, displayCount).reduce((acc, cur) => {
            return (acc + cur.price! ?? 0)
        }, 0)
        setTotalValue(totalValue)
    }, [data, displayCount])

    if (props.loading) {
        return <div>Loading...</div>
    }

    if (typeof data === 'undefined' || data?.equipment.length === 0) {
        return <div>No Items</div>
    }

    return <div css={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {data.equipment.slice(0, displayCount).map((item) => (<EquipmentBlock key={item.url} equipment={item} />))}
        <div css={{ display: 'flex', gap: '8px' }}>
            <button onClick={props.refresh} css={{ border: '0', padding: '0px 24px', fontSize: '24px' }}>↻</button>
            {displayCount < 10 && <MoreButton increaseDisplayCount={() => setDisplayCount((state) => (++state))} />}
        </div>
    </div>

}