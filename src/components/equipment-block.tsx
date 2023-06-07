import React from 'react'

import { Equipment } from "@/types/equipment";
import { TraitChip } from './TraitChip';

const Block = (props: { children: React.ReactNode }) => (
    <div css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '16px 0',
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

const LevelChip = (props: { level: number }) => (
    <div css={{
        fontSize: '20px',
        padding: '0 16px',
        borderRadius: '32px',
        backgroundColor: 'hsl(28, 100%, 38%)',
        color: 'hsl(28, 100%, 90%)',
        alignSelf: 'center',
        justifySelf: 'center',
        boxShadow: '2px 1px 7px 1px hsl(28, 80%, 10%, 0.5)'
    }}>{props.level}</div>
)

export function EquipmentBlockNeo(props: { equipment: Equipment }) {
    const { equipment } = props

    return <div css={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '[level] 50px [title] auto [traits] max-content',
        gridTemplateRows: 'auto',
        gap: '8px',
        background: 'linear-gradient(45deg, hsl(215, 26%, 18%), hsl(215, 28%, 20%), hsl(215, 26%, 18%))',
        padding: '10px 12px',
        border: '2px solid',
        borderImageSlice: '1',
        borderImageSource: 'var(--equiptment-block-gradient)',
        boxShadow: `2px 2px 14px 2px hsl(215, 28%, 32%, 0.5)`
    }}>
        <div css={{
            position: 'absolute',
            right: 0,
            top: -24,
            'button': {
                border: 0, backgroundColor: 'inherit', fontSize: '16px', color: 'rgba(255, 255, 255, 0.3)'
            },
            '*:hover': {
                color: 'rgba(255, 255, 255, 0.9)',
                cursor: 'pointer'
            }
        }}>
            <button css={{ paddingRight: '8px' }}>↻</button>
            <button>X</button>
        </div>
        <LevelChip level={equipment.level} />
        <h3 css={{ fontSize: '24px' }}><a href={'https://2e.aonprd.com' + equipment.url} target="_blank">{equipment.name}</a></h3>
        {equipment.traits.length > 0 && <div css={{
            display: 'flex',
            gap: '4px',
            alignItems: 'start',
            maxWidth: '32rem',
            flexWrap: 'wrap',
            justifyContent: 'end'
        }}>{
                equipment.traits.map((trait) => { return <TraitChip key={trait.name} {...trait} /> })
            }</div>}
        <div css={{ gridColumnStart: 'title', color: 'rgba(255, 255, 255, 0.7)' }}>
            {equipment.item_category && <span className='catagory'>{equipment.item_category}</span>}
            {equipment.item_subcategory && <span className='catagory'> &gt; {equipment.item_subcategory}</span>}
        </div>
        <div css={{ justifySelf: 'end', color: '#FFC857' }}>{(equipment.price ?? 0) / 100} gp</div>
    </div>
}

export function EquipmentBlock(props: { equipment: Equipment }) {
    const { equipment } = props

    return <Block>
        <div className='block-title'>
            <LevelChip level={equipment.level} />
            <h3><a href={'https://2e.aonprd.com' + equipment.url} target="_blank">{equipment.name}</a></h3>
        </div>
        <div css={{ display: 'flex' }}>
            <div css={{ flexGrow: 1 }}>
                {equipment.item_category && <span className='catagory'>{equipment.item_category}</span>}
                {equipment.item_subcategory && <span className='catagory'> &gt; {equipment.item_subcategory}</span>}
            </div>
            {equipment.traits.length > 0 && <div css={{ display: 'flex', gap: '4px', }}>{
                equipment.traits.map((trait) => { return <TraitChip key={trait.name} {...trait} /> })
            }</div>}
        </div>
    </Block>
}