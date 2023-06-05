import data, { Equipment } from '@/types/equipment'

type CategoryFilter = 'Core' | 'Rulebooks' | 'Lost Omens'

export function bookCategoryItemSet(categoryFilter: CategoryFilter) {
    // Returns ONLY Core Rulebook and Gamemastery Guide content
    if (categoryFilter === 'Core') {
        return data.filter((item) => (item.source === 'Core Rulebook' || item.source === 'Gamemastery Guide'))
    }

    // Returns collection of all items under any standard rulebook
    if (categoryFilter === 'Rulebooks') {
        return data.filter((item) => (item.source_category === 'Rulebooks'))
    }

    // Returns collection of all items under any standard rulebook or any lost omens books
    if (categoryFilter === 'Lost Omens') {
        return data.filter((item) => (item.source_category === 'Rulebooks' || item.source_category === 'Lost Omens'))
    }

    return []
}