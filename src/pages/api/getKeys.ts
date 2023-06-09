import type { NextApiRequest, NextApiResponse } from 'next'
import data from '@/data/equipment.json'
import { Equipment } from '@/types/equipment'

type ReqKey = keyof typeof data[number]

/**
 * Return permutations of the data keys
 */
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string[] | string | Record<string, string[]>>
) {
    switch (req.query['key']) {
        case "source":
            if (req.query['expanded']) {
                // Expanded source shows source and source category
                const expandedSource: Record<string, string[]> = {}
                data.forEach((entry) => {
                    if (!expandedSource.hasOwnProperty(entry.source_category)) {
                        expandedSource[entry.source_category] = [entry.source ?? '']
                    } else {
                        expandedSource[entry.source_category] = [...expandedSource[entry.source_category], entry.source ?? '']
                    }
                })

                // Required to collapse duplicate source category down
                Object.keys(expandedSource).forEach((title) => {
                    expandedSource[title] = [...new Set(expandedSource[title])]
                })

                return res.status(200).json(expandedSource)
            }
            const allSource = data.map((entry) => {
                return entry.source
            })

            const reducedSource = [...new Set(allSource)]

            return res.status(200).json(reducedSource)
        case "traits":
            const allTraits = data.flatMap((entry) => {
                return entry.traits.map((x) => x.name)
            })

            const reducedTraits = [...new Set(allTraits)]

            return res.status(200).json(reducedTraits)
        case "catagory":
            // Expanded catagories shows catagory and subcategories
            if (req.query['expanded']) {
                const expandedCatagory: Record<string, string[]> = {}
                data.forEach((entry) => {
                    if (!expandedCatagory.hasOwnProperty(entry.item_category)) {
                        expandedCatagory[entry.item_category] = [entry.item_subcategory ?? '']
                    } else {
                        expandedCatagory[entry.item_category] = [...expandedCatagory[entry.item_category], entry.item_subcategory ?? '']
                    }
                })

                // Required to collapse duplicate subcategories down
                Object.keys(expandedCatagory).forEach((title) => {
                    expandedCatagory[title] = [...new Set(expandedCatagory[title])]
                })

                return res.status(200).json(expandedCatagory)
            }

            const allCatagory = data.map((entry) => {
                return entry.item_category
            })

            const reducedCatagory = [...new Set(allCatagory)]

            return res.status(200).json(reducedCatagory)
        case "subcategory":
            const allSubCatagory = data.map((entry) => {
                return entry.item_subcategory ?? ''
            })

            const reducedSubCatagory = [...new Set(allSubCatagory)]

            return res.status(200).json(reducedSubCatagory)
        default:
            return res.status(500).json("Invalid key")
    }
} 