import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timerRefs = useRef({});

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type, exiting: false }]);

    timerRefs.current[id] = setTimeout(() => {
      // eslint-disable-next-line react-hooks/immutability
      dismissToast(id);
    }, 3500);
  }, []);

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const dismissToast = useCallback((id) => {
    clearTimeout(timerRefs.current[id]);
    // Mark as exiting for animation
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)),
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};

export default ToastContext;
