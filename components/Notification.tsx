
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, type]);
    
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Wait for fade-out transition
  };

  const bgColor = type === 'success' ? 'bg-green-600/90' : 'bg-red-600/90';
  const Icon = type === 'success' ? CheckCircle : XCircle;

  return (
    <div
      className={`fixed bottom-5 right-5 w-auto max-w-sm p-4 rounded-lg shadow-lg text-white ${bgColor} backdrop-blur-sm border border-white/20 transition-all duration-300 ease-in-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button onClick={handleClose} className="rounded-md inline-flex text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white">
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
