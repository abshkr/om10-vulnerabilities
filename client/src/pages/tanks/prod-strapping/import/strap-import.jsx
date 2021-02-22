import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Row, Col, notification, Modal, Upload } from 'antd';
import { CloseOutlined, QuestionCircleOutlined, SyncOutlined, UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import api, { TANK_STRAPPING } from '../../../../api';
import columns from './columns';
import { csvToJSON } from '../../../../utils';

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
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setCanPreview(newFileList.length > 0 ? true : false);
      setCanUpload(newFileList.length > 0 ? canUpload : false);
      setStrapList([]);
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
    onClose({ total: strapList.length });
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
    // ['strap_height', 'strap_volume', 'strap_tankcode', 'strap_sitecode']

    if (strapList.length > 0) {
      const line = strapList[strapList.length - 1];
      strap.strap_height = String(_.toInteger(line.strap_height) + 1);
      strap.strap_volume = line.strap_volume;
      strap.strap_tankcode = line.strap_tankcode;
      strap.strap_sitecode = line.strap_sitecode;
    } else {
      strap.strap_height = '0';
      strap.strap_volume = '0';
      strap.strap_tankcode = value?.tank_code;
      strap.strap_sitecode = value?.tank_terminal;
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
    const invalid = verifyStrap(val?.data, val?.rowIndex);

    if (invalid) {
      setCanUpload(false);
    } else {
      const newList = strapList.slice();
      newList[val?.rowIndex] = val?.data;
      setStrapList(newList);
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
        [0, 1, 2, 3],
        ['strap_height', 'strap_volume', 'strap_tankcode', 'strap_sitecode']
      );
      setStrapList(json);
      onVerifyData(json);
    };

    reader.readAsText(fileList?.[0]);
  };

  const verifyStrap = (strap, line, showWarning = true) => {
    let invalid = false;
    // ['strap_height', 'strap_volume', 'strap_tankcode', 'strap_sitecode']
    if (!_.isInteger(_.toNumber(strap.strap_height))) {
      invalid = true;
      if (showWarning) {
        notification.error({
          message: t('descriptions.tankLevelMustBeInteger'),
          description:
            strap.strap_height +
            ' - ' +
            t('descriptions.tankLevelInLine') +
            (line + 1) +
            t('descriptions.notInteger'),
        });
      }
    }
    if (_.isInteger(_.toNumber(strap.strap_height)) && _.toNumber(strap.strap_height) < 0) {
      invalid = true;
      if (showWarning) {
        notification.error({
          message: t('descriptions.tankLevelCannotNegative'),
          description:
            strap.strap_height +
            ' - ' +
            t('descriptions.tankLevelInLine') +
            (line + 1) +
            t('descriptions.isNegative'),
        });
      }
    }

    if (!_.isNumber(_.toNumber(strap.strap_volume))) {
      invalid = true;
      if (showWarning) {
        notification.error({
          message: t('descriptions.tankVolumeMustBeNumber'),
          description:
            strap.strap_volume +
            ' - ' +
            t('descriptions.tankVolumeInLine') +
            (line + 1) +
            t('descriptions.notNumber'),
        });
      }
    }
    if (_.isNumber(_.toNumber(strap.strap_volume)) && _.toNumber(strap.strap_volume) < 0) {
      invalid = true;
      if (showWarning) {
        notification.error({
          message: t('descriptions.tankVolumeCannotNegative'),
          description:
            strap.strap_volume +
            ' - ' +
            t('descriptions.tankVolumeInLine') +
            (line + 1) +
            t('descriptions.isNegative'),
        });
      }
    }

    if (strap.strap_tankcode !== value?.tank_code) {
      invalid = true;
      if (showWarning) {
        notification.error({
          message: t('descriptions.tankNotMatch'),
          description:
            t('descriptions.shouldBe') +
            value?.tank_code +
            ', ' +
            t('descriptions.butIs') +
            strap.strap_tankcode +
            t('descriptions.inLine') +
            (line + 1),
        });
      }
    }
    if (strap.strap_sitecode !== value?.tank_terminal) {
      invalid = true;
      if (showWarning) {
        notification.error({
          message: t('descriptions.terminalNotMatch'),
          description:
            t('descriptions.shouldBe') +
            value?.tank_terminal +
            ', ' +
            t('descriptions.butIs') +
            strap.strap_sitecode +
            t('descriptions.inLine') +
            (line + 1),
        });
      }
    }

    return invalid;
  };

  const onVerifyData = (json, showWarning = true) => {
    const len = json.length;
    let invalid = false;
    for (let i = 0; i < len; i++) {
      invalid = verifyStrap(json[i], i, showWarning);
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
        values.tank_code = value?.tank_code;
        values.tank_terminal = values?.tank_terminal;
        values.delete_strap = true;
        values.data = strapList;
        await api
          .post(TANK_STRAPPING.IMPORT, values)
          .then((response) => {
            notification.success({
              message: t('messages.uploadSuccess'),
              description: t('descriptions.uploadStrapSuccess'),
            });
          })

          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.uploadStrapFailed'),
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
        <Col span={12}>{t('fields.tank') + ' : ' + value?.tank_code}</Col>

        <Col span={12}>{t('fields.terminal') + ' : ' + value?.tank_terminal}</Col>
      </Row>

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
        data={strapList}
        columns={fields}
        extra={extra}
        handleSelect={(value) => setSelected(value[0])}
        onCellUpdate={(value) => onCellUpdate(value)}
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
