import React, { useState, useEffect, useRef } from 'react';
import {
  FileTextOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  DownloadOutlined,
  PauseOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import { Button, notification, Progress, Modal, Drawer, Tag, Statistic, Select, Row, Col } from 'antd';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import api from 'api';
import transform from './transform';

const PageDownloader = ({ baseUrl, startVar, endVar, pageSize, columns, round, icon }) => {
  const { t } = useTranslation();

  const pauseFlag = useRef(null);

  const [pageRecords, setPageRecords] = useState([]);
  const [pageItems, setPageItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ratio, setRatio] = useState(0);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState('');
  const [counts, setCounts] = useState(0);
  const [total, setTotal] = useState(0);
  const [canSave, setCanSave] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(pageSize);
  const stepSize = useRef(pageSize);

  const onDownloadPages = async () => {
    if (total > 0 && counts >= total) {
      return;
    }

    let sum = total;
    let counter = counts;
    let startPos = startPosition;
    let size = stepSize.current;
    let endPos = endPosition;
    let pages = pageItems;

    pauseFlag.current = false;
    setLoading(true);
    let percent = total > 0 ? _.round((counter / total) * 100.0, 0) : 0;
    setRatio(percent);
    setCanSave(false);

    for (;;) {
      console.log('..............pause...', pauseFlag.current);
      if (pauseFlag.current === true) {
        break;
      }
      const url = `${baseUrl}&${startVar}=${startPos}&${endVar}=${endPos}`;

      const results = await api.get(url);
      sum = results?.data?.count;
      const items = results?.data?.records;
      // pages.push(items);
      pages = _.concat(pages, items);
      counter += items?.length;
      setCounts(counter);
      setTotal(sum);
      const percent = sum > 0 ? _.round((counter / sum) * 100.0, 0) : 0;
      setRatio(percent);
      setLabel(`${counter} / ${sum}`);
      if (counter >= sum) {
        break;
      } else {
        startPos = endPos + 1;
        endPos = startPos + size - 1;
        setStartPosition(startPos);
        setEndPosition(endPos);
      }
    }

    setPageItems(pages);
    const payload = transform(pages, columns);
    console.log('..................page export ', pages, columns, payload);
    setPageRecords(payload);
    setLoading(false);
    setCanSave(true);
    // console.log('.........total....count....', total, counts, counter, sum);
    if (sum > 0 && counter > 0 && counter >= sum) {
      notification.success({
        message: t('messages.csvDownloadFullySuccessful'),
      });
    } else {
      notification.success({
        message: t('messages.csvDownloadPartialSuccessful'),
      });
    }
  };

  const onReset = () => {
    setRatio(0);
    setCounts(0);
    setTotal(0);
    setLabel(`0 / 0`);
    setPageRecords([]);
    setPageItems([]);
    setLoading(false);
    setCanSave(false);
    pauseFlag.current = false;
    setStartPosition(0);
    setEndPosition(stepSize.current);
  };

  const onPause = () => {
    pauseFlag.current = true;
  };

  const onClose = () => {
    setVisible(false);
    onReset();
  };

  const setPageSize = (v) => {
    stepSize.current = v;
    const endPos = startPosition > 0 ? startPosition + v - 1 : v;
    setEndPosition(endPos);
    //onReset();
    //onDownloadPages();
  };

  return (
    <>
      <Button
        type="primary"
        shape={round ? 'round' : ''}
        icon={icon || <FileTextOutlined />}
        onClick={() => setVisible(true)}
        // disabled={loading || pageRecords?.length===0 || !pageRecords}
        //disabled={loading}
      >
        {t('operations.export')}
      </Button>

      {visible && (
        <Drawer
          title={t('operations.export')}
          styles={{ body: { paddingTop: 5 } }}
          onClose={onClose}
          maskClosable={false}
          destroyOnClose={true}
          mask={true}
          placement="right"
          width="40vw"
          open={visible}
          footer={
            <>
              <Button
                htmlType="button"
                icon={<CloseOutlined />}
                style={{ float: 'right' }}
                onClick={onClose}
                disabled={loading}
              >
                {t('operations.cancel')}
              </Button>

              <Button
                htmlType="button"
                icon={<ClearOutlined />}
                style={{ float: 'right' }}
                onClick={() => onReset()}
                disabled={loading}
              >
                {t('operations.reset')}
              </Button>

              <Button
                type="primary"
                shape={round ? 'round' : ''}
                icon={icon || <DownloadOutlined />}
                onClick={onDownloadPages}
                // disabled={loading || pageRecords?.length===0 || !pageRecords}
                disabled={loading || (total > 0 && total === counts)}
              >
                {t('operations.download')}
              </Button>
              {/* <CSVLink data={pageRecords} filename={`om5k_${window.location.pathname}_${new Date().valueOf()}.csv`}> */}
              <CSVLink data={pageRecords} filename={`om5k_${window.location.pathname}.csv`}>
                <Button
                  type="primary"
                  shape={round ? 'round' : ''}
                  icon={icon || <FileTextOutlined />}
                  onClick={() =>
                    notification.success({
                      message: t('messages.csvSaveSuccessful'),
                    })
                  }
                  disabled={loading || pageRecords?.length === 0 || !canSave}
                >
                  {t('operations.save')}
                </Button>
              </CSVLink>

              <Button
                type="primary"
                shape={round ? 'round' : ''}
                icon={<PauseOutlined />}
                // style={{ float: 'right' }}
                disabled={!loading}
                onClick={onPause}
                // ref={pauseBtn}
              >
                {t('operations.pause')}
              </Button>

              <Select
                style={{ paddingLeft: 10 }}
                popupMatchSelectWidth={false}
                defaultValue={stepSize.current}
                disabled={loading}
                onChange={setPageSize}
                optionFilterProp="children"
                placeholder={null}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {[100, 150, 200, 250, 500, 750, 1000, 1500, 2000].map((item, index) => (
                  <Select.Option key={index} value={item}>
                    {item + t('units.perBatch')}
                  </Select.Option>
                ))}
              </Select>
            </>
          }
        >
          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              style={{ fontSize: '96px', fontWeight: 'bold' }}
              percent={ratio}
              width={360}
            />
            {/* <Tag color='blue'>{label}</Tag> */}
            <Statistic
              title=""
              valueStyle={{ color: 'green' }}
              value={counts}
              suffix={` / ${t('fields.totalSum')}: ${total}`}
            />
          </div>
        </Drawer>
      )}
    </>
  );
};

export default PageDownloader;
