import { useEffect, useState } from 'react';
import createActivityDetector from 'activity-detector';

const useIdle = () => {
  const [isIdle, setIdle] = useState(false);

  useEffect(() => {
    const activityDetector = createActivityDetector({
      timeToIdle: 1800000, // 30 mins
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
  }, []);

  return isIdle;
};

export default useIdle;
