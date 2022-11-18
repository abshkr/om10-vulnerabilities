import React from 'react';
import { Card, notification } from 'antd';

const checkLevelVolumes = (t, items, rate = 10) => {
  const errors = [];

  if (!items || items?.length < 2) {
    return errors;
  }

  // check the tank items
  let item1 = undefined;
  let item2 = undefined;
  let avgCnt = 0;
  let avgSum = 0;
  for (let tidx = 0; tidx < items?.length; tidx++) {
    if (tidx === 0) {
      continue;
    }
    const item1 = items?.[tidx - 1];
    const item2 = items?.[tidx];
    const diffLevel = item2?.strap_height - item1?.strap_height;
    const diffVolume = item2?.strap_volume - item1?.strap_volume;

    // check the negative increment
    if (diffLevel > 0 && diffVolume <= 0) {
      errors.push({
        field: `${t('descriptions.strapVolumeWrongTitle', {
          VOLUME: item2?.strap_volume,
          LEVEL: item2?.strap_height,
        })}`,
        message: `${t('descriptions.strapVolumeWrongError', {
          LEVEL1: item1?.strap_height,
          LEVEL2: item2?.strap_height,
          VOLUME1: item1?.strap_volume,
          VOLUME2: item2?.strap_volume,
        })}`,
        key: `${'strap_volume'}${tidx}`,
        line: item2.strap_height,
      });
    }

    if (diffLevel < 0 && diffVolume >= 0) {
      errors.push({
        field: `${t('descriptions.strapVolumeWrongTitle', {
          VOLUME: item1?.strap_volume,
          LEVEL: item1?.strap_height,
        })}`,
        message: `${t('descriptions.strapVolumeWrongError', {
          LEVEL1: item2?.strap_height,
          LEVEL2: item1?.strap_height,
          VOLUME1: item2?.strap_volume,
          VOLUME2: item1?.strap_volume,
        })}`,
        key: `${'strap_volume'}${tidx}`,
        line: item2.strap_height,
      });
    }

    // check the abrupt change of increment
    if ((diffLevel > 0 && diffVolume > 0) || (diffLevel < 0 && diffVolume < 0)) {
      const deltaVol = diffVolume / diffLevel;
      const deltaAvg = avgCnt > 0 ? (avgSum / avgCnt) * rate : 0;
      if (deltaAvg > 0 && deltaVol > deltaAvg) {
        // abnormal, give warning
        errors.push({
          field: `${t('descriptions.strapVolumeAbruptTitle', {
            VOLUME: diffVolume > 0 ? item2?.strap_volume : item1?.strap_volume,
            LEVEL: diffLevel > 0 ? item2?.strap_height : item1?.strap_height,
          })}`,
          message: `${t('descriptions.strapVolumeAbruptError', {
            LEVEL1: diffLevel > 0 ? item1?.strap_height : item2?.strap_height,
            LEVEL2: diffLevel > 0 ? item2?.strap_height : item1?.strap_height,
            VOLUME1: diffVolume > 0 ? item1?.strap_volume : item2?.strap_volume,
            VOLUME2: diffVolume > 0 ? item2?.strap_volume : item1?.strap_volume,
          })}`,
          key: `${'strap_volume'}${tidx}`,
          line: item2.strap_height,
        });
      } else {
        // normal, add this delta to avgSum
        avgCnt += 1;
        avgSum += deltaVol;
      }
    }
  }

  if (errors.length > 0) {
    const lines = (
      <>
        {errors?.map((error, index) => (
          <Card key={error.key} size="small" title={error.field}>
            {error.message}
          </Card>
        ))}
      </>
    );

    notification.error({
      message: t('fields.errors'),
      description: lines,
      // duration: 0,
      style: {
        height: errors.length > 5 ? '500px' : `${errors.length * 80 + 100}px`,
        width: '55vw',
        overflowY: 'scroll',
      },
    });
    /* _.forEach(errors, (error) => {
        notification.error({
          message: error.field,
          description: error.message,
          key: error.key,
        });
      }); */
  }

  return errors;
};

export default checkLevelVolumes;
