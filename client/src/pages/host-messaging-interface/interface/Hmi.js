import React from 'react';
import { useState } from 'react';
import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';


import './Hmi.css';
import HostMessages from './HostMessage';
import OmegaMessages from './OmegaMessage';
import Forms from './forms';


const Hmi = () => {

	const { TabPane } = Tabs;

	const { t } = useTranslation();

	const [ivisible, setVisible] = useState(false);
	const [ifrom, setFrom] = useState(null);
	const [iaction, setAction] = useState(null);
	const [icontentFormat, setContentFormat] = useState(null);
	const [imessage, setMessage] = useState(null);

	const handleFormState = (visibility, value) => {
		setVisible(visibility);
		setMessage(value);
	};



	const handleClicked = (visibility, from, action, contentFormat, message) => {

		setVisible(visibility);
		setFrom(from);
		setAction(action);
		setContentFormat(contentFormat);
		setMessage(message);
	};



	return (
		<div>
			<Tabs defaultActiveKey="1" type="card" style={{margin:0, padding:0}}>
				<TabPane key="1" tab={t('fields.incomingMessages')}>
					<HostMessages handleClick={handleClicked} />
				</TabPane>

				<TabPane key="2" tab={t('fields.outgoingMessages')}>
					<OmegaMessages handleClick={handleClicked} />
				</TabPane>
			</Tabs>
			<Forms
				msg={imessage}
				visible={ivisible}
				from={ifrom}
				action={iaction}
				content_format={icontentFormat}
				handleFormState={handleFormState}
			/>
		</div>
	);

}

export default Hmi;
