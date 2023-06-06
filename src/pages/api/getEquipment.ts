import type { NextApiRequest, NextApiResponse } from 'next'
import data, { Equipment } from '@/types/equipment'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let filter: Record<string, string | string[]> | null = null

    // Attempt to safely parse down filter list
    try {
        filter = JSON.parse(req.query.filter as string)
    } catch (e) {
        return res.status(500).json({ error: e })
    }

    // Terminate if null value is collected
    if (filter === null) {
        return res.status(500).json({ error: "Filter cannot be empty" })
    }

    const filteredData = data.filter((entry) => {
        // Remove all non-core books
        if (entry.source_category !== 'Rulebooks') {
            return false
        }

        // Remove all non-items from list early
        const categoryFilter = ['Vehicles', 'Services', 'Materials']
        if (categoryFilter.includes(entry.item_category)) {
            return false
        }

        // Remove all items above the given level
        if (typeof filter!['level'] !== 'undefined') {
            if (entry.level > Number(filter!['level'])) {
                return false
            }
        }

        // Negative match against trait.name
        if (filter!['trait']) {
            if (entry.traits.filter((trait) => (trait.name === filter!['trait'])).length === 0) {
                return false
            }
        }

        // Negative match against trait.category
        if (filter!['category']) {
            if (entry.item_category !== filter!['category']) {
                return false
            }
        }

        // Return item if none of the above filters kicked back
        return true
    })

    let responseBody: Equipment[] = []

    // Cheaply Limit size of response 
    for (let index = 0; index < 10; index++) {
        const x = filteredData[Math.floor(Math.random() * filteredData.length)]
        responseBody.push(x)
    }

    return res.status(200).json({ equipment: responseBody })
}