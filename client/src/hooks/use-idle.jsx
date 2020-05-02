import { useEffect, useState } from 'react';
import createActivityDetector from 'activity-detector';
import axios from 'axios';

import { AUTH } from '../api';

const useIdle = () => {
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
    axios.get(AUTH.SITE_CONFIG).then((res) => {
      const CONFIG = res?.data;

      if (CONFIG?.DEFAULT?.TIMEOUT) {
        setTimeToIdle(CONFIG.DEFAULT.TIMEOUT);
      }
    });
  }, []);

  return isIdle;
};

export default useIdle;
