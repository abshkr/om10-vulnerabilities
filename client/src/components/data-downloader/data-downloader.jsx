import React, {useState, useEffect, useRef} from 'react';
import { DownloadOutlined, PauseOutlined, ClearOutlined } from '@ant-design/icons';
import { Button, notification, Progress, Statistic, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import api from 'api';

const DataDownloader = ({ baseUrl, startVar, endVar, pageSize, round, icon, setData, setDownloading, runUrl, setRunUrl }) => {
  const { t } = useTranslation();

  const pauseFlag = useRef(null);

  // const [pageItems, setPageItems] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [ratio1, setRatio] = useState(0);
  // const [label, setLabel] = useState('');
  const [counts1, setCounts] = useState(0);
  const [total1, setTotal] = useState(0);
  // const [startPosition, setStartPosition] = useState(0);
  // const [endPosition, setEndPosition] = useState(pageSize);

  const pageItems = useRef([]);
  const loading = useRef(false);
  const ratio = useRef(0);
  const label = useRef('');
  const counts = useRef(0);
  const total = useRef(0);
  const startPosition = useRef(0);
  const endPosition = useRef(pageSize);

  const onDownloadPages = async () => {
    console.log('...............onDownloadPages', total.current, counts.current);
    if (total.current > 0 && counts.current >= total.current) {
      return;
    }

    let sum = total.current;
    let counter=counts.current;
    let startPos=startPosition.current;
    let size=pageSize;
    let endPos=endPosition.current;
    let pages=pageItems.current;

    pauseFlag.current = false;
    loading.current = true;
    setDownloading(true);
    let percent = sum > 0 ? _.round(counter/sum*100.0, 0) : 0;
    ratio.current = percent;
    setRatio(percent);

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
      counts.current = counter;
      total.current = sum;
      percent = sum > 0 ? _.round(counter/sum*100.0, 0) : 0
      ratio.current = percent;
      label.current = `${counter} / ${sum}`;

      setCounts(counter);
      setTotal(sum);
      setRatio(percent);

      if (counter >= sum) {
        break;
      } else {
        startPos = endPos + 1;
        endPos = startPos + size - 1;
        startPosition.current = startPos;
        endPosition.current = endPos;
      }
    }

    pageItems.current = pages;
    loading.current = false;
    setDownloading(false);
    setData(pages);
    // console.log('.........total....count....', total, counts, counter, sum);
    if (sum > 0 && counter > 0 && counter >= sum) {
      notification.success({
        message: t('messages.dataDownloadFullySuccessful'),
      });
    } else {
      notification.success({
        message: t('messages.dataDownloadPartialSuccessful'),
      });
    }
  }

  const onReset = () => {
    ratio.current = 0;
    counts.current = 0;
    total.current = 0;
    setCounts(0);
    setTotal(0);
    setRatio(0);
    label.current = `0 / 0`;
    pageItems.current = [];
    setData([]);
    loading.current = false;
    setDownloading(false);
    pauseFlag.current = false;
    startPosition.current = 0;
    endPosition.current = pageSize;
  };

  const onPause = () => {
    pauseFlag.current = true;
  }

  useEffect(() => {
    console.log('...................runUrl.current', runUrl, runUrl?.current, baseUrl);
    if (runUrl) {
      onReset();
      onDownloadPages();
      setRunUrl(false);
    }
  }, [runUrl]);

  /* useEffect(() => {
    if (baseUrl) {
      onReset();
      onDownloadPages();
    }
  }, [baseUrl]); */

  return (
    <div style={{display: 'flex'}}>
      <Statistic title="" valueStyle={{ color: 'green', fontSize: '16px', width: '20vw' }} value={counts1} suffix={` / ${t('fields.totalSum')}: ${total1}`} />
      
      <Progress type="line" style={{fontSize: '16px', fontWeight: 'bold', width: '60vw'}} percent={ratio1} strokeWidth={20} />

      <Button
        type="primary"
        shape={round ? 'round' : ''}
        icon={icon || <DownloadOutlined />}
        onClick={onDownloadPages}
        // disabled={loading || pageRecords?.length===0 || !pageRecords}
        disabled={loading.current}
      >
        {''}
      </Button>

      <Button
        type="primary"
        shape={round ? 'round' : ''}
        icon={<PauseOutlined />}
        // style={{ float: 'right' }}
        disabled={!loading.current}
        onClick={onPause}
      >
        {''}
      </Button>

      <Button
        htmlType="button"
        icon={<ClearOutlined />}
        // style={{ float: 'right' }}
        onClick={() => onReset()}
      >
        {''}
      </Button>

    </div>
  );
};

export default DataDownloader;
