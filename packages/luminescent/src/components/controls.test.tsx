import React from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  Accordion,
  Alert,
  Button,
  Card,
  Checkbox,
  Chip,
  CodeBlock,
  ContainerTextFlip,
  Divider,
  FloatingMenu,
  ImagesBadge,
  LuminescentProvider,
  Progress,
  RadioGroup,
  Rating,
  ScreenReveal,
  SegmentedControl,
  Select,
  Skeleton,
  Slider,
  TextField,
  Timeline,
  Toggle,
} from '../index';

describe('native form contracts', () => {
  it('button is safe by default, submits explicitly, forwards ref/style, and blocks loading clicks', async () => {
    const user = userEvent.setup();
    const submit = vi.fn((event) => event.preventDefault());
    const click = vi.fn();
    const ref = React.createRef<HTMLButtonElement>();
    const { rerender } = render(
      <form onSubmit={submit}>
        <Button ref={ref} style={{ color: 'red' }} onClick={click}>
          Save
        </Button>
      </form>,
    );
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(submit).not.toHaveBeenCalled();
    expect(click).toHaveBeenCalledOnce();
    expect(ref.current).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    rerender(
      <form onSubmit={submit}>
        <Button type="submit">Submit</Button>
      </form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(submit).toHaveBeenCalledOnce();
    rerender(
      <Button loading onClick={click}>
        Save
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    await user.click(screen.getByRole('button'));
    expect(click).toHaveBeenCalledOnce();
  });
  it('checkbox supports label activation, native events, indeterminate state and descriptions', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Checkbox
        label="Lighting"
        description="A warm ambient light"
        indeterminate
        onChange={change}
      />,
    );
    const input = screen.getByRole('checkbox');
    expect(input).toBePartiallyChecked();
    expect(input).toHaveAccessibleDescription('A warm ambient light');
    await user.click(screen.getByText('Lighting'));
    expect(input).toBeChecked();
    expect(change).toHaveBeenCalledOnce();
  });
  it('radio groups are independent and notify once for label, input and arrow changes', async () => {
    const user = userEvent.setup();
    const first = vi.fn();
    const second = vi.fn();
    render(
      <>
        <RadioGroup
          label="Plan"
          defaultValue="one"
          onChange={first}
          options={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
            { value: 'three', label: 'Three', disabled: true },
          ]}
        />
        <RadioGroup
          label="Billing"
          defaultValue="one"
          onChange={second}
          options={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
          ]}
        />
      </>,
    );
    const plan = within(screen.getByRole('radiogroup', { name: 'Plan' }));
    const billing = within(screen.getByRole('radiogroup', { name: 'Billing' }));
    await user.click(plan.getByText('Two'));
    expect(first).toHaveBeenCalledExactlyOnceWith('two');
    expect(billing.getByRole('radio', { name: 'One' })).toBeChecked();
    expect(second).not.toHaveBeenCalled();
    await user.keyboard('{ArrowLeft}');
    expect(plan.getByRole('radio', { name: 'One' })).toBeChecked();
    expect(first).toHaveBeenCalledTimes(2);
    expect(plan.getByRole('radio', { name: 'Three' })).toBeDisabled();
    expect(plan.getByRole('radio', { name: 'One' }).getAttribute('name')).not.toBe(
      billing.getByRole('radio', { name: 'One' }).getAttribute('name'),
    );
  });
  it('controlled radios do not change their selection without a new value', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const { rerender } = render(
      <RadioGroup
        label="Plan"
        value="a"
        onChange={change}
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      />,
    );
    await user.click(screen.getByLabelText('B'));
    expect(change).toHaveBeenCalledExactlyOnceWith('b');
    expect(screen.getByLabelText('A')).toBeChecked();
    rerender(
      <RadioGroup
        label="Plan"
        value="b"
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      />,
    );
    expect(screen.getByLabelText('B')).toBeChecked();
  });
  it('segmented control is a controlled or uncontrolled selection group with native keys', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const { rerender } = render(
      <SegmentedControl tabs={['Design', 'Build']} aria-label="Workflow" onChange={change} />,
    );
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    await user.click(screen.getByLabelText('Design'));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByLabelText('Build')).toBeChecked();
    expect(change).toHaveBeenCalledExactlyOnceWith('Build');
    rerender(<SegmentedControl tabs={['Design', 'Build']} value="Design" aria-label="Workflow" />);
    expect(screen.getByLabelText('Design')).toBeChecked();
  });
  it('toggle composes clicks, respects cancellation/readOnly, and preserves controlled state', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const click = vi.fn();
    const { rerender } = render(<Toggle label="Notifications" onChange={change} onClick={click} />);
    await user.click(screen.getByText('Notifications'));
    expect(click).toHaveBeenCalledOnce();
    expect(change).toHaveBeenCalledExactlyOnceWith(true);
    expect(screen.getByRole('switch')).toBeChecked();
    rerender(
      <Toggle
        label="Notifications"
        onChange={change}
        onClick={(event) => event.preventDefault()}
      />,
    );
    await user.click(screen.getByRole('switch'));
    expect(change).toHaveBeenCalledOnce();
    rerender(<Toggle label="Notifications" checked={false} onChange={change} />);
    await user.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).not.toBeChecked();
    rerender(<Toggle label="Notifications" readOnly onChange={change} />);
    const calls = change.mock.calls.length;
    await user.click(screen.getByRole('switch'));
    expect(change).toHaveBeenCalledTimes(calls);
  });
  it('required switches block native submission, explain errors and focus the visible control', async () => {
    const user = userEvent.setup();
    const submit = vi.fn((event) => event.preventDefault());
    render(
      <form onSubmit={submit}>
        <Toggle label="Accept terms" name="terms" required />
        <Button type="submit">Continue</Button>
      </form>,
    );
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    expect(submit).not.toHaveBeenCalled();
    expect(screen.getByRole('switch')).toHaveFocus();
    expect(screen.getByRole('switch')).toHaveAccessibleDescription('This setting is required.');
    expect(screen.getByRole('switch')).toHaveAttribute('aria-invalid', 'true');
    await user.keyboard(' ');
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    expect(submit).toHaveBeenCalledOnce();
    expect(screen.queryByRole('alert')).toBeNull();
  });
  it('state-backed fields submit and reset with their native form, without change notifications on reset', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <form data-testid="form">
        <Toggle label="Notify" name="notify" defaultChecked onChange={change} />
        <RadioGroup
          label="Plan"
          name="plan"
          defaultValue="a"
          options={[
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
          ]}
        />
        <Slider name="level" label="Level" defaultValue={20} />
        <Rating name="rating" label="Experience" defaultValue={2} />
        <button type="reset">Reset</button>
      </form>,
    );
    await user.click(screen.getByRole('switch'));
    await user.click(screen.getByLabelText('B'));
    fireEvent.change(screen.getByRole('slider'), { target: { value: '60' } });
    await user.click(screen.getByLabelText('4 stars'));
    const form = screen.getByTestId('form') as HTMLFormElement;
    expect(new FormData(form).get('plan')).toBe('b');
    expect(new FormData(form).get('level')).toBe('60');
    expect(new FormData(form).get('notify')).toBeNull();
    await user.click(screen.getByText('Reset'));
    await waitFor(() => expect(screen.getByRole('switch')).toBeChecked());
    expect(screen.getByLabelText('A')).toBeChecked();
    expect(screen.getByRole('slider')).toHaveValue('20');
    expect(screen.getByLabelText('2 stars')).toBeChecked();
    expect(change).toHaveBeenCalledOnce();
    expect(new FormData(form).get('notify')).toBe('on');
  });
  it('text fields link all descriptions and error messages, forward input events and preserve composition', async () => {
    const user = userEvent.setup();
    const composition = vi.fn();
    const change = vi.fn();
    const ref = React.createRef<HTMLInputElement>();
    render(
      <TextField
        ref={ref}
        label="Email"
        description="Work address"
        error="Enter a valid email"
        required
        autoComplete="email"
        onCompositionEnd={composition}
        onChange={change}
      />,
    );
    const input = screen.getByRole('textbox', { name: /Email/ });
    expect(input).toHaveAccessibleDescription('Work address Enter a valid email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeRequired();
    await user.type(input, 'a');
    fireEvent.compositionEnd(input);
    expect(change).toHaveBeenCalledOnce();
    expect(composition).toHaveBeenCalledOnce();
    expect(ref.current).toBe(input);
  });
  it('password visibility is a named, non-submit action', async () => {
    const user = userEvent.setup();
    render(<TextField type="password" label="Password" passwordToggle defaultValue="secret" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: 'Hide password' })).toHaveAttribute('type', 'button');
  });
  it('select preserves native validation, labeling, disabled and change events', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Select
        label="Workspace"
        description="Choose one"
        error="Required"
        required
        onChange={change}
      >
        <option value="">Choose</option>
        <option value="team">Team</option>
      </Select>,
    );
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    await user.selectOptions(input, 'team');
    expect(input).toHaveValue('team');
    expect(change).toHaveBeenCalledOnce();
  });
  it('slider clamps and snaps values, handles nonfinite/reversed bounds and steps', () => {
    const { rerender } = render(<Slider label="Level" value={0.34} min={0} max={1} step={0.1} />);
    expect(screen.getByRole('slider')).toHaveValue('0.3');
    rerender(<Slider label="Level" value={NaN} min={10} max={5} step={0} />);
    expect(screen.getByRole('slider')).toHaveValue('10');
    expect(screen.getByRole('slider')).toHaveAttribute('max', '10');
    rerender(<Slider label="Level" value={Infinity} min={NaN} max={Infinity} />);
    expect(screen.getByRole('slider')).toHaveValue('0');
  });
  it('rating bounds are safe and read-only summaries have no interactive inputs', () => {
    const { rerender } = render(<Rating value={NaN} max={NaN} />);
    expect(screen.getAllByRole('radio')).toHaveLength(5);
    expect(
      screen.getAllByRole('radio').filter((input) => (input as HTMLInputElement).checked),
    ).toHaveLength(0);
    rerender(<Rating label="Quality" value={900} max={3} readOnly />);
    expect(screen.getByRole('img')).toHaveAccessibleName('Quality: 3 of 3');
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });
});

