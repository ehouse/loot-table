export const TraitChip = (props: { name: string, href: string }) => (
    <span css={{
        fontSize: '16px',
        padding: '0 8px',
        borderRadius: '32px',
        backgroundColor: 'hsl(218, 41%, 30%)',
        color: 'hsl(218, 41%, 74%)'
    }}><a href={'https://2e.aonprd.com' + props.href}>{props.name}</a></span>
)