import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select, Button, Row, Col, notification, Tag } from 'antd';
import { SecurityScanOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { AdhocKey } from '../../../../components';
import api, { LOAD_SCHEDULES, ID_ASSIGNMENT } from '../../../../api';

const Tanker = ({ form, value, carrier, onChange, activeTrips }) => {
  const { t } = useTranslation();

  const { setFieldsValue, getFieldValue } = form;

  const { data: options, isValidating } = useSWR(
    `${LOAD_SCHEDULES.TANKERS_BY_CARRIER}?tnkr_carrier=${carrier}`
  );

  const { data: adhocKeys } = useSWR(ID_ASSIGNMENT.ADHOC_KEYS);

  /*
    1	F	NEW SCHEDULE
    2	S	SPECED
    3	A	ACTIVE
    4	L	LOADING
    5	E	ENDED
    6	D	DELIVERED OK
  */
  const IS_DISABLED = !value ? false : value?.status !== 'F' || value?.shls_ld_type === '2';
  // const IS_DISABLED = !value ? false : (value?.shls_status !== 'NEW SCHEDULE' || value?.shls_ld_type === '2');

  const handleTagLookUp = () => {
    AdhocKey({
      assignAdhocKey: assignAdhocKeyToTanker,
      t: t,
      options: adhocKeys?.records,
    });
  };

  const assignAdhocKeyToTanker = (txt) => {
    const tnkr = getFieldValue('tnkr_code');
    if (txt) {
      api
        .post(ID_ASSIGNMENT.UPDATE_ADHOC_KEY, { kya_txt: txt, kya_tanker: tnkr })
        .then(() => {
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
    }
  };

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.tanker')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_code: value.tnkr_code,
      });

      onChange(value.tnkr_code);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={!value ? 24 : 19}>
        <Form.Item
          name="tnkr_code"
          label={
            activeTrips > 0 ? (
              <>
                {t('fields.tanker')} &nbsp;&nbsp;&nbsp;
                <Tag color={'red'}>{t('fields.countTankerActiveTrips') + ': ' + activeTrips}</Tag>
              </>
            ) : (
              t('fields.tanker')
            )
          }
          // extra={activeTrips>0 && value ? '['+t('fields.countTankerActiveTrips')+': '+activeTrips+']' : ''}
          rules={[{ required: true, validator: validate }]}
        >
          <Select
            dropdownMatchSelectWidth={false}
            loading={isValidating}
            showSearch
            onChange={onChange}
            disabled={IS_DISABLED || !carrier}
            optionFilterProp="children"
            placeholder={!value ? t('placeholder.selectTanker') : null}
            filterOption={(value, option) =>
              option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
            }
          >
            {options?.records.map((item, index) => (
              <Select.Option key={index} value={item.tnkr_code}>
                {`${item.tnkr_code}${item.tnkr_name && ' - ' + item.tnkr_name}`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      {value && (
        <Col span={5} style={{ paddingTop: '35px' }}>
          <Button icon={<SecurityScanOutlined />} onClick={() => handleTagLookUp()}>
            {t('operations.tagLookUp')}
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default Tanker;
