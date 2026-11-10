import type { Metadata } from 'next';
import 'luminescent/style.css';
import './globals.css';
import { LuminescentProvider } from 'luminescent';
import { SiteHeader } from '../components/SiteHeader';
import { Footer } from '../components/Footer';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Luminescent — A little light for your next interface',
    template: '%s · Luminescent',
  },
  description:
    'Thoughtfully crafted React components with luminous surfaces, accessible interactions, and scoped themes. Beautiful by default. Engineered for production.',
  openGraph: {
    title: 'Luminescent — A little light. A lot of possibility.',
    description: 'Luminous React components. Thoughtful interactions. Your next interface.',
    images: ['/opengraph-image'],
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LuminescentProvider theme="dark" className="site-shell">
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <div className="site-content">{children}</div>
          <Footer />
        </LuminescentProvider>
      </body>
    </html>
  );
}
