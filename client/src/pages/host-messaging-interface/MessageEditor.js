import { Component } from 'react';


class MessageEditor extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			jsmsg: this.props.jsmsg
		};

		this.traverse = this.traverse.bind(this);
		this.resubmitChanges = this.resubmitChanges.bind(this);
		this.convert = this.convert.bind(this);
	}

	// This allows state change in parent component to initiate state change in child component
	componentWillReceiveProps(nextProps)
	{
		// TODO: need to check individual field?
		if (this.props.jsmsg !== nextProps.jsmsg)
		{
			this.setState({ jsmsg: nextProps.jsmsg });  
		}
	}


	traverse(jsmsg, txt, indent_level)
	{
		txt += '<tr>';
//		txt += ('<td>' + '&nbsp;' + '</td>');
		txt += ('<td>' + (jsmsg.description?jsmsg.description : '&nbsp;') + '</td>');
		txt += ('<td>' + (jsmsg.type ? jsmsg.type : '&nbsp;') + '</td>');
		txt += ('<td>' + (jsmsg.size ? jsmsg.size : '&nbsp;') + '</td>');

		if (typeof jsmsg.fields !== 'undefined' && jsmsg.fields !== [])
		{
			txt += ('<td>' + (jsmsg.value ? jsmsg.value : '&nbsp;') + '</td>');
		}
		else
		{
			txt += ('<td>');
			txt += ('<input type="text" value="' + (jsmsg.value ? jsmsg.value : '&nbsp;') + '"/>');
			txt += ('</td>');
		}
		txt += '</tr>';

		if (typeof jsmsg.fields !== 'undefined' && jsmsg.fields !== [])
		{
			for (var obj of jsmsg.fields)
			{
				txt = this.traverse(obj, txt, indent_level+1);
			}
		}

		return txt;
	}

	resubmitChanges()
	{
		//console.log('resubmitting changes');
	}

	convert(jsmsg)
	{
		var res = '';
		res = '<div>';
		res += '<div><table><thead><tr><td>Field</td><td>Type</td><td>Size</td><td>Value</td></tr></thead>';
		res += '<tbody>';
		res = this.traverse(jsmsg, res, 0);
		res += '</tbody>';
		res += '</table></div>';
		res += '<hr/>';
		res += '<div><button onClick={this.resubmitChanges}>Submit</button></div>';
		res += '</div>';
		//console.log('res:'+res);

/*
		var win = window.open("", "Message", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no");
		// NOTE: If popup setting of browser is blocked, this may cause browser crash
		// TODO: detect this and handle appropriately
		// TODO: current limitation: can't open multiple windows; if invoke multiple functions, all contents go into
		// one window.
    	win.document.body.appendChild(win.document.createElement('div')).innerHTML = res;
		win.resizeTo(900,800);
*/

		return res;
	}


	render()
	{
		return (
			this.convert(this.state.jsmsg)
		);
	}

}


export default MessageEditor;
