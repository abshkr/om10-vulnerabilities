import React, { useState, useEffect } from 'react';

import { Form, Select, Input, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import _ from 'lodash';

import { COMPANIES } from '../../../api';

const PrinterForm = ({ value, form }) => {
  const { data: docPrinters, isValidating } = useSWR(
    `${COMPANIES.DOC_PRINTERS}?cmpy_code=${value?.cmpy_code}`
  );
  const { data: reportPrinters } = useSWR(`${COMPANIES.REPORT_PRINTERS}?cmpy_code=${value?.cmpy_code}`);
  const { data: dliPrinters } = useSWR(`${COMPANIES.DLI_PRINTERS}?cmpy_code=${value?.cmpy_code}`);

  const { t } = useTranslation();
  const { TextArea } = Input;
  const { resetFields, setFieldsValue, getFieldDecorator } = form;
  // const [ pitem_bltol_flag, setFlag ] = useState(value?.pitem_bltol_flag)

  const [cmpy_bol_vp_name, setReconc] = useState(value?.cmpy_bol_vp_name);
  const [cmpy_ld_rep_vp, setLDprinter] = useState(value?.cmpy_ld_rep_vp);
  const [cmpy_drv_inst_vp, setDLIPrinter] = useState(value?.cmpy_drv_inst_vp);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cmpy_bol_vp_name: value.cmpy_bol_vp_name,
        cmpy_ld_rep_vp: value.cmpy_ld_rep_vp,
        cmpy_drv_inst_vp: value.cmpy_drv_inst_vp,
      });

      setReconc(value.cmpy_bol_vp_name);
      setLDprinter(value.cmpy_ld_rep_vp);
      setDLIPrinter(value.cmpy_drv_inst_vp);
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    // if (input === '' || !input) {
    //   return Promise.reject(`${t('fields.loadToleranceCheck')}`);
    // }

    return Promise.resolve();
  };

  const swithLayout = {
    labelCol: { span: 10 },
    // wrapperCol: { span: 16 },
  };

  return (
    <div>
      <Divider></Divider>
      <Form.Item name="cmpy_bol_vp_name" label={t('fields.defaultDocPrinter')} {...swithLayout}>
        <Select
          dropdownMatchSelectWidth={false}
          loading={isValidating}
          style={{ width: '25vw' }}
          // onChange={handleChange}
        >
          {docPrinters?.records.map((item, index) => (
            <Select.Option key={index} value={item.prntr}>
              {item.prntr_desc}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="cmpy_ld_rep_vp" label={t('fields.defaultLDPrinter')} {...swithLayout}>
        <Select
          dropdownMatchSelectWidth={false}
          loading={isValidating}
          style={{ width: '25vw' }}
          // onChange={handleChange}
        >
          {reportPrinters?.records.map((item, index) => (
            <Select.Option key={index} value={item.prntr}>
              {item.prntr_desc}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="cmpy_drv_inst_vp" label={t('fields.defaultDLIPrinter')} {...swithLayout}>
        <Select
          dropdownMatchSelectWidth={false}
          loading={isValidating}
          style={{ width: '25vw' }}
          // onChange={handleChange}
        >
          {dliPrinters?.records.map((item, index) => (
            <Select.Option key={index} value={item.prntr}>
              {item.prntr_desc}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default PrinterForm;
