import React from 'react';
import { Component } from 'react';


class ContentsArea extends Component
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


		this.viewContents = this.viewContents.bind(this);
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

	viewContents()
	{
	}

	render()
	{
		if (this.state.from && this.state.action && this.state.message)
		{
			if (this.state.action === 'view')
			{
				this.viewContents();
			}
			else if (this.state.action === 'edit')
			{
				// TODO: for now, just display
				this.viewContents();
			}
		}

		return (
			<div>
{/*
				<b id="contentsAreaHeading">Contents</b>
*/}
				<div id="contentsArea" className="contentsArea">
					Work In Progress
				</div>
			</div>
		);
	}

}


export default ContentsArea;
