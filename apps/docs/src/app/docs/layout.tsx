import { DocsSidebar } from '../../components/DocsSidebar';
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-shell">
      <DocsSidebar />
      <main id="main-content" className="docs-content">
        {children}
      </main>
    </div>
  );
}
