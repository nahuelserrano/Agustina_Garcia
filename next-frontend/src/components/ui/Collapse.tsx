import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

interface CollapseProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

export function Collapse({ open, children, className }: CollapseProps) {
  return (
    <div
      inert={!open}
      className={cn(
        'grid min-w-0 transition-[grid-template-rows] duration-200 ease-out',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        className,
      )}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
