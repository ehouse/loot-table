import Link from 'next/link';
import { useRouter } from 'next/router';
import { css } from '@emotion/react'

const NavBarCSS = css({
    display: 'flex',
    maxWidth: '768px',
    margin: '0 auto',
    gap: '1rem',
    fontSize: '22px',
    paddingBottom: '2rem',
    color: 'rgba(255, 255, 255, 0.7)',
    '*:hover': { color: 'rgba(255, 255, 255, 0.9)' }
})

const ActiveLink = css({
    color: 'rgba(255, 255, 255, 1)'
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