import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Row, Col, notification, Modal, Upload } from 'antd';
import { CloseOutlined, QuestionCircleOutlined, SyncOutlined, UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { DataTable } from '../../../../../components';
import api, { WRI } from '../../../../../api';
import columns from './columns';
import { csvToJSON } from '../../../../../utils';

const WriImport = ({ value, onClose }) => {
  const { t } = useTranslation();

  const [wriList, setWriList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [canPreview, setCanPreview] = useState(false);
  const [canUpload, setCanUpload] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const props = {
    accept: '.csv',
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setCanPreview(newFileList.length > 0 ? true : false);
      setCanUpload(newFileList.length > 0 ? canUpload : false);
      setWriList([]);
      console.log(newFileList);
    },
    beforeUpload: (file) => {
      // Limited to one file in the list always
      const newFileList = []; // fileList.slice();
      newFileList.push(file);
      setFileList(newFileList);
      setCanPreview(newFileList.length > 0 ? true : false);
      setCanUpload(newFileList.length > 0 ? canUpload : false);
      console.log(newFileList);

      return false;
    },
    fileList,
  };

  const fields = columns(t);
  const [form] = Form.useForm();

  const onFinish = () => {
    Modal.destroyAll();
    onClose({ total: wriList.length });
  };

  const onDeleteLine = () => {
    const index = wriList.indexOf(selected);
    const newList = wriList.slice();
    newList.splice(index, 1);
    setWriList(newList);

    //tableAPI.updateRowData({ remove: selected });
  };

  const onAddLine = () => {
    const wri = {};
    // ['wri_number', 'id_status', 'producer_name', 'pickup_location', 'waste_classification', 'vehicle_registration']

    if (wriList.length > 0) {
      const line = wriList[wriList.length - 1];
      wri.wri_number = line.wri_number;
      wri.id_status = line.id_status;
      wri.producer_name = line.producer_name;
      wri.pickup_location = line.pickup_location;
      wri.waste_classification = line.waste_classification;
      wri.vehicle_registration = line.vehicle_registration;
    } else {
      wri.wri_number = '0';
      wri.id_status = '0';
      wri.producer_name = '';
      wri.pickup_location = '';
      wri.waste_classification = '';
      wri.vehicle_registration = '';
    }
    const newList = wriList.slice();
    newList.push(wri);
    setWriList(newList);

    //tableAPI.updateRowData({ add: [wri] });
  };

  const onDeleteAll = () => {
    setWriList([]);
  };

  const onCellUpdate = (val) => {
    const invalid = verifyWri(val?.data, val?.rowIndex);

    if (invalid) {
      setCanUpload(false);
    } else {
      const newList = wriList.slice();
      newList[val?.rowIndex] = val?.data;
      setWriList(newList);
      // loop all lines to see if enabling Upload button
      onVerifyData(newList, false);
    }
  };

  const onPreviewData = () => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = reader.result;
      console.log('file contents', text);
      const json = csvToJSON(
        text,
        [0, 1, 2, 3, 4, 5],
        [
          'wri_number',
          'id_status',
          'producer_name',
          'pickup_location',
          'waste_classification',
          'vehicle_registration',
        ]
      );
      setWriList(json);
      onVerifyData(json);
    };

    reader.readAsText(fileList?.[0]);
  };

  const verifyWri = (wri, line, showWarning = true) => {
    let invalid = false;

    /*
      WRI_NUMBER           NOT NULL VARCHAR2(20)  
      ID_STATUS                     NUMBER(4)     
      PRODUCER_NAME                 VARCHAR2(60)  
      PICKUP_LOCATION               VARCHAR2(100) 
      WASTE_CLASSIFICATION          VARCHAR2(20)  
      VEHICLE_REGISTRATION          VARCHAR2(10)  
    */
    let maxLen = 20;
    let len = new TextEncoder().encode(wri.wri_number).length;
    if (len > maxLen) {
      invalid = true;
      if (showWarning) {
        notification.error({
          message: t('descriptions.maxCharacters'),
          description: `${t('fields.wriNumber')} - ${t('descriptions.inLine')}${line + 1}, ${t(
            'placeholder.maxCharacters'
          )}: ${maxLen} ─ ${t('descriptions.maxCharacters')}`,
        });
      }
    }

    maxLen = 60;
    len = new TextEncoder().encode(wri.producer_name).length;
    if (len > maxLen) {
      invalid = true;
      if (showWarning) {
        notification.error({
          message: t('descriptions.maxCharacters'),
          description: `${t('fields.wriProducerName')} - ${t('descriptions.inLine')}${line + 1}, ${t(
            'placeholder.maxCharacters'
          )}: ${maxLen} ─ ${t('descriptions.maxCharacters')}`,
        });
      }
    }

    maxLen = 100;
    len = new TextEncoder().encode(wri.pickup_location).length;
    if (len > maxLen) {
      invalid = true;
      if (showWarning) {
        notification.error({
          message: t('descriptions.maxCharacters'),
          description: `${t('fields.wriPickupLocation')} - ${t('descriptions.inLine')}${line + 1}, ${t(
            'placeholder.maxCharacters'
          )}: ${maxLen} ─ ${t('descriptions.maxCharacters')}`,
        });
      }
    }

    maxLen = 20;
    len = new TextEncoder().encode(wri.waste_classification).length;
    if (len > maxLen) {
      invalid = true;
      if (showWarning) {
        notification.error({
          message: t('descriptions.maxCharacters'),
          description: `${t('fields.wriWasteClassification')} - ${t('descriptions.inLine')}${line + 1}, ${t(
            'placeholder.maxCharacters'
          )}: ${maxLen} ─ ${t('descriptions.maxCharacters')}`,
        });
      }
    }

    maxLen = 10;
    len = new TextEncoder().encode(wri.vehicle_registration).length;
    if (len > maxLen) {
      invalid = true;
      if (showWarning) {
        notification.error({
          message: t('descriptions.maxCharacters'),
          description: `${t('fields.wriVehicleRegistration')} - ${t('descriptions.inLine')}${line + 1}, ${t(
            'placeholder.maxCharacters'
          )}: ${maxLen} ─ ${t('descriptions.maxCharacters')}`,
        });
      }
    }

    /*
      insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('WRI_ID_STAT', 0, 'A', 3370);   -- A: 
      insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('WRI_ID_STAT', 1, 'T', 3371);   -- T: 
      insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('WRI_ID_STAT', 2, 'O', 3372);   -- O: 
      insert into ENUMITEM (ENUMTYPENAME,ENUM_NO,ENUM_CODE,ENUM_TMM)values('WRI_ID_STAT', 3, 'R', 3373);   -- R: 
    */
    const stats = ['0', '1', '2', '3', 'Assigned', 'In-Transit', 'Open', 'Rejected'];
    // if (!_.isInteger(_.toNumber(wri.id_status))) {
    if (stats.indexOf(wri.id_status) < 0) {
      invalid = true;
      if (showWarning) {
        notification.error({
          message: t('validate.invalidInput'),
          description: `${t('fields.wriIdStatus')} - ${t('descriptions.inLine')}${line + 1}, ${t(
            'descriptions.mustInEnumOfWriIdStats'
          )}`,
        });
      }
    }

    return invalid;
  };

  const onVerifyData = (json, showWarning = true) => {
    const len = json.length;
    let invalid = false;
    for (let i = 0; i < len; i++) {
      invalid = verifyWri(json[i], i, showWarning);
      if (invalid) {
        break;
      }
    }

    setInvalid(invalid);
    setCanUpload(!invalid);
  };

  const onUploadData = () => {
    Modal.confirm({
      title: t('prompts.upload'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      icon: <QuestionCircleOutlined />,
      centered: true,
      onOk: async () => {
        const values = {};
        values.count = wriList?.length || 0;
        values.data = wriList;
        await api
          .post(WRI.IMPORT, values)
          .then((response) => {
            notification.success({
              message: t('messages.uploadSuccess'),
              description: t('descriptions.uploadWriSuccess'),
            });
            onFinish();
          })

          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.uploadWriFailed'),
            });
          });
      },
    });
  };

  const extra = (
    <>
      <Button style={{ marginRight: 10 }} type="primary" disabled={!selected} onClick={onDeleteLine}>
        {t('operations.deleteLineItem')}
      </Button>

      <Button style={{ marginRight: 10 }} type="primary" onClick={onAddLine}>
        {t('operations.addLineItem')}
      </Button>
    </>
  );

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{ marginTop: '1rem' }}>
      <Row gutter={[8, 10]}>
        <Col span={12}>
          <Upload {...props} style={{ marginRight: 10, width: '100%' }}>
            <Button style={{ marginRight: 10, width: '100%' }} type="primary">
              <UploadOutlined />
              {t('operations.selectFile')}
            </Button>
          </Upload>
        </Col>

        <Col span={6}>
          <Button
            style={{ marginRight: 10, width: '100%' }}
            type="primary"
            disabled={!canPreview}
            onClick={onPreviewData}
          >
            {t('operations.previewData')}
          </Button>
        </Col>

        <Col span={6}>
          <Button
            style={{ marginRight: 10, width: '100%' }}
            type="primary"
            disabled={!canUpload}
            onClick={onUploadData}
          >
            {t('operations.uploadData')}
          </Button>
        </Col>
      </Row>

      <DataTable
        minimal={false}
        data={wriList}
        columns={fields}
        // extra={extra}
        // handleSelect={(value) => setSelected(value[0])}
        // onCellUpdate={(value) => onCellUpdate(value)}
        height={'40vh'}
      />

      <div style={{ marginTop: '2rem' }}>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => Modal.destroyAll()}
        >
          {t('operations.cancel')}
        </Button>

        {/* <Button
          type="primary"
          htmlType="submit"
          icon={<SyncOutlined />}
          style={{ float: 'right', marginRight: 5 }}
        >
          {t('operations.ok')}
        </Button> */}
      </div>
    </Form>
  );
};

export default WriImport;
