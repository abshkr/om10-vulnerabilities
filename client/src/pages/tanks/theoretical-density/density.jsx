import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'antd';
import { CloseOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { InputNumber as OmegaInputNumber } from '../../../components';

const TheoreticalDensity = ({ value, onClose }) => {
  const [densityReady, setDensityReady] = useState(false);

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setFieldsValue, getFieldsValue } = form;

  const calcTheoreticalDensity = () => {
    setDensityReady(false);
    setFieldsValue({ obs_vol_source: undefined, std_dens_final: undefined });

    const values = getFieldsValue(['obs_vol_init', 'obs_vol_final', 'std_dens_init', 'std_dens_source']);

    const iGovReady =
      values?.obs_vol_init === '' ||
      values?.obs_vol_init === undefined ||
      _.isNaN(_.toNumber(values?.obs_vol_init))
        ? false
        : true;
    const fGovReady =
      values?.obs_vol_final === '' ||
      values?.obs_vol_final === undefined ||
      _.isNaN(_.toNumber(values?.obs_vol_final))
        ? false
        : true;
    const iDensReady =
      values?.std_dens_init === '' ||
      values?.std_dens_init === undefined ||
      _.isNaN(_.toNumber(values?.std_dens_init))
        ? false
        : true;
    const sDensReady =
      values?.std_dens_source === '' ||
      values?.std_dens_source === undefined ||
      _.isNaN(_.toNumber(values?.std_dens_source))
        ? false
        : true;

    const iGov = values?.obs_vol_init;
    const fGov = values?.obs_vol_final;
    const iDens = values?.std_dens_init;
    const sDens = values?.std_dens_source;

    if (iGovReady && fGovReady) {
      const sGov = fGov - iGov;
      setFieldsValue({ obs_vol_source: _.round(sGov, 0) });
    }

    if (iGovReady && fGovReady && sDensReady && iDensReady && fGov > 0) {
      const sGov = fGov - iGov;
      setFieldsValue({ obs_vol_source: _.round(sGov, 0) });
      const fDens = (sGov * sDens + iGov * iDens) / fGov;
      setFieldsValue({ std_dens_final: _.round(fDens, 3) });
      setDensityReady(true);
    }
  };

  const onFinish = () => {
    const values = getFieldsValue([
      'obs_vol_source',
      'obs_vol_init',
      'obs_vol_final',
      'std_dens_source',
      'std_dens_init',
      'std_dens_final',
    ]);
    Modal.destroyAll();
    onClose(values);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{ marginTop: '1rem' }}>
      <OmegaInputNumber
        form={form}
        value={value?.obs_vol_source}
        name="obs_vol_source"
        label={`${t('fields.observedVolumeSource')} (${t('units.litres')})`}
        min={0}
        max={999999999}
        style={{ width: '100%' }}
        precision={3}
        disabled={true}
        onChange={calcTheoreticalDensity}
      />

      <OmegaInputNumber
        form={form}
        value={value?.obs_vol_init}
        name="obs_vol_init"
        label={`${t('fields.observedVolumeReceiptInit')} (${t('units.litres')})`}
        min={0}
        max={999999999}
        style={{ width: '100%' }}
        precision={3}
        // required={true}
        onChange={calcTheoreticalDensity}
      />

      <OmegaInputNumber
        form={form}
        value={value?.obs_vol_final}
        name="obs_vol_final"
        label={`${t('fields.observedVolumeReceiptFinal')} (${t('units.litres')})`}
        min={1}
        max={999999999}
        style={{ width: '100%' }}
        precision={3}
        // required={true}
        onChange={calcTheoreticalDensity}
      />

      <OmegaInputNumber
        form={form}
        value={value?.std_dens_source}
        name="std_dens_source"
        label={`${t('fields.standardDensitySource')} (${t('units.litres')})`}
        min={0}
        max={999999999}
        style={{ width: '100%' }}
        precision={3}
        // required={true}
        onChange={calcTheoreticalDensity}
      />

      <OmegaInputNumber
        form={form}
        value={value?.std_dens_init}
        name="std_dens_init"
        label={`${t('fields.standardDensityReceiptInit')} (${t('units.litres')})`}
        min={0}
        max={999999999}
        style={{ width: '100%' }}
        precision={3}
        // required={true}
        onChange={calcTheoreticalDensity}
      />

      <OmegaInputNumber
        form={form}
        value={value?.std_dens_final}
        name="std_dens_final"
        label={`${t('fields.standardDensityReceiptFinal')} (${t('units.litres')})`}
        min={0}
        max={999999999}
        style={{ width: '100%' }}
        precision={3}
        disabled={true}
        // onChange={handleAmbVolFinalFieldChange}
      />

      <div style={{ marginTop: '2rem' }}>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => Modal.destroyAll()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          icon={<SyncOutlined />}
          style={{ float: 'right', marginRight: 5 }}
          disabled={!densityReady}
        >
          {t('operations.ok')}
        </Button>
      </div>
    </Form>
  );
};

export default TheoreticalDensity;
