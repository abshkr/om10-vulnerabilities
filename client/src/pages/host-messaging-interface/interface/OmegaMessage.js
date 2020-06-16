import React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NativeMenu from 'native-menu';
import { Button, Table } from 'antd';
import columns from './columns';
import { DataTable, Calendar } from '../../../components';
import useSWR from 'swr';
import Forms from './forms';

const OmegaMessages = () => {

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { t } = useTranslation();

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const fields = columns(t);
	const url = process.env.REACT_APP_API_URL + '/hmi/omega_message';
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

	const from = 'omega';
	const action = 'view';
	const cformat = 1;


	return (
		<div>
			<DataTable
				data={messages}
				columns={fields}
				selectionMode="single"
				isLoading={isValidating}
				onClick={(message) => handleFormState(true, message)}
				handleSelect={(message) => handleFormState(true, message[0])}

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


export default OmegaMessages;
