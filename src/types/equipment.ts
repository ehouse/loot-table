import data from '@/data/equipment.json'

export type APIGetEquipment = { equipment: Equipment[] }

export type Equipment = typeof data[number]