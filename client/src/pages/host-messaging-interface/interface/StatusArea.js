import React from 'react';
import { Component } from 'react';
import './StatusArea.css';

class StatusArea extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			statusMsg: this.props.statusMsg
		};

	}

	// This allows state change in parent component to initiate state change in child component
/*
	componentWillReceiveProps(nextProps)
	{
		if (this.props.statusMsg !== nextProps.statusMsg)
		{
			this.update(nextProps.statusMsg);  
		}
	}
*/
	componentDidUpdate(prevProps)
	{
		if (prevProps.statusMsg !== this.props.statusMsg)
		{
			this.update(this.props.statusMsg);  
		}
	}

	update(newStatusMsg)
	{
		// Show 10 most recent events
		const size = 10;

		var newStatusList = this.state.statusMsg;
		newStatusList.push(newStatusMsg);
		newStatusList.sort((a, b) => (new Date(a.event_time)) - (new Date(b.event_time)));
		var idx = (newStatusList.length > size) ? newStatusList.length - size : 0;
		newStatusList = newStatusList.slice(idx);
		this.setState({ statusMsg: newStatusList });  
	}

	render()
	{
		if (this.state.statusMsg)
		{
			var rows = this.state.statusMsg.map(
			(status, i) => {
				if (status.category === 1)
				{
					return (
						<p key={i} className="statusAreaLineWarn"><b>{status.event_time}</b>: {status.description}</p>
					);
				}
				else if (status.category === 2)
				{
					return (
						<p key={i} className="statusAreaLineErr"><b>{status.event_time}</b>: {status.description}</p>
					);
				}
				else
				{
					return (
						<p key={i} className="statusAreaLine"><b>{status.event_time}</b>: {status.description}</p>
					);
				}
			});

			return (
				<div>
					<div id="statusArea" className="statusArea">
						{rows}
					</div>
				</div>
			);
		}
		else
		{
			return (
				<div id="statusArea" className="statusArea"/>
/*
						<p className="statusAreaLine"><b>{now}</b>: It's all quiet on the western front ...</p>
				</div>
*/
			);

		}
	}

}


export default StatusArea;
