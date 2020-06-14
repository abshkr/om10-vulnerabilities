import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import NativeMenu from 'native-menu';
import jpath from 'node-jpath';
import { Button } from 'antd';

class OmegaMessageRow extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			idx: this.props.idx,
			sty : this.props.sty,
			selectedChild : this.props.selectedChild,
			selectedRecId : this.props.selectedRecId,
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

		if (this.state.selectedRecId !== nextProps.selectedRecId)
		{
			this.setState({ selectedRecId: nextProps.selectedRecId });  
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

		if (nextProps.selectedRecId !== prevState.selectedRecId)
		{
			res['selectedRecId'] = nextProps.selectedRecId;  
		}

		return res;
	}




	selected(ev)
	{
		if (ev) { ev.preventDefault(); }

		//console.log('OmegaMessageRow:selected:idx:'+this.state.idx);
		//console.log('hstmessage:'+JSON.stringify(this.state.message, null, '\t'));
		this.details();
	}

/*
	doubleClicked(ev)
	{
		if (ev) { ev.preventDefault();	}
		//console.log('doubleclicked');
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
		var url = process.env.REACT_APP_API_URL + '/hmi/resubmit/omega_message';

		// BEWARE: when using post method with json body data, must:
		// 1. on client side, set json content type in header, AND
		// 2. on server side, specify json body in second arg in the route
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({rec_id: this.state.message.REC_ID, content_format: 1})
		}).then(response => {
			response.json().then(body => {

				//console.log('resp:'+ JSON.stringify(body, null, '\t'));
				//this.sendStatusUpdate(0, 'resubmitted omega message ' + this.state.message.REC_ID);
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
		$("#omdata tr").removeClass("highlight");
	}

	clearSearchResults()
	{
		$("#omdata tr").removeClass("omSearchResult");
		this.setState({ match: ''});
		this.props.onClearSearchResults();
	}

	// TODO: consider breaking the td line into a list of parts and apply coloring
	render()
	{
		return (
			<tr id={'om'+this.state.idx} className={this.state.sty}
				onClick={this.selected}
			>
				<td className="rowIndex">{this.state.idx}</td>
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


			</tr>
		);
	}
}

class OmegaMessages extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			startUp: this.props.startUp,
			messages : this.props.messages,
			selectedRecId : this.props.selectedRecId,
			match: '',

			/* Current selected criterias for filtering, sorting and searching */
			filterCriteria: '',
			sortCriteria: '',
			searchKey: '',
			searchVal: '',

			/* NOTE: Data from server starts in ascending sort order
			** But need to set it to opposite to start with in order
			** for algorithm to work properly. Otherwise, the first
			** click of sort toggle will not work.
			*/
			sortOrder: 'descending'
		};

		this.sseSetup = this.sseSetup.bind(this);
		this.sseCleanup = this.sseCleanup.bind(this);
		this.sseOpened = this.sseOpened.bind(this);
		this.sseMessage = this.sseMessage.bind(this);
		this.sseError = this.sseError.bind(this);
		this.sseReconnect = this.sseReconnect.bind(this);
		this.sseAdd = this.sseAdd.bind(this);
		this.sseModify = this.sseModify.bind(this);
		this.sendStatusUpdate = this.sendStatusUpdate.bind(this);
		this.messageExists = this.messageExists.bind(this);
		this.deleteMessage = this.deleteMessage.bind(this);
		this.updateMessage = this.updateMessage.bind(this);
		this.getData = this.getData.bind(this);
		this.refresh = this.refresh.bind(this);
		this.onViewDetails = this.onViewDetails.bind(this);
		this.onEditAndSubmit = this.onEditAndSubmit.bind(this);
		this.msgSelected = this.msgSelected.bind(this);
		this.sortByOrigin = this.sortByOrigin.bind(this);
		this.sortByIdocNumber = this.sortByIdocNumber.bind(this);
		this.sortByRecvTime = this.sortByRecvTime.bind(this);
		this.sortByCustom = this.sortByCustom.bind(this);
		this.sortNow = this.sortNow.bind(this);
		this.sortBy = this.sortBy.bind(this);
		this.sortToggle = this.sortToggle.bind(this);
		this.filterByOrigin = this.filterByOrigin.bind(this);
		this.filterByRecvTime = this.filterByRecvTime.bind(this);
		this.filterByIdocNumber = this.filterByIdocNumber.bind(this);
		this.filterByCustom = this.filterByCustom.bind(this);
		this.filterNow = this.filterNow.bind(this);
		this.filterSelected = this.filterSelected.bind(this);
		this.filterBy = this.filterBy.bind(this);
		this.startSearch = this.startSearch.bind(this);
		this.startSearchNow = this.startSearchNow.bind(this);
		this.clearSearchResults = this.clearSearchResults.bind(this);

		this.sseTimer = null;
		this.sseSetup();
	}

