import React from 'react';
import { Component } from 'react';
import logo from './logo.svg';
import './Hmi.css';
import HostMessages from './HostMessage';
import OmegaMessages from './OmegaMessage';
import DetailsArea from './DetailsArea';
import ContentsArea from './ContentsArea';
import StatusArea from './StatusArea';
import { Button } from 'antd';

class Hmi extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			startUp : false,
			logout : false,
			selectedChild : '',
			selectedRecId : '',
			selectedAckId : '',

			from: undefined,
			action : undefined,
			message : undefined,
			content_format: undefined,

			statusMsgList: []
		};

		this.renderHostMessages = this.renderHostMessages.bind(this);
		this.renderOmegaMessages = this.renderOmegaMessages.bind(this);
		this.viewDetails = this.viewDetails.bind(this);
		this.editAndSubmit = this.editAndSubmit.bind(this);
		this.messageSelected = this.messageSelected.bind(this);
		this.statusUpdate = this.statusUpdate.bind(this);
		this.dropDownSelected = this.dropDownSelected.bind(this); 
		this.config = this.config.bind(this); 
		this.hostcomm = this.hostcomm.bind(this); 
		this.manualMsg = this.manualMsg.bind(this); 
		this.export = this.export.bind(this); 
		this.help = this.help.bind(this); 
		this.logout = this.logout.bind(this); 
	}

	componentDidMount()
	{
		this.setState({startUp:true});
	}


	viewDetails(from, msg, content_fmt)
	{
		this.setState({from: from, action: 'view', message: msg, content_format: content_fmt});
	}

	editAndSubmit(from, msg, content_fmt)
	{
		this.setState({from: from, action: 'edit', message: msg, content_format: content_fmt});
	}

	messageSelected(child, rec_id, ack_id)
	{
		if (this.state.selectedChild !== child)
		{
			this.setState({ selectedChild: child });  
		}

		if (this.state.selectedRecId !== rec_id)
		{
			this.setState({ selectedRecId: rec_id });  
		}

		if (this.state.selectedAckId !== ack_id)
		{
			this.setState({ selectedAckId: ack_id});  
		}
	}

	statusUpdate(statusMsg)
	{
		if (this.state.statusMsgList !== statusMsg)
		{
			//console.log('statusMsg:'+JSON.stringify(statusMsg,null,'\t'));
			this.setState({ statusMsgList: statusMsg});  
		}
	}

	renderHostMessages()
	{
		return (
			<div>
				<HostMessages
					startUp={this.state.startUp}
					onViewDetails={this.viewDetails}
					onEditAndSubmit={this.editAndSubmit}
					onMessageSelected={this.messageSelected}
					onStatusUpdate={this.statusUpdate}
					selectedRecId={this.state.selectedRecId}
					selectedAckId={this.state.selectedAckId} />
			</div>
		);
	}

	dropDownSelected()
	{
		//console.log('called dropDownSelected()...');
	}

	config()
	{
		alert('Configuration: work in progress\n'
				+ '* host connection details\n'
				+ '* omega connection details\n'
				+ '* database settings\n'
				+ '* etc');
	}

	hostcomm()
	{
		alert('Hostcomm: work in progress\n'
				+ '* Send test message to host\n'
				+ '* Sent test message to omega\n'
				+ '* etc');
	}

	manualMsg()
	{
		alert('Manual Messaging: work in progress\n'
				+ '* Manual editing and transmission of messages to host\n'
				+ '* Manual editing and transmission of messages to omega');
	}

	export()
	{
		alert('Export: work in progress\n'
				+ '* Export host messages\n'
				+ '  * Export summary\n'
				+ '  * Export details\n'
				+ '  * Export in various formats\n'
				+ '* Export omega messages\n'
				+ '  * Export summary\n'
				+ '  * Export details\n'
				+ '  * Export in various formats');
	}

	help()
	{
		alert('Help: work in progress\n'
				+ '* Context-sensitive assistance');
	}

	logout()
	{
		var url = process.env.REACT_APP_API_URL + '/logout';
		fetch(url, {
			method: 'POST',
			credentials: 'include'
		}).then(response => {
			if (!response.ok)
			{
				//console.log('logout failed!');
			}
			this.setState({ logout: true });
			this.props.logout(this.state.logout);
		});

/*
		this.setState({ logout: true });
*/
	}


	renderOmegaMessages()
	{
		return (
			<div>
				<OmegaMessages
					startUp={this.state.startUp}
					onViewDetails={this.viewDetails}
					onEditAndSubmit={this.editAndSubmit}
					onMessageSelected={this.messageSelected}
					onStatusUpdate={this.statusUpdate}
					selectedRecId={this.state.selectedAckId} />
			</div>
		);
	}


	render()
	{
		if (this.state.logout)
		{
			//console.log('logout:'+this.state.logout);
			return(<p>Logout successful</p>);
		}
		else
		{
			var logoutButton = '';
			if (process.env.REACT_APP_PROTO === 'https')
			{
				logoutButton = (
					<Button className="menuOption" onClick={this.logout}>Log out</Button>
				);
			}

			return (
				<div className="Hmi">
					<div>
						<div className="adjacent">
							<div>
								<img src={logo} className="Hmi-logo" alt="logo" href="https://reactjs.org" />
							</div>
							<div>
								<div className="adjacent">
									<Button className="menuOption" onClick={this.config}>Configuration</Button>
	{/*
									<Button className="menuOption" onClick={this.hostcomm}>Hostcomm</Button>
									<Button className="menuOption" onClick={this.manualMsg}>Manual Messaging</Button>
	*/}
									<Button className="menuOption" onClick={this.export}>Export</Button>
									<Button className="menuOption" onClick={this.help}>Help</Button>
{/*
									<Button className="menuOption" onClick={this.logout}>Log out</Button>
									{logoutButton}
*/}
								</div>
								<div>
									<StatusArea
										statusMsg={this.state.statusMsgList} />
								</div>
							</div>
						</div>
						{this.renderHostMessages()}
						<hr/>
						{this.renderOmegaMessages()}
					</div>
					<div>
						<DetailsArea
							from={this.state.from}
							action={this.state.action}
							message={this.state.message}
							content_format={this.state.content_format} />
						<ContentsArea
							from={this.state.from}
							action={this.state.action}
							message={this.state.message}
							content_format={this.state.content_format} />
					</div>
				</div>
			);
		}
	}
}



export default Hmi;

