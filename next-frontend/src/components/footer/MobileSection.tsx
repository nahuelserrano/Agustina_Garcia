'use client';

import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Collapse } from '@/components/ui/Collapse';

export default function MobileSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-arena">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between py-4 text-left font-sans text-sm font-semibold uppercase tracking-widecaps text-noche/60"
      >
        {title}
        <ChevronDown
          size={18}
          className={cn('shrink-0 text-noche/40 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <Collapse open={open}>
        <div id={panelId} className="pb-4">
          {children}
        </div>
      </Collapse>
    </div>
  );
}
