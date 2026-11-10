import { useState } from 'react';
import {
  Accordion,
  Badge,
  Button,
  Card,
  Checkbox,
  Dialog,
  LuminescentProvider,
  RadioGroup,
  SegmentedControl,
  Slider,
  TextField,
  Toggle,
} from './index';
import './App.css';
export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  return (
    <LuminescentProvider theme={theme} className="playground-root">
      <header>
        <Badge>Component laboratory</Badge>
        <h1>
          Luminescent<span>.</span>
        </h1>
        <p>Beautiful by default. Accessible by design.</p>
        <Toggle
          label="Light theme"
          checked={theme === 'light'}
          onChange={(value) => setTheme(value ? 'light' : 'dark')}
        />
      </header>
      <main>
        <Card>
          <h2>Make yourself at home.</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <TextField label="Workspace name" name="workspace" defaultValue="Studio" />
            <Checkbox label="Ambient lighting" name="ambient" defaultChecked />
            <Toggle label="Notifications" name="notifications" defaultChecked />
            <RadioGroup
              label="Plan"
              name="plan"
              defaultValue="pro"
              options={[
                { value: 'starter', label: 'Starter' },
                { value: 'pro', label: 'Pro' },
              ]}
            />
            <Slider name="intensity" label="Light intensity" defaultValue={64} />
            <div className="playground-actions">
              <Button type="submit">Save workspace</Button>
              <Button type="reset" variant="secondary">
                Reset form
              </Button>
            </div>
          </form>
        </Card>
        <Card>
          <h2>A little room to explore.</h2>
          <SegmentedControl tabs={['Design', 'Develop', 'Deploy']} aria-label="Workflow" />
          <Accordion title="Thoughtful details" defaultExpanded>
            Native interactions, scoped themes, and semantic tokens.
          </Accordion>
          <Dialog
            trigger={<Button variant="outline">Open dialog</Button>}
            title="A focused space"
            description="Try Tab and Escape."
          >
            <TextField label="Project name" />
          </Dialog>
          <a href="http://localhost:3000/playground">Open the full documentation playground →</a>
        </Card>
      </main>
    </LuminescentProvider>
  );
}