/*
	componentDidMount()
	{
		this.sseSetup();
	}

	componentWillUnmount()
	{
		this.sseCleanup();
	}

	// This allows state change in parent component to initiate state change in child component
	componentWillReceiveProps(nextProps)
	{
		if (this.state.startUp !== nextProps.startUp)
		{
			this.setState({ startUp: nextProps.startUp });  
			this.getData();
		}

		// TODO: need to check individual field?
		if (this.props.message !== nextProps.message)
		{
			this.setState({ message: nextProps.message });  
		}

		if (this.state.selectedRecId !== nextProps.selectedRecId)
		{
			this.setState({ selectedRecId: nextProps.selectedRecId });  
		}
	}
*/
	static getDerivedStateFromProps(nextProps, prevState)
	{
		var res = {};
		if (nextProps.startUp !== prevState.startUp)
		{
			res['startUp'] = nextProps.startUp;  
		}

		if (nextProps.message !== prevState.message)
		{
			res['message'] = nextProps.message;  
		}

		if (nextProps.selectedRecId !== prevState.selectedRecId)
		{
			res['selectedRecId'] = nextProps.selectedRecId;  
		}

		return res;
	}

	componentDidUpdate(prevProps)
	{
		if (this.props.startUp !== prevProps.startUp)
		{
			this.getData();
		}
	}

	sseSetup()
	{
		//console.log('creating Omega EventSource instance...');
		this.eventSource = new EventSource(process.env.REACT_APP_API_URL + '/hmi/omega_events', {withCredentials: true});
		this.eventSource.addEventListener('open', this.sseOpened);
		this.eventSource.addEventListener('message', this.sseMessage);
		this.eventSource.addEventListener('error', this.sseError);
		this.eventSource.addEventListener('add', this.sseAdd);
		this.eventSource.addEventListener('modify', this.sseModify);
	}

	sseCleanup()
	{
		this.eventSource.removeEventListener('open', this.sseOpened);
		this.eventSource.removeEventListener('message', this.sseMessage);
		this.eventSource.removeEventListener('error', this.sseError);
		this.eventSource.removeEventListener('add', this.sseAdd);
		this.eventSource.removeEventListener('modify', this.sseModify);
		this.eventSource.close();
	}

	sseOpened(e)
	{
		//console.log('omega sse opened:' + e);
		this.sendStatusUpdate(0, 'omega sse opened');
	}

	sseMessage(e)	
	{
		//console.log('received message from omega sse:' + e.data);
	}

	sseError(e)
	{
		//console.log('received error from omega sse:' + e + ', connection status:' + this.eventSource.readyState);
		this.sendStatusUpdate(2, 'received error from omega sse');

		// Attempt to reconnect after waiting a configurable time (default is 10 seconds)
		this.sseCleanup();
		var wait = process.env.REACT_APP_SSE_RECONNECT || 10;
		this.sseTimer = setTimeout(this.sseReconnect, wait * 1000);
	}

	sseReconnect()
	{
		clearTimeout(this.sseTimer);
		this.sseSetup();
	}

	sseAdd(e)
	{
		//console.log('received add from server:' + e.data);

		var newMsg;
		try
		{
			newMsg = JSON.parse(e.data);
		}
		catch (ex)
		{
			var errMsg = 'ERROR: Automatic update failed (could not parse new omega message). Click refresh.';
			//console.log(errMsg);
			this.sendStatusUpdate(2, errMsg);
			return;
		}

		var newMessages = this.state.messages;
		if (this.messageExists(newMsg))
		{
			var warn = 'WARNING: message ' + newMsg.REC_ID
							+ ' already exists. Replacing it with latest update ...';
			//console.log(warn);
			newMessages = this.updateMessage(newMessages, newMsg);
			this.sendStatusUpdate(1, warn);
		}
		else
		{
			if (newMessages)
			{
				newMessages.push(newMsg);
			}
		}

		this.setState({ messages: newMessages });
		this.sendStatusUpdate(0, 'Received new omega message ' + newMsg.REC_ID);
	} 
	
	sseModify(e)
	{
		//console.log('received modify from omega sse:' + e.data);

		this.sendStatusUpdate(0, 'received modify from omega sse');

		var msg;
		try
		{
			msg = JSON.parse(e.data);
		}
		catch (ex)
		{
			// TODO: create visual indicator?
			var err = 'ERROR: Automatic update failed (could not parse new omega message). Click refresh.';
			//console.log(err);
			this.sendStatusUpdate(2, err);

			return;
		}

		var newMessages = this.state.messages;
		if (this.messageExists(msg))
		{
			this.updateMessage(newMessages, msg);
		}
		else
		{
			var warn = 'WARNING: message ' + e.data.REC_ID + ' no longer exist. Adding it ...';
			//console.log(warn);
			newMessages.push(msg);
			this.sendStatusUpdate(1, warn);
		}

		this.setState({ messages: newMessages });
		this.sendStatusUpdate(0, 'Received update for omega message ' + msg.REC_ID);
	}

	sendStatusUpdate(category, msg)
	{
		// TODO: consider making this work for array input

		var status = {};
		var now = new Date().toISOString();
		status['event_time'] = now;
		status['category'] = category;
		status['description'] = msg;
		this.props.onStatusUpdate(status);
	}

	messageExists(msg)
	{
		for (var i = 0; i < this.state.messages.length; ++i)
		{
			if (msg.REC_ID === this.state.messages[i].REC_ID)
			{
				return true;
			}
		}

		return false;
	}

	deleteMessage(msg)
	{
/*
		for (var i = 0; i < this.state.messages.length; ++i)
		{
			if (msg.REC_ID === this.state.messages[i].REC_ID)
			{
				this.state.messages.remove(i);
			}
		}
*/
		var res = this.state.messages.filter( (item) => {
			return item.REC_ID !== msg.REC_ID;
		});

		return res;
	}

	updateMessage(msg_list, msg_to_upd)
	{
		for (var i = 0; i < msg_list.length; ++i)
		{
			if (msg_to_upd.REC_ID === msg_list[i].REC_ID)
			{
				msg_list[i] = msg_to_upd;
				break;
			}
		}
	
		return msg_list;
	}

	getData()
	{
		var url = process.env.REACT_APP_API_URL + '/hmi/omega_message';
		fetch(url, {
			method: 'GET',
			credentials: 'include'
		}).then(response => {
			response.json().then(body => {
				this.setState({ messages: body.message });
			});
		});
	}


	refresh(ev)
	{
		if (ev) { ev.preventDefault(); }
		this.setState({ messages: [] });
		this.getData();
	}

	onViewDetails(message, content_format)
	{
		this.props.onViewDetails('omega', message, content_format);
	}

	onEditAndSubmit(message, content_format)
	{
		this.props.onEditAndSubmit('omega', message, content_format);
	}


	msgSelected(rec_id)
	{
		this.props.onMessageSelected('omega', rec_id);

		//var self = this;
		$("#omdata tr").click(function() {
			$("#omdata tr").removeClass("highlight");
			var selected = $(this).hasClass("highlight");
			if(!selected)
			{
				$(this).addClass("highlight");
				//console.log('state:'+JSON.stringify(self.state,null,'\t'));
			}
		});
	}

/*
TODO: investigate sort comparison function further
people.stableSort( (p1, p2) => {
  if (p1.name < p2.name) return -1;
  if (p1.name > p2.name) return 1;
  return 0;
});
*/


	sortByOrigin()
	{
		var messageList = this.state.messages;
		if (this.state.sortOrder === 'ascending')
		{
			//this.setState({ sortOrder : 'descending'});
			messageList.sort((a, b) => a.ORIGIN - b.ORIGIN);
		}
		else if (this.state.sortOrder === 'descending')
		{
			//this.setState({ sortOrder : 'ascending'});
			messageList.sort((a, b) => b.ORIGIN - a.ORIGIN);
		}
		this.setState({ messages : messageList });
		this.sendStatusUpdate(0, 'omega messages sorted by origin in ' + this.state.sortOrder + ' order');
	}

	sortByIdocNumber()
	{
		var messageList = this.state.messages;
		if (this.state.sortOrder === 'ascending')
		{
			//this.setState({ sortOrder : 'descending'});
//			messageList.sort((a, b) => parseInt(b.MESSAGE_ID) - parseInt(a.MESSAGE_ID));
			messageList.sort(function (a, b) { 
				var aInt = parseInt(a.MESSAGE_ID);
				var bInt = parseInt(b.MESSAGE_ID);
				var res = 0;
				if (   (!isNaN(aInt) && !isNaN(bInt))
				    || (isNaN(aInt) && isNaN(bInt))
				   )
				{
					res = aInt - bInt;
				}
				else if (isNaN(aInt))
				{
					res = 1;
				}
				else if (isNaN(bInt))
				{
					res = -1;
				}
				return res;
			}, this);
		}
		else if (this.state.sortOrder === 'descending')
		{
			//this.setState({ sortOrder : 'ascending'});
//			messageList.sort((a, b) => parseInt(a.MESSAGE_ID) - parseInt(b.MESSAGE_ID));
			messageList.sort(function (a, b) { 
				var aInt = parseInt(a.MESSAGE_ID);
				var bInt = parseInt(b.MESSAGE_ID);
				var res = 0;
				if (   (!isNaN(aInt) && !isNaN(bInt))
				    || (isNaN(aInt) && isNaN(bInt))
				   )
				{
					res = bInt - aInt;
				}
				else if (isNaN(aInt))
				{
					res = -1;
				}
				else if (isNaN(bInt))
				{
					res = 1;
				}
				return res;
			}, this);
		}
		this.setState({ messages : messageList });

		this.sendStatusUpdate(0, 'omega messages sorted by IDOC in ' + this.state.sortOrder + ' order');
	}

	sortByRecvTime()
	{
		var messageList = this.state.messages;
		if (this.state.sortOrder === 'ascending')
		{
			//this.setState({ sortOrder : 'descending'});
			messageList.sort((a, b) => (new Date(a.RECV_TIME)) - (new Date(b.RECV_TIME)));
		}
		else if (this.state.sortOrder === 'descending')
		{
			//this.setState({ sortOrder : 'ascending'});
			messageList.sort((a, b) => (new Date(b.RECV_TIME)) - (new Date(a.RECV_TIME)));
		}
		this.setState({ messages : messageList });

		this.sendStatusUpdate(0, 'omega messages sorted by time in ' + this.state.sortOrder + ' order');
	}

	sortByCustom()
	{
		alert('Sort by custom sort crtieria: work in progress...');
	}

	sortNow(criteria)
	{
		if (criteria === 'Origin')
		{
			this.sortByOrigin();
		}
		else if (criteria === 'RecvTime')
		{
			this.sortByRecvTime();
		}
		else if (criteria === 'IDOC')
		{
			this.sortByIdocNumber();
		}
		else if (criteria === 'Custom')
		{
			this.sortByCustom();
		}
	}

	sortBy(ev)
	{
		if (ev) { ev.preventDefault(); };

		var selectedVal = ev.currentTarget.value;
		this.sortNow(selectedVal);
		this.setState({sortCriteria: selectedVal});
	}

	sortToggle(ev)
	{
		if (ev) { ev.preventDefault(); };

		var bElem = document.getElementById("omSortToggleButton");

		if (this.state.sortOrder === '')
		{
			this.setState({sortOrder: 'ascending'});
			bElem.setAttribute("title", "descending");
			bElem.innerHTML = '<b>></b>';
		}
		else if (this.state.sortOrder === 'ascending')
		{
			this.setState({sortOrder: 'descending'});
			bElem.setAttribute("title", "ascending");
			bElem.innerHTML = '<b>></b>';
		}
		else if (this.state.sortOrder === 'descending')
		{
			this.setState({sortOrder: 'ascending'});
			bElem.setAttribute("title", "descending");
			bElem.innerHTML = '<b><</b>';
		}

		var elem = document.getElementById("omSortOptionList");
		if (elem)
		{
			this.sortNow(elem.value);
		}
	}

	filterByOrigin(criteria)
	{
/*
console.log('message:'+JSON.stringify(this.state.messages,null,'\t'));
var start = new Date();
		var messageList = [];
		var msg;
		for (var i = 0; i < this.state.messages.length; ++i)
		{
			msg = this.state.messages[i];
			if ("0ZP" === msg.ORIGIN)
			{
				messageList.push(msg);
			}
		}
var end = new Date();
console.log('duration:'+ (end-start));
		this.setState({ messages : messageList });
*/

		var elem = document.getElementById("omDisplayArea");
		if (elem)
		{
			var filterElem = document.getElementById("omFilterCriteria");
			if (!filterElem)
			{
				filterElem = document.createElement('div');
				filterElem.setAttribute("id", "omFilterCriteria");
				filterElem.setAttribute("align", "left");
			}

			var content = '';
			content += '<b>Origin:</b>';
			content += '<input id="omOrigin" type=text>';
			content += '<Button id="omOriginFilter">ok</Button>';
			content += '<Button id="filterCancelled">cancel</Button>';
			filterElem.innerHTML = content;
			elem.prepend(filterElem);
		}
	}

	filterByRecvTime()
	{
		var elem = document.getElementById("omDisplayArea");
		if (elem)
		{
			var filterElem = document.getElementById("omFilterCriteria");
			if (!filterElem)
			{
				filterElem = document.createElement('div');
				filterElem.setAttribute("Id", "omFilterCriteria");
				filterElem.setAttribute("align", "left");
			}

			var content = '';
			content += '<b>Start:</b>';
			content += '<input id="omStartDate" type=date>';
			content += '<input id="omStartTime" type=time>';
			content += '&nbsp';
			content += '<b>End:</b>';
			content += '<input id="omEndDate" type=date>';
			content += '<input id="omEndTime" type=time>';
			//content += '<Button id="omDateFilter" onClick={this.filterSelected}>ok</Button>';
			//content += '<Button id="omDateFilterCan" onClick={this.filterCancelled}>cancel</Button>';
			content += '<Button id="omDateFilter">ok</Button>';
			content += '<Button id="filterCancelled">cancel</Button>';
			filterElem.innerHTML = content;
			elem.prepend(filterElem);
			//elem.setAttribute("height", 400);
		}
	}

	filterByIdocNumber()
	{
		var elem = document.getElementById("omDisplayArea");
		if (elem)
		{
			var filterElem = document.getElementById("omFilterCriteria");
			if (!filterElem)
			{
				filterElem = document.createElement('div');
				filterElem.setAttribute("id", "omFilterCriteria");
				filterElem.setAttribute("align", "left");
			}

			var content = '';
			content += '<b>IDOC:</b>';
			content += '<input id="omIdoc" type=text>';
			content += '<Button id="omIdocFilter">ok</Button>';
			content += '<Button id="filterCancelled">cancel</Button>';
			filterElem.innerHTML = content;
			elem.prepend(filterElem);
		}
	}

	filterByCustom()
	{
		alert('Filter by custom filter crtieria: work in progress...');
	}

	filterNow(criteria)
	{
		if (criteria === 'Origin')
		{
			this.filterByOrigin(criteria);
		}
		else if (criteria === 'RecvTime')
		{
			this.filterByRecvTime(criteria);
		}
		else if (criteria === 'IDOC')
		{
			this.filterByIdocNumber();
		}
		else if (criteria === 'Custom')
		{
			this.filterByCustom();
		}
	}


	filterSelected(ev)
	{
		//if (ev) { ev.preventDefault(); };

		var url = process.env.REACT_APP_API_URL + '/hmi/filter/omega_message';
		if (ev.target.id === "omDateFilter")
		{
			var startDate = document.getElementById('omStartDate');
			var startTime = document.getElementById('omStartTime');
			var endDate = document.getElementById('omEndDate');
			var endTime = document.getElementById('omEndTime');

			//var elem = document.getElementById("omDisplayArea");
			//elem.removeChild(elem.firstChild);


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
				body: JSON.stringify({	key: 'time',
										startDate: startDate.value, startTime: startTime.value,
										endDate: endDate.value, endTime: endTime.value
				})
			}).then(response => {
				response.json().then(body => {
					if (response.ok)
					{
						//console.log('resp:'+ JSON.stringify(body, null, '\t'));
						this.setState({ messages: body.message});
						this.sendStatusUpdate(0,
							'omega messages filtered by time range '
							+ startDate.value + startTime.value + ' - '
							+ endDate.value + endTime.value);}
					else
					{
						var errMsg = 'ERROR:' + body.message;
						console.error(errMsg);
						this.sendStatusUpdate(2, errMsg);
						alert(body.message);
					}
				});
			});
		}
		else if (ev.target.id === "omOriginFilter")
		{
			var origin = document.getElementById('omOrigin');

			//var elem = document.getElementById("omDisplayArea");
			//elem.removeChild(elem.firstChild);


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
				body: JSON.stringify({ key: 'origin', value: origin.value })
			}).then(response => {
				response.json().then(body => {
					if (response.ok)
					{
						//console.log('resp:'+ JSON.stringify(body, null, '\t'));
						this.setState({ messages: body.message});
						this.sendStatusUpdate(0, 'omega messages filtered by origin ' + origin.value);
					}
					else
					{
						var errMsg = 'ERROR:' + body.message;
						console.error(errMsg);
						this.sendStatusUpdate(2, errMsg);
						alert(body.message);
					}
				});
			});
		}
		else if (ev.target.id === "omIdocFilter")
		{
			var idoc = document.getElementById('omIdoc');

			//var elem = document.getElementById("omDisplayArea");
			//elem.removeChild(elem.firstChild);


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
				body: JSON.stringify({ key: 'message_id', value: idoc.value })
			}).then(response => {
				response.json().then(body => {
					if (response.ok)
					{
						//console.log('resp:'+ JSON.stringify(body, null, '\t'));
						this.setState({ messages: body.message});
						this.sendStatusUpdate(0, 'omega messages filtered by IDOC ' + idoc.value);
					}
					else
					{
						var errMsg = 'ERROR:' + body.message;
						console.error(errMsg);
						this.sendStatusUpdate(2, errMsg);
						alert(body.message);
					}
				});
			});
		}
		else if (ev.target.id === "filterCancelled")
		{
			var filterElem = document.getElementById("omFilterCriteria");
			if (filterElem)
			{
				filterElem.remove();
			}
		}
	}

	filterBy(ev)
	{
		if (ev) { ev.preventDefault(); };

		var selectedVal = ev.currentTarget.value;
		this.filterNow(selectedVal);
		this.setState({filterCriteria: selectedVal});
	}

	startSearchNow(searchKey, searchVal)
	{
		//console.log('searchKey:' + searchKey + ', searchVal:' + searchVal);
		var matchres = jpath.filter(this.state, 'messages[' + searchKey + '=' + searchVal + '].REC_ID');
		//console.log('matchres:'+JSON.stringify(matchres,null,'\t'));
		this.setState({ match: matchres});
	}

	startSearch()
	{
		var searchCriteria = document.getElementById("omSearch").value.split('=');
		if (searchCriteria.length !== 2)
		{
			alert('ERROR: search string must be a key-value pair e.g. status=3');
			return;
		}

		this.startSearchNow(searchCriteria[0], searchCriteria[1]);
		this.setState({searchKey: searchCriteria[0], searchVal: searchCriteria[1]});
	}

	clearSearchResults()
	{
		this.setState({ match: ''});
	}

	render() {
		if (this.state.messages)
		{
			try
			{
				var rows = this.state.messages.map(
					(msg, i) => {

						let sty='';
						if (this.state.selectedRecId !== '' && msg.REC_ID === this.state.selectedRecId)
						{
							sty = "highlight";
		/*
							var w = $(window);
							var table = $('omdata');
							console.log('idx:'+i);
							var row = table.find('tbody').eq(i);
							console.log('row:'+row.length);
							if (row.length)
							{
								w.scrollTop(row.offset().top - (w.height()/2));
							}
		*/
							var elem = document.getElementById('om'+i);
							if (elem)
							{
								elem.scrollIntoView(true);
							}
							else
							{
								// TODO: write error message into status area
							}
						}

						var search_idx = this.state.match.indexOf(msg.REC_ID);
						if (search_idx !== -1)
						{
							sty = "omSearchResult";
						}

						return (
							<OmegaMessageRow
								key={i}
								idx={i}
								message={msg}
								onViewDetails={this.onViewDetails}
								onEditAndSubmit={this.onEditAndSubmit}
								onMsgSelected={this.msgSelected}
								onClearSearchResults={this.clearSearchResults}
								sty={sty} />
						);
					}
				);
			}
			catch (err)
			{
				let header = <b>OMEGA MESSAGE</b>;
				let empty =
					<div className="">
						<table className='table-bordered'>
							<tbody>
								<tr>
									<td onDoubleClick={this.refresh}>Click to refresh</td>
								</tr>	
							</tbody>
						</table>
					</div>;

				return (
					<div>
						{header}
						{empty}
					</div>
				);
			}


			let header = <div className="OmMsgHeading"
								title="Messages received from Omega sites (double click to refresh)"
								onDoubleClick={this.refresh}>OMEGA MESSAGE</div>;

			return (
				<div>
					<div className="adjacent">
						{header}
						<div> 
							<select id="omFilterOptionList" className="filterGroup"
									title="Select filter criteria"
									onChange={this.filterBy}>
								<option value="None"/>
								<option value="Origin">Origin</option>
								<option value="RecvTime">Time</option>
								<option value="IDOC">IDOC</option>
								<option value="Custom" disabled>Custom</option>
							</select>
						</div>
						<div className="sortGroup adjacent">
{/*
							<p>Sort </p>
*/}
							<select id="omSortOptionList" className="sortOption"
									defaultValue="RecvTime"
									title="Select sort criteria">
								<option value="None"/>
								<option value="Origin">Origin</option>
								<option value="RecvTime">Time</option>
								<option value="IDOC">IDOC</option>
								<option value="Custom" disabled>Custom</option>
							</select>
							<Button id="omSortToggleButton" className="sortOption" onClick={this.sortToggle}>
								<b title={this.state.sortOrder}>></b>
							</Button>
						</div>
						<div className="searchGroup adjacent">
							<input id="omSearch" className="omSearchBox" type="search" placeholder="Search for things"
								title="Enter key value pair e.g. status=3" />
							<Button className="searchOption" onClick={this.startSearch}>go</Button>
						</div>
					</div>
					<div id="omDisplayArea"
						onClick={this.filterSelected}>
						<table id="omdata" className='table-bordered summary'>
							<thead/>
							<tbody>{rows}</tbody>
						</table>
					</div>
				</div>
			);
		}
		else
		{
			let header = <b>OMEGA MESSAGE</b>;
			let empty =
				<div className="">
					<table className='table-bordered'>
						<tbody>
							<tr>
								<td onClick={this.refresh}>Click to refresh</td>
							</tr>	
						</tbody>
					</table>
				</div>;

			return (
				<div>
					{header}
					{empty}
				</div>
			);
		}
	}
}


export default OmegaMessages;
