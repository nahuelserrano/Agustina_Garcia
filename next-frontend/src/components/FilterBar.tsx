'use client';

import HomePropertyForm from '@/components/filters/HomePropertyForm';
import PropertyFiltersForm from '@/components/filters/PropertyFiltersForm';

interface FilterBarProps {
  variant?: 'home' | 'full';
  propertyTypes: string[];
}

export default function FilterBar({ variant = 'full', propertyTypes }: FilterBarProps) {
  if (variant === 'home') {
    return <HomePropertyForm propertyTypes={propertyTypes} />;
  }

  return <PropertyFiltersForm propertyTypes={propertyTypes} />;
}
