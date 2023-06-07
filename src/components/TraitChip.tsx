export const TraitChip = (props: { name: string, href: string }) => (
    <span css={{
        fontSize: '16px',
        padding: '0 8px',
        borderRadius: '32px',
        backgroundColor: 'var(--primary-blue)',
        color: 'var(--primary-light-blue)',
        boxShadow: '2px 1px 7px 1px hsl(28, 80%, 10%, 0.4)'
    }}><a href={'https://2e.aonprd.com' + props.href}>{props.name}</a></span>
)