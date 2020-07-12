import React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import useSWR from 'swr';
import moment from 'moment';

import columns from './HostColumns';
import { DataTable, Calendar, Download } from '../../../components';
import Forms from './forms';
import { SETTINGS } from '../../../constants';

const HostMessages = ({handleClick}) => {

  const [visible, setVisible] = useState(false);
  const [select, setSelected] = useState(null);

  const { t } = useTranslation();

  const fields = columns(t);

	var urlprefix = process.env.REACT_APP_API_URL || '';
	var dbstr = process.env.REACT_APP_OMEGA_USER || '';
	var url = urlprefix + '/hmi/host_message';
	if (dbstr)
	{
		url = url + '?db=' + dbstr;
	}
	console.log('host url:'+url);

	const getData = async () => {
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({start: start, end: end})
		}).then(response => {
			response.json().then(body => {
				setMessages(body.message);
				return body;
			});
		});
	};

  const { data: payload, isValidating, revalidate } = useSWR(url, getData);
  const [messages, setMessages] = useState(payload?.message);

	const from = 'host';
	const action = 'view';
	const cformat = 1;


  const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);

		// TODO: is this really working?
		revalidate();
  };

  useEffect(() => {
		getData();
  }, [start, end]);


  const extras = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} />
      <Download data={messages} isLoading={isValidating} columns={fields} />
    </>
  );


	return (
		<div>
			<DataTable
				data={messages}
				columns={fields}
				selectionMode="single"
				isLoading={isValidating}
				onClick={(message) => handleClick(true, from, action, cformat, message[0])}
				handleSelect={(message) => handleClick(true, from, action, cformat, message[0])}
				extra={extras}
			/>
		</div>
	);

}


export default HostMessages;
