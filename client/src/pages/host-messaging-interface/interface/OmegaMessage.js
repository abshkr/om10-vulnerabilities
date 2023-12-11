import React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import useSWR from 'swr';
import moment from 'dayjs';

import columns from './OmegaColumns';
import { DataTable, Calendar, Download } from '../../../components';
import Forms from './forms';
import { SETTINGS } from '../../../constants';

const OmegaMessages = ({ handleClick }) => {
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation();

  const fields = columns(t);

  var urlprefix = process.env.REACT_APP_API_URL || '';
  var dbstr = process.env.REACT_APP_OMEGA_USER || '';
  var url = urlprefix + '/hmi/omega_message';
  if (dbstr) {
    url = url + '?db=' + dbstr;
  }
  //console.log('omega url:'+url);

  const getData = async () => {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ start: start, end: end }),
    }).then((response) => {
      response.json().then((body) => {
        if (response.ok) {
          setMessages(body.message);
          return body;
        } else {
          alert(body.message);
          return {};
        }
      });
    });
  };

  const {
    data: payload,
    isValidating,
    mutate: revalidate,
  } = useSWR(url, getData, { revalidateOnFocus: false });
  //const [messages, setMessages] = useState(payload?.message);
  const [messages, setMessages] = useState({});
  const [clearSelected, setClearSelected] = useState(false);

  const from = 'omega';
  const action = 'view';
  const cformat = 1;
  const initStart = moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT);
  const initEnd = moment().format(SETTINGS.DATE_TIME_FORMAT);

  const [start, setStart] = useState(initStart);
  const [end, setEnd] = useState(initEnd);

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  const reset = () => {
    setStart(initStart);
    setEnd(initEnd);
  };

  const refresh = () => {
    const startDate = moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT);
    const endDate = moment().format(SETTINGS.DATE_TIME_FORMAT);
    setStart(startDate);
    setEnd(endDate);
  };

  useEffect(() => {
    getData();
  }, [start, end]);

  const selected = async (message) => {
    if (typeof message != undefined && message != '' && message != []) {
      handleClick(true, from, action, cformat, message);

      if (messages && messages.length <= 1) {
        setClearSelected(true);
      }
    }
  };

  const extras = (
    <>
      <Download data={messages} isLoading={isValidating} columns={fields} />
      <Calendar handleChange={setRange} handleClear={reset} start={start} end={end} enableClear={true} />
      <Button onClick={refresh}> {t('operations.refresh')} </Button>
    </>
  );

  return (
    <div>
      <DataTable
        data={messages}
        columns={fields}
        selectionMode="single"
        isLoading={isValidating}
        onClick={(message) => selected(message)}
        extra={extras}
        clearSelection={clearSelected}
      />
    </div>
  );
};

export default OmegaMessages;
