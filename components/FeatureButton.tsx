import React from 'react';

interface FeatureButtonProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

const FeatureButton = ({ icon: Icon, label, isActive = false }: FeatureButtonProps) => {
  const baseClasses = "flex items-center space-x-3 p-4 rounded-lg transition-colors duration-200";
  const activeClasses = "bg-gray-700/50 cursor-default";
  const inactiveClasses = "bg-gray-800/50 hover:bg-gray-700/60 cursor-not-allowed opacity-60";

  return (
    <div className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      <Icon className={`h-6 w-6 ${isActive ? 'text-yellow-400' : 'text-gray-400'}`} />
      <span className="font-semibold text-gray-200">{label}</span>
    </div>
  );
};

export default FeatureButton;
