import Link from 'next/link';
import { Breadcrumbs, CodeBlock } from 'luminescent';
import { ComponentWorkbench } from './ComponentWorkbench';
import { componentEntries, catalog, type ComponentName } from '../lib/catalog';
import api from '../lib/api.generated.json';
export function ComponentDocumentation({ name }: { name: ComponentName }) {
  const entry = catalog[name];
  const props = api[name];
  const related = componentEntries
    .filter((component) => component.name !== name && component.category === entry.category)
    .slice(0, 4);
  return (
    <article className="component-doc">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs/overview' },
          { label: 'Components', href: '/docs/components' },
          { label: name },
        ]}
      />
      <div className="page-eyebrow">{entry.category}</div>
      <h1>
        {name}
        <span className="peach-text">.</span>
      </h1>
      <p className="page-lead">{entry.description}</p>
      <nav aria-label="On this page" className="doc-on-this-page">
        <a href="#preview">Preview</a>
        <a href="#installation">Installation</a>
        <a href="#api">API reference</a>
        <a href="#accessibility">Accessibility</a>
        <a href="#customization">Customization</a>
      </nav>
      <section id="preview" aria-label={`${name} live example`}>
        <h2 className="sr-only">Live preview</h2>
        <ComponentWorkbench name={name} />
      </section>
      <h2 id="installation">Installation</h2>
      <CodeBlock code="npm install luminescent" language="bash" />
      <p>
        Import <code>luminescent/style.css</code> once at your application root. The example above
        uses the same package implementation as Storybook.
      </p>
      <h2 id="variants">Variants and states</h2>
      <p>
        Use the preview controls to explore the supported variants, sizes, disabled/loading states
        and reduced motion. Controls appear only where the component exposes the corresponding prop.
        Theme and glow apply to every component.
      </p>
      {entry.state && (
        <>
          <h2 id="state">Controlled and uncontrolled state</h2>
          <p>
            State contract: <code>{entry.state}</code>. Omit the controlled prop to let the
            component own its initial state; supply a value and callback when your application owns
            it. Native uncontrolled fields and state-backed form controls participate in form reset.
            Controlled state must be reset by the application.
          </p>
          {entry.controlledCode && <CodeBlock code={entry.controlledCode} language="tsx" />}
        </>
      )}
      <h2 id="api">API reference</h2>
      <p>
        Generated from the source TypeScript interfaces. Native attributes, <code>className</code>,{' '}
        <code>style</code>, <code>aria-*</code> and <code>data-*</code> also pass through to the
        documented element. Import <code>{name}Props</code> from the package for the full inherited
        contract.
      </p>
      <div className="api-scroll" tabIndex={0} role="region" aria-label={`${name} properties`}>
        <table className="api-table">
          <thead>
            <tr>
              <th scope="col">Prop</th>
              <th scope="col">Type</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => (
              <tr key={`${prop.interface}-${prop.name}`}>
                <td>
                  <code>{prop.name}</code>
                  {prop.required && <span className="required-label">required</span>}
                </td>
                <td>
                  <code>{prop.type}</code>
                </td>
                <td>
                  {prop.description ||
                    (prop.interface === `${name}Props`
                      ? 'Optional unless marked required.'
                      : prop.interface)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 id="accessibility">Accessibility and keyboard</h2>
      <p>{entry.accessibility}</p>
      <p>
        Keep labels meaningful and test application-level contrast, focus order and screen-reader
        output. See the{' '}
        <Link href="/docs/foundations/accessibility" className="peach-text">
          accessibility guide
        </Link>{' '}
        for composition requirements.
      </p>
      <h2 id="customization">Theme customization</h2>
      <CodeBlock code={entry.themedCode} language="tsx" />
      <p>
        Switch between light and dark in the preview, or open the{' '}
        <Link href="/playground" className="peach-text">
          playground
        </Link>{' '}
        for a larger workspace. Custom CSS variables can override spacing, color, typography and
        effects.
      </p>
      <h2>Related components</h2>
      <div className="related-links">
        {related.map((component) => (
          <Link key={component.name} href={`/docs/components/${component.slug}`}>
            {component.name} →
          </Link>
        ))}
        <Link href="/docs/components">All components →</Link>
      </div>
    </article>
  );
}
