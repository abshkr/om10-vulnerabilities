import React from 'react';
import { SyncOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

const ATGRenderer = (props) => {
  const { t } = useTranslation();

  const { value } = props;

  switch (value) {
    case 0:
      return (
        <Tooltip title={t('descriptions.notInService')}>
          <div className="cell-icon">
            <SyncOutlined />
          </div>
        </Tooltip>
      );
    case 1:
      return (
        <Tooltip title={t('descriptions.working')}>
          <div className="cell-icon">
            <SyncOutlined spin style={{ color: 'green' }} />
          </div>
        </Tooltip>
      );
    case 2:
      return (
        <Tooltip title={t('descriptions.notUpdatedOnTime')}>
          <div className="cell-icon">
            <SyncOutlined spin style={{ color: 'orange' }} />
          </div>
        </Tooltip>
      );

    default:
      return (
        <Tooltip title={t('descriptions.atgConnectionUnknown')}>
          <div className="cell-icon">
            <QuestionCircleOutlined />
          </div>
        </Tooltip>
      );
  }
};

export default ATGRenderer;
