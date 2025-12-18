
import React from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
  colorClass: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title, colorClass }) => (
  <h2 className={`text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 ${colorClass}`}>
    <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current text-sm">{number}</span>
    {title}
  </h2>
);
