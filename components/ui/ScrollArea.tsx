
import React from 'react';

const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative overflow-hidden h-full w-full">
    <div ref={ref} className={`h-full w-full overflow-auto ${className}`} {...props}>
      {children}
    </div>
  </div>
));
ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
