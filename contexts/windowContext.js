import useWindowSize from '../components/hooks/UseWindowSize';
import { useState } from 'react';

const WindowContext = React.createContext();

const WindowProvider = (props) => {
  const windowSize = useWindowSize();
  return (
    <WindowContext.Provider
      value={{
        windowSize,
      }}
    >
      {props.children}
    </WindowContext.Provider>
  );
};

export { WindowProvider, WindowContext };
