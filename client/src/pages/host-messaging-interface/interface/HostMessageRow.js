import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import NativeMenu from 'native-menu';
import jpath from 'node-jpath';
//import NewWindow from 'react-new-window';
import { Button, Table } from 'antd';



class HostMessageRow extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			sty : this.props.sty,
			idx: this.props.idx,
			message : this.props.message
		};

		this.selected = this.selected.bind(this);
		//this.doubleClicked = this.doubleClicked.bind(this);
		this.details = this.details.bind(this);
		this.resubmit = this.resubmit.bind(this);
		this.editAndSubmit = this.editAndSubmit.bind(this);
		this.clearSelectedMessage = this.clearSelectedMessage.bind(this);
		this.clearSearchResults = this.clearSearchResults.bind(this);
	}


	// This allows state change in parent component to initiate state change in child component
/*
	componentWillReceiveProps(nextProps)
	{
		// TODO: need to check individual field?
		if (this.props.message !== nextProps.message)
		{
			this.setState({ message: nextProps.message });  
		}

		if (this.state.sty !== nextProps.sty)
		{
			this.setState({ sty: nextProps.sty });  
		}
	}
*/

	static getDerivedStateFromProps(nextProps, prevState)
	{
		var res = {};

		if (nextProps.message !== prevState.message)
		{
			res['message'] = nextProps.message;  
		}

		if (nextProps.sty !== prevState.sty)
		{
			res['sty'] = nextProps.sty;  
		}

		return res;
	}


	selected(ev)
	{
		if (ev) { ev.preventDefault(); }
		//console.log('idx:'+this.state.idx);
		//console.log('hstmessage:'+JSON.stringify(this.state.message, null, '\t'));
		this.props.onMsgSelected(this.state.message.REC_ID, this.state.message.ACK_ID);
		this.details();
	}

/*
	doubleClicked(ev)
	{
		if (ev) { ev.preventDefault(); }
		this.details();
	}
*/

	details()
	{
		var content_format = 1;
		this.props.onViewDetails(this.state.message, content_format);
	}


	resubmit()
	{
		var url = process.env.REACT_APP_API_URL + '/hmi/resubmit/host_message';

		// BEWARE: when using post method with json body data, must:
		// 1. on client side, set json content type in header, AND
		// 2. on server side, specify json body in second arg in the route
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({rec_id: this.state.message.REC_ID, content_format: 1})
		}).then(response => {
			response.json().then(body => {

				//console.log('resp:'+ JSON.stringify(body, null, '\t'));

				//this.sendStatusUpdate(0, 'resubmitted host message ' + this.state.message.REC_ID);
			});
		});
	}


	editAndSubmit()
	{
		var content_format = 2;
		this.props.onEditAndSubmit(this.state.message, content_format);
	}

	clearSelectedMessage()
	{
		$("#hostdata tr").removeClass("highlight");
	}

	clearSearchResults()
	{
		$("#hostdata tr").removeClass("hostSearchResult");
		this.setState({ match: ''});
		this.props.onClearSearchResults();
	}


	// TODO: consider breaking the td line into a list of parts and apply coloring
	render()
	{
		var statusClass = '';
		if (this.state.message.STATUS === 2)
		{
			statusClass = "statusOk";
		}
		else if (this.state.message.STATUS === 3)
		{
			statusClass = "statusBad";
		}

		return (
			<tr title={this.state.message.REC_ID}
				className={this.state.sty}
				onClick={this.selected}
			>
				<td className="rowIndex">{this.state.idx}</td>
				<td title="white=processing, green=acknowledged & ok, red=acknowledged & bad" className={statusClass}>
					&nbsp;&nbsp;&nbsp;</td>
				<td className="msgSummary">
					{this.state.message.RECV_TIME} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					IDOC {this.state.message.MESSAGE_ID} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					{this.state.message.ORIGIN} ---> {this.state.message.DESTINATION}
				</td>

				{/* The stopPropagation function prevents left click of context menu items from flowing through
					to the container below and resulting in unintended left click on the row which serves a
					different purpose. 
				*/}
				<td onClick={e => e.stopPropagation()}>
					<NativeMenu items={[
					  {
						primary: 'View details',
						secondary: 'Ctrl+D',
						onClick: () => this.details()
					  },
					  {
						primary: 'Resubmit',
						secondary: 'Ctrl+R',
						onClick: () => this.resubmit()
					  },
					  {
						primary: 'Edit and Submit',
						secondary: 'Ctrl+E',
						onClick: () => this.editAndSubmit()
					  },
					  {
						primary: 'Clear selected message',
						secondary: 'Ctrl+M',
						onClick: () => this.clearSelectedMessage()
					  },
					  {
						primary: 'Clear search results',
						secondary: 'Ctrl+S',
						onClick: () => this.clearSearchResults()
					  }
					]}>
					  <button>...</button>
					</NativeMenu>


				</td>

{/*
				<td>
					<section contextmenu="mymenu">
					</section>
						
					<menu type="context" id="mymenu">
						<menuitem label="Refresh Post" onclick="window.location.reload();" icon="/images/refresh-icon.png"></menuitem>
						<menuitem label="Skip to Comments" onclick="window.location='#comments';" icon="/images/comment_icon.gif"></menuitem>
						<menu label="Share on..." icon="/images/share_icon.gif">
							<menuitem label="Twitter" icon="/images/twitter_icon.gif" onclick="goTo('//twitter.com/intent/tweet?text=' + document.title + ':  ' + window.location.href);"></menuitem>
							<menuitem label="Facebook" icon="/images/facebook_icon16x16.gif" onclick="goTo('//facebook.com/sharer/sharer.php?u=' + window.location.href);"></menuitem>
						</menu>
					</menu>
				</td>
*/}

			</tr>
		);
	}
}


export default HostMessageRow;
