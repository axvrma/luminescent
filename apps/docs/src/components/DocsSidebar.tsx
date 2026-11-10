"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../app/docs/layout.module.css';

const COMPONENTS = [
  'Button',
  'ContainerTextFlip',
  'Divider',
  'FloatingMenu',
  'ImagesBadge',
  'RadioGroup',
  'ScreenReveal',
  'SegmentedControl',
  'TextField',
  'Timeline',
  'Toggle',
];

export function DocsSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Hamburger Icon for Docs */}
      <button className={styles.mobileSidebarBtn} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle sidebar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </>
          )}
        </svg>
      </button>

      {/* Backdrop overlay for mobile */}
      {isOpen && <div className={styles.sidebarOverlay} onClick={() => setIsOpen(false)} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <nav className={styles.nav}>
          <div className={styles.navGroup}>
            <h4 className={styles.navTitle}>Getting Started</h4>
            <Link href="/docs/getting-started" className={styles.navLink}>Installation</Link>
          </div>
          
          <div className={styles.navGroup}>
            <h4 className={styles.navTitle}>Components</h4>
            {COMPONENTS.map(comp => (
              <Link key={comp} href={`/docs/components/${comp.toLowerCase()}`} className={styles.navLink}>
                {comp}
              </Link>
            ))}
          </div>
          
          <div className={styles.navGroup}>
            <h4 className={styles.navTitle}>Examples</h4>
            <Link href="/docs/examples/all-in-one" className={styles.navLink}>All-in-One</Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
