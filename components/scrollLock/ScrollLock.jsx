import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import useIsoLayoutEffect from '../hooks/UseIsoLayoutEffect';

const ScrollLock = ({ scrollNode, reserveScrollBarGap }) => {
  const options = {
    reserveScrollBarGap,
  };
  function clear() {
    clearAllBodyScrollLocks();
  }
  useIsoLayoutEffect(() => {
    disableBodyScroll(scrollNode, options);
    return clear;
  }, []);
  return null;
};

export default ScrollLock;
