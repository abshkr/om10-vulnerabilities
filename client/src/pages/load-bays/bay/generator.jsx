import _ from 'lodash';

import { ReactComponent as TankSVG } from 'components/icons/tank.svg';
import { ReactComponent as MeterSVG } from 'components/icons/meter.svg';
import { ReactComponent as InjectorSVG } from 'components/icons/injector.svg';

import { ReactComponent as LockSVG } from 'components/icons/lock.svg';

const generator = (array, t) => {
  const transformed = [];

  const arms = _.chain(array)
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

    const payload = {
      name: `${t('fields.arm')}: ${arm}`,
      type: 'arm',
      _collapsed: true,
      children: armChildren,
      nodeSvgShape: {
        shape: LockSVG,
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
            name: `${t('fields.tank')}: ${tanks[0]?.stream_tankcode}`,
            type: 'tank',

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
                name: `${t('fields.tank')}: ${tanks[0]?.stream_tankcode}`,
                type: 'tank',

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
