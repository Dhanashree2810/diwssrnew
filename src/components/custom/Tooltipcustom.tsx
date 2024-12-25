import React, { ReactNode } from 'react';

interface TooltipProps {
  message: string;
  children: ReactNode;
}

const Tooltip = ({ message, children }:TooltipProps) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md py-1 px-2 whitespace-nowrap">
        {message}
        <div className="w-3 h-3 bg-gray-800 absolute left-1/2 -translate-x-1/2 top-full rotate-45"></div>
      </div>
    </div>
  );
};

export default Tooltip;
