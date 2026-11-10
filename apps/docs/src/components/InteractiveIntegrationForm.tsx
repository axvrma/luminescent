"use client";

import React, { useState } from 'react';
import { X, Code } from 'lucide-react';
import { 
  Button,
  CodeBlock,
  Divider, 
  RadioGroup, 
  ScreenReveal, 
  SegmentedControl, 
  TextField,
  Toggle,
  ContainerTextFlip,
  ImagesBadge,
  Timeline
} from 'luminescent';

const FORM_CODE = `"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { 
  Button,
  CodeBlock,
  Divider, 
  RadioGroup, 
  ScreenReveal, 
  SegmentedControl, 
  TextField,
  Toggle,
  ContainerTextFlip,
  ImagesBadge,
  Timeline
} from 'luminescent';

export const InteractiveIntegrationForm = ({ view = 'mobile' }: { view?: 'mobile' | 'desktop' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibility, setVisibility] = useState('public');
  const [activeTab, setActiveTab] = useState('Development');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const isDesktop = view === 'desktop';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '2rem 0' }}>
      <div style={{ width: isDesktop ? '800px' : '375px', height: isDesktop ? '600px' : '700px', position: 'relative', transition: 'all 0.3s ease' }}>
        <ScreenReveal 
          isOpen={isOpen}
          revealDirection="bottom"
          revealAmount={isDesktop ? 300 : 260}
          revealContent={
            <div style={{ height: '100%', width: '100%', padding: '1.5rem', background: 'transparent', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>Project Configuration</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}
                >
                  <X size={18} />
                </button>
              </div>
              <CodeBlock 
                language="json" 
                code={'{\n  "name": "Luminescent Website",\n  "visibility": "' + visibility + '",\n  "analytics": true\n}'} 
              />
            </div>
          }
          frontContent={
            <div ref={scrollRef} style={{ position: 'relative', padding: isDesktop ? '2rem 3rem' : '1.5rem', paddingBottom: '3rem', background: '#121212', minHeight: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <ContainerTextFlip 
                  words={["Workspace", "Settings"]} 
                  className="text-xl font-bold"
                  variant="primary"
                />
                <ImagesBadge 
                  text="Integrations"
                  images={[
                    "https://github.com/shadcn.png",
                    "https://github.com/nextjs.png",
                    "https://github.com/vercel.png"
                  ]}
                  size="md"
                />
              </div>
              
              <SegmentedControl 
                tabs={['Design', 'Development', 'Marketing']} 
                defaultActiveTab={activeTab} 
                onChange={setActiveTab}
              />
              
              <div style={{ margin: '1.5rem 0', width: '100%' }}>
                <Divider orientation="horizontal" color="#ffaa66" />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                <div>
                  <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Name</label>
                  <TextField placeholder="Luminescent Website" />
                </div>
                
                <div>
                  <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Visibility</label>
                  <RadioGroup 
                    options={[{value: 'public', label: 'Public'}, {value: 'private', label: 'Private'}]} 
                    value={visibility} 
                    onChange={setVisibility}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  <span style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>Enable Advanced Features</span>
                  <Toggle checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <label style={{ color: 'white', display: 'block', marginBottom: '1rem', fontSize: '0.875rem' }}>Setup Progress</label>
                  <Timeline 
                    containerRef={scrollRef as unknown as React.RefObject<HTMLElement>}
                    data={[
                      { title: 'Create Project', content: <div className="text-zinc-400">Initialize repository</div> },
                      { title: 'Invite Team', content: <div className="text-zinc-400">Add collaborators</div> },
                      { title: 'Launch', content: <div className="text-zinc-400">Publish to production</div> }
                    ]}
                  />
                </div>
              </div>



              <div style={{ marginTop: '1rem' }}>
                <Button variant="primary" style={{ width: '100%' }}>Create Project</Button>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};
`;

export const InteractiveIntegrationForm = ({ view = 'mobile' }: { view?: 'mobile' | 'desktop' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [visibility, setVisibility] = useState('public');
  const [activeTab, setActiveTab] = useState('Development');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const isDesktop = view === 'desktop';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '2rem 0' }}>
      <div style={{ width: isDesktop ? '800px' : '375px', display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Button variant="secondary" onClick={() => setIsCodeOpen(!isCodeOpen)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
           <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
             <Code size={16} style={{ marginRight: '0.5rem' }} />
             {isCodeOpen ? 'Hide code' : 'Show code'}
           </span>
        </Button>
      </div>
      <div style={{ width: isDesktop ? '800px' : '375px', height: isDesktop ? '600px' : '700px', position: 'relative', transition: 'all 0.3s ease' }}>
        <ScreenReveal 
          isOpen={isCodeOpen}
          revealDirection="top"
          revealAmount={isDesktop ? 500 : 500}
          revealContent={
             <div style={{ height: '100%', width: '100%', padding: '1.5rem', background: '#09090b', overflowY: 'auto' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                 <h3 style={{ margin: 0, color: 'white' }}>Source Code</h3>
                 <button 
                   onClick={() => setIsCodeOpen(false)}
                   style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}
                 >
                   <X size={18} />
                 </button>
               </div>
               <CodeBlock language="tsx" code={FORM_CODE} />
             </div>
          }
          frontContent={
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <ScreenReveal 
                isOpen={isOpen}
                revealDirection="bottom"
                revealAmount={isDesktop ? 300 : 260}
                revealContent={
                  <div style={{ height: '100%', width: '100%', padding: '1.5rem', background: 'transparent', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h3 style={{ margin: 0 }}>Project Configuration</h3>
                      <button 
                        onClick={() => setIsOpen(false)}
                        style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <CodeBlock 
                      language="json" 
                      code={'{\n  "name": "Luminescent Website",\n  "visibility": "' + visibility + '",\n  "analytics": true\n}'} 
                    />
                  </div>
                }
                frontContent={
                  <div ref={scrollRef} style={{ position: 'relative', padding: isDesktop ? '2rem 3rem' : '1.5rem', paddingBottom: '3rem', background: '#121212', minHeight: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <ContainerTextFlip 
                        words={["Workspace", "Settings"]} 
                        className="text-xl font-bold"
                        variant="primary"
                      />
                      <ImagesBadge 
                        text="Integrations"
                        images={[
                          "https://github.com/shadcn.png",
                          "https://github.com/nextjs.png",
                          "https://github.com/vercel.png"
                        ]}
                        size="md"
                      />
                    </div>
                    
                    <SegmentedControl 
                      tabs={['Design', 'Development', 'Marketing']} 
                      defaultActiveTab={activeTab} 
                      onChange={setActiveTab}
                    />
                    
                    <div style={{ margin: '1.5rem 0', width: '100%' }}>
                      <Divider orientation="horizontal" color="#ffaa66" />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                      <div>
                        <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Name</label>
                        <TextField placeholder="Luminescent Website" />
                      </div>
                      
                      <div>
                        <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Visibility</label>
                        <RadioGroup 
                          options={[{value: 'public', label: 'Public'}, {value: 'private', label: 'Private'}]} 
                          value={visibility} 
                          onChange={setVisibility}
                        />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                        <span style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>Enable Advanced Features</span>
                        <Toggle checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                      </div>

                      <div style={{ marginTop: '1rem' }}>
                        <label style={{ color: 'white', display: 'block', marginBottom: '1rem', fontSize: '0.875rem' }}>Setup Progress</label>
                        <Timeline 
                          containerRef={scrollRef as unknown as React.RefObject<HTMLElement>}
                          data={[
                            { title: 'Create Project', content: <div className="text-zinc-400">Initialize repository</div> },
                            { title: 'Invite Team', content: <div className="text-zinc-400">Add collaborators</div> },
                            { title: 'Launch', content: <div className="text-zinc-400">Publish to production</div> }
                          ]}
                        />
                      </div>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                      <Button variant="primary" style={{ width: '100%' }}>Create Project</Button>
                    </div>
                  </div>
                }
              />
            </div>
          }
        />
      </div>
    </div>
  );
};
