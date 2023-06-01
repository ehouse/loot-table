import { useEffect, useState } from 'react'

import { EquipmentBlock } from '@/components/equipment-block'
import { APIGetEquipment, Equipment } from "@/types/equipment";

const MoreButton = (props: { increaseDisplayCount: () => void }) => (
    <button onClick={props.increaseDisplayCount} css={{ padding: '0px 24px', fontSize: '24px', border: '0' }}>+</button>
)

export function EquipmentList(props: { data: APIGetEquipment | undefined, setTotalValue: (arg0: number) => void }) {
    const [displayCount, setDisplayCount] = useState(5)

    useEffect(() => {
        // Short circuit if empty or null value
        if (typeof props.data === 'undefined' || props.data?.equipment.length === 0) {
            return
        }

        const totalValue = props.data.equipment.slice(0, displayCount).reduce((acc, cur) => {
            return (acc + cur.price! ?? 0)
        }, 0)
        props.setTotalValue(totalValue)
    }, [props.data, displayCount])


    if (typeof props.data === 'undefined' || props.data?.equipment.length === 0) {
        return <div>No Items</div>
    }

    return <div css={{ paddingTop: '8px' }}>
        {props.data.equipment.slice(0, displayCount).map((item) => (<EquipmentBlock key={item.url} equipment={item} />))}
        {displayCount < 10 && <MoreButton increaseDisplayCount={() => setDisplayCount((state) => (++state))} />}
    </div>

}