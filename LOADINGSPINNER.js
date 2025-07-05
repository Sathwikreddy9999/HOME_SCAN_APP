import React from 'react';

const LoadingSpinner = ({ text }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      {text && <p className="text-text-secondary text-lg animate-pulse">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;