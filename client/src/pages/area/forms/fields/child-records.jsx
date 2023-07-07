import React, { useState, useEffect } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { Popover, Descriptions } from 'antd';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import _ from 'lodash';

import { AREA } from '../../../../api';

const ChildRecords = ({ value, setFlag }) => {
  const { t } = useTranslation();

  const [tankCount, setTankCount] = useState(0);
  const [deviceCount, setDeviceCount] = useState(0);
  const [gateCount, setGateCount] = useState(0);
  const [printerCount, setPrinterCount] = useState(0);
  const [trailerCount, setTrailerCount] = useState(0);
  const [personCount, setPersonCount] = useState(0);
  const [movementCount, setMovementCount] = useState(0);

  const { data: tanks } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_TANKS}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: devices } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_DEVICES}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: gates } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_GATES}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: printers } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_PRINTERS}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: trailers } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_TRAILERS}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: persons } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_PERSONS}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );
  const { data: movements } = useSWR(
    value?.area_k !== undefined ? `${AREA.CHECK_AREA_MOVEMENTS}?area_id=${value?.area_k}` : null,
    {
      refreshInterval: 0,
    }
  );

  useEffect(() => {
    if (tanks) {
      setTankCount(_.toNumber(tanks?.records?.[0]?.cnt));
    }
  }, [tanks]);

  useEffect(() => {
    if (devices) {
      setDeviceCount(_.toNumber(devices?.records?.[0]?.cnt));
    }
  }, [devices]);

  useEffect(() => {
    if (gates) {
      setGateCount(_.toNumber(gates?.records?.[0]?.cnt));
    }
  }, [gates]);

  useEffect(() => {
    if (printers) {
      setPrinterCount(_.toNumber(printers?.records?.[0]?.cnt));
    }
  }, [printers]);

  useEffect(() => {
    if (trailers) {
      setTrailerCount(_.toNumber(trailers?.records?.[0]?.cnt));
    }
  }, [trailers]);

  useEffect(() => {
    if (persons) {
      setPersonCount(_.toNumber(persons?.records?.[0]?.cnt));
    }
  }, [persons]);

  useEffect(() => {
    if (movements) {
      setMovementCount(_.toNumber(movements?.records?.[0]?.cnt));
    }
  }, [movements]);

  useEffect(() => {
    if (
      tankCount === 0 &&
      deviceCount === 0 &&
      gateCount === 0 &&
      printerCount === 0 &&
      trailerCount === 0 &&
      personCount === 0 &&
      movementCount === 0
    ) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [tankCount, deviceCount, gateCount, printerCount, trailerCount, personCount, movementCount]);

  return (
    <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
      <Descriptions.Item key={1} label={t('fields.countAreaTanks')} span={1}>
        {tankCount}
      </Descriptions.Item>
      <Descriptions.Item key={1} label={t('fields.countAreaDevices')} span={1}>
        {deviceCount}
      </Descriptions.Item>
      <Descriptions.Item key={1} label={t('fields.countAreaGates')} span={1}>
        {gateCount}
      </Descriptions.Item>
      <Descriptions.Item key={1} label={t('fields.countAreaPrinters')} span={1}>
        {printerCount}
      </Descriptions.Item>
      <Descriptions.Item key={1} label={t('fields.countAreaTrailers')} span={1}>
        {trailerCount}
      </Descriptions.Item>
      <Descriptions.Item key={1} label={t('fields.countAreaPersons')} span={1}>
        {personCount}
      </Descriptions.Item>
      <Descriptions.Item key={1} label={t('fields.countAreaMovements')} span={1}>
        {movementCount}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ChildRecords;
