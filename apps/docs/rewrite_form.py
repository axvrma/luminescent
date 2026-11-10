with open('src/components/InteractiveIntegrationForm.tsx', 'r') as f:
    code = f.read()

replacements = [
    ("Integration Config", "Project Configuration"),
    ('"name": "Billing Sync",\\n  "env": "', '"name": "Luminescent Website",\\n  "visibility": "'),
    ('"retries": true', '"analytics": true'),
    ('initialText="Integration"', 'initialText="Workspace"'),
    ("tabs={['Webhook', 'REST API']}", "tabs={['Design', 'Development', 'Marketing']}"),
    ("defaultActiveTab={activeTab}", "defaultActiveTab={activeTab}"),
    ("const [activeTab, setActiveTab] = useState('Webhook');", "const [activeTab, setActiveTab] = useState('Development');"),
    ("placeholder=\"Billing Sync\"", "placeholder=\"Luminescent Website\""),
    ("label style={{ color: 'white', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Environment</label>", "label style={{ color: 'white', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Visibility</label>"),
    ("options={[{value: 'production', label: 'Production'}, {value: 'staging', label: 'Staging'}]}", "options={[{value: 'public', label: 'Public'}, {value: 'private', label: 'Private'}]}"),
    ("const [environment, setEnvironment] = useState('production');", "const [visibility, setVisibility] = useState('public');"),
    ("value={environment}", "value={visibility}"),
    ("onChange={setEnvironment}", "onChange={setVisibility}"),
    ("View Configuration", "Enable Advanced Features"),
    ("title: 'Create Account', content: <div className=\"text-zinc-400\">Sign up for free</div>", "title: 'Create Project', content: <div className=\"text-zinc-400\">Initialize repository</div>"),
    ("title: 'Configure', content: <div className=\"text-zinc-400\">Set up details</div>", "title: 'Invite Team', content: <div className=\"text-zinc-400\">Add collaborators</div>"),
    ("title: 'Deploy', content: <div className=\"text-zinc-400\">Go live</div>", "title: 'Launch', content: <div className=\"text-zinc-400\">Publish to production</div>"),
    ("Create Integration", "Create Project")
]

for old, new in replacements:
    code = code.replace(old, new)

with open('src/components/InteractiveIntegrationForm.tsx', 'w') as f:
    f.write(code)
