import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from './TextField';
import { SegmentedControl } from './SegmentedControl';
import { RadioGroup } from './RadioGroup';
import { Button } from './Button';
import { Divider } from './Divider';
import { CodeBlock } from './CodeBlock';
import { motion, AnimatePresence } from 'framer-motion';

// Dummy wrapper for story organization
const FormDemo = () => <div />;

const meta = {
  title: 'Examples/ReactHookForm',
  component: FormDemo,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FormDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

interface FormData {
  projectName: string;
  visibility: string;
  environment: string;
}

const IntegrationExample = () => {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      projectName: '',
      visibility: 'private',
      environment: 'development',
    }
  });

  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setSubmittedData(data);
  };

  return (
    <div className="w-full max-w-lg p-8 rounded-3xl bg-[#0a0c10] border border-white/[0.05] shadow-2xl flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">Create Project</h2>
        <p className="text-zinc-400 text-sm">Configure your new luminous environment.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        
        {/* TextField Integration (Native Register) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-300 ml-2">Project Name</label>
          <TextField 
            {...register('projectName', { required: 'Project name is required' })}
            placeholder="e.g. Apollo Mission"
            glowVariant="peach"
          />
          {errors.projectName && (
            <span className="text-red-400 text-xs ml-2 mt-1">{errors.projectName.message}</span>
          )}
        </div>

        <Divider orientation="horizontal" intensity="low" />

        {/* SegmentedControl Integration (Controller) */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-zinc-300 ml-2">Visibility</label>
          <Controller
            control={control}
            name="visibility"
            render={({ field: { onChange, value } }) => (
              <SegmentedControl
                defaultActiveTab={value}
                onChange={onChange}
                tabs={['Public', 'Internal', 'Private']}
              />
            )}
          />
        </div>

        {/* RadioGroup Integration (Controller) */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-zinc-300 ml-2">Environment Setup</label>
          <Controller
            control={control}
            name="environment"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                value={value}
                onChange={onChange}
                layout="vertical"
                indicatorAnimation="fade"
                options={[
                  { label: 'Development (Local)', value: 'development' },
                  { label: 'Staging (Preview)', value: 'staging' },
                  { label: 'Production (Live)', value: 'production' },
                ]}
              />
            )}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Initialize Project'}
          </Button>
        </div>
      </form>

      {/* Show submitted data with CodeBlock */}
      <AnimatePresence>
        {submittedData && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            className="overflow-hidden"
          >
            <Divider orientation="horizontal" intensity="low" className="mb-8" />
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium text-emerald-400 ml-2">Project Initialized!</h3>
              <CodeBlock 
                code={JSON.stringify(submittedData, null, 2)}
                language="json"
                glowVariant="comet"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const CompleteForm: Story = {
  render: () => <IntegrationExample />,
};
