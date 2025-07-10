
import React from 'react';

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`block text-sm font-medium text-gray-300 mb-2 ${className}`}
    {...props}
  />
));
Label.displayName = 'Label';

export { Label };
