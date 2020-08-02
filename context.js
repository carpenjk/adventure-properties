import { useState } from 'react';
import React, { Component } from 'react';

const GlobalContext = React.createContext();

const ConfigProvider = props => {
  const [appMode, setAppMode] = useState('rent');
  const position = 'right';

  function handleAppModeToggle(mode) {
    setAppMode(mode.toLowerCase());
  }

  return (
    <GlobalContext.Provider value={{ appMode, handleAppModeToggle }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export { ConfigProvider, GlobalContext };
