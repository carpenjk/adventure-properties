import { createContext, useEffect, useState } from 'react';

const SpinnerContext = createContext();
const SpinnerProvider = ({ children, defaultMessage }) => {
  const [loadingMessage, setLoadingMessage] = useState(
    defaultMessage || 'Loading'
  );

  useEffect(() => {
    if (!loadingMessage) setLoadingMessage(defaultMessage || 'Loading');
  }, [loadingMessage, setLoadingMessage, defaultMessage]);

  return (
    <SpinnerContext.Provider
      value={{ loadingMessage: loadingMessage || 'Loading', setLoadingMessage }}
    >
      {children}
    </SpinnerContext.Provider>
  );
};

export { SpinnerProvider, SpinnerContext };
