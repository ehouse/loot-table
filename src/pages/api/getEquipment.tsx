import type { NextApiRequest, NextApiResponse } from 'next'
import data from '@/data/equipment.json'
import { APIGetEquipment, Equipment } from '@/types/equipment'

type FilterList = Record<string, string | string[]>[]

const filterTrait = (equipmentList: Equipment[], name: string): Equipment[] => {
    return equipmentList.filter((entries) => (
        entries.traits.filter((trait) => (trait.name === name)).length > 0
    ))
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let filter: Record<string, string | string[]> | null = null

    if (req.query.filter) {
        let filterList = data

        // Attempt to safely parse down filter list
        try {
            filter = JSON.parse(req.query.filter as string)
        } catch (e) {
            res.status(500).json({ error: e })
            return
        }

        // Terminate if null value is collected
        if (filter === null) {
            res.status(500).json({ error: "Filter cannot be empty" })
            return
        }

        if (filter['traits']) {
            filterList = filterTrait(filterList, filter['traits'] as string)
            console.log(filterList)
        }

        res.status(200).json({ equipment: filterList })
    }

    const response: Equipment[] = []
    for (let index = 0; index < 5; index++) {
        const x = data[Math.floor(Math.random() * data.length)]
        response.push(x)
    }
    res.status(200).json({ equipment: response })
}