import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { LoadingOutlined, AuditOutlined } from '@ant-design/icons';
import { Spin, Button, notification } from 'antd';
import api from 'api';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { LOAD_SCHEDULES } from '../../../../api';

const BOL = ({ value, redo, supermode, locateTrip }) => {
  console.log("BOL START")
  const { t } = useTranslation();

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);

    if (value) {
      api
        .get(LOAD_SCHEDULES.VIEW_BOL, {
          params: {
            supplier: value.supplier_code,
            trip_no: value.shls_trip_no,
            supermode: supermode ? "on" : "off"
          },
        })
        .then((res) => {
          setData(res.data)
          if (value?.status === 'A') {
            locateTrip(value);
          }
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
  }, [value, redo]);

  return (
    <Spin spinning={!data} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
      <div style={{ height: '82vh', overflowY: 'scroll' }}>{ReactHtmlParser(data)}</div>
    </Spin>
  );
};

export default BOL;
