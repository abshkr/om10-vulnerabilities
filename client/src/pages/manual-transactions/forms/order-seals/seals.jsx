import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Row, Col, notification, Modal } from 'antd';
import { CloseOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import api, { LOAD_SCHEDULES } from '../../../../api';
import columns from './columns';
import { useConfig } from '../../../../hooks';

const { Search } = Input;

const OrderSeals = ({ value, onClose }) => {
  const config = useConfig();
  console.log('config', config.sealPrefix, config.sealPostfix, config);

  const { t } = useTranslation();

  const { data: nextSeal, revalidate: refreshNextSeal } = useSWR(LOAD_SCHEDULES.NEXT_SEAL);

  const [origList, setOrigList] = useState([]);
  const [sealList, setSealList] = useState([]);
  const [sealRange, setSealRange] = useState('');
  const [next, setNext] = useState(null);
  const [selected, setSelected] = useState(null);

  const fields = columns(t);
  const [form] = Form.useForm();

  const onFinish = () => {
    Modal.destroyAll();
    onClose({sealRange: sealRange, sealList: sealList});
  };

  const adjustSealRange = (seals) => {
    let minSeal = '';
    let maxSeal = '';

    _.forEach(seals, (o) => {
      if (minSeal.length === 0) {
        minSeal = o.seal_nr;
      }
      if (maxSeal.length === 0) {
        maxSeal = o.seal_nr;
      }
      if (_.toNumber(o.seal_nr) < _.toNumber(minSeal)) {
        minSeal = o.seal_nr;
      }
      if (_.toNumber(o.seal_nr) > _.toNumber(maxSeal)) {
        maxSeal = o.seal_nr;
      }
    });

    if (minSeal === '' && maxSeal === '') {
      setSealRange('');
    } else {
      //setSealRange(minSeal + '=' + String(_.toNumber(maxSeal) - _.toNumber(minSeal)));
      setSealRange(minSeal + '=' + String(_.toNumber(maxSeal)));
    }
  };


  const onSealUpdate = (value) => {
    api
      .post(LOAD_SCHEDULES.SET_NEXT_SEAL, {
        next_seal: value,
      })
      .then(() => {
        refreshNextSeal();

        notification.success({
          message: t('messages.updateSuccess'),
        });
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  };

  const onAllocation = (val) => {
    if (_.toNumber(val) > 0 ) {
      setSealRange(next + "=" + String(_.toNumber(next)+_.toNumber(val)-1));
    }
    else {
      setSealRange('');
    }
    
    const seals = [];
    const len = _.toNumber(val);
    let nextNum = _.toNumber(next);
    for (let i=0; i<len; i++) {
      const o = {};
      o.seal_prefix = config.sealPreFix;
      o.seal_suffix = config.sealPostFix;
      o.seal_cmpt_nr = i + 1;
      o.seal_nr = String(nextNum);
      nextNum += 1;
      seals.push(o);
    }
    setNext(String(nextNum));
    setOrigList(seals);
    setSealList(seals);
    adjustSealRange(seals);
    onSealUpdate(String(nextNum));
  };

  const onAllocateOneSeal = () => {
    const tempList = _.clone(sealList);
    const o = {};		
    o.seal_prefix = config.sealPreFix;
    o.seal_suffix = config.sealPostFix;
    o.seal_cmpt_nr = tempList.length+1;
    o.seal_nr = next;
    tempList.push(o);
    setOrigList(tempList);
    setSealList(tempList);
    setNext(String(_.toNumber(next)+1));
    adjustSealRange(tempList);
    onSealUpdate(String(_.toNumber(next)+1));
  }

  const onReallocateSelected = () => {
    let len = sealList?.length;
    const tempList = _.clone(sealList);
    let nextNum = _.toNumber(next);
    for (let i=0; i<len; i++) {
      const o = tempList[i]
      if ( o.seal_nr === selected?.seal_nr )
      {
        o.seal_nr = String(nextNum);
        nextNum += 1;
        _.remove(tempList, (item) => {return item.seal_nr === selected?.seal_nr});
        tempList.push(o);
        setNext(String(nextNum));
        break;
      }
    }
    setSealList(tempList);
    setOrigList(tempList);
    adjustSealRange(tempList);
    onSealUpdate(String(nextNum));
    // disable button realloc and dealloc_one
  };

  const onDellocateSelected = () => {
    let len = sealList?.length;
    const tempList = _.clone(sealList);
    for (let i=0; i<len; i++) {
      const o = tempList[i]
      if ( o.seal_nr === selected?.seal_nr )
      {
        _.remove(tempList, (item) => {return item.seal_nr===selected?.seal_nr});
        break;
      }
    }
    setSealList(tempList);
    setOrigList(tempList);
    adjustSealRange(tempList);
    setSelected(null);
    // disable button realloc and dealloc_one
  };

  const onDellocateAll = () => {
    setOrigList([]);
    setSealList([]);
  };

  const onCellUpdate = (val) => {
    const endpoint =
      val?.colDef?.field === 'seal_prefix' ? LOAD_SCHEDULES.SET_PREFIX : LOAD_SCHEDULES.SET_SUFFIX;

    const prefix = val?.colDef?.field === 'seal_prefix' ? val?.data?.seal_prefix : val?.data?.seal_suffix;

    api
      .post(endpoint, {
        seal_nr: val?.data?.seal_nr,
        prefix,
      })
      .then(() => {
        refreshNextSeal();

        notification.success({
          message: t('messages.updateSuccess'),
        });
      })

      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  };

  useEffect(() => {
    const payload = nextSeal?.records[0]?.site_next_seal;

    if (payload) {
      setNext(payload);
    }
  }, [nextSeal]);

  const extra = (
    <>
      <Button style={{ marginRight: 10 }} type="primary" disabled={!selected} onClick={onReallocateSelected}>
        {t('operations.reallocateSelected')}
      </Button>

      <Button style={{ marginRight: 10 }} type="primary" disabled={!selected} onClick={onDellocateSelected}>
        {t('operations.deallocateSelected')}
      </Button>

      <Button style={{ marginRight: 5 }} type="primary" onClick={onDellocateAll}>
        {t('operations.deallocateAll')}
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
          {t('fields.supplier') + ' : ' + value?.supplier_code}
        </Col>

        <Col span={12}>
          {t('fields.orderNumber') + ' : ' + value?.order_no}
        </Col>
      </Row>

      <Row gutter={[8, 10]}>
        <Col span={12}>
          <Search
            placeholder={next}
            enterButton={t('operations.update')}
            onSearch={(value) => onSealUpdate(value)}
            disabled={!next}
          />
        </Col>

        <Col span={12}>
          <Search
            placeholder={sealList?.length}
            enterButton={sealList?.length === 0 ? t('operations.allocation') : t('operations.add')}
            onSearch={sealList?.length === 0 
              ? (value) => onAllocation(value) 
              : (value) => onAllocateOneSeal(value)
            }
            readOnly={!sealList || sealList?.length > 0}
          />
        </Col>
      </Row>

      <DataTable
        data={sealList}
        columns={fields}
        extra={extra}
        handleSelect={(value) => setSelected(value[0])}
        onCellUpdate={(value) => onCellUpdate(value)}
        height={'60vh'}
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

export default OrderSeals;
