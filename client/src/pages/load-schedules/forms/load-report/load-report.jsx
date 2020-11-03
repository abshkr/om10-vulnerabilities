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
      let count = (data.match(/Transaction/g) || []).length;
      count = (count === 0? 1: count);
      const doc = new jsPDF('p', 'mm');
      // const doc = new jsPDF('p', 'mm', [297 * (count === 0? 1: count), 210]);
      doc.setFont('courier');   //courier font gives all character same width in PDF
      doc.setFontSize(11);
      
      let to_process = data;
      for (let i = 0; i < count; i++ ) {
        let start = 0, end = 0;
        const trsa_pos = to_process.search('Transaction') + 'Transaction'.length;
        if (i === 0) {
          start = to_process.search('<pre style="font-size:15px;">') + '<pre style="font-size:15px;">'.length;
        } 
        
        if (i === count) {
          end = to_process.search('</pre>');
        } else {
          if (i !== 0) {
            start = trsa_pos - 112;   //From Transaction to the section beginning
          }
          end = trsa_pos + 1090;      //From Transaction to the section end
        }
        
        doc.text(to_process.substring(start , end), 10, 5);  //left, top

        if (i < count - 1) {
          doc.addPage();
        }
        
        to_process = to_process.substring(trsa_pos);
      }
      
      
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
