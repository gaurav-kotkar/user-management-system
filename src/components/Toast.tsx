import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastNotificationProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const config = {
    success: {
      icon: <CheckCircle className="w-5 h-5" />,
      className: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      iconColor: 'text-emerald-600',
    },
    error: {
      icon: <XCircle className="w-5 h-5" />,
      className: 'bg-red-50 border-red-200 text-red-800',
      iconColor: 'text-red-600',
    },
    info: {
      icon: <AlertCircle className="w-5 h-5" />,
      className: 'bg-blue-50 border-blue-200 text-blue-800',
      iconColor: 'text-blue-600',
    },
  };

  const { icon, className, iconColor } = config[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg min-w-[320px] max-w-md ${className}`}
    >
      <div className={`flex-shrink-0 ${iconColor}`}>{icon}</div>
      <p className="flex-1 text-sm font-semibold">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastNotification key={toast.id} toast={toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
};
