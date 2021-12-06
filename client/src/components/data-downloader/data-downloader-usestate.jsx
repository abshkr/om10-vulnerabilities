import React, {useState, useEffect, useRef} from 'react';
import { DownloadOutlined, PauseOutlined, ClearOutlined } from '@ant-design/icons';
import { Button, notification, Progress, Statistic, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import api from 'api';

const DataDownloader = ({ baseUrl, startVar, endVar, pageSize, round, icon, setData, setDownloading, runUrl, setRunUrl }) => {
  const { t } = useTranslation();

  const pauseFlag = useRef(null);

  const [pageItems, setPageItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ratio, setRatio] = useState(0);
  const [label, setLabel] = useState('');
  const [counts, setCounts] = useState(0);
  const [total, setTotal] = useState(0);
  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(pageSize);

  const onDownloadPages = async () => {
    console.log('...............onDownloadPages', total, counts);
    if (total > 0 && counts >= total) {
      return;
    }

    let sum = total;
    let counter=counts;
    let startPos=startPosition;
    let size=pageSize;
    let endPos=endPosition;
    let pages=pageItems;

    pauseFlag.current = false;
    setLoading(true);
    setDownloading(true);
    let percent = total > 0 ? _.round(counter/total*100.0, 0) : 0
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
      setCounts(counter);
      setTotal(sum);
      const percent = sum > 0 ? _.round(counter/sum*100.0, 0) : 0
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
    setLoading(false);
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
    setRatio(0);
    setCounts(0);
    setTotal(0);
    setLabel(`0 / 0`);
    setPageItems([]);
    setData([]);
    setLoading(false);
    setDownloading(false);
    pauseFlag.current = false;
    setStartPosition(0);
    setEndPosition(pageSize);
  };

  const onPause = () => {
    pauseFlag.current = true;
  }

  useEffect(() => {
    console.log('...................runUrl.current', runUrl, runUrl.current);
    if (runUrl.current) {
      onReset();
      onDownloadPages();
      setRunUrl(false);
    }
  }, [runUrl.current]);

  /* useEffect(() => {
    if (baseUrl) {
      onReset();
      onDownloadPages();
    }
  }, [baseUrl]); */

  return (
    <div style={{display: 'flex'}}>
      <Statistic title="" valueStyle={{ color: 'green', fontSize: '16px', width: '20vw' }} value={counts} suffix={` / ${t('fields.totalSum')}: ${total}`} />
      
      <Progress type="line" style={{fontSize: '16px', fontWeight: 'bold', width: '60vw'}} percent={ratio} strokeWidth={20} />

      <Button
        htmlType="button"
        icon={<ClearOutlined />}
        // style={{ float: 'right' }}
        onClick={() => onReset()}
      >
        {''}
      </Button>

      <Button
        type="primary"
        shape={round ? 'round' : ''}
        icon={icon || <DownloadOutlined />}
        onClick={onDownloadPages}
        // disabled={loading || pageRecords?.length===0 || !pageRecords}
        disabled={loading}
      >
        {''}
      </Button>

      <Button
        type="primary"
        shape={round ? 'round' : ''}
        icon={<PauseOutlined />}
        // style={{ float: 'right' }}
        disabled={!loading}
        onClick={onPause}
      >
        {''}
      </Button>

    </div>
  );
};

export default DataDownloader;
