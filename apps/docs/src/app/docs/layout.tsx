import Link from 'next/link';
import Image from 'next/image';
import { DocsSidebar } from '../../components/DocsSidebar';
import { Button, Divider } from '../../components/luminescent-client';
import styles from './layout.module.css';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Image src="/logo-v2.png" alt="Luminescent Logo" width={28} height={28} style={{ borderRadius: '6px' }} />
            Luminescent
          </Link>
        </div>
        
        <nav className={styles.headerNav}>
          <a href="https://github.com/axvrma/luminescent" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                GitHub
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </span>
            </Button>
          </a>
        </nav>
      </header>
      
      <div className={styles.mainContainer}>
        <DocsSidebar />
        
        <main className={styles.content}>
          <div className={styles.topDivider}>
            <Divider orientation="horizontal" color="#ffaa66" glowDirection="bottom" />
          </div>
          
          {children}
          
          <div className={styles.bottomDivider}>
            <Divider orientation="horizontal" color="#ffaa66" glowDirection="top" />
          </div>
        </main>
      </div>
    </div>
  );
}
