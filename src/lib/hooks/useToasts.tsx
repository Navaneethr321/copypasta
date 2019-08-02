import { useState, useEffect } from 'react';
 
import { toastEmitter, ToastEvents } from '../services/emitter';

const useToasts = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastEmitter.on('showToast', toast => {
      setToasts(oldToasts => {
        oldToasts.push(toast.data.text);
        return oldToasts.slice();
      });
      setTimeout(() => {
        setToasts(oldToasts => {
          oldToasts.shift();
          return oldToasts.slice();
        });
      }, 2000);
    });
  }, []);

  const displayToast = (text: string) => {
    toastEmitter.emit(
      ToastEvents.ShowToast, 
      { text }
    );
  };

  return {
    toasts,
    displayToast,
  };
};

export default useToasts;