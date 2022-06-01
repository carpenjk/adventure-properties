import { useState } from 'react';

const useOpenClose = () => {
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }
  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return {
    isOpen,
    control: { open, close, toggle },
  };
};

export default useOpenClose;
