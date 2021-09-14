import { useState } from 'react';
import useIsoLayoutEffect from './UseIsoLayoutEffect';

const useLockBodyScroll = (hideScrollbar, isLocked) => {
  const [isBodyLocked, setIsLockBody] = useState(
    isLocked === undefined && true
  );
  const [origOverflow, setOrigOverflow] = useState();
  const [origPosition, setOrigPosition] = useState();

  function lockBody() {
    if (!hideScrollbar) {
      document.body.style.position = 'fixed';
      document.body.style.overflowY = 'scroll';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  function unLockBody(overflow, position) {
    document.body.style.overflow = overflow;
    document.body.style.position = position;
    document.body.style.overflow = 'scroll';
    document.body.style.position = 'relative';
  }
  useIsoLayoutEffect(() => {
    // Get original body overflow
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    const originalPosition = window.getComputedStyle(document.body).position;

    setOrigOverflow(originalOverflow);
    setOrigPosition(originalPosition);

    // Prevent scrolling on mount
    lockBody();
    // Re-enable scrolling when component unmounts
    return () => {
      unLockBody(originalOverflow, originalPosition);
    };
  }, []);

  useIsoLayoutEffect(() => {
    // Prevent scrolling on lock
    lockBody();
    // Re-enable scrolling when component is locked
    return () => {
      unLockBody(origOverflow, origPosition);
    };
  }, [isBodyLocked]); //

  const lock = () => setIsLockBody(true);
  const unlock = () => setIsLockBody(false);
  return {
    lock,
    unlock,
  };
};

export default useLockBodyScroll;
