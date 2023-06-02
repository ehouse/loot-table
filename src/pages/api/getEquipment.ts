import type { NextApiRequest, NextApiResponse } from 'next'
import data from '@/data/equipment.json'
import { APIGetEquipment, Equipment } from '@/types/equipment'

const BOOKSET = {
    core: ["Core Rulebook", "Advanced Player's Guide", "Gamemastery Guide"],
    expanded: ["Core Rulebook", "Advanced Player's Guide", "Secrets of Magic", "Dark Archive", "Book of the Dead", "Gamemastery Guide", "Guns & Gears", "Treasure Vault"],
    full: ["Core Rulebook", "Advanced Player's Guide", "Secrets of Magic", "Dark Archive", "Book of the Dead", "Gamemastery Guide", "Guns & Gears", "Treasure Vault", "Grand Bazaar", "Gods & Magic"]
}

const filterBook = (equipmentList: Equipment[], bookSetKey: keyof typeof BOOKSET): Equipment[] => (
    equipmentList.filter((entries) => (BOOKSET[bookSetKey].includes(entries.source)))
)

const filterLevel = (equipmentList: Equipment[], level: string): Equipment[] => (
    equipmentList.filter((entries) => (
        Number(entries.level) <= Number(level)
    ))
)

const filterCatagory = (equipmentList: Equipment[], name: string): Equipment[] => (
    equipmentList.filter((entries) => (
        entries.item_category === name
    ))
)

const filterTrait = (equipmentList: Equipment[], name: string): Equipment[] => (
    equipmentList.filter((entries) => (
        entries.traits.filter((trait) => (trait.name === name)).length > 0
    ))
)

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let filter: Record<string, string | string[]> | null = null

    const bookSetKey = req.query.book ?? 'core'
    const bookData = filterBook(data, bookSetKey as keyof typeof BOOKSET)

    if (req.query.filter) {
        let filterList = bookData

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
        }

        if (filter['catagory']) {
            filterList = filterCatagory(filterList, filter['catagory'] as string)
        }

        if (typeof filter['level'] !== 'undefined') {
            filterList = filterLevel(filterList, filter['level'] as string)
        }

        const responseBody = []

        // Limit size of response 
        for (let index = 0; index < 10; index++) {
            const x = filterList[Math.floor(Math.random() * filterList.length)]
            responseBody.push(x)
        }

        res.status(200).json({ equipment: responseBody })
    }

    const response: Equipment[] = []
    for (let index = 0; index < 5; index++) {
        const x = data[Math.floor(Math.random() * data.length)]
        response.push(x)
    }
    res.status(200).json({ equipment: response })
}