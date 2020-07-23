import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import api, { LOAD_SCHEDULES } from '../../../../api';

const DriverInstructions = ({ value, redoDLI }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);

    if (value) {
      api
        .get(LOAD_SCHEDULES.VIEW_DLI, {
          params: {
            supplier: value.supplier_code,
            trip_no: value.shls_trip_no,
          },
        })
        .then((res) => setData(res.data));
    }
  }, [value, redoDLI]);

  return (
    <Spin spinning={!data} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
      <div style={{ height: '82vh', overflowY: 'scroll' }}>{ReactHtmlParser(data)}</div>
    </Spin>
  );
};

export default DriverInstructions;
