import { useState } from 'react';

const useFullScreenInputSlide = ({ enabled, onNext }) => {
  const [currSlide, setCurrSlide] = useState(0);
  const [isEnabled, setIsEnabled] = useState(enabled);

  function setCurrent(i) {
    setCurrSlide(i);
  }
  function next() {
    if (onNext) {
      onNext();
    }
    setCurrSlide((curr) => curr + 1);
  }
  function prev() {
    setCurrSlide((curr) => curr - 1);
  }

  function enable() {
    setIsEnabled(true);
  }
  function disable() {
    setIsEnabled(false);
  }

  const slideControl = {
    disable,
    enable,
    next,
    prev,
    setCurrent,
    currSlide,
  };

  return {
    slideControl,
    slideState: { currSlide, isEnabled },
  };
};

export default useFullScreenInputSlide;
