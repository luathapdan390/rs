
import React from 'react';

interface FormulaBoxProps {
  title: string;
  formula: string;
  bgColor: string;
  borderColor: string;
}

export const FormulaBox: React.FC<FormulaBoxProps> = ({ title, formula, bgColor, borderColor }) => (
  <div className={`p-4 rounded-xl border-l-4 ${bgColor} ${borderColor} formula-box mb-4`}>
    <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-1">{title}</h3>
    <p className="text-blue-900 font-mono text-lg font-semibold break-words leading-relaxed">{formula}</p>
  </div>
);
