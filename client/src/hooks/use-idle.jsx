import { useEffect, useState } from 'react';
import createActivityDetector from 'activity-detector';
import axios from 'axios';
import _ from 'lodash';

import { SITE_CONFIGURATION } from '../api';

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
    axios.get(SITE_CONFIGURATION.READ).then((res) => {
      const payload = res?.data;

      if (payload) {
        const timeout = _.find(payload?.records, ['config_key', 'URBAC_AUTO_LOGOFF']);
        const value = _.toNumber(timeout?.config_value);

        if (value > 0) {
          setTimeToIdle(value * 60000);
        } else {
          setTimeToIdle(99999999999999999);
        }
      }
    });
  }, [setTimeToIdle]);

  return isIdle;
};

export default useIdle;
