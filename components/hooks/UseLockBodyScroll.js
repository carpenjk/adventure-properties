import useIsoLayoutEffect from './UseIsoLayoutEffect';

const useLockBodyScroll = (hideScrollbar) => {
  useIsoLayoutEffect(() => {
    // Get original body overflow
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    const originalPosition = window.getComputedStyle(document.body).position;

    // Prevent scrolling on mount
    if (hideScrollbar) {
      document.body.style.position = 'fixed';
      document.body.style.overflowY = 'scroll';
    } else {
      document.body.style.overflow = 'hidden';
    }

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
    };
  }, []); // Empty array ensures effect is only run on mount and unmount
};

export default useLockBodyScroll;
