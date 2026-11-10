import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScreenReveal } from './ScreenReveal';
import { Camera, Flashlight, Play, SkipBack, SkipForward, Disc3 } from 'lucide-react';
import { motion } from 'framer-motion';

const meta = {
  title: 'Components/ScreenReveal',
  component: ScreenReveal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScreenReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

const IOSLockScreen = ({ onSwipeUp }: { onSwipeUp: () => void }) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-orange-400 via-orange-300 to-pink-500 flex flex-col items-center">
      {/* Clock Area */}
      <div className="mt-16 text-center">
        <h2 className="text-xl text-white/90 font-medium tracking-wide">Wednesday, May 26</h2>
        <h1 className="text-[80px] font-bold text-white leading-none tracking-tighter mt-2">09:41</h1>
      </div>

      {/* Buttons */}
      <div className="absolute bottom-12 inset-x-12 flex justify-between">
        <button className="w-14 h-14 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white transition-colors hover:bg-black/30">
          <Flashlight className="w-6 h-6" />
        </button>
        <button className="w-14 h-14 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white transition-colors hover:bg-black/30">
          <Camera className="w-6 h-6" />
        </button>
      </div>

      {/* Invisible drag target to trigger the swipe up */}
      <div 
        className="absolute bottom-0 inset-x-0 h-24 cursor-grab active:cursor-grabbing flex items-center justify-center"
        onClick={onSwipeUp}
      >
        <div className="text-white/70 text-sm font-medium animate-pulse mt-10">Swipe up or click to open</div>
      </div>
    </div>
  );
};

const MusicPlayer = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 opacity-80" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 opacity-60" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 opacity-40" />
        </div>
        <h3 className="text-white font-bold text-2xl tracking-tight">Get Lucky</h3>
        <p className="text-neutral-400 text-sm font-medium">00:04</p>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <SkipBack className="w-5 h-5 fill-white" />
        </button>
        
        {/* Spinning record cover */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-yellow-400 flex items-center justify-center shadow-lg animate-[spin_4s_linear_infinite]">
          <div className="absolute inset-2 border border-black/20 rounded-full pointer-events-none" />
          <div className="w-4 h-4 bg-black rounded-full border-2 border-zinc-800" />
        </div>

        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <SkipForward className="w-5 h-5 fill-white" />
        </button>
      </div>
    </div>
  );
};

const StatefulScreenReveal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-12 w-full rounded-2xl">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-4">
          <button 
            onClick={() => setIsOpen(true)}
            className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Reveal Screen
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 border border-neutral-700 text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Close Screen
          </button>
        </div>
        <div className="flex gap-2 bg-neutral-900 p-1 rounded-full">
          {(['top', 'bottom', 'left', 'right'] as const).map(d => (
            <button
              key={d}
              onClick={() => {
                setDirection(d);
                setIsOpen(false);
              }}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${direction === d ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* A mock phone container */}
      <div className="w-[380px] h-[800px] relative">
        <ScreenReveal
          isOpen={isOpen}
          revealAmount={160}
          revealDirection={direction}
          frontContent={
            <div className="h-full overflow-y-auto pb-12">
              <IOSLockScreen onSwipeUp={() => setIsOpen(!isOpen)} />
              {/* Some dummy content to prove it scrolls when closed but locks when open */}
              <div className="p-8 text-neutral-400">
                <p className="mb-4">Scrollable content here...</p>
                <div className="h-[400px] bg-white/5 rounded-xl mb-4" />
                <div className="h-[400px] bg-white/5 rounded-xl" />
              </div>
            </div>
          }
          revealContent={<MusicPlayer />}
        />
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    isOpen: false,
    frontContent: <div />,
    revealContent: <div />
  },
  render: () => <StatefulScreenReveal />
};
