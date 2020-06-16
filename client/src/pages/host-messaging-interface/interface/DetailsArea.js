import React from 'react';
import { Component } from 'react';


class DetailsArea extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			from: this.props.from,
			action: this.props.action,
			message: this.props.message,
			content_fomat: this.props.content_format 
		};


		this.viewDetails = this.viewDetails.bind(this);
	}

	// This allows state change in parent component to initiate state change in child component
/*
	componentWillReceiveProps(nextProps)
	{
		if (this.props.from !== nextProps.from)
		{
			this.setState({ from: nextProps.from });  
		}

		if (this.props.action !== nextProps.action)
		{
			this.setState({ action: nextProps.action });  
		}

		// TODO: need to check individual field?
		if (this.props.message !== nextProps.message)
		{
			this.setState({ message: nextProps.message });  
		}

		if (this.props.content_format !== nextProps.content_format)
		{
			this.setState({ content_format: nextProps.content_format });  
		}
	}
*/

	static getDerivedStateFromProps(nextProps, prevState)
	{
		var res = {};
		if (nextProps.from !== prevState.from)
		{
			res['from'] = nextProps.from;  
		}

		if (nextProps.action !== prevState.action)
		{
			res['action'] = nextProps.action;  
		}

		if (nextProps.message !== prevState.message)
		{
			res['message'] = nextProps.message;  
		}

		if (nextProps.content_format !== prevState.content_format)
		{
			res['content_format'] = nextProps.content_format;  
		}

		return res;
	}

	viewDetails()
	{
		console.log('from:'+ this.state.from + ', action:'+this.state.action + ', message:'+JSON.stringify(this.state.message,null,'\t'));
		var txt;

		if (this.state.from === 'host')
		{
			txt = 'origin               >' + this.state.message.ORIGIN + '<\n'
				+ 'message id           >' + this.state.message.MESSAGE_ID + '<\n'
				+ 'received time        >' + this.state.message.RECV_TIME + '<\n'
				+ 'destination          >' + this.state.message.DESTINATION + '<\n'
				+ 'destinated site      >' + this.state.message.DEST_SITE + '<\n'
				+ 'record id            >' + this.state.message.REC_ID + '<\n'
				+ 'file name            >' + this.state.message.FILE_NAME + '<\n'
				+ 'file format          >' + this.state.message.FILE_FORMAT + '<\n'
				+ 'message type         >' + this.state.message.MESSAGE_TYPE + '<\n'
				+ 'is valid             >' + this.state.message.VALIDITY + '<\n'
				+ 'status               >' + this.state.message.STATUS + '<\n'
				+ 'status description   >' + this.state.message.STATUS_DESCRIPTION + '<\n'
				+ 'archived file        >' + this.state.message.ARCHIVED_FILE + '<\n'
				+ 'transferred file     >' + this.state.message.TRANSFERRED_FILE + '<\n'
				+ 'acknowledged         >' + this.state.message.ACKNOWLEDGED + '<\n'
				+ 'acknowledgement id   >' + this.state.message.ACK_ID + '<\n'
				+ 'resubmitted          >' + this.state.message.RESUBMITTED + '<';
		}
		else if (this.state.from === 'omega')
		{
        	txt = 'origin               >' + this.state.message.ORIGIN + '<\n'
				+ 'message id           >' + this.state.message.MESSAGE_ID + '<\n'
				+ 'received time        >' + this.state.message.RECV_TIME + '<\n'
				+ 'destination          >' + this.state.message.DESTINATION + '<\n'
				+ 'record id            >' + this.state.message.REC_ID + '<\n'
				+ 'file name            >' + this.state.message.FILE_NAME + '<\n'
				+ 'file format          >' + this.state.message.FILE_FORMAT + '<\n'
				+ 'message type         >' + this.state.message.MESSAGE_TYPE + '<\n'
				+ 'related host message >' + this.state.message.RELATED_IN_MSG_ID + '<\n'
				+ 'transfer time        >' + this.state.message.TRANSFER_TIME + '<\n'
				+ 'status               >' + this.state.message.STATUS + '<\n'
				+ 'archived file        >' + this.state.message.ARCHIVED_FILE + '<\n'
				+ 'transferred file     >' + this.state.message.TRANSFERRED_FILE + '<\n'
				+ 'resubmitted          >' + this.state.message.RESUBMITTED + '<';
		}

		// NOTE: If popup setting of browser is blocked, this may cause browser crash
		// TODO: detect this and handle appropriately
		//var win = window.open(this.state.file_name, "Message", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no");
		//win.document.body.appendChild(win.document.createElement('pre')).innerHTML = txt;
		//win.document.body.appendChild(win.document.createElement('div')).innerHTML = txt2;
		//win.resizeTo(650,350);


		var elem = document.getElementById("detailsArea");
		if (elem == null)
		{
			// TODO: Write error to status bar
			//console.log('no element id by "detailsArea"');
		}
		else
		{
			while (elem.firstChild)
			{
				elem.removeChild(elem.firstChild);
			}

			var newDetails = document.createElement('pre');
			newDetails.setAttribute("class", "detailsAreaPre");
			newDetails.innerHTML = txt;
			elem.appendChild(newDetails);

			if (this.state.from === 'host')
			{
				elem.setAttribute("class", "detailsAreaFilledByHostMsg");
			}
			else if (this.state.from === 'omega')
			{
				elem.setAttribute("class", "detailsAreaFilledByOmMsg");
			}
		}
	}

	render()
	{
		if (this.state.from && this.state.action && this.state.message)
		{
			if (this.state.action === 'view')
			{
				this.viewDetails();
			}
			else if (this.state.action === 'edit')
			{
				// TODO: for now, just display
				this.viewDetails();
			}
		}

		return (
			<div>
				<b id="detailsAreaHeading">Details</b>
				<div id="detailsArea" className="detailsArea">
					Click a message on the left to see the message details
				</div>
			</div>
		);
	}

}


export default DetailsArea;
