'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Zap } from 'lucide-react';
import {
  Accordion,
  Alert,
  Button,
  Card,
  Checkbox,
  Chip,
  Progress,
  Rating,
  Select,
  Skeleton,
  Slider,
  type GlowColor,
} from 'luminescent';

export type ExtendedComponentName =
  | 'Accordion'
  | 'Alert'
  | 'Card'
  | 'Checkbox'
  | 'Chip'
  | 'Progress'
  | 'Rating'
  | 'Select'
  | 'Skeleton'
  | 'Slider';

export function ComponentDemo({ name }: { name: ExtendedComponentName }) {
  const [value, setValue] = useState(64);
  const [rating, setRating] = useState(4);
  const [tags, setTags] = useState(['React', 'TypeScript', 'Luminescent']);
  const [visible, setVisible] = useState(true);
  const [color, setColor] = useState<GlowColor>('peach');

  switch (name) {
    case 'Checkbox':
      return (
        <div className="flex w-full flex-col gap-6">
          <Checkbox
            label="Ambient lighting"
            description="Let your interface shine a little brighter."
            defaultChecked
            name="lighting"
          />
          <Checkbox label="Email updates" name="updates" />
          <Checkbox
            label="Some projects selected"
            indeterminate
            aria-label="Some projects selected"
          />
          <Checkbox label="Unavailable option" disabled />
        </div>
      );
    case 'Select':
      return (
        <div className="flex w-full flex-col gap-6">
          <Select
            label="Glow palette"
            value={color}
            onChange={(event) => setColor(event.target.value as GlowColor)}
            glowColor={color}
            description="Choose a color to preview its focus glow."
          >
            <option value="peach">Peach sunset</option>
            <option value="violet">Violet haze</option>
            <option value="blue">Blue hour</option>
            <option value="mint">Mint aurora</option>
          </Select>
          <Select label="Workspace" disabled defaultValue="personal">
            <option value="personal">Personal workspace</option>
          </Select>
        </div>
      );
    case 'Slider':
      return (
        <div className="flex w-full flex-col gap-6">
          <Slider
            label="Light intensity"
            value={value}
            onChange={setValue}
            formatValue={(next) => `${next}%`}
          />
          <Slider label="Softness" defaultValue={35} glowColor="violet" />
          <Slider label="Locked intensity" defaultValue={70} disabled glowColor="blue" />
        </div>
      );
    case 'Rating':
      return (
        <div className="flex flex-col items-start gap-5">
          <Rating label="Rate your experience" value={rating} onChange={setRating} />
          <span className="text-sm text-[color:var(--lumi-muted)]">{rating} out of 5 stars</span>
          <Rating label="Community rating" defaultValue={5} readOnly size="sm" glowColor="violet" />
          <Rating label="Unavailable rating" defaultValue={3} disabled />
        </div>
      );
    case 'Chip':
      return (
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-wrap gap-3">
            <Chip icon={<Sparkles />}>Luminescent</Chip>
            <Chip glowColor="mint">Published</Chip>
            <Chip glowColor="violet" variant="outlined">
              Design systems
            </Chip>
            <Chip glowColor="blue" size="sm">
              v2.0
            </Chip>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {tags.map((tag) => (
              <Chip
                key={tag}
                onDelete={() => setTags(tags.filter((item) => item !== tag))}
                deleteLabel={`Remove ${tag}`}
              >
                {tag}
              </Chip>
            ))}
            {tags.length < 3 && (
              <button
                type="button"
                className="text-xs text-[color:var(--lumi-muted)] underline"
                onClick={() => setTags(['React', 'TypeScript', 'Luminescent'])}
              >
                Reset tags
              </button>
            )}
          </div>
        </div>
      );
    case 'Card':
      return (
        <Card spotlight className="w-full max-w-sm">
          <div className="mb-5 flex items-center justify-between">
            <Sparkles size={24} className="text-[#ffaa66]" />
            <Chip size="sm">New collection</Chip>
          </div>
          <div className="mb-2 text-xl font-semibold text-[color:var(--lumi-text)]">
            A little light. A lot of possibility.
          </div>
          <div className="mb-6 text-sm leading-relaxed text-[color:var(--lumi-muted)]">
            Move your cursor across this surface to follow the light. Build something that feels
            alive.
          </div>
          <Button variant="secondary" size="sm" onClick={() => setVisible(!visible)}>
            {visible ? 'Explore the glow' : 'Keep creating ✨'}
          </Button>
        </Card>
      );
    case 'Accordion':
      return (
        <div className="flex w-full flex-col gap-3">
          <Accordion title="What makes it luminescent?" defaultExpanded>
            Layered light, soft peach blooms, and a fine illuminated edge give every component a
            sense of depth.
          </Accordion>
          <Accordion title="Can I change the glow color?" glowColor="violet">
            Choose peach, violet, blue, or mint with the glowColor prop. Each color shares the same
            light treatment.
          </Accordion>
          <Accordion title="Does it support keyboard navigation?">
            Use Tab to focus a heading, then Enter or Space to expand it. Collapsed content is
            hidden from navigation.
          </Accordion>
        </div>
      );
    case 'Alert':
      return (
        <div className="flex w-full flex-col gap-3">
          {visible ? (
            <Alert title="Changes saved" severity="success" onClose={() => setVisible(false)}>
              Your workspace is up to date.
            </Alert>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => setVisible(true)}>
              Show alert again
            </Button>
          )}
          <Alert title="A little heads-up" severity="info">
            Your new components are ready to explore.
          </Alert>
          <Alert severity="warning">Your trial ends in three days.</Alert>
          <Alert title="Connection interrupted" severity="error">
            Reconnect to sync your latest changes.
          </Alert>
        </div>
      );
    case 'Progress':
      return (
        <div className="flex w-full flex-col gap-7">
          <Progress value={value} label="Preparing your workspace" showValue />
          <Slider label="Preview progress" value={value} onChange={setValue} />
          <Progress label="Syncing assets" glowColor="violet" />
          <div className="flex items-center gap-6">
            <Progress variant="circular" value={value} label="Upload progress" showValue />
            <Progress variant="circular" label="Connecting" glowColor="mint" />
          </div>
        </div>
      );
    case 'Skeleton':
      return (
        <div
          className="flex w-full max-w-sm flex-col gap-5"
          role="status"
          aria-label="Loading profile"
        >
          <div className="flex items-center gap-4">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="flex flex-1 flex-col gap-3">
              <Skeleton width="65%" />
              <Skeleton width="40%" height={10} />
            </div>
          </div>
          <Skeleton variant="rectangular" height={140} />
          <Skeleton />
          <Skeleton width="80%" />
        </div>
      );
  }
}

