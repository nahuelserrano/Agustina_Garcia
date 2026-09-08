import type { ReactNode } from 'react';

export const selectClass =
  'w-full rounded-lg border border-arena bg-white px-3.5 py-2.5 text-sm text-noche transition-colors focus:border-verde focus:outline-none focus:ring-2 focus:ring-verde/25';

export const filterLabelClass =
  'mb-1.5 flex items-center gap-1.5 font-sans text-[0.8rem] font-medium text-noche/80';

export function LabelIcon({ icon }: { icon: ReactNode }) {
  return <span className="flex shrink-0 text-verde">{icon}</span>;
}
