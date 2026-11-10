export interface PlaygroundCodeOptions {
  name: string;
  code: string;
  theme: string;
  accent: string;
  glow: string;
  reduced: boolean;
  variant?: string;
  variantProp?: string;
  size?: string;
  sizeProp?: string;
  disabled?: boolean;
  loading?: boolean;
}
export function buildPlaygroundCode(options: PlaygroundCodeOptions) {
  let code = options.code;
  const tag = new RegExp(String.raw`<${options.name}(?=[\s/>])`);
  function prop(name: string, value: string) {
    code = code
      .replace(new RegExp(String.raw`\s${name}="[^"]*"`), '')
      .replace(tag, `<${options.name} ${name}=${value}`);
  }
  if (options.variant) prop(options.variantProp ?? 'variant', JSON.stringify(options.variant));
  if (options.size) prop(options.sizeProp ?? 'size', JSON.stringify(options.size));
  if (options.disabled) code = code.replace(tag, `<${options.name} disabled`);
  if (options.loading) code = code.replace(tag, `<${options.name} loading`);
  if (
    options.theme !== 'dark' ||
    options.accent !== 'peach' ||
    options.glow !== 'normal' ||
    options.reduced
  ) {
    code = code.replace('import { ', 'import { LuminescentProvider, ');
    const start = code.indexOf('return ');
    const end = code.lastIndexOf(';');
    let expression = code.slice(start + 7, end).trim();
    if (expression.startsWith('(') && expression.endsWith(')'))
      expression = expression.slice(1, -1).trim();
    code = `${code.slice(0, start)}return (\n    <LuminescentProvider theme="${options.theme}" accent="${options.accent}" glow="${options.glow}" motion="${options.reduced ? 'reduced' : 'system'}">\n      ${expression}\n    </LuminescentProvider>\n  );${code.slice(end + 1)}`;
  }
  return code;
}
