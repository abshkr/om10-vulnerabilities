import React from 'react';
import { Component } from 'react';
import logo from './logo.svg';
import './Hmi.css';
import HostMessages from './HostMessage';
import OmegaMessages from './OmegaMessage';
import DetailsArea from './DetailsArea';
import MessageArea from './MessageArea';
import StatusArea from './StatusArea';
import { Button, Tabs } from 'antd';

import { DataTable, Calendar } from '../../../components';
import { PageContainer, PageInjector, PageHeaderContainer, PageHeaderExtras } from '../../../components/page/style';
import columns from './columns';
const { TabPane } = Tabs;


class Hmi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startUp: false,
      selectedChild: '',
      selectedRecId: '',
      selectedAckId: '',

      from: undefined,
      action: undefined,
      message: undefined,
      content_format: undefined,

      statusMsgList: [],
    };

    this.renderHostMessages = this.renderHostMessages.bind(this);
    this.renderOmegaMessages = this.renderOmegaMessages.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
    this.editAndSubmit = this.editAndSubmit.bind(this);
    this.messageSelected = this.messageSelected.bind(this);
    this.statusUpdate = this.statusUpdate.bind(this);
		this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.setState({ startUp: true });
  }


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

  renderHostMessages() {

    return (
      <PageContainer>
        <HostMessages
          startUp={this.state.startUp}
          onViewDetails={this.viewDetails}
          onEditAndSubmit={this.editAndSubmit}
          onMessageSelected={this.messageSelected}
          onStatusUpdate={this.statusUpdate}
          selectedRecId={this.state.selectedRecId}
          selectedAckId={this.state.selectedAckId}
        />
      </PageContainer>
    );
  }





  renderOmegaMessages() {
    return (
      <div>
        <OmegaMessages
          startUp={this.state.startUp}
          onViewDetails={this.viewDetails}
          onEditAndSubmit={this.editAndSubmit}
          onMessageSelected={this.messageSelected}
          onStatusUpdate={this.statusUpdate}
          selectedRecId={this.state.selectedAckId}
        />
      </div>
    );
  }

	getData()
	{
		var url = process.env.REACT_APP_API_URL + '/hmi/host_message';
		fetch(url, {
			method: 'GET',
			credentials: 'include'
		}).then(response => {
			response.json().then(body => {
				//console.log('data:'+JSON.stringify(body.message,null,'\t'));
				console.log('message:'+JSON.stringify(body.message[0],null,'\t'));
				this.setState({ message: body.message[0] });
			});
		});
	}


	render() {
		return (
			<Tabs defaultActiveKey="1" type="card" style={{margin:0, padding:0}}>
				<TabPane key="1" tab={'Incoming Messages'}>
					{this.renderHostMessages()}
				</TabPane>

				<TabPane key="2" tab={'Outgoing Messages'}>
					{this.renderOmegaMessages()}
				</TabPane>
			</Tabs>
		);

  }
}

export default Hmi;
