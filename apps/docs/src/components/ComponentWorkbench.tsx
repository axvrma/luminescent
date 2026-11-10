'use client';
import { useState } from 'react';
import {
  CodeBlock,
  LuminescentProvider,
  Select,
  Toggle,
  type GlowColor,
  type GlowIntensity,
} from 'luminescent';
import { buildPlaygroundCode } from '../lib/playground-code';
import { catalog, componentNames, type ComponentName } from '../lib/catalog';
import { ComponentPreview, buttonVariants, isOption, sizes } from './ComponentPreview';

type ControlConfig = {
  variants?: readonly string[];
  size?: boolean;
  disabled?: boolean;
  loading?: boolean;
  variantProp?: string;
  sizeProp?: string;
};
const controls: Partial<Record<ComponentName, ControlConfig>> = {
  Button: { variants: buttonVariants, size: true, disabled: true, loading: true },
  TextField: { size: true, sizeProp: 'fieldSize', disabled: true },
  Toggle: { size: true, disabled: true },
  Checkbox: { size: true, disabled: true },
  Select: { size: true, disabled: true },
  RadioGroup: { disabled: true },
  SegmentedControl: { disabled: true },
  Rating: { size: true, disabled: true },
  Slider: { disabled: true },
  Badge: { variants: ['neutral', 'accent', 'success', 'warning', 'danger', 'info'] },
  Chip: { variants: ['soft', 'outlined'], disabled: true },
  Progress: { variants: ['linear', 'circular'] },
  Alert: { variants: ['info', 'success', 'warning', 'error'], variantProp: 'severity' },
  Skeleton: { variants: ['text', 'rectangular', 'circular'] },
  Divider: { variants: ['low', 'medium', 'high'], variantProp: 'intensity' },
  Spinner: { size: true },
  Avatar: { size: true },
  ImagesBadge: { size: true },
  Accordion: { disabled: true },
  Pagination: { disabled: true },
};
const accents = ['peach', 'violet', 'blue', 'mint'] as const;
const themes = ['dark', 'light', 'system'] as const;
const glows = ['none', 'subtle', 'normal', 'intense'] as const;
export function ComponentWorkbench({
  name: initialName = 'Button',
  full = false,
}: {
  name?: ComponentName;
  full?: boolean;
}) {
  const [name, setName] = useState(initialName);
  const [theme, setTheme] = useState<(typeof themes)[number]>('dark');
  const [accent, setAccent] = useState<GlowColor>('peach');
  const [glow, setGlow] = useState<GlowIntensity>('normal');
  const [variant, setVariant] = useState('');
  const [size, setSize] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reduced, setReduced] = useState(false);
  const config = controls[name] ?? {};
  const activeVariant = variant && config.variants?.includes(variant) ? variant : undefined;
  const code = buildPlaygroundCode({
    name,
    code: catalog[name].code,
    theme,
    accent,
    glow,
    reduced,
    variant: activeVariant,
    variantProp: config.variantProp,
    size: config.size ? size : undefined,
    sizeProp: config.sizeProp,
    disabled: config.disabled && disabled,
    loading: config.loading && loading,
  });
  return (
    <div className="workbench">
      <div className="workbench-toolbar">
        <span className="workbench-caption">
          <span className="live-dot" /> Live preview
        </span>
        <div className="workbench-theme-buttons" role="group" aria-label="Preview theme">
          {themes.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={theme === value}
              onClick={() => setTheme(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <div className={full ? 'workbench-body full' : 'workbench-body'}>
        <LuminescentProvider
          theme={theme}
          accent={accent}
          glow={glow}
          motion={reduced ? 'reduced' : 'system'}
          className="workbench-preview"
        >
          <ComponentPreview
            key={name}
            name={name}
            options={{
              variant: activeVariant,
              size: config.size ? size || undefined : undefined,
              disabled: config.disabled ? disabled : false,
              loading: config.loading ? loading : false,
            }}
          />
        </LuminescentProvider>
        <div className="workbench-controls">
          {full && (
            <Select
              label="Component"
              value={name}
              onChange={(event) => {
                if (isOption(componentNames, event.target.value)) {
                  setName(event.target.value);
                  setVariant('');
                  setSize('');
                }
              }}
            >
              {componentNames.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
          )}
          <Select
            label="Accent"
            value={accent}
            onChange={(event) => {
              if (isOption(accents, event.target.value)) setAccent(event.target.value);
            }}
          >
            {accents.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </Select>
          <Select
            label="Glow intensity"
            value={glow}
            onChange={(event) => {
              if (isOption(glows, event.target.value)) setGlow(event.target.value);
            }}
          >
            {glows.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </Select>
          {config.variants && (
            <Select
              label="Variant"
              value={activeVariant ?? ''}
              onChange={(event) => setVariant(event.target.value)}
            >
              <option value="">Default</option>
              {config.variants.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
          )}
          {config.size && (
            <Select label="Size" value={size} onChange={(event) => setSize(event.target.value)}>
              <option value="">Default</option>
              {sizes.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
          )}
          {config.disabled && (
            <Toggle label="Disabled" checked={disabled} onChange={setDisabled} size="sm" />
          )}
          {config.loading && (
            <Toggle label="Loading" checked={loading} onChange={setLoading} size="sm" />
          )}
          <Toggle label="Reduced motion" checked={reduced} onChange={setReduced} size="sm" />
        </div>
      </div>
      <CodeBlock code={code} language="tsx" className="workbench-code" />
    </div>
  );
}
