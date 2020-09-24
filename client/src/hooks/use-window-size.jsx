import { useLayoutEffect, useState } from 'react';
import _ from 'lodash';
import { useEffect } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState({
    height: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize({
        height: window.outerHeight,
        width: window.outerWidth,
      });
    };

    window.addEventListener('resize', updateSize);

    _.debounce(updateSize, 1000);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      setSize({
        height: window.outerHeight,
        width: window.outerWidth,
      });
    };

    updateSize();
  }, []);

  return {
    windowHeight: size.height,
    windowWidth: size.width,
  };
};

export default useWindowSize;
