
import React from 'react';

const variants = {
  primary: 'bg-cyan-600 hover:bg-cyan-700 focus-visible:ring-cyan-500 text-white',
  destructive: 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500 text-white',
  success: 'bg-green-600 hover:bg-green-700 focus-visible:ring-green-500 text-white',
  secondary: 'bg-gray-700 hover:bg-gray-600 focus-visible:ring-gray-400 text-gray-200',
  ghost: 'hover:bg-gray-700 hover:text-gray-100 text-gray-300',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${variants[variant]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
