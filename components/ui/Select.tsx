
import React, { createContext, useContext, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValue: string;
  setSelectedValue: (value: string, label: string) => void;
  selectedLabel: string;
}

const SelectContext = createContext<SelectContextProps | undefined>(undefined);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a Select provider');
  }
  return context;
};

interface SelectProps {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  value?: string;
}

const Select: React.FC<SelectProps> = ({ children, onValueChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, _setSelectedValue] = useState(value || '');
  const [selectedLabel, setSelectedLabel] = useState('Select an option');
  
  const handleSetSelectedValue = (val: string, label: string) => {
    _setSelectedValue(val);
    setSelectedLabel(label);
    if (onValueChange) {
      onValueChange(val);
    }
    setIsOpen(false);
  };
  
  React.useEffect(() => {
    if (value) {
      // This is a simplification. In a real component, you'd find the child item with this value to get its label.
      // For this app, it will reset to the value itself if not found.
      _setSelectedValue(value);
      setSelectedLabel(value);
    }
  }, [value]);


  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, selectedValue, setSelectedValue: handleSetSelectedValue, selectedLabel }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, className, ...props }, ref) => {
    const { isOpen, setIsOpen, selectedLabel } = useSelectContext();
    return (
      <button
        ref={ref}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-gray-100 ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    );
  }
);
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  const { selectedValue, selectedLabel } = useSelectContext();
  return <span>{selectedValue ? selectedLabel : placeholder}</span>;
};

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    const { isOpen } = useSelectContext();
    if (!isOpen) return null;
    return (
      <div
        ref={ref}
        className={`absolute z-50 mt-2 w-full rounded-md border border-gray-700 bg-gray-800 text-gray-200 shadow-lg p-1 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ children, className, value, ...props }, ref) => {
    const { setSelectedValue } = useSelectContext();
    return (
      <div
        ref={ref}
        onClick={() => setSelectedValue(value, children as string)}
        className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-700 focus:bg-gray-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
