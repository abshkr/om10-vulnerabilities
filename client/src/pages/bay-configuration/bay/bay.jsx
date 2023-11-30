import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Tree from 'react-d3-tree';

import { Card } from 'antd';
import _ from 'lodash';

import api, { BAY_CONFIGURATION } from 'api';

import { OverviewContainer } from './style';
import generator from './generator';

import { ReactComponent as TankSVG } from 'components/icons/tank.svg';
import { ReactComponent as MeterSVG } from 'components/icons/meter.svg';
import { ReactComponent as InjectorSVG } from 'components/icons/injector.svg';
import { ReactComponent as ArmSVG } from 'components/icons/arm.svg';

const Overview = ({ selected }) => {
  const { t } = useTranslation();

  const [instance, setInstance] = useState([
    {
      name: '',
      attributes: {},
    },
  ]);

  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
      {nodeDatum.type === 'arm' && <ArmSVG width="25" height="25" x="-20" y="-15" onClick={toggleNode} />}
      {nodeDatum.type === 'meter' && <MeterSVG width="50" height="50" x="-50" y="-25" onClick={toggleNode} />}
      {nodeDatum.type === 'injector' && (
        <InjectorSVG width="50" height="50" x="-50" y="-30" onClick={toggleNode} />
      )}
      {nodeDatum.type === 'tank' && <TankSVG width="50" height="50" x="-40" y="-25" onClick={toggleNode} />}
      {!['arm', 'meter', 'injector', 'tank'].includes(nodeDatum.type) && (
        <rect width="20" height="20" x="-10" onClick={toggleNode} />
      )}
      <text fill="black" strokeWidth="1" x="20">
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes?.baseprod && (
        <text fill="black" x="30" dy="16" strokeWidth="1" fontSize={11} fontWeight={10}>
          {nodeDatum.attributes?.baseprod}
        </text>
      )}
      {nodeDatum.attributes?.baseclass && (
        <text fill="black" x="30" dy="32" strokeWidth="1" fontSize={11} fontWeight={10}>
          {nodeDatum.attributes?.baseclass}
        </text>
      )}
    </g>
  );

  useEffect(() => {
    if (selected) {
      api
        .get(BAY_CONFIGURATION.DETAILS, {
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
          // console.log('.........nodes', node);
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
          // pathFunc="elbow"
          // pathFunc="straight"
          translate={{
            x: 20,
            y: 360,
          }}
          separation={{
            siblings: 0.5,
            nonSiblings: 0.5,
          }}
          nodeSize={{
            x: 200,
            y: 140,
          }}
          orientation="horizontal"
          collapsible={true}
          renderCustomNodeElement={renderRectSvgNode}
          // zoomable={true}
          // scaleExtent={{max: 10, min:0.1}}
        />
      </OverviewContainer>
    </Card>
  );
};

export default Overview;
