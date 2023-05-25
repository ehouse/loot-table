import type { NextApiRequest, NextApiResponse } from 'next'
import data from '@/data/equipment.json'
import { APIGetEquipment, Equipment } from '@/types/equipment'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<APIGetEquipment>
) {
    const response: Equipment[] = []
    for (let index = 0; index < 5; index++) {
        const x = data[Math.floor(Math.random() * data.length)]
        response.push(x)
    }
    res.status(200).json({ equipment: response })
}