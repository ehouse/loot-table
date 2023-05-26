import React from 'react'

import { Equipment } from "@/types/equipment";

const Block = (props: { children: React.ReactNode }) => (
    <div css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '16px',
        h3: {
            fontSize: '20px'
        },
        '.block-title': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px'
        },
        '.catagory': {
            color: 'rgba(255, 255, 255, 0.7)'
        }
    }}>{props.children}</div>
)

const TraitChip = (props: { name: string, href: string }) => (
    <span css={{
        fontSize: '16px',
        padding: '0 8px',
        borderRadius: '32px',
        backgroundColor: 'hsl(218, 41%, 30%)',
        color: 'hsl(218, 41%, 74%)'
    }}><a href={props.href}>{props.name}</a></span>
)

const LevelChip = (props: { level: string }) => (
    <div css={{
        fontSize: '20px',
        padding: '0 12px',
        borderRadius: '32px',
        backgroundColor: 'hsl(28, 100%, 38%)',
        color: 'hsl(28, 100%, 90%)'
    }}>{props.level}</div>
)

export function EquipmentBlock(props: { equipment: Equipment }) {

    const { equipment } = props

    return <Block>
        <div className='block-title'>
            <LevelChip level={equipment.level} />
            <h3><a href={equipment.link}>{equipment.name}</a></h3>
        </div>
        <div css={{ display: 'flex' }}>
            <div css={{ flexGrow: 1 }}>
                {equipment.category && <span className='catagory'>{equipment.category}</span>}
                {equipment.subcategory && <span className='catagory'> &gt; {equipment.subcategory}</span>}
            </div>
            {equipment.traits.length > 0 && <div css={{ display: 'flex', gap: '4px' }}>{
                equipment.traits.map((trait) => { return <TraitChip {...trait} /> })
            }</div>}
        </div>
    </Block>
}