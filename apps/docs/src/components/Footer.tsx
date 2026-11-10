"use client";

import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--header-border)',
      background: 'rgba(15, 15, 17, 0.4)',
      padding: '3rem 2rem',
      marginTop: 'auto',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        textAlign: 'center'
      }}>
        
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem' }}>
          <a href="https://github.com/axvrma/luminescent" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}>
            GitHub
          </a>
          <a href="https://www.npmjs.com/package/luminescent" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}>
            npm
          </a>
          <Link href="/docs" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}>
            Documentation
          </Link>
        </div>

        <div style={{ opacity: 0.5, fontSize: '0.85rem' }}>
          <p style={{ marginBottom: '0.5rem' }}>Built with Luminescent & Next.js</p>
          <p>&copy; {new Date().getFullYear()} axvrma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