describe('display, motion and feedback', () => {
  it('accordion connects unique triggers and hides closed focusable content', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Accordion title="First">
          <button>Hidden action</button>
        </Accordion>
        <Accordion title="Second" defaultExpanded>
          Visible details
        </Accordion>
      </>,
    );
    expect(screen.queryByRole('button', { name: 'Hidden action' })).not.toBeInTheDocument();
    const trigger = screen.getByRole('button', { name: 'First' });
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region', { name: 'First' })).toContainElement(
      screen.getByRole('button', { name: 'Hidden action' }),
    );
    const ids = screen
      .getAllByRole('button')
      .map((button) => button.getAttribute('id'))
      .filter(Boolean);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('alert roles communicate severity and dismissal uses a real button', async () => {
    const user = userEvent.setup();
    const close = vi.fn();
    render(
      <>
        <Alert severity="success" title="Saved" onClose={close}>
          Up to date.
        </Alert>
        <Alert severity="error">Connection failed.</Alert>
      </>,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
    expect(screen.getByRole('alert')).toHaveTextContent('Connection failed');
    await user.click(screen.getByLabelText('Dismiss alert'));
    expect(close).toHaveBeenCalledOnce();
  });
  it('chip deletion is labeled and disabled deletion cannot run', async () => {
    const user = userEvent.setup();
    const remove = vi.fn();
    const { rerender } = render(
      <Chip onDelete={remove} deleteLabel="Remove React">
        React
      </Chip>,
    );
    await user.click(screen.getByLabelText('Remove React'));
    expect(remove).toHaveBeenCalledOnce();
    rerender(
      <Chip disabled onDelete={remove}>
        React
      </Chip>,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
  it('progress clamps finite bounds and omits current value when indeterminate', () => {
    const { rerender } = render(<Progress value={200} max={100} label="Upload" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    rerender(<Progress value={NaN} max={-10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    rerender(<Progress />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
  });
  it('card spotlight is opt-in, preserves consumer events and leaves default cards untracked', () => {
    const pointer = vi.fn();
    const { container } = render(<Card onPointerMove={pointer}>Content</Card>);
    expect(container.querySelector('.lumi-card-spotlight')).toBeNull();
    fireEvent.pointerMove(screen.getByText('Content'), { clientX: 20 });
    expect(pointer).toHaveBeenCalledOnce();
  });
  it('floating menu distinguishes links/actions, labels icons and never submits a form', () => {
    render(
      <FloatingMenu
        items={[
          { id: 'home', label: 'Home', href: '/' },
          { id: 'settings', label: 'Settings' },
        ]}
      />,
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('button', { name: 'Settings' })).toHaveAttribute('type', 'button');
  });
  it('image badge supports keyboard links and decorative, bounded previews', () => {
    render(
      <ImagesBadge
        text="Gallery"
        images={['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg']}
        href="/gallery"
        target="_blank"
      />,
    );
    expect(screen.getByRole('link', { name: 'Gallery' })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
    expect(document.querySelectorAll('img')).toHaveLength(3);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
  it('screen reveal removes closed controls from the accessibility tree and renders initial open state', () => {
    const { rerender } = render(
      <ScreenReveal
        isOpen={false}
        frontContent="Front"
        revealContent={<button>Quick action</button>}
      />,
    );
    expect(screen.queryByRole('button')).toBeNull();
    rerender(
      <ScreenReveal isOpen frontContent="Front" revealContent={<button>Quick action</button>} />,
    );
    expect(screen.getByRole('button')).toBeVisible();
  });
  it('text flip safely handles empty lists and does not cycle for explicit reduced motion', async () => {
    vi.useFakeTimers();
    const { rerender, container } = render(<ContainerTextFlip words={[]} />);
    expect(container).toBeEmptyDOMElement();
    rerender(
      <LuminescentProvider motion="reduced">
        <ContainerTextFlip words={['First', 'Second']} interval={1000} />
      </LuminescentProvider>,
    );
    await act(() => vi.advanceTimersByTime(4000));
    expect(container.querySelector('.lumi-text-flip-word')).toHaveTextContent('First');
    expect(screen.queryByRole('button')).toBeNull();
    expect(container.textContent).toContain('First, Second');
  });
  it('text flip pauses, resumes and cleans timers on unmount', async () => {
    vi.useFakeTimers();
    const { container, unmount } = render(
      <ContainerTextFlip words={['First', 'Second']} interval={1000} />,
    );
    fireEvent.click(screen.getByLabelText('Pause text animation'));
    await act(() => vi.advanceTimersByTime(1100));
    expect(container.querySelector('.lumi-text-flip-word')).toHaveTextContent('First');
    fireEvent.click(screen.getByLabelText('Resume text animation'));
    await act(() => vi.advanceTimersByTime(1100));
    expect(container.querySelector('.lumi-text-flip-word')).toHaveTextContent('Second');
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
  it('code copy preserves source, excludes line numbers and reports clipboard failures', async () => {
    const user = userEvent.setup();
    const clipboard = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    const code = '  const value = 1;\n';
    const { container } = render(
      <CodeBlock code={code} showLineNumbers language="unknown-language" />,
    );
    await user.click(screen.getByLabelText('Copy code'));
    expect(clipboard).toHaveBeenCalledExactlyOnceWith(code);
    expect(screen.getByRole('status')).toHaveTextContent('Copied');
    clipboard.mockRejectedValueOnce(new Error('Denied'));
    await user.click(screen.getByLabelText('Copy code'));
    expect(screen.getByRole('status')).toHaveTextContent('Unable to copy');
    expect(container.querySelector('style')).toBeNull();
  });
  it('code copy timer is disposed on unmount', async () => {
    vi.useFakeTimers();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    const { unmount } = render(<CodeBlock code="" />);
    await act(async () => {
      fireEvent.click(screen.getByLabelText('Copy code'));
    });
    expect(screen.getByRole('status')).toHaveTextContent('Copied');
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
  it('skeleton is decorative, divider exposes orientation, and timeline preserves every entry', () => {
    const { container } = render(
      <LuminescentProvider motion="reduced">
        <Skeleton />
        <Divider orientation="horizontal" />
        <Timeline
          data={[
            { title: 'Design', content: 'Start here.' },
            { title: 'Build', content: 'Make it useful.' },
          ]}
        />
      </LuminescentProvider>,
    );
    expect(container.querySelector('.lumi-skeleton')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Make it useful.')).toBeVisible();
  });
});
