import data from '@/data/equipment.json'

export type APIGetEquipment = { equipment: Equipment[] }

export interface Equipment {
    id: string;
    name: string;
    url: string;
    source: string;
    source_category: SourceCategory;
    level: number;
    rarity: Rarity;
    bulk: number | null;
    price: number | null;
    traits: Trait[];
    type: Type;
    item_category: ItemCategory;
    item_subcategory: null | string;
}

export enum ItemCategory {
    Adjustments = "Adjustments",
    AdventuringGear = "Adventuring Gear",
    AlchemicalItems = "Alchemical Items",
    AnimalsAndGear = "Animals and Gear",
    Armor = "Armor",
    Artifacts = "Artifacts",
    AssistiveItems = "Assistive Items",
    BlightedBoons = "Blighted Boons",
    Consumables = "Consumables",
    Contracts = "Contracts",
    CursedItems = "Cursed Items",
    Customizations = "Customizations",
    Grimoires = "Grimoires",
    HeldItems = "Held Items",
    HighTech = "High-Tech",
    IntelligentItems = "Intelligent Items",
    Materials = "Materials",
    Other = "Other",
    Relics = "Relics",
    Runes = "Runes",
    Services = "Services",
    Shields = "Shields",
    SiegeWeapons = "Siege Weapons",
    Snares = "Snares",
    Spellhearts = "Spellhearts",
    Staves = "Staves",
    Structures = "Structures",
    Tattoos = "Tattoos",
    TradeGoods = "Trade Goods",
    Vehicles = "Vehicles",
    Wands = "Wands",
    Weapons = "Weapons",
    WornItems = "Worn Items",
}

export enum Rarity {
    Common = "common",
    Rare = "rare",
    Uncommon = "uncommon",
    Unique = "unique",
}

export enum SourceCategory {
    AdventurePaths = "Adventure Paths",
    Adventures = "Adventures",
    BlogPosts = "Blog Posts",
    Comics = "Comics",
    LostOmens = "Lost Omens",
    Rulebooks = "Rulebooks",
    Society = "Society",
}

export interface Trait {
    name: string;
    href: string;
}

export enum Type {
    Armor = "Armor",
    Item = "Item",
    Shield = "Shield",
    SiegeWeapon = "Siege Weapon",
    Vehicle = "Vehicle",
    Weapon = "Weapon",
}

export default data as Equipment[]