import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { LoadingOutlined, AuditOutlined } from '@ant-design/icons';
import { Spin, Button, notification } from 'antd';
import api from 'api';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { LOAD_SCHEDULES } from '../../../../api';
import { jsPDF } from "jspdf";

const BOL = ({ value, redo, supermode, dcsmode, locateTrip, setCurStatus, exportPDF }) => {
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
            supermode: supermode ? "on" : "off",
            dcsmode: dcsmode ? "on" : "off",
          },
        })
        .then((res) => {
          setData(res.data)
          if (value?.status === 'A') {
            setCurStatus('E');
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

  useEffect(() => {
    if (exportPDF > 0 && !!data) {
      const doc = new jsPDF('p', 'pt', 'a4');

      const start = data.search('<pre style="font-size:16px;">') + '<pre style="font-size:16px;">'.length;
      const end = data.search('</pre>');

      // console.log(data.substring(start , end))
      doc.setFont('courier');   //courier font gives all character same width in PDF
      doc.setFontSize(11);
      
      doc.text(data.substring(start , end), 20, 15);
      
      doc.save("BOL_" + value.shls_trip_no + ".pdf");
    }
  }, [exportPDF]);

  return (
    <Spin spinning={!data} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
      <div style={{ height: '82vh', overflowY: 'scroll' }}>{ReactHtmlParser(data)}</div>
    </Spin>
  );
};

export default BOL;
