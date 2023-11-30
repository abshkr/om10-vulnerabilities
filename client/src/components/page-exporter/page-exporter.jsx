import React, { useState, useEffect } from 'react';
import { FileTextOutlined, QuestionCircleOutlined, CloseOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, notification, Progress, Modal, Drawer, Tag, Statistic, Row, Col } from 'antd';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import api from 'api';
import transform from './transform';

const PageExporter = ({ baseUrl, startVar, endVar, columns, round, icon }) => {
  const { t } = useTranslation();
  const [pageRecords, setPageRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ratio, setRatio] = useState(0);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState('');
  const [counter, setCounter] = useState(0);
  const [total, setTotal] = useState(0);
  const [canSave, setCanSave] = useState(false);

  const onDownloadPages = async () => {
    let counter = 0;
    let startPos = 0;
    let size = 500;
    let endPos = 500;
    let pages = [];
    setLoading(true);
    setRatio(0);
    setCanSave(false);
    for (;;) {
      const url = `${baseUrl}&${startVar}=${startPos}&${endVar}=${endPos}`;

      const results = await api.get(url);
      const total = results?.data?.count;
      const items = results?.data?.records;
      // pages.push(items);
      pages = _.concat(pages, items);
      counter += items?.length;
      setCounter(counter);
      setTotal(total);
      const percent = total > 0 ? _.round((counter / total) * 100.0, 0) : 0;
      setRatio(percent);
      setLabel(`${counter} / ${total}`);
      if (counter >= total) {
        break;
      } else {
        startPos = endPos + 1;
        endPos = startPos + size;
      }
    }

    const payload = transform(pages, columns);
    console.log('..................page export ', pages, columns, payload);
    setPageRecords(payload);
    setLoading(false);
    setCanSave(true);
    notification.success({
      message: t('messages.csvDownloadSuccessful'),
    });
  };

  const onReset = () => {
    setRatio(0);
    setCounter(0);
    setTotal(0);
    setLabel(`0 / 0`);
    setPageRecords([]);
    setLoading(false);
    setCanSave(false);
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
          onClose={() => setVisible(false)}
          maskClosable={false}
          destroyOnClose={true}
          mask={true}
          placement="right"
          width="30vw"
          open={visible}
          footer={
            <>
              <Button
                htmlType="button"
                icon={<CloseOutlined />}
                style={{ float: 'right' }}
                onClick={() => setVisible(false)}
              >
                {t('operations.cancel')}
              </Button>

              <Button
                htmlType="button"
                icon={<CloseOutlined />}
                style={{ float: 'right' }}
                onClick={() => onReset()}
              >
                {t('operations.reset')}
              </Button>

              <Button
                type="primary"
                shape={round ? 'round' : ''}
                icon={icon || <DownloadOutlined />}
                onClick={onDownloadPages}
                // disabled={loading || pageRecords?.length===0 || !pageRecords}
                disabled={loading}
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
              value={counter}
              suffix={` / ${t('fields.totalSum')}: ${total}`}
            />
          </div>
        </Drawer>
      )}
    </>
  );
};

export default PageExporter;
