import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export function BrandLogo({ className, inverted }: LogoProps) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <MountainMark className="text-verde" />
      <span className="flex flex-col leading-none">
        <span className="font-sans text-2xl font-semibold tracking-tight">
          Agustina <span className={cn(inverted ? 'text-white' : 'text-verde')}>García</span>
        </span>
        <span
          className={cn(
            'mt-1 text-[0.7rem] font-sans font-semibold uppercase tracking-[0.34em]',
            inverted ? 'text-white/60' : 'text-noche/50',
          )}
        >
          Inmobiliaria
        </span>
      </span>
    </span>
  );
}

function MountainMark({ className }: { className?: string }) {
  return (
    <svg width="56" height="48" viewBox="0 0 40 34" className={className} fill="none" aria-hidden="true">
      <path
        d="M3 29.5 14.2 8.4a1.6 1.6 0 0 1 2.8 0l3.3 5.9-2.9 5.2h6.2L29 8.4a1.6 1.6 0 0 1 2.8 0L37 29.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
