import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { jsPDF } from "jspdf";
import api, { LOAD_SCHEDULES } from '../../../../api';

const DriverInstructions = ({ value, redoDLI, exportPDF }) => {
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

  useEffect(() => {
    if (exportPDF > 0 && !!data) {
      const doc = new jsPDF('p', 'pt', 'a4');

      const start = data.search('<pre style="font-size:16px;">') + '<pre style="font-size:16px;">'.length;
      const end = data.search('</pre>');

      // console.log(data.substring(start , end))
      doc.setFont('courier');   //courier font gives all character same width in PDF
      doc.setFontSize(11);
      
      doc.text(data.substring(start , end), 20, 15);
      
      doc.save("DLI_" + value.shls_trip_no + ".pdf");
    }
  }, [exportPDF]);

  return (
    <Spin spinning={!data} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
      <div style={{ height: '82vh', overflowY: 'scroll' }}>{ReactHtmlParser(data)}</div>
    </Spin>
  );
};

export default DriverInstructions;
