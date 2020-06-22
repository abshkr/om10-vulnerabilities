import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Tree from 'react-d3-tree';

import { Card } from 'antd';
import _ from 'lodash';
import { ReactComponent as TankSVG } from 'components/icons/tank.svg';

import api, { LOAD_BAYS } from 'api';

import { OverviewContainer } from './style';

const Overview = ({ selected }) => {
  const { t } = useTranslation();

  const [instance, setInstance] = useState([
    {
      name: 'Loading...',
      attributes: {},
    },
  ]);

  const model = (array) => {
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
        name: `Arm: ${arm}`,
        type: 'arm',
        children: armChildren,
      };

      _.forEach(meters, (injectors, meter) => {
        const meterChildren = [];

        const payload = {
          name: `Meter: ${meter}`,
          type: 'meter',
          children: meterChildren,
        };

        _.forEach(injectors, (tanks, injector) => {
          if (injector === '') {
            meterChildren.push({
              name: `Tank: ${tanks[0]?.stream_tankcode}`,
              type: 'tank',
              nodeSvgShape: {
                shape: TankSVG,
                shapeProps: {
                  width: 50,
                  height: 50,
                  x: 100,
                  y: 0,
                },
              },
            });
          } else {
            meterChildren.push({
              name: `Injector: ${injector}`,
              type: 'injector',
              children: [
                {
                  name: `Tank: ${tanks[0]?.stream_tankcode}`,
                  type: 'tank',
                  nodeSvgShape: {
                    shape: TankSVG,
                    shapeProps: {
                      width: 50,
                      height: 50,
                      x: 100,
                      y: 0,
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

  useEffect(() => {
    if (selected && instance?.ba_code !== selected?.ba_code) {
      api
        .get(LOAD_BAYS.DETAILS, {
          params: {
            ba_code: selected?.ba_code,
          },
        })
        .then((res) => {
          const snapshot = model(res?.data?.records[0]?.arm_meters);

          const node = [
            {
              name: `Bay: ${selected?.ba_code}`,
              children: snapshot,
            },
          ];

          setInstance(node);
        });
    }
  }, [selected]);

  return (
    <Card hoverable>
      <OverviewContainer>
        <div id="treeWrapper" style={{ width: '100%', height: '70vh' }}>
          <Tree
            data={instance}
            pathFunc="step"
            separation={{
              siblings: 0.5,
              nonSiblings: 0.5,
            }}
            nodeSize={{
              x: 200,
              y: 140,
            }}
          />
        </div>
      </OverviewContainer>
    </Card>
  );
};

export default Overview;
