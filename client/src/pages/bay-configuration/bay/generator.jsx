// import React from 'react';
import _ from 'lodash';

import { ReactComponent as TankSVG } from 'components/icons/tank.svg';
import { ReactComponent as MeterSVG } from 'components/icons/meter.svg';
import { ReactComponent as InjectorSVG } from 'components/icons/injector.svg';
import { ReactComponent as ArmSVG } from 'components/icons/arm.svg';

import { ReactComponent as LockSVG } from 'components/icons/lock.svg';
import { ReactComponent as UnlockSVG } from 'components/icons/unlock.svg';
// import { Icons } from 'components';

import { getKeyText } from 'utils';

const generator = (array, t) => {
  const transformed = [];
  // const icon = (value) => (<div>{value ? <Icons type="lock" size={18} /> : <Icons type="unlock" size={18} />}</div>);

  /* const newArray = _.forEach(array, (o) => {
    if (o.stream_injcode !== '') {
      o.stream_mtrcode = '';
    }
  });*/
  const newArray = [];
  for (let i = 0; i < array?.length; i++) {
    const item = array?.[i];
    if (item?.stream_injcode !== '') {
      const mitm = _.find(
        array,
        (o) =>
          o?.stream_seq === item?.stream_seq &&
          o?.stream_injcode === '' &&
          o?.stream_index === item?.stream_index
      );
      if (!mitm) {
        item.stream_mtrcode = '';
      } else {
        item.stream_mtrcode = mitm?.stream_mtrcode;
      }
    }
    newArray.push(item);
  }

  const arms = _.chain(newArray)
    .groupBy('stream_armcode')
    .mapValues((arm) =>
      _.chain(arm)
        .groupBy('stream_mtrcode')
        .mapValues((meter) => _.chain(meter).groupBy('stream_injcode').value())
        .value()
    )
    .value();

  _.forEach(arms, (meters, arm) => {
    const armChildren = [];
    console.log(meters);
    console.log('.............arm', arm);
    const payload = {
      name: `${t('fields.arm')}: ${arm}`,
      type: 'arm',
      // icon: icon(false),
      _collapsed: true,
      children: armChildren,
      nodeSvgShape: {
        shape: ArmSVG,
        shapeProps: {
          width: 25,
          height: 25,
          x: -20,
          y: -15,
        },
      },
    };

    _.forEach(meters, (injectors, meter) => {
      const meterChildren = [];

      const payload = {
        name: `${t('fields.meter')}: ${meter}`,
        type: 'meter',
        children: meterChildren,
        nodeSvgShape: {
          shape: MeterSVG,
          shapeProps: {
            width: 50,
            height: 50,
            x: -50,
            y: -25,
          },
        },
      };

      _.forEach(injectors, (tanks, injector) => {
        if (injector === '') {
          meterChildren.push({
            name: `${t('fields.tank')}: ${getKeyText(tanks[0]?.stream_tankcode, tanks[0]?.stream_tankname)}`,
            type: 'tank',
            attributes: {
              [t('fields.baseProduct')]: `${tanks[0]?.stream_basecode} - ${tanks[0]?.stream_basename}`,
              [t(
                'fields.baseClass'
              )]: `${tanks[0]?.stream_bclass_code} - ${tanks[0]?.stream_bclass_nmae} (${tanks[0]?.stream_bclass_lodens} ~ ${tanks[0]?.stream_bclass_hidens})`,
            },

            nodeSvgShape: {
              shape: TankSVG,
              shapeProps: {
                width: 50,
                height: 50,
                x: -40,
                y: -25,
              },
            },
          });
        } else {
          meterChildren.push({
            name: `${t('fields.injector')}: ${injector}`,
            type: 'injector',

            nodeSvgShape: {
              shape: InjectorSVG,
              shapeProps: {
                width: 50,
                height: 50,
                x: -50,
                y: -30,
              },
            },
            children: [
              {
                name: `${t('fields.tank')}: ${getKeyText(
                  tanks[0]?.stream_tankcode,
                  tanks[0]?.stream_tankname
                )}`,
                type: 'tank',
                attributes: {
                  [t('fields.baseProduct')]: `${tanks[0]?.stream_basecode} - ${tanks[0]?.stream_basename}`,
                  [t(
                    'fields.baseClass'
                  )]: `${tanks[0]?.stream_bclass_code} - ${tanks[0]?.stream_bclass_nmae} (${tanks[0]?.stream_bclass_lodens} ~ ${tanks[0]?.stream_bclass_hidens})`,
                },

                nodeSvgShape: {
                  shape: TankSVG,
                  shapeProps: {
                    width: 50,
                    height: 50,
                    x: -40,
                    y: -25,
                  },
                },
              },
            ],
          });
        }
      });

      armChildren.push(payload);
    });

    transformed.push(payload);
  });

  return transformed;
};

export default generator;
