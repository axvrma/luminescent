'use client';
import { useState } from 'react';
import { FolderPlus, Layers, Settings2, Sparkles } from 'lucide-react';
import {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Chip,
  CodeBlock,
  ContainerTextFlip,
  Dialog,
  Divider,
  DropdownMenu,
  EmptyState,
  FloatingMenu,
  ImagesBadge,
  Pagination,
  Popover,
  Progress,
  RadioGroup,
  Rating,
  ScreenReveal,
  SegmentedControl,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Tabs,
  TextField,
  Timeline,
  Toast,
  ToastProvider,
  Toggle,
} from 'luminescent';
import type { ComponentName } from '../lib/catalog';
import { ComponentDemo } from './ExtendedComponents';

export const sizes = ['sm', 'md', 'lg'] as const;
export const buttonVariants = ['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const;
export function isOption<T extends string>(options: readonly T[], value: string): value is T {
  return options.some((option) => option === value);
}
export interface PreviewOptions {
  variant?: string;
  size?: string;
  disabled?: boolean;
  loading?: boolean;
}
export function ComponentPreview({
  name,
  options = {},
}: {
  name: ComponentName;
  options?: PreviewOptions;
}) {
  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState('pro');
  const [number, setNumber] = useState(64);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Choose an action');
  const size = isOption(sizes, options.size ?? '')
    ? (options.size as (typeof sizes)[number])
    : 'md';
  const disabled = options.disabled ?? false;
  const legacy = [
    'Accordion',
    'Alert',
    'Card',
    'Checkbox',
    'Chip',
    'Progress',
    'Rating',
    'Select',
    'Skeleton',
    'Slider',
  ] as const;
  if (!options.disabled && !options.variant && !options.size && isOption(legacy, name))
    return <ComponentDemo name={name} />;
  switch (name) {
    case 'Button':
      return (
        <div className="demo-stack">
          <Button
            size={size}
            variant={
              isOption(buttonVariants, options.variant ?? '')
                ? (options.variant as (typeof buttonVariants)[number])
                : 'primary'
            }
            disabled={disabled}
            loading={options.loading}
            startIcon={<Sparkles size={16} />}
          >
            Create project
          </Button>
          <span className="preview-note">Made for your next bright idea.</span>
        </div>
      );
    case 'TextField':
      return (
        <div className="demo-stack">
          <TextField
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            description="A little context goes a long way."
            disabled={disabled}
            fieldSize={size}
          />
          <TextField
            label="Password"
            type="password"
            passwordToggle
            autoComplete="new-password"
            defaultValue="Luminescent"
            disabled={disabled}
          />
        </div>
      );
    case 'Toggle':
      return (
        <div className="demo-stack">
          <Toggle
            label="Enable notifications"
            checked={checked}
            onChange={setChecked}
            size={size}
            disabled={disabled}
          />
          <span className="preview-note">Notifications are {checked ? 'on' : 'off'}.</span>
        </div>
      );
    case 'RadioGroup':
      return (
        <div className="demo-stack">
          <RadioGroup
            label="Plan"
            name="demo-plan"
            value={value}
            onChange={setValue}
            disabled={disabled}
            options={[
              { value: 'starter', label: 'Starter', description: 'For your next idea.' },
              { value: 'pro', label: 'Pro', description: 'Room to grow.' },
              { value: 'enterprise', label: 'Enterprise', disabled: true },
            ]}
          />
          <RadioGroup
            label="Billing"
            defaultValue="monthly"
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'yearly', label: 'Yearly' },
            ]}
          />
          <span className="preview-note">Selected plan: {value}</span>
        </div>
      );
    case 'SegmentedControl':
      return (
        <SegmentedControl
          tabs={['Design', 'Develop', 'Deploy']}
          aria-label="Workflow"
          disabled={disabled}
        />
      );
    case 'CodeBlock':
      return (
        <CodeBlock
          code={
            'import { Button } from "luminescent";\nimport "luminescent/style.css";\n\n<Button>Create project</Button>'
          }
          language="tsx"
          showLineNumbers
        />
      );
    case 'ContainerTextFlip':
      return <ContainerTextFlip words={['thoughtful', 'beautiful', 'accessible']} />;
    case 'Divider':
      return (
        <div style={{ width: '100%', paddingBlock: 32 }}>
          <Divider
            orientation="horizontal"
            intensity={
              isOption(['low', 'medium', 'high'] as const, options.variant ?? '')
                ? (options.variant as 'low' | 'medium' | 'high')
                : 'medium'
            }
          />
        </div>
      );
    case 'FloatingMenu':
      return (
        <FloatingMenu
          items={[
            { id: 'discover', label: 'Discover', icon: Sparkles },
            { id: 'projects', label: 'Projects', icon: Layers },
            { id: 'settings', label: 'Settings', icon: Settings2 },
          ]}
        />
      );
    case 'ImagesBadge':
      return (
        <ImagesBadge
          text="Project gallery"
          images={['/sample1.jpg', '/sample2.jpg', '/sample3.jpg']}
          href="#gallery"
          size={size}
        />
      );
    case 'ScreenReveal':
      return (
        <div className="demo-stack">
          <Button
            variant="secondary"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="reveal-demo"
          >
            {open ? 'Close quick actions' : 'Show quick actions'}
          </Button>
          <ScreenReveal
            id="reveal-demo"
            isOpen={open}
            frontContent={
              <div style={{ padding: 32 }}>
                <Badge>Workspace</Badge>
                <h3 style={{ marginTop: 16 }}>A new perspective.</h3>
              </div>
            }
            revealContent={<Button>Quick action</Button>}
            style={{ height: 300, minHeight: 300 }}
          />
        </div>
      );
    case 'Timeline':
      return (
        <Timeline
          data={[
            { title: 'Design', content: 'Start with a clear purpose.' },
            { title: 'Build', content: 'Bring the details to life.' },
            { title: 'Ship', content: 'Make something worth using.' },
          ]}
        />
      );
    case 'Dialog':
      return (
        <Dialog
          trigger={<Button>Edit profile</Button>}
          title="Edit profile"
          description="Make changes to your workspace identity."
        >
          <div className="demo-stack">
            <TextField label="Display name" defaultValue="Alex Morgan" />
            <TextField label="Profile email" type="email" defaultValue="alex@example.com" />
          </div>
        </Dialog>
      );
    case 'Tooltip':
      return <TooltipPreview />;
    case 'Popover':
      return (
        <Popover
          label="Display preferences"
          trigger={<Button variant="secondary">Preferences</Button>}
        >
          <TextField label="Workspace name" defaultValue="Studio" />
          <Toggle label="Show activity" defaultChecked style={{ marginTop: 20 }} />
        </Popover>
      );
    case 'DropdownMenu':
      return (
        <div className="demo-stack">
          <DropdownMenu
            trigger={<Button variant="secondary">Project actions</Button>}
            items={[
              { id: 'duplicate', label: 'Duplicate' },
              { id: 'archive', label: 'Archive', disabled: true },
              { id: 'delete', label: 'Delete', destructive: true },
            ]}
            onAction={setMessage}
          />
          <span role="status" className="preview-note">
            {message}
          </span>
        </div>
      );
    case 'Tabs':
      return (
        <Tabs
          label="Project details"
          items={[
            { value: 'overview', label: 'Overview', content: 'Your project at a glance.' },
            { value: 'activity', label: 'Activity', content: 'The latest workspace activity.' },
            {
              value: 'settings',
              label: 'Settings',
              content: 'Workspace preferences.',
              disabled: true,
            },
          ]}
        />
      );
    case 'Toast':
      return (
        <ToastProvider>
          <Button onClick={() => setOpen(true)}>Create notification</Button>
          <Toast
            open={open}
            onOpenChange={setOpen}
            title="Project created"
            description="Your new workspace is ready."
          />
        </ToastProvider>
      );
    case 'Avatar':
      return (
        <div className="demo-stack">
          <AvatarGroup label="Project team" max={3}>
            <Avatar alt="Alex Morgan" size={size} />
            <Avatar alt="Jamie Chen" size={size} />
            <Avatar alt="Sam Rivera" size={size} />
            <Avatar alt="Taylor Park" size={size} />
          </AvatarGroup>
          <span className="preview-note">A familiar face, with initials as a fallback.</span>
        </div>
      );
    case 'Badge':
      return (
        <div className="demo-row">
          <Badge
            variant={
              isOption(
                ['neutral', 'accent', 'success', 'warning', 'danger', 'info'] as const,
                options.variant ?? '',
              )
                ? (options.variant as
                    'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info')
                : 'success'
            }
            dot
          >
            Published
          </Badge>
          <Badge variant="neutral">Draft</Badge>
        </div>
      );
    case 'Spinner':
      return <Spinner label="Loading projects" size={size} />;
    case 'EmptyState':
      return (
        <EmptyState
          title="No projects yet"
          description="Bring your team together around your next idea."
          icon={<FolderPlus />}
          action={<Button>Create project</Button>}
        />
      );
    case 'Breadcrumbs':
      return (
        <Breadcrumbs
          items={[
            { label: 'Workspace', href: '/' },
            { label: 'Projects', href: '/docs/components' },
            { label: 'Luminescent' },
          ]}
        />
      );
    case 'Pagination':
      return <Pagination count={12} disabled={disabled} />;
    case 'Checkbox':
      return (
        <Checkbox
          label="Ambient lighting"
          description="Give your interface a little warmth."
          defaultChecked
          disabled={disabled}
          size={size}
        />
      );
    case 'Select':
      return (
        <Select label="Workspace" disabled={disabled} size={size}>
          <option>Personal</option>
          <option>Team</option>
        </Select>
      );
    case 'Slider':
      return (
        <Slider label="Light intensity" value={number} onChange={setNumber} disabled={disabled} />
      );
    case 'Rating':
      return (
        <Rating label="Rate your experience" defaultValue={4} disabled={disabled} size={size} />
      );
    case 'Chip':
      return (
        <Chip
          disabled={disabled}
          variant={options.variant === 'outlined' ? 'outlined' : 'soft'}
          size={size === 'sm' ? 'sm' : 'md'}
        >
          Design systems
        </Chip>
      );
    case 'Card':
      return (
        <Card spotlight>
          <h3>A brighter workspace</h3>
          <p>Light follows your cursor.</p>
        </Card>
      );
    case 'Progress':
      return (
        <Progress
          value={64}
          label="Preparing workspace"
          variant={options.variant === 'circular' ? 'circular' : 'linear'}
          showValue
        />
      );
    case 'Skeleton':
      return (
        <Skeleton
          variant={
            isOption(['text', 'rectangular', 'circular'] as const, options.variant ?? '')
              ? (options.variant as 'text' | 'rectangular' | 'circular')
              : 'rectangular'
          }
        />
      );
    case 'Alert':
      return (
        <Alert
          title="Changes saved"
          severity={
            isOption(['info', 'success', 'warning', 'error'] as const, options.variant ?? '')
              ? (options.variant as 'info' | 'success' | 'warning' | 'error')
              : 'success'
          }
        >
          Your workspace is up to date.
        </Alert>
      );
    case 'Accordion':
      return (
        <Accordion title="What makes it luminescent?" disabled={disabled}>
          Semantic tokens, layered light, native interactions.
        </Accordion>
      );
  }
}
import { Tooltip } from 'luminescent';
function TooltipPreview() {
  return (
    <Tooltip content="Save your current workspace">
      <Button variant="secondary">Save workspace</Button>
    </Tooltip>
  );
}
