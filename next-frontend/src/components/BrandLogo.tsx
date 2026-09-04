import Image from 'next/image';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function BrandLogo({ className, iconOnly }: LogoProps) {
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
          <span className="font-sans text-2xl font-semibold tracking-tight text-noche">
            Agustina García
          </span>
          <span className="mt-1 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-noche/50">
            Martillera y corredora pública
          </span>
        </span>
      )}
    </span>
  );
}
