import { EquipmentBlock } from '@/components/equipment-block'
import { APIGetEquipment, Equipment } from "@/types/equipment";

export function EquipmentList(props: { data: APIGetEquipment | undefined }) {

    if (typeof props.data === 'undefined') {
        return <div>No Items</div>
    }

    const DisplayItems: Equipment[] = props.data.equipment.slice(0, 5)


    return <div css={{ paddingTop: '16px' }}>
        {DisplayItems.map((item) => (<EquipmentBlock key={item.link} equipment={item} />))}
    </div>

}