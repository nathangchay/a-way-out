import { useEffect } from 'react';

function AutosaveController({ callback }) {
  useEffect(() => {
    const interval = setInterval(callback, 30000);

    return () => {
      clearInterval(interval);
    };
  });

  return null;
}

export default AutosaveController;
