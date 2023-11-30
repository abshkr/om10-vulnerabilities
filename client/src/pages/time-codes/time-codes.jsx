import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { mutate } from 'swr';
import { Button, Select, Modal, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  CheckOutlined,
  MinusOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import api from 'api';
import _ from 'lodash';
import { useAuth } from '../../hooks';

import { Page, DataTable } from '../../components';
import { TIME_CODES } from '../../api';
import { generator, degenerate } from './generator';
import columns from './columns';
import auth from '../../auth';
import TimecodeForm from './forms/forms';

const TimeCodes = () => {
  const { t } = useTranslation();
  const access = useAuth('M_TIMECODES');

  const { data: payload, isValidating } = useSWR(TIME_CODES.READ);

  const [code, setCode] = useState('');
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);
  const [visible, setVisible] = useState(false);

  const fields = columns(t);

  const handleFormState = (visibility, title) => {
    setVisible(visibility);
    // setCode(title);
    // setSelected(value);
  };

  const onSelectAll = () => {
    const values = [];

    const payload = [...data];

    _.forEach(selected, (time) => {
      const modified = {};

      Object.keys(time).forEach((key) => {
        if (key !== 'day') {
          modified[key] = true;
        } else {
          modified[key] = time[key];
        }
      });

      values.push(modified);
    });

    _.forEach(values, (value) => {
      const index = _.findIndex(payload, ['day', value.day]);

      payload[index] = value;
    });

    setData(payload);
  };

  const onDeSelectAll = () => {
    const values = [];

    const payload = [...data];

    _.forEach(selected, (time) => {
      const modified = {};

      Object.keys(time).forEach((key) => {
        if (key !== 'day') {
          modified[key] = false;
        } else {
          modified[key] = time[key];
        }
      });

      values.push(modified);
    });

    _.forEach(values, (value) => {
      const index = _.findIndex(payload, ['day', value.day]);

      payload[index] = value;
    });

    setData(payload);
  };

  const onCellEdit = (record) => {
    const payload = [...data];

    const newValue = !record.value;
    const column = record.colDef.field;

    let newObject = {
      ...record.data,
    };

    newObject[column] = newValue;
    payload[record.rowIndex] = newObject;

    setData(payload);
  };

  useEffect(() => {
    if (payload?.records.length > 0) {
      if (code === '') {
        setCode(payload?.records[0].tcd_title);
      }
    }
  }, [payload]);

  useEffect(() => {
    const values = generator(code, payload?.records, t);

    setData(values);
  }, [code, payload, t]);

  const onComplete = (tcd_title) => {
    mutate(TIME_CODES.READ);
    if (tcd_title) {
      setCode(tcd_title);
    } else {
      setCode(payload?.records[0].tcd_title);
    }
  };

  const onUpdate = async () => {
    let postdata = degenerate(code, data, t);
    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TIME_CODES.UPDATE, postdata)
          .then(() => {
            onComplete(postdata.tcd_title);

            notification.success({
              message: t('messages.updateSuccess'),
              description: t('messages.updateSuccess'),
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
      },
    });
  };

  const onDelete = () => {
    if (code === 'AL') {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('descriptions.timecodeAL'),
      });
      return;
    }

    const value = {
      tcd_title: code,
    };
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TIME_CODES.DELETE, value)
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`,
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
      },
    });
  };

  const modifiers = (
    <>
      <Button
        type="danger"
        icon={<DeleteOutlined />}
        style={{ marginLeft: 10 }}
        // disabled={!access?.canCreate}
        onClick={onDelete}
      >
        {t('operations.delete')}
      </Button>

      <Button type="primary" icon={<EditOutlined />} onClick={onUpdate} disabled={!access?.canUpdate}>
        {t('operations.update')}
      </Button>

      <Button
        icon={<PlusOutlined />}
        style={{ marginLeft: 10 }}
        // disabled={!access?.canCreate}
        onClick={() => setVisible(true)}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  const extra = (
    <>
      <Select popupMatchSelectWidth={false} allowClear style={{ width: 200 }} value={code} onChange={setCode}>
        {payload?.records.map((item) => {
          return (
            <Select.Option key={item.tcd_title} value={item.tcd_title}>
              {item.tcd_title}
            </Select.Option>
          );
        })}
      </Select>

      <Button
        type="dashed"
        icon={<CheckOutlined />}
        style={{ marginLeft: 10 }}
        disabled={selected.length === 0}
        onClick={onSelectAll}
      >
        {t('operations.selectAllTimes')}
      </Button>

      <Button
        type="dashed"
        icon={<MinusOutlined />}
        style={{ marginLeft: 10 }}
        disabled={selected.length === 0}
        onClick={onDeSelectAll}
      >
        {t('operations.deselectAllTimes')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.security')}
      name={t('pageNames.timeCodes')}
      modifiers={modifiers}
      avatar="timeCodes"
      access={access}
    >
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        handleSelect={setSelected}
        onCellClick={onCellEdit}
        extra={extra}
      />
      <TimecodeForm value={selected} visible={visible} handleFormState={handleFormState} setCode={setCode} />
    </Page>
  );
};

export default auth(TimeCodes);
