import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { APIGetEquipment, Equipment } from '@/types/equipment'
import { bookCategoryItemSet } from '@/data/itemData'
import { TraitChip } from '@/components/TraitChip';
import { useState } from 'react';

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

function ServiceBlock(props: { service: Equipment }) {
    const { service } = props

    return <Block>
        <div className='block-title'>
            <h3><a href={'https://2e.aonprd.com' + service.url} target="_blank">{service.name}</a></h3>
        </div>
        <div css={{ display: 'flex' }}>
            <div css={{ flexGrow: 1 }}>
                {service.item_category && <span className='catagory'>{service.item_category}</span>}
                {service.item_subcategory && <span className='catagory'> &gt; {service.item_subcategory}</span>}
            </div>
            {service.traits.length > 0 && <div css={{ display: 'flex', gap: '4px' }}>{
                service.traits.map((trait) => { return <TraitChip key={trait.name} {...trait} /> })
            }</div>}
        </div>
    </Block>
}

export const getStaticProps: GetStaticProps<{ items: Equipment[] }> = () => {
    const itemData = bookCategoryItemSet('Rulebooks')

    const returnData = itemData.filter((item) => item.item_category === 'Services')
    return { props: { items: returnData } }
}

export default function Services({ items }: InferGetStaticPropsType<typeof getStaticProps>) {
    const [search, setSearch] = useState('')

    return <div css={{ width: '768px', minHeight: '100vh', margin: '0 auto' }}>
        <form css={{ display: 'flex', flexDirection: 'column', maxWidth: '20rem', gap: '4px' }}>
            <label>Search</label>
            <input type='search' onChange={(e) => { setSearch(e.target.value) }} value={search} />
        </form>
        {items.filter((service) =>
            (service.name.includes(search))
        ).map((service) => {
            return <ServiceBlock service={service} />
        })}
    </div>
}