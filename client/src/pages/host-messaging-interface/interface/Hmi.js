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
  const [iaction, setAction] = useState('view');
  const [icontentFormat, setContentFormat] = useState(1);
  const [imessage, setMessage] = useState(null);

	const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setMessage(value);
	};

	const handleClicked = (visibility, from, action, contentFormat, message) => {
    setVisible(visibility);
    setFrom(from);
    //setAction(action);
    //setContentFormat(contentFormat);
    setMessage(message);
	};


/*
    this.viewDetails = this.viewDetails.bind(this);
    this.editAndSubmit = this.editAndSubmit.bind(this);
    this.messageSelected = this.messageSelected.bind(this);
    this.statusUpdate = this.statusUpdate.bind(this);



  viewDetails(from, msg, content_fmt) {
    this.setState({ from: from, action: 'view', message: msg, content_format: content_fmt });
  }

  editAndSubmit(from, msg, content_fmt) {
    this.setState({ from: from, action: 'edit', message: msg, content_format: content_fmt });
  }

  messageSelected(child, rec_id, ack_id) {
    if (this.state.selectedChild !== child) {
      this.setState({ selectedChild: child });
    }

    if (this.state.selectedRecId !== rec_id) {
      this.setState({ selectedRecId: rec_id });
    }

    if (this.state.selectedAckId !== ack_id) {
      this.setState({ selectedAckId: ack_id });
    }
  }

  statusUpdate(statusMsg) {
    if (this.state.statusMsgList !== statusMsg) {
      //console.log('statusMsg:'+JSON.stringify(statusMsg,null,'\t'));
      this.setState({ statusMsgList: statusMsg });
    }
  }
*/



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
