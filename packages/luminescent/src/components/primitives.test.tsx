import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumbs,
  Button,
  Dialog,
  DropdownMenu,
  EmptyState,
  LuminescentProvider,
  Pagination,
  Popover,
  Spinner,
  Tabs,
  TextField,
  Toast,
  ToastProvider,
  Tooltip,
} from '../index';

describe('accessible foundations', () => {
  it('dialog names itself, traps focus, dismisses with Escape and restores the trigger', async () => {
    const user = userEvent.setup();
    render(
      <LuminescentProvider theme="light">
        <Dialog title="Edit profile" description="Update your name" trigger={<Button>Edit</Button>}>
          <TextField label="Name" />
          <Button>Save</Button>
        </Dialog>
      </LuminescentProvider>,
    );
    const trigger = screen.getByRole('button', { name: 'Edit' });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Edit profile' });
    expect(dialog).toHaveAccessibleDescription('Update your name');
    expect(dialog.closest('[data-lumi-theme]')).toHaveAttribute('data-lumi-theme', 'light');
    for (let index = 0; index < 5; index++) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(trigger).toHaveFocus();
  });
  it('controlled dialog requests state changes and supports content without a description', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Dialog title="Confirm" open onOpenChange={change}>
        Content
      </Dialog>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toHaveAttribute('aria-describedby');
    await user.click(screen.getByLabelText('Close dialog'));
    expect(change).toHaveBeenCalledExactlyOnceWith(false);
    expect(screen.getByRole('dialog')).toBeVisible();
  });
  it('tooltip opens on keyboard focus and describes its trigger', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Save your project" delayDuration={0}>
        <Button>Save</Button>
      </Tooltip>,
    );
    await user.tab();
    await waitFor(() => expect(screen.getByRole('tooltip')).toHaveTextContent('Save your project'));
    expect(screen.getByRole('button')).toHaveAccessibleDescription('Save your project');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).toBeNull();
  });
  it('popover accepts interactive content and restores focus', async () => {
    const user = userEvent.setup();
    render(
      <Popover label="Preferences" trigger={<Button>Open preferences</Button>}>
        <TextField label="Workspace" />
      </Popover>,
    );
    const trigger = screen.getByRole('button', { name: 'Open preferences' });
    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Preferences' })).toBeVisible();
    expect(screen.getByLabelText('Workspace')).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
  });
  it('dropdown supports arrow navigation, disabled skipping, selection and restoration', async () => {
    const user = userEvent.setup();
    const action = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Actions</Button>}
        onAction={action}
        items={[
          { id: 'copy', label: 'Copy' },
          { id: 'archive', label: 'Archive', disabled: true },
          { id: 'delete', label: 'Delete' },
        ]}
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Actions' });
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    const menu = screen.getByRole('menu');
    await waitFor(() => expect(within(menu).getByRole('menuitem', { name: 'Copy' })).toHaveFocus());
    await user.keyboard('{ArrowDown}');
    expect(within(menu).getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(action).toHaveBeenCalledExactlyOnceWith('delete');
    await waitFor(() => expect(trigger).toHaveFocus());
  });
  it('tabs associate panels and skip disabled options', async () => {
    const user = userEvent.setup();
    render(
      <Tabs
        label="Details"
        items={[
          { value: 'one', label: 'Overview', content: 'Overview content' },
          { value: 'two', label: 'Unavailable', content: 'Hidden', disabled: true },
          { value: 'three', label: 'Activity', content: 'Activity content' },
        ]}
      />,
    );
    screen.getByRole('tab', { name: 'Overview' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Activity' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Activity' })).toHaveTextContent(
      'Activity content',
    );
    expect(screen.queryByText('Overview content')).toBeNull();
  });
  it('manual tabs wait for activation and support Home/End', async () => {
    const user = userEvent.setup();
    render(
      <Tabs
        activationMode="manual"
        items={[
          { value: 'a', label: 'A', content: 'Alpha' },
          { value: 'b', label: 'B', content: 'Beta' },
        ]}
      />,
    );
    screen.getByRole('tab', { name: 'A' }).focus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Beta');
  });
  it('toast exposes dismissal and an action with an alternative description', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const undo = vi.fn();
    render(
      <ToastProvider>
        <Toast
          open
          onOpenChange={change}
          title="Project deleted"
          description="Undo if this was a mistake."
          action={{ label: 'Undo', altText: 'Undo deleting the project', onClick: undo }}
        />
      </ToastProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Undo' }));
    expect(undo).toHaveBeenCalledOnce();
    expect(change).toHaveBeenCalledWith(false);
  });
});
describe('practical supporting primitives', () => {
  it('avatar retains an accessible fallback when its image fails and groups label overflow', () => {
    const { container } = render(
      <AvatarGroup label="Team" max={2}>
        <Avatar src="missing.jpg" alt="Alex Morgan" />
        <Avatar alt="Jamie Chen" />
        <Avatar alt="Sam Rivera" />
      </AvatarGroup>,
    );
    const image = container.querySelector('img');
    expect(image).not.toBeNull();
    fireEvent.error(image as HTMLImageElement);
    expect(screen.getByRole('img', { name: 'Alex Morgan' })).toHaveTextContent('AM');
    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByRole('group', { name: 'Team' })).toBeVisible();
    expect(screen.getByRole('img', { name: '1 more people' })).toBeVisible();
  });
  it('badge text and spinner status convey meaning without their decoration', () => {
    render(
      <>
        <Badge dot variant="success">
          Published
        </Badge>
        <Spinner label="Loading workspace" />
      </>,
    );
    expect(screen.getByText('Published')).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent('Loading workspace');
  });
  it('empty state uses the chosen heading and a usable action', async () => {
    const user = userEvent.setup();
    const create = vi.fn();
    render(
      <EmptyState
        title="No projects"
        headingLevel={2}
        description="Create one to get started."
        action={<Button onClick={create}>Create project</Button>}
      />,
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('No projects');
    await user.click(screen.getByRole('button'));
    expect(create).toHaveBeenCalledOnce();
  });
  it('breadcrumbs expose ordered navigation and only the final current page', () => {
    render(<Breadcrumbs items={[{ label: 'Workspace', href: '/' }, { label: 'Project' }]} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeVisible();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Project')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
  it('pagination handles boundaries, large sets, controlled state and empty counts', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const { rerender } = render(<Pagination count={1000000} onPageChange={change} />);
    expect(screen.getAllByRole('button').length).toBeLessThanOrEqual(9);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    await user.click(screen.getByLabelText('Next page'));
    expect(change).toHaveBeenCalledExactlyOnceWith(2);
    expect(screen.getByLabelText('Page 2')).toHaveAttribute('aria-current', 'page');
    rerender(<Pagination count={3} page={3} onPageChange={change} />);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
    rerender(<Pagination count={0} />);
    expect(screen.queryByRole('navigation')).toBeNull();
  });
});
