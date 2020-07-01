import { useEffect, useState, useContext } from 'react';
import createActivityDetector from 'activity-detector';

import _ from 'lodash';

import ConfigStore from 'stores/config-store';
const useIdle = () => {
  const { autoLogOut } = useContext(ConfigStore);

  const [isIdle, setIdle] = useState(false);
  const [timeToIdle, setTimeToIdle] = useState(1800000);

  useEffect(() => {
    const activityDetector = createActivityDetector({
      timeToIdle,
      activityEvents: [
        'click',
        'mousemove',
        'keydown',
        'DOMMouseScroll',
        'mousewheel',
        'mousedown',
        'touchstart',
        'touchmove',
        'blur',
        'focus',
      ],
      inactivityEvents: [],
    });

    activityDetector.on('idle', () => setIdle(true));
    activityDetector.on('active', () => setIdle(false));

    return () => {
      activityDetector.stop();
    };
  }, [timeToIdle]);

  useEffect(() => {
    if (autoLogOut) {
      const value = _.toNumber(autoLogOut);

      if (value > 0) {
        setTimeToIdle(value * 60000);
      } else {
        setTimeToIdle(99999999999999999);
      }
    }
  }, [autoLogOut]);

  return isIdle;
};

export default useIdle;
