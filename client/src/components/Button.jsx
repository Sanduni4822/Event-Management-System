import React from 'react';

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
};

const sizeClasses = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-5 py-3 text-lg',
};

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary', // default to primary
  size = 'md',
  className = '',
  ...props
}) => {
  const combinedClasses = `
    rounded 
    transition 
    duration-150 
    disabled:opacity-50 
    disabled:cursor-not-allowed 
    ${variantClasses[variant] || ''} 
    ${sizeClasses[size] || ''} 
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
