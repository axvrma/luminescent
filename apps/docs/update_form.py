import re

with open('src/components/InteractiveIntegrationForm.tsx', 'r') as f:
    original_code = f.read()

# Prepare the FORM_CODE string
form_code_str = original_code.replace('`', '\\`').replace('$', '\\$')
form_code_def = f'const FORM_CODE = `{form_code_str}`;\n'

# Add import for Code
modified_code = original_code.replace("import { X } from 'lucide-react';", "import { X, Code } from 'lucide-react';")

# Add FORM_CODE before the component
modified_code = modified_code.replace("export const InteractiveIntegrationForm", form_code_def + "\nexport const InteractiveIntegrationForm")

# Add state
modified_code = modified_code.replace(
    "const [isOpen, setIsOpen] = useState(false);",
    "const [isOpen, setIsOpen] = useState(false);\n  const [isCodeOpen, setIsCodeOpen] = useState(false);"
)

# Modify the return block
return_block_start = modified_code.find("return (")
# Replace everything from return ( to the end of the file with the new structure.

new_return = """return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '2rem 0' }}>
      <div style={{ width: isDesktop ? '800px' : '375px', display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Button variant="secondary" onClick={() => setIsCodeOpen(!isCodeOpen)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
           <Code size={16} style={{ marginRight: '0.5rem' }} />
           {isCodeOpen ? 'Hide code' : 'Show code'}
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
"""

# Extract the existing ScreenReveal component from the original code
screen_reveal_start = original_code.find("<ScreenReveal \n          isOpen={isOpen}")
screen_reveal_end = original_code.find("      </div>\n    </div>\n  );\n};")

existing_screen_reveal = original_code[screen_reveal_start:screen_reveal_end].strip()

# Add indentation to existing_screen_reveal
indented_screen_reveal = "\n".join(["                " + line if i > 0 else line for i, line in enumerate(existing_screen_reveal.split("\n"))])


new_tail = """
            </div>
          }
        />
      </div>
    </div>
  );
};
"""

final_code = modified_code[:return_block_start] + new_return + indented_screen_reveal + new_tail

with open('src/components/InteractiveIntegrationForm.tsx', 'w') as f:
    f.write(final_code)
