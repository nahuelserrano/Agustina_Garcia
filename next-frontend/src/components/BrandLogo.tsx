import Image from 'next/image';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  inverted?: boolean;
  iconOnly?: boolean;
}

export function BrandLogo({ className, inverted, iconOnly }: LogoProps) {
  return (
    <span className={cn('flex items-center', className)}>
      <Image
        src="/logo.png"
        alt="Agustina García"
        width={622}
        height={401}
        className={cn('w-auto', iconOnly ? 'h-32' : 'h-24')}
        priority
      />
      {!iconOnly && (
        <span className="hidden flex-col leading-none sm:flex">
        <span className={cn('font-sans text-2xl font-semibold tracking-tight', inverted ? 'text-white' : 'text-noche')}>
          Agustina García
        </span>
        <span
          className={cn(
            'mt-1 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em]',
            inverted ? 'text-white/60' : 'text-noche/50',
          )}
        >
          Martillera y corredora pública
        </span>
      </span>
      )}
    </span>
  );
}
