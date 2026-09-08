import type { ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { filterLabelClass, LabelIcon } from '@/components/filters/filter-styles';

interface SegmentedFieldProps {
  label: string;
  icon: ReactNode;
  options: { value: string; label: string }[];
  reg: UseFormRegisterReturn;
  value: string | undefined;
}

export default function SegmentedField({ label, icon, options, reg, value }: SegmentedFieldProps) {
  return (
    <div>
      <span className={filterLabelClass}>
        <LabelIcon icon={icon} />
        {label}
      </span>
      <div className="flex gap-1.5">
        {options.map((option) => {
          const active = value === option.value;
          return (
            <label
              key={option.value}
              className={`flex-1 cursor-pointer rounded-lg border py-2.5 text-center font-sans text-sm font-medium transition-colors ${
                active
                  ? 'border-verde bg-verde text-white'
                  : 'border-arena bg-white text-noche hover:border-verde/50'
              }`}
            >
              <input type="radio" className="sr-only" value={option.value} {...reg} />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}
