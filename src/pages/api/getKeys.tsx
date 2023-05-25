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
            const allSource = data.map((entry) => {
                return entry.source.name
            })

            const reducedSource = [...new Set(allSource)]

            res.status(200).json(reducedSource)
        case "traits":
            const allTraits = data.flatMap((entry) => {
                return entry.traits.map((x) => x.name)
            })

            const reducedTraits = [...new Set(allTraits)]

            res.status(200).json(reducedTraits)
        case "catagory":
            // Expanded catagories shows catagory and subcatagories
            if (req.query['expanded']) {
                const expandedCatagory: Record<string, string[]> = {}
                data.forEach((entry) => {
                    if (!expandedCatagory.hasOwnProperty(entry.category)) {
                        expandedCatagory[entry.category] = [entry.subcategory]
                    } else {
                        expandedCatagory[entry.category] = [...expandedCatagory[entry.category], entry.subcategory]
                    }
                })

                // Required to collapse duplicate subcatagories down
                Object.keys(expandedCatagory).forEach((title) => {
                    expandedCatagory[title] = [...new Set(expandedCatagory[title])]
                })

                return res.status(200).json(expandedCatagory)
            }

            const allCatagory = data.map((entry) => {
                return entry.category
            })

            const reducedCatagory = [...new Set(allCatagory)]

            return res.status(200).json(reducedCatagory)
        case "subcategory":
            const allSubCatagory = data.map((entry) => {
                return entry.subcategory
            })

            const reducedSubCatagory = [...new Set(allSubCatagory)]

            return res.status(200).json(reducedSubCatagory)
        default:
            return res.status(500).json("Invalid key")
    }
} 