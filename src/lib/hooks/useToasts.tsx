import { useState, useEffect } from 'react';
import Emitter from 'emmett';

import { ToastEvents } from '../types';

const toastEmitter = new Emitter();

const useToasts = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastEmitter.on(
      ToastEvents.ShowToast, 
      toast => {
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
      }
    );
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