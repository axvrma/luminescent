# Public compatibility contract

The package identity `luminescent`, ESM/CJS root import and `luminescent/style.css` are preserved. All existing named exports and associated prop types remain available.

| Existing exports | Preservation and intentional behavior corrections |
| --- | --- |
| Accordion, AccordionProps | expanded/defaultExpanded/onChange, stable region relationships |
| Alert, AlertProps | severity/title/dismissal, semantic status colors |
| Button, ButtonProps | primary/secondary, sm/md/lg, motion props; default type becomes button; additive variants/loading/icons/glow |
| Card, CardProps | spotlight option and glowColor; tracking made opt-in |
| Checkbox, CheckboxProps | native change events, indeterminate, native form behavior |
| Chip, ChipProps | soft/outlined and deletion |
| CodeBlock, CodeBlockProps | code/children, language/lang, glowVariant, line numbers |
| ContainerTextFlip, ContainerTextFlipProps | words/interval/duration/variants; empty arrays and motion safe |
| Divider, DividerProps | orientation/intensity/direction/color, default vertical preserved |
| FloatingMenu, FloatingMenuProps, FloatingMenuItem, cn | links/actions/activeId, labels added; accidental cn export retained |
| ImagesBadge, ImagesBadgeProps | images/text/link/sizes/positions |
| Progress, ProgressProps | linear/circular and indeterminate values |
| RadioGroup, RadioGroupProps, RadioOption | options/value/onChange/layout/indicatorAnimation; unique names and one callback |
| Rating, RatingProps | integer native radio rating and readOnly summary |
| ScreenReveal, ScreenRevealProps, RevealDirection | directional front/reveal layers; hidden controls no longer focusable |
| SegmentedControl, SegmentedControlProps | tabs/defaultActiveTab/onChange; selection semantics replace incomplete tabs; activeTab added |
| Select, SelectProps | native select, children/options and native change events |
| Skeleton, SkeletonProps | variants/dimensions/animation; decorative hidden content |
| Slider, SliderProps | numeric onChange and native range keys; invalid bounds normalized |
| TextField, TextFieldProps | native input, containerClassName/glowVariant; additive labels, validation and adornments |
| Timeline, TimelineProps, TimelineEntry | data/title/description/containerRef; content remains visible without animation |
| Toggle, ToggleProps | button ref, checked/defaultChecked/boolean onChange; composed onClick, optional form name/value |
| GlowColor | peach/violet/blue/mint preserved |

Consumers relying on leaked Tailwind reset/utilities must provide their own application styles. Native button default type, selection semantics and opt-in spotlight are documented migration changes. No React 18/19 compatibility claim is considered verified until the packed consumer matrix passes.
