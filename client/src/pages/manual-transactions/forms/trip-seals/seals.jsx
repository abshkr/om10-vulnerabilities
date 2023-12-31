import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Row, Col, notification, Modal } from 'antd';
import { CloseOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import api, { LOAD_SCHEDULES } from '../../../../api';
import columns from './columns';

const { Search } = Input;

const TripSeals = ({ value, onClose }) => {
  const url =
    value && value?.shls_trip_no && value.supplier_code
      ? `${LOAD_SCHEDULES.SEALS}?supplier=${value.supplier_code}&trip_no=${value?.shls_trip_no}`
      : null;

  const { t } = useTranslation();

  const { data: payload, mutate: refreshSeals } = useSWR(url);
  const { data: nextSeal, mutate: refreshNextSeal } = useSWR(LOAD_SCHEDULES.NEXT_SEAL);

  const [next, setNext] = useState(null);
  const [selected, setSelected] = useState(null);

  const fields = columns(t);
  const [form] = Form.useForm();

  const onFinish = () => {
    Modal.destroyAll();
    onClose();
  };

  const onSealUpdate = (value) => {
    api
      .post(LOAD_SCHEDULES.SET_NEXT_SEAL, {
        next_seal: value,
      })
      .then(() => {
        refreshNextSeal();

        notification.success({
          message: t('messages.updateSuccess'),
        });
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  };

  const onAllocation = (val) => {
    if (payload?.records?.length === 0) {
      if (val <= 0) {
        notification.error({
          message: t('messages.validationFailed'),
          description: t('descriptions.sealNumberRequired'),
        });
        return;
      }

      api
        .post(LOAD_SCHEDULES.ALLOCATE_ALL, {
          supplier: value.supplier_code,
          trip_no: value.shls_trip_no,
          seal_num: val,
        })
        .then(() => {
          refreshSeals();

          notification.success({
            message: t('messages.updateSuccess'),
          });
        })
        .catch((errors) => {
          _.forEach(errors.response.data.errors, (error) => {
            notification.error({
              message: error.type,
              description: error.message,
            });
          });
        });
    } else {
      api
        .post(LOAD_SCHEDULES.ALLOCATE_ONE, {
          supplier: value.supplier_code,
          trip_no: value.shls_trip_no,
          cmpt_nr: 1,
        })
        .then(() => {
          refreshSeals();
          refreshNextSeal();

          notification.success({
            message: t('messages.updateSuccess'),
          });
        })
        .catch((errors) => {
          _.forEach(errors.response.data.errors, (error) => {
            notification.error({
              message: error.type,
              description: error.message,
            });
          });
        });
    }
  };

  const onReallocateSelected = () => {
    api
      .post(LOAD_SCHEDULES.REALLOCATE, {
        supplier: value.supplier_code,
        trip_no: value.shls_trip_no,
        seal_nr: selected?.seal_nr,
        cmpt_nr: 1,
      })
      .then(() => {
        refreshSeals();
        refreshNextSeal();

        notification.success({
          message: t('messages.updateSuccess'),
        });
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  };

  const onDellocateSelected = () => {
    api
      .post(LOAD_SCHEDULES.DELETE_SEAL, {
        seal_nr: selected?.seal_nr,
      })
      .then(() => {
        refreshSeals();
        refreshNextSeal();

        notification.success({
          message: t('messages.updateSuccess'),
        });
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  };

  const onDellocateAll = () => {
    api
      .post(LOAD_SCHEDULES.DEALLOCATE, {
        supplier: value.supplier_code,
        trip_no: value.shls_trip_no,
      })
      .then(() => {
        refreshSeals();
        refreshNextSeal();

        notification.success({
          message: t('messages.updateSuccess'),
        });
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  };

  const onCellUpdate = (val) => {
    const endpoint =
      val?.colDef?.field === 'seal_prefix' ? LOAD_SCHEDULES.SET_PREFIX : LOAD_SCHEDULES.SET_SUFFIX;

    // const prefix = val?.colDef?.field === 'seal_prefix' ? val?.data?.seal_prefix : val?.data?.seal_suffix;

    const params = {};
    params.seal_nr = val?.data?.seal_nr;
    if (val?.colDef?.field === 'seal_prefix') {
      params.prefix = val?.data?.seal_prefix;
    } else {
      params.suffix = val?.data?.seal_suffix;
    }

    api
      .post(endpoint, params)
      .then(() => {
        refreshSeals();
        refreshNextSeal();

        notification.success({
          message: t('messages.updateSuccess'),
        });
      })

      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  };

  useEffect(() => {
    const payload = nextSeal?.records[0]?.site_next_seal;

    if (payload) {
      setNext(payload);
    }
  }, [nextSeal]);

  const extra = (
    <>
      <Button style={{ marginRight: 10 }} type="primary" disabled={!selected} onClick={onReallocateSelected}>
        {t('operations.reallocateSelected')}
      </Button>

      <Button style={{ marginRight: 10 }} type="primary" disabled={!selected} onClick={onDellocateSelected}>
        {t('operations.deallocateSelected')}
      </Button>

      <Button style={{ marginRight: 5 }} type="primary" onClick={onDellocateAll}>
        {t('operations.deallocateAll')}
      </Button>
    </>
  );

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{ marginTop: '1rem' }}>
      <Row gutter={[8, 10]}>
        <Col span={12}>{t('fields.supplier') + ' : ' + value?.supplier_code}</Col>

        <Col span={12}>{t('fields.tripNumber') + ' : ' + value?.shls_trip_no}</Col>
      </Row>

      <Row gutter={[8, 10]}>
        <Col span={12}>
          <Search
            placeholder={next}
            enterButton={t('operations.update')}
            onSearch={(value) => onSealUpdate(value)}
            disabled={!next}
          />
        </Col>

        <Col span={12}>
          <Search
            placeholder={payload?.records?.length}
            enterButton={payload?.records?.length === 0 ? t('operations.allocation') : t('operations.addOne')}
            onSearch={(value) => onAllocation(value)}
            readOnly={!payload || payload?.records?.length > 0}
          />
        </Col>
      </Row>

      <DataTable
        data={payload?.records}
        columns={fields}
        extra={extra}
        handleSelect={(value) => setSelected(value[0])}
        onCellUpdate={(value) => onCellUpdate(value)}
        height={'60vh'}
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
        >
          {t('operations.ok')}
        </Button>
      </div>
    </Form>
  );
};

export default TripSeals;
