import React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NativeMenu from 'native-menu';
import { Button } from 'antd';
import useSWR from 'swr';
import moment from 'moment';

import columns from './columns';
import { DataTable, Calendar } from '../../../components';
import Forms from './forms';
import { SETTINGS } from '../../../constants';

const HostMessages = () => {

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { t } = useTranslation();

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
		console.log('selected row:'+JSON.stringify(value,null,'\t'));
  };

  const fields = columns(t);
	const url = process.env.REACT_APP_API_URL + '/hmi/host_message';
/*
	const fetcher = url =>
		fetch(url).then(response => {
			response.json().then(body => {
				console.log('host messages:'+JSON.stringify(body,null,'\t')); 
				return body;
			});
			//response.json();
		});
*/
  const { data: payload, isValidating, revalidate } = useSWR(url);
  const messages = payload?.message;
  //const [messages, setData] = useState(payload?.message);
  //const isLoading = isValidating || !messages;

/*
  useEffect(() => {
    if (payload?.message) {
			console.log('here:'+JSON.stringify(payload.message,null,'\t')); 
      setData(payload?.message);
			payload.message = null;
		}
  });
  //}, [messages, setData]);
*/

	const from = 'host';
	const action = 'view';
	const cformat = 1;

  const [start, setStart] = useState(moment().subtract(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));
  const [end, setEnd] = useState(moment().add(7, 'days').format(SETTINGS.DATE_TIME_FORMAT));

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
    revalidate();
  };

	const exportToCSV = () => { };	

  const extras = (
    <>
      <Calendar handleChange={setRange} start={start} end={end} />
      <Button onClick={() => exportToCSV()}>
        {t('operations.export')}
      </Button>
    </>
  );





	return (
		<div>
			<DataTable
				data={messages}
				columns={fields}
				selectionMode="single"
				isLoading={isValidating}
				onClick={(message) => handleFormState(true, message)}
				handleSelect={(message) => handleFormState(true, message[0])}
				extra={extras}
			/>
			<Forms
				value={selected}
				visible={visible}
				from={from}
				action={action}
				content_format={cformat}
				handleFormState={handleFormState} />
		</div>
	);

}


export default HostMessages;
