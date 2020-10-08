import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { jsPDF } from "jspdf";
import api, { LOAD_SCHEDULES } from '../../../../api';

const LoadReport = ({ value, exportPDF }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);

    if (value) {
      api
        .get(LOAD_SCHEDULES.VIEW_LOAD_REPORT, {
          params: {
            supplier: value.supplier_code,
            trip_no: value.shls_trip_no,
          },
        })
        .then((res) => setData(res.data));
    }
  }, [value]);

  useEffect(() => {
    if (exportPDF > 0 && !!data) {
      const count = (data.match(/Transaction/g) || []).length;
      const doc = new jsPDF('p', 'mm', [297 * (count === 0? 1: count), 210]);

      const start = data.search('<pre style="font-size:15px;">') + '<pre style="font-size:15px;">'.length;
      const end = data.search('</pre>');

      // console.log(data.substring(start , end))
      doc.setFont('courier');   //courier font gives all character same width in PDF
      doc.setFontSize(12);
      
      doc.text(data.substring(start , end), 5, 15);
      
      doc.save("LoadReport_" + value.shls_trip_no + ".pdf");
    }
  }, [exportPDF]);

  return (
    <Spin spinning={!data} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
      <div style={{ height: '82vh', overflowY: 'scroll' }}>{ReactHtmlParser(data)}</div>
    </Spin>
  );
};

export default LoadReport;
