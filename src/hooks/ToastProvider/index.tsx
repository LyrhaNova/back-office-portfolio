import React, { useRef, useContext } from 'react';
import { Toast } from 'primereact/toast';

interface IToastProviderProps {
    children: React.ReactNode;
}

type ToastContextType = (severity: "success" | "error" | "info" | "warn", summary: string, detail: any, life?: number) => void;

const ToastContext = React.createContext<ToastContextType | null>(null);

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<IToastProviderProps> = ({ children }) => {
    const toast = useRef<Toast>(null);

    const showToast: ToastContextType = (severity, summary, detail, life = 3000) => {
        if (toast.current) {
            toast.current.show({ severity, summary, detail, life });
        }
    };

    return (
        <ToastContext.Provider value={showToast}>
            <Toast ref={toast} />
            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;