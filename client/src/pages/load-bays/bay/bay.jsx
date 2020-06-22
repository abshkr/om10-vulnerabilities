import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Tree from 'react-d3-tree';

import { Card } from 'antd';
import _ from 'lodash';

import api, { LOAD_BAYS } from 'api';

import { OverviewContainer } from './style';
import generator from './generator';

const Overview = ({ selected }) => {
  const { t } = useTranslation();

  const [instance, setInstance] = useState([
    {
      name: '',
      attributes: {},
    },
  ]);

  useEffect(() => {
    if (selected) {
      api
        .get(LOAD_BAYS.DETAILS, {
          params: {
            ba_code: selected?.ba_code,
          },
        })
        .then((res) => {
          const payload = res?.data?.records[0]?.arm_meters;

          const node = [
            {
              name: `${t('fields.bay')}: ${selected?.ba_code}`,
              children: generator(payload, t),
            },
          ];

          setInstance(node);
        });
    }
  }, [selected]);

  return (
    <Card hoverable>
      <OverviewContainer>
        <Tree
          data={instance}
          pathFunc="step"
          translate={{
            x: 20,
            y: 350,
          }}
          separation={{
            siblings: 0.5,
            nonSiblings: 0.5,
          }}
          nodeSize={{
            x: 200,
            y: 140,
          }}
        />
      </OverviewContainer>
    </Card>
  );
};

export default Overview;
