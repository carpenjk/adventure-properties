import { useState, useEffect, useCallback } from 'react';

function useParentSize(element) {
  const parentElement = element ? element.parentElement : undefined;

  const getSize = () => {
    return {
      width: parentElement ? parentElement.offsetWidth : undefined,
      height: parentElement ? parentElement.offsetHeight : undefined,
      forceUpdate: getSize,
    };
  };

  const [parentSize, setParentSize] = useState(getSize);
  useEffect(() => {
    function handleResize() {
      setParentSize(getSize());
    }
    if (parentElement) {
      handleResize();
      parentElement.addEventListener('resize', handleResize);
      return () => parentElement.removeEventListener('resize', handleResize);
    }
  }, [element]);

  return parentSize;
}

export default useParentSize;
