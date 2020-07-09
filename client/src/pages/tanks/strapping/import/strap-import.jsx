import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Row, Col, notification, Modal, Upload } from 'antd';
import { CloseOutlined, SyncOutlined, UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import api, { TANK_STRAPPING } from '../../../../api';
import columns from './columns';
import {csvToJSON} from '../../../../utils';

const StrapImport = ({ value, onClose }) => {
  const { t } = useTranslation();

  const [strapList, setStrapList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [canPreview, setCanPreview] = useState(false);
  const [canUpload, setCanUpload] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const props = {
    accept: '.csv', 
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setCanPreview(newFileList.length>0 ? true : false);
      setCanUpload(newFileList.length>0 ? canUpload : false);
      setStrapList([]);
      console.log(newFileList);
    },
    beforeUpload: file => {
      // Limited to one file in the list always
      const newFileList = []; // fileList.slice();
      newFileList.push(file);
      setFileList(newFileList);
      setCanPreview(newFileList.length>0 ? true : false);
      setCanUpload(newFileList.length>0 ? canUpload : false);
      console.log(newFileList);

      return false;
    },
    fileList,
  };  

  const fields = columns(t);
  const [form] = Form.useForm();

  const onFinish = () => {
    Modal.destroyAll();
    onClose({total: strapList.length});
  };


  const onDeleteLine = () => {
    const index = strapList.indexOf(selected);
    const newList = strapList.slice();
    newList.splice(index, 1);
    setStrapList(newList);

    //tableAPI.updateRowData({ remove: selected });
  };

  const onAddLine = () => {
    const strap = {};
    // ['strap_height', 'strap_vol', 'str_tk_tankcode', 'str_tk_tankdepo']
    
    if (strapList.length > 0) {
      const line = strapList[strapList.length-1];
      strap.strap_height = String(_.toInteger(line.strap_height) + 1);
      strap.strap_vol = line.strap_vol;
      strap.str_tk_tankcode = line.str_tk_tankcode;
      strap.str_tk_tankdepo = line.str_tk_tankdepo;
    } else {
      strap.strap_height = '0';
      strap.strap_vol = '0';
      strap.str_tk_tankcode = value?.tank_code;
      strap.str_tk_tankdepo = value?.tank_terminal;
    }
    const newList = strapList.slice();
    newList.push(strap);
    setStrapList(newList);

    //tableAPI.updateRowData({ add: [strap] });
  };

  const onDeleteAll = () => {
    setStrapList([]);
  };

  const onCellUpdate = (val) => {

  };

  const onPreviewData = () => {

    const reader = new FileReader();

    reader.onload = function(e) {
      const text = reader.result;
      console.log('file contents', text);
      const json = csvToJSON(
        text, 
        [0,1,2,3], 
        ['strap_height', 'strap_vol', 'str_tk_tankcode', 'str_tk_tankdepo']
      );
      setStrapList(json);
      onVerifyData(json);
    }
    
    reader.readAsText(fileList?.[0]);

  };

  const verifyStrap = (strap, line) => {
    let invalid = false;
    // ['strap_height', 'strap_vol', 'str_tk_tankcode', 'str_tk_tankdepo']
    if (!_.isInteger(_.toNumber(strap.strap_height))) {
      invalid = true;
      notification.error({
        message: t('descriptions.tankLevelMustBeInteger'),
        description: strap.strap_height + ' - ' + t('descriptions.tankLevelInLine') + (line+1) + t('descriptions.notInteger'),
      });
    }
    if (_.isInteger(_.toNumber(strap.strap_height)) && _.toNumber(strap.strap_height) < 0) {
      invalid = true;
      notification.error({
        message: t('descriptions.tankLevelCannotNegative'),
        description: strap.strap_height + ' - ' + t('descriptions.tankLevelInLine') + (line+1) + t('descriptions.isNegative'),
      });
    }

    if (!_.isNumber(_.toNumber(strap.strap_vol))) {
      invalid = true;
      notification.error({
        message: t('descriptions.tankVolumeMustBeNumber'),
        description: strap.strap_vol + ' - ' + t('descriptions.tankVolumeInLine') + (line+1) + t('descriptions.notNumber'),
      });
    }
    if (_.isNumber(_.toNumber(strap.strap_vol)) && _.toNumber(strap.strap_vol) < 0) {
      invalid = true;
      notification.error({
        message: t('descriptions.tankVolumeCannotNegative'),
        description: strap.strap_vol + ' - ' + t('descriptions.tankVolumeInLine') + (line+1) + t('descriptions.isNegative'),
      });
    }

    if (strap.str_tk_tankcode !== value?.tank_code) {
      invalid = true;
      notification.error({
        message: t('descriptions.tankNotMatch'),
        description: t('descriptions.shouldBe') + value?.tank_code + ', ' + t('descriptions.butIs') + strap.str_tk_tankcode + t('descriptions.inLine') + (line+1),
      });
    }
    if (strap.str_tk_tankdepo !== value?.tank_terminal) {
      invalid = true;
      notification.error({
        message: t('descriptions.terminalNotMatch'),
        description: t('descriptions.shouldBe') + value?.tank_terminal + ', ' + t('descriptions.butIs') + strap.str_tk_tankdepo + t('descriptions.inLine') + (line+1),
      });
    }

    return invalid;

  };
  
  const onVerifyData = (json) => {
    const len = json.length;
    let invalid = false;
    for (let i=0; i<len; i++) {
      invalid = verifyStrap(json[i], i);
      if (invalid) {
        break;
      }
    }

    setInvalid(invalid);
    setCanUpload(!invalid);
  };

  const onUploadData = () => {

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
    <Form 
      layout="vertical" 
      form={form} 
      onFinish={onFinish} 
      scrollToFirstError style={{marginTop: "1rem"}}
    >
      <Row gutter={[8, 10]}>
        <Col span={12}>
          {t('fields.tank') + ' : ' + value?.tank_code}
        </Col>

        <Col span={12}>
          {t('fields.terminal') + ' : ' + value?.tank_terminal}
        </Col>
      </Row>

      <Row gutter={[8, 10]}>
        <Col span={12}>
          <Upload {...props} style={{ marginRight: 10, width: '100%' }} >
            <Button style={{ marginRight: 10, width: '100%' }} type="primary">
              <UploadOutlined />{t('operations.selectFile')}
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
        data={strapList}
        columns={fields}
        extra={extra}
        handleSelect={(value) => setSelected(value[0])}
        onCellUpdate={(value) => onCellUpdate(value)}
        height={'40vh'}
      />
      
      <div style={{marginTop: "2rem"}}>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => Modal.destroyAll()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          icon={<SyncOutlined />}
          style={{ float: 'right', marginRight: 5 }}
        >
          {t('operations.ok')}
        </Button>
      </div>
    </Form>
  );
};

export default StrapImport;
