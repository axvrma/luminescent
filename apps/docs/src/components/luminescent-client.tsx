"use client";

import { RadioGroup as OriginalRadioGroup, SegmentedControl as OriginalSegmentedControl, FloatingMenu as OriginalFloatingMenu } from 'luminescent';
export * from 'luminescent';

const safeParse = (val: any, fallback: any) => {
  if (!val) return fallback;
  if (typeof val === 'string') {
    try { return JSON.parse(val); } catch (e) { return fallback; }
  }
  return val;
};

export const RadioGroup = (props: any) => {
  return <OriginalRadioGroup {...props} options={safeParse(props.options, [{value: 'fallback', label: 'Fallback'}])} />
}

export const SegmentedControl = (props: any) => {
  return <OriginalSegmentedControl {...props} tabs={safeParse(props.tabs, ['Fallback'])} />
}

export const FloatingMenu = (props: any) => {
  return <OriginalFloatingMenu {...props} items={safeParse(props.items, [{label: 'Fallback', href: '#'}])} />
}

import { ImagesBadge as OriginalImagesBadge } from 'luminescent';
import { Timeline as OriginalTimeline } from 'luminescent';

export const ImagesBadge = (props: any) => {
  return <OriginalImagesBadge {...props} images={safeParse(props.images, [])} />
}

export const Timeline = (props: any) => {
  const fallbackData = [
    { title: "Version 1.0", content: "Initial release with the core luminescent components." },
    { title: "Version 1.1", content: "Added the highly anticipated Timeline component with scroll-linked animations." }
  ];
  return <OriginalTimeline {...props} data={safeParse(props.data, fallbackData)} />
}
