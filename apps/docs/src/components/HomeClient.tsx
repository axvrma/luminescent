'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Command,
  Layers,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  Zap,
} from 'lucide-react';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Checkbox,
  CodeBlock,
  Dialog,
  LuminescentProvider,
  Progress,
  Slider,
  Toggle,
  type GlowColor,
} from 'luminescent';
import { componentEntries } from '../lib/catalog';
const palettes = [
  { name: 'peach', hex: '#ffaa66' },
  { name: 'violet', hex: '#c09bff' },
  { name: 'blue', hex: '#7dbeff' },
  { name: 'mint', hex: '#6ee7b7' },
] as const;
export function HomeClient() {
  const [accent, setAccent] = useState<GlowColor>('peach');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [intensity, setIntensity] = useState(72);
  const [notifications, setNotifications] = useState(true);
  const [created, setCreated] = useState(false);
  return (
    <main id="main-content">
      <section className="hero-section">
        <div className="hero-copy">
          <Link href="/docs/project/changelog" className="release-pill">
            <span className="live-dot" /> A new chapter for Luminescent <ArrowRight size={13} />
          </Link>
          <h1>
            A little light.
            <br />A lot of <span>possibility.</span>
          </h1>
          <p>
            Thoughtfully crafted React components for interfaces that feel a little more human.
            Beautiful by default. Yours in every detail.
          </p>
          <div className="hero-cta">
            <Link href="/docs/getting-started" className="primary-link">
              Start building <ArrowRight size={17} />
            </Link>
            <Link href="/docs/components" className="secondary-link">
              Explore components <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="install-command">
            <Command size={15} aria-hidden="true" />
            <code>npm install luminescent</code>
            <span>React 18 + 19</span>
          </div>
          <div className="hero-proof">
            <span>
              <Check size={13} /> TypeScript
            </span>
            <span>
              <Check size={13} /> Open source
            </span>
            <span>
              <Check size={13} /> Made for your theme
            </span>
          </div>
        </div>
        <div className="hero-showcase">
          <div className="showcase-orbit" aria-hidden="true" />
          <div className="showcase-caption">
            <span className="live-dot" /> REAL COMPONENTS. GO AHEAD, TRY THEM.
          </div>
          <LuminescentProvider
            theme={theme}
            accent={accent}
            className="workspace-preview"
            style={{ '--lumi-glow-strength': intensity / 72 }}
          >
            <div className="workspace-preview-heading">
              <span className="workspace-icon">
                <Layers size={20} />
              </span>
              <div>
                <h2>Your creative space</h2>
                <p>Good things start with a little intention.</p>
              </div>
              <Badge size="sm" variant="success" dot>
                Live
              </Badge>
            </div>
            <div className="workspace-project">
              <div>
                <span className="small-overline">WORKSPACE</span>
                <h3>Studio Luminescent</h3>
              </div>
              <AvatarGroup label="Workspace members">
                <Avatar alt="Alex Morgan" size="sm" />
                <Avatar alt="Jamie Chen" size="sm" />
                <Avatar alt="Sam Rivera" size="sm" />
              </AvatarGroup>
            </div>
            <div className="workspace-setting">
              <div>
                <strong>Make some room for focus</strong>
                <p>A calmer space for your next big idea.</p>
              </div>
              <Toggle
                checked={notifications}
                onChange={setNotifications}
                aria-label="Focus mode"
                size="sm"
              />
            </div>
            <div className="workspace-divider" />
            <Slider
              label="Glow intensity"
              value={intensity}
              onChange={setIntensity}
              showValue
              formatValue={(value) => `${value}%`}
            />
            <div className="workspace-palette">
              <span>Find your light</span>
              <div role="group" aria-label="Accent palette">
                {palettes.map((palette) => (
                  <button
                    key={palette.name}
                    type="button"
                    aria-label={`${palette.name} accent`}
                    aria-pressed={accent === palette.name}
                    style={{ '--swatch': palette.hex } as React.CSSProperties}
                    onClick={() => setAccent(palette.name)}
                  >
                    {accent === palette.name && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>
            <Button
              onClick={() => setCreated(true)}
              startIcon={<Sparkles size={15} />}
              style={{ width: '100%' }}
            >
              {created ? 'Your workspace is ready' : 'Create something wonderful'}
            </Button>
            <span role="status" className="sr-only">
              {created ? 'Workspace created' : ''}
            </span>
          </LuminescentProvider>
          <div className="showcase-bottom">
            <span>
              <span className="tiny-square" /> Built with Luminescent
            </span>
            <div role="group" aria-label="Showcase theme">
              <button
                type="button"
                aria-pressed={theme === 'dark'}
                onClick={() => setTheme('dark')}
              >
                Dark
              </button>
              <button
                type="button"
                aria-pressed={theme === 'light'}
                onClick={() => setTheme('light')}
              >
                Light
              </button>
            </div>
          </div>
          <div className="floating-snippet">
            <Code2 size={15} />
            <code>&lt;YourNextIdea /&gt;</code>
            <span className="live-dot" />
          </div>
        </div>
      </section>
      <div className="principles-strip">
        <span>
          <Layers size={15} /> {componentEntries.length} considered components
        </span>
        <span>
          <ShieldCheck size={15} /> Keyboard first interactions
        </span>
        <span>
          <WandSparkles size={15} /> CSS variable themes
        </span>
        <span>
          <Zap size={15} /> Tree shakeable modules
        </span>
      </div>
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="page-eyebrow">
              FAMILIAR BUILDING BLOCKS. A DIFFERENT KIND OF LIGHT.
            </span>
            <h2>
              The details make the difference<span className="peach-text">.</span>
            </h2>
            <p>
              From the first click to the finishing touch, a visual language that holds together.
            </p>
          </div>
          <Link href="/docs/components" className="text-link">
            All components <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="featured-grid">
          <Link href="/docs/components/button" className="featured-tile">
            <div className="featured-visual button-visual">
              <span className="visual-faux-button">
                A bright beginning <ArrowRight size={15} />
              </span>
            </div>
            <div className="featured-label">
              <div>
                <h3>Actions with intention</h3>
                <p>Buttons, toggles, and thoughtful states.</p>
              </div>
              <ArrowUpRight size={17} />
            </div>
          </Link>
          <div className="featured-tile">
            <div className="featured-visual form-visual">
              <Checkbox label="Design something meaningful" defaultChecked />
              <Checkbox label="Leave room for possibility" />
              <div className="fake-select">
                <span>Peach sunset</span>
                <span>⌄</span>
              </div>
            </div>
            <div className="featured-label">
              <div>
                <Link href="/docs/components/checkbox">
                  <h3>Every choice, considered</h3>
                </Link>
                <p>Native controls. A softer presence.</p>
              </div>
              <ArrowUpRight size={17} />
            </div>
          </div>
          <div className="featured-tile">
            <div className="featured-visual feedback-visual">
              <div className="mini-notification">
                <span className="mini-success">
                  <Check size={15} />
                </span>
                <div>
                  <strong>Looking good.</strong>
                  <p>Your changes have been saved.</p>
                </div>
              </div>
              <Progress value={76} label="A little closer" glowColor="mint" showValue />
            </div>
            <div className="featured-label">
              <div>
                <Link href="/docs/components/alert">
                  <h3>A reassuring little signal</h3>
                </Link>
                <p>Feedback that feels clear and human.</p>
              </div>
              <ArrowUpRight size={17} />
            </div>
          </div>
        </div>
      </section>
      <section className="home-section theme-section">
        <div>
          <span className="page-eyebrow">YOUR BRAND. YOUR KIND OF GLOW.</span>
          <h2>
            Beautiful defaults.
            <br />
            Room to make it yours.
          </h2>
          <p>
            A theme is more than a color switch. Configure semantic tokens, dial back the glow, and
            give every component a place in your design system.
          </p>
          <div className="theme-features">
            <span>
              <Check size={14} /> Dark, light, and system themes
            </span>
            <span>
              <Check size={14} /> Independently themed trees
            </span>
            <span>
              <Check size={14} /> Reduced motion built in
            </span>
          </div>
          <Link href="/playground" className="text-link">
            Find your light in the playground <ArrowRight size={16} />
          </Link>
        </div>
        <div className="theme-code">
          <div className="code-window-caption">
            <span>One provider. Your visual language.</span>
            <span>React + CSS</span>
          </div>
          <CodeBlock
            code={
              'import { LuminescentProvider, Button } from "luminescent";\nimport "luminescent/style.css";\n\n<LuminescentProvider\n  theme="dark"\n  accent="peach"\n  glow="subtle"\n>\n  <Button>Make it yours</Button>\n</LuminescentProvider>'
            }
            language="tsx"
          />
          <div className="theme-mini-swatches">
            {palettes.map((palette) => (
              <span key={palette.name}>
                <i style={{ background: palette.hex }} />
                {palette.name}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="home-section engineering-section">
        <div className="section-heading">
          <div>
            <span className="page-eyebrow">THE GLOW IS ONLY THE BEGINNING</span>
            <h2>Thoughtful on the inside, too.</h2>
          </div>
        </div>
        <div className="engineering-grid">
          {[
            {
              Icon: ShieldCheck,
              title: 'Accessible by design',
              text: 'Native form controls, visible focus, and established focus management for complex overlays.',
            },
            {
              Icon: Code2,
              title: 'Made to fit your stack',
              text: 'Typed APIs, ESM and CommonJS, and clear boundaries for Next.js and server rendering.',
            },
            {
              Icon: Layers,
              title: 'A system, not a collection',
              text: 'Shared semantic tokens connect color, space, typography, glow, and motion.',
            },
          ].map(({ Icon, title, text }) => (
            <article key={title}>
              <Icon size={22} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="home-section getting-started-section">
        <div>
          <span className="page-eyebrow">FROM IDEA TO INTERFACE</span>
          <h2>
            Your next bright idea starts here<span className="peach-text">.</span>
          </h2>
          <p>Install the package, import the stylesheet, and make something worth using.</p>
          <Link href="/docs/getting-started" className="primary-link">
            Read the quick start <ArrowRight size={16} />
          </Link>
        </div>
        <CodeBlock
          code={
            'npm install luminescent\n\n# Then import your first component:\n# import { Button } from "luminescent";\n# import "luminescent/style.css";'
          }
          language="bash"
        />
      </section>
      <section className="home-final-note">
        <span className="brand-mark">✳</span>
        <p>
          A little care goes a long way.
          <br />
          <span>Build something that feels like you.</span>
        </p>
        <Dialog
          title="A note about Luminescent"
          description="Beautiful by default. Accessible by design. Engineered for production."
          trigger={
            <button type="button" className="text-link">
              Our design philosophy <ArrowUpRight size={14} />
            </button>
          }
        >
          <p>
            We believe a useful interface can also feel warm, composed, and full of possibility.
            Read the{' '}
            <Link href="/docs/philosophy" className="peach-text">
              design philosophy
            </Link>{' '}
            to see how light, geometry, and interaction work together.
          </p>
        </Dialog>
      </section>
    </main>
  );
}
