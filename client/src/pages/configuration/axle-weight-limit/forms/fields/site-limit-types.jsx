import React, { useEffect, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import useSWR, { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Tooltip, Select, Modal, notification } from 'antd';

import api, { AXLE_WEIGHTS } from 'api';

const SiteAxleLimitTypes = () => {
  const [limit, setLimit] = useState('GML');
  const configKey = 'AXLE_WEIGHT_LIMIT_TYPE';
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(AXLE_WEIGHTS.AVAIL_LIMIT_TYPES);
  const { data: siteConfig } = useSWR(`${AXLE_WEIGHTS.GET_SITE_AXLE_LIMIT_TYPE}?config_key=${configKey}`);

  const onUpdate = (value) => {
    const values = [
      {
        config_key: 'AXLE_WEIGHT_LIMIT_TYPE',
        config_value: value,
      },
    ];

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(AXLE_WEIGHTS.SET_SITE_AXLE_LIMIT_TYPE, values)
          .then((response) => {
            Modal.destroyAll();
            setLimit(value);

            // mutate(`${AXLE_WEIGHTS.GET_SITE_AXLE_LIMIT_TYPE}?config_key=${configKey}`);

            notification.success({
              message: t('messages.updateSuccess'),
            });
          })

          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.updateFailed'),
            });
          });
      },
    });
  };

  const onChange = (value) => {
    onUpdate(value);
  };

  useEffect(() => {
    if (siteConfig) {
      setLimit(siteConfig?.records?.[0]?.config_value);
    }
  }, [siteConfig]);

  return (
    <Tooltip placement="topRight" title={t('descriptions.siteAxleLimitType')}>
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        disabled={false}
        value={limit}
        onChange={onChange}
        showSearch
        placeholder={t('placeholder.selectAxleLimitType')}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.axle_limit_type_code} disabled={false}>
            {item.axle_limit_type_name}
          </Select.Option>
        ))}
      </Select>
    </Tooltip>
  );
};

export default SiteAxleLimitTypes;
