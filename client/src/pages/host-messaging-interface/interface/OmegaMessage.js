import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NativeMenu from 'native-menu';
import { Button } from 'antd';
import useSWR from 'swr';
import moment from 'moment';

import columns from './columns';
import { DataTable, Calendar } from '../../../components';
import Forms from './forms';
import { SETTINGS } from '../../../constants';

const OmegaMessages = ({handleClick}) => {

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { t } = useTranslation();

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const fields = columns(t);
	const url = process.env.REACT_APP_API_URL + '/hmi/omega_message';
  const { data: payload, isValidating, revalidate } = useSWR(url);
  const messages = payload?.message;

	const from = 'omega';
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
				onClick={(message) => handleClick(true, from, action, cformat, message[0])}
				handleSelect={(message) => handleClick(true, from, action, cformat, message[0])}
				extra={extras}
			/>
{/*
			<Forms
				value={selected}
				visible={visible}
				from={from}
				action={action}
				content_format={cformat}
				handleFormState={handleFormState} />
*/}
		</div>
	);


}


export default OmegaMessages;
