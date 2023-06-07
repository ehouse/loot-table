import Link from 'next/link';
import { useRouter } from 'next/router';
import { css } from '@emotion/react'

const NavBarCSS = css({
    display: 'flex',
    alignItems: 'end',
    maxWidth: '768px',
    margin: '0 auto',
    gap: '1rem',
    fontSize: '20px',
    padding: '8px 0 2rem 0',
    color: 'rgba(255, 255, 255, 0.7)',
    '*:hover': { color: 'rgba(255, 255, 255, 0.9)' },
    '*:first-child': {
        fontSize: '32px',
        lineHeight: '26px',
        backgroundImage: 'var(--logo-gradient)',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    }
})

const ActiveLink = css({
    color: 'var(--text-primary)'
})

export function Layout(props: { children: React.ReactElement }) {
    const router = useRouter();
    const currentRoute = router.pathname;

    return <div>
        <div css={NavBarCSS}>
            <Link css={currentRoute === '/' ? ActiveLink : ''} href='/'>Loot Table</Link>
            <Link css={currentRoute === '/services' ? ActiveLink : ''} href='/services'>Services</Link>
        </div>
        {props.children}
    </div>
}