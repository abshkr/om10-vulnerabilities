import React, { useState, useEffect, useRef } from 'react';
import { DownloadOutlined, PauseOutlined, ClearOutlined } from '@ant-design/icons';
import { Button, notification, Progress, Select, Statistic, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import api from 'api';

const DataDownloader = ({
  baseUrl,
  startVar,
  endVar,
  pageSize,
  round,
  icon,
  setData,
  setDownloading,
  runUrl,
  setRunUrl,
}) => {
  const { t } = useTranslation();

  const pauseFlag = useRef(null);

  // const [pageItems, setPageItems] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [ratioState, setRatio] = useState(0);
  const [countsState, setCounts] = useState(0);
  const [totalState, setTotal] = useState(0);
  // const [startPosition, setStartPosition] = useState(0);
  // const [endPosition, setEndPosition] = useState(pageSize);

  const pageItems = useRef([]);
  const loading = useRef(false);
  const ratio = useRef(0);
  const counts = useRef(0);
  const total = useRef(0);
  const startPosition = useRef(0);
  const endPosition = useRef(pageSize);
  const stepSize = useRef(pageSize);

  const setPageSize = (v) => {
    stepSize.current = v;
    startPosition.current = 0;
    endPosition.current = v;
    setData([]);
    setRunUrl(true);
  };

  const onDownloadPages = async () => {
    console.log('...............onDownloadPages', total.current, counts.current);
    if (total.current > 0 && counts.current >= total.current) {
      return;
    }

    let sum = total.current;
    let counter = counts.current;
    let startPos = startPosition.current;
    let size = stepSize.current; //pageSize;
    let endPos = endPosition.current;
    let pages = pageItems.current;

    pauseFlag.current = false;
    loading.current = true;
    setDownloading(true);
    let percent = sum > 0 ? _.round((counter / sum) * 100.0, 0) : 0;
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
      percent = sum > 0 ? _.round((counter / sum) * 100.0, 0) : 0;
      ratio.current = percent;

      setCounts(counter);
      setTotal(sum);
      setRatio(percent);

      // const cntPage = Math.ceil(counter/size);
      // const sumPage = Math.ceil(sum/size);

      if (counter >= sum) {
        break;
      } else {
        startPos = endPos + 1;
        endPos = startPos + size - 1;
        startPosition.current = startPos;
        endPosition.current = endPos;
        if (startPos >= sum) {
          break;
        }
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
  };

  const onReset = () => {
    ratio.current = 0;
    counts.current = 0;
    total.current = 0;
    setCounts(0);
    setTotal(0);
    setRatio(0);
    pageItems.current = [];
    setData([]);
    loading.current = false;
    setDownloading(false);
    pauseFlag.current = false;
    startPosition.current = 0;
    endPosition.current = stepSize.current;
  };

  const onPause = () => {
    pauseFlag.current = true;
  };

  useEffect(() => {
    console.log('...................runUrl.current', runUrl, baseUrl);
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
    <div style={{ display: 'flex' }}>
      <Statistic
        title=""
        valueStyle={{ color: 'green', fontSize: '16px', width: '20vw' }}
        value={countsState}
        suffix={` / ${t('fields.totalSum')}: ${totalState}`}
      />

      <Progress
        type="line"
        style={{ fontSize: '16px', fontWeight: 'bold', width: '50vw' }}
        percent={ratioState}
        strokeWidth={20}
      />

      <Button
        type="primary"
        shape={round ? 'round' : ''}
        icon={icon || <DownloadOutlined />}
        onClick={onDownloadPages}
        // disabled={loading || pageRecords?.length===0 || !pageRecords}
        disabled={loading.current || (total.current > 0 && total.current === counts.current)}
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
        disabled={loading.current}
      >
        {''}
      </Button>

      <Select
        style={{ paddingLeft: 10 }}
        dropdownMatchSelectWidth={false}
        defaultValue={pageSize}
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
    </div>
  );
};

export default DataDownloader;
