import React from 'react';

interface SparePartCardProps {
  label: string;
  icon: React.ReactNode;
  color?: string;
}

const SparePartCard: React.FC<SparePartCardProps> = ({ label, icon, color = '#EFF6FF' }) => {
  return (
    <button
      className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200
        hover:shadow-md hover:scale-105 active:scale-95 min-w-[64px]"
      style={{ backgroundColor: color }}
    >
      <div className="w-10 h-10 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-600 text-center leading-tight whitespace-nowrap">
        {label}
      </span>
    </button>
  );
};

export default SparePartCard;