const collection: { name: ExtendedComponentName; description: string; color: GlowColor }[] = [
  { name: 'Checkbox', description: 'Small choices, a warm glow.', color: 'peach' },
  { name: 'Select', description: 'Your next choice, illuminated.', color: 'violet' },
  { name: 'Slider', description: 'Find just the right amount of light.', color: 'peach' },
  { name: 'Rating', description: 'Give every star its moment.', color: 'peach' },
  { name: 'Chip', description: 'A little context. A little color.', color: 'mint' },
  { name: 'Card', description: 'A surface that follows your light.', color: 'peach' },
  { name: 'Accordion', description: 'Make room for the details.', color: 'violet' },
  { name: 'Alert', description: 'Messages with a softer presence.', color: 'mint' },
  { name: 'Progress', description: 'Keep the momentum glowing.', color: 'peach' },
  { name: 'Skeleton', description: 'A thoughtful pause before content.', color: 'blue' },
];

export function ComponentGallery() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {collection.map(({ name, description, color }) => (
        <Card key={name} glowColor={color}>
          <div className="mb-2 text-lg font-semibold text-[color:var(--lumi-text)]">{name}</div>
          <div className="mb-7 text-sm text-[color:var(--lumi-muted)]">{description}</div>
          <ComponentDemo name={name} />
          <Link
            className="mt-7 inline-block text-xs"
            style={{ color: '#c3adff' }}
            href={`/docs/components/${name.toLowerCase()}`}
          >
            View {name} documentation →
          </Link>
        </Card>
      ))}
    </div>
  );
}

export function ExtendedComponentsShowcase() {
  const [intensity, setIntensity] = useState(72);
  const [color, setColor] = useState<GlowColor>('peach');
  return (
    <section id="extended-components" className="relative z-10 mx-auto mb-20 w-full max-w-5xl px-4">
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <Chip icon={<Zap />} size="sm">
            10 new ways to glow
          </Chip>
        </div>
        <h2 className="mb-3 text-2xl font-semibold text-[color:var(--lumi-text)]">
          Familiar components. A different kind of light.
        </h2>
        <p className="text-sm text-[color:var(--lumi-muted)]">
          Everyday building blocks, made luminescent. Go ahead, try them.
        </p>
      </div>
      <div className="grid items-start gap-5 md:grid-cols-2">
        <Card glowColor={color}>
          <div className="mb-6 flex items-center justify-between">
            <span className="text-base font-semibold text-[color:var(--lumi-text)]">
              Make it yours
            </span>
            <Sparkles size={18} className="text-[#ffaa66]" />
          </div>
          <div className="flex flex-col gap-6">
            <Select
              label="Your palette"
              value={color}
              onChange={(event) => setColor(event.target.value as GlowColor)}
              glowColor={color}
            >
              <option value="peach">Peach sunset</option>
              <option value="violet">Violet haze</option>
              <option value="blue">Blue hour</option>
              <option value="mint">Mint aurora</option>
            </Select>
            <Slider
              label="Glow intensity"
              value={intensity}
              onChange={setIntensity}
              glowColor={color}
              formatValue={(value) => `${value}%`}
            />
            <Checkbox
              label="Keep the ambient light on"
              description="A soft glow goes a long way."
              defaultChecked
              glowColor={color}
            />
            <Progress value={intensity} label="Your light level" glowColor={color} showValue />
          </div>
        </Card>
        <div className="flex flex-col gap-5">
          <Card glowColor="violet">
            <div className="mb-2 text-base font-semibold text-[color:var(--lumi-text)]">
              Made for the details
            </div>
            <div className="mb-5 text-sm text-[color:var(--lumi-muted)]">
              What do you think of the glow?
            </div>
            <Rating label="Rate the glow" defaultValue={4} glowColor="violet" />
            <div className="mt-6 flex flex-wrap gap-2">
              <Chip glowColor="mint">React ready</Chip>
              <Chip glowColor="violet" variant="outlined">
                Keyboard friendly
              </Chip>
              <Chip variant="outlined">Motion aware</Chip>
            </div>
          </Card>
          <Alert severity="success" title="Your next interface starts here">
            Inputs, surfaces, and feedback. All speaking the same visual language.
          </Alert>
          <Accordion title="Explore the full collection" glowColor="violet">
            Discover all ten new components with live previews, examples, and prop documentation in
            the component gallery.
          </Accordion>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/docs/examples/component-gallery"
          className="text-sm text-[#ffaa66] underline underline-offset-4"
        >
          Explore the component gallery →
        </Link>
      </div>
    </section>
  );
}
