import React from 'react';
import { Component } from 'react';
import fs from 'fs';
//import cfg from './Config';

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

		this.onEditChange = this.onEditChange.bind(this);
		//this.getCfgData = this.getCfgData.bind(this);
		this.onSubmitChange = this.onSubmitChange.bind(this);
		this.viewContents = this.viewContents.bind(this);
		this.traverse = this.traverse.bind(this);
		this.convert = this.convert.bind(this);
		this.getData = this.getData.bind(this);
		this.extractValues = this.extractValues.bind(this);
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




	viewContents(contents)
	{
		var heading = document.getElementById("contentsAreaHeading");
		if (heading == null)
		{
			// TODO: Write error to status bar
			//console.log('no element id by "contentsAreaHeading"');
		}
		else
		{
			heading.innerHTML = "Contents";
		}

		var elem = document.getElementById("contentsArea");
		if (elem == null)
		{
			// TODO: Write error to status bar
			//console.log('no element id by "contentsArea"');
		}
		else
		{
			while (elem.firstChild)
			{
				elem.removeChild(elem.firstChild);
			}

			var newContent = document.createElement('pre');
			newContent.setAttribute("class", "contentsAreaPre");
			newContent.innerHTML = contents;
			elem.appendChild(newContent);

			if (this.state.from === 'host')
			{
				elem.setAttribute("class", "contentsAreaFilledByHostMsg");
			}
			else if (this.state.from === 'omega')
			{
				elem.setAttribute("class", "contentsAreaFilledByOmMsg");
			}
		}
	}


	traverse(jsmsg, txt, indent_level)
	{
		txt += '<tr>';
		txt += '<td>';
		for (var i=0; i<indent_level; i++)
		{
			txt += '&nbsp;';
		}
		txt += ((jsmsg.description?jsmsg.description : '&nbsp;') + '</td>');
		txt += ('<td id="' + jsmsg.field_name + '_TYP">' + (jsmsg.type ? jsmsg.type : '&nbsp;') + '</td>');
		txt += ('<td>' + (jsmsg.size ? jsmsg.size : '&nbsp;') + '</td>');

		if (typeof jsmsg.fields !== 'undefined' && jsmsg.fields !== [])
		{
			txt += ('<td>' + (jsmsg.value ? jsmsg.value : '&nbsp;') + '</td>');
		}
		else
		{
			txt += ('<td>');

			// WARNING: when creating html tags by concatenation, use keyword "class", NOT "className".
			//txt += ('<input id="' + jsmsg.field_name + '" type="text" class="contentsAreaPreBodyInputFld" value="'
			// size does not seem to work in CSS, so do it here
			txt += ('<input id="' + jsmsg.field_name + '" type="text" size="40%" value="'
							+ (jsmsg.value ? jsmsg.value : '&nbsp;')
							+ '" onChange={this.onEditChange}');
			txt += '</input>';
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

	convert(jsmsg)
	{
		// WARNING: when creating html tags by concatenation, use keyword "class", NOT "className".

		var res = '';
		res = '<div>';
		res += '<div><table class="contentsAreaPre">';
		//res += '<thead><tr><td>Field</td><td>Type</td><td>Size</td><td>Value</td></tr></thead>';
		res += '<tbody class="contentsAreaPreBody">';
		res += '<tr><td>Field</td><td>Type</td><td>Size</td><td>Value</td></tr>';
		res = this.traverse(jsmsg, res, 0);
		res += '</tbody>';
		res += '</table></div>';
		res += '<hr/>';
		res += '<div class="adjacent">';
		res += '<button id="submit" class=submitButton onClick={this.onSubmitChange}>Submit</button>';
		res += '&nbsp';
		res += '<p id="submitConfirmation" />';
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

		var heading = document.getElementById("contentsAreaHeading");
		if (heading == null)
		{
			// TODO: Write error to status bar
			//console.log('no element id by "contentsAreaHeading"');
		}
		else
		{
			heading.innerHTML = "Contents [Edit]";
		}

		var elem = document.getElementById("contentsArea");
		if (elem == null)
		{
			// TODO: Write error to status bar
			//console.log('no element id by "contentsArea"');
		}
		else
		{
			if (this.state.from === 'host')
			{
				elem.setAttribute("class", "contentsAreaFilledByHostMsg");
			}
			else if (this.state.from === 'omega')
			{
				elem.setAttribute("class", "contentsAreaFilledByOmMsg");
			}

			elem.setAttribute("onChange", "{this.onEditChange}");
			elem.setAttribute("onClick", "{this.onSubmitChange}");
			elem.innerHTML = res;
		}
	}


	getData()
	{
		var url;
		if (this.state.from === 'host')
		{
			url = process.env.REACT_APP_API_URL + '/hmi/parse/host_message';
		}
		else if (this.state.from === 'omega')
		{
			//url = "http://10.2.20.53:6443/parse/omega_message/";
			url = process.env.REACT_APP_API_URL + '/hmi/parse/omega_message';
		}

		var act = this.state.action;
		var viewFn = this.viewContents;
		var editFn = this.convert;

		if (this.state.content_format === 1)
		{
			// BEWARE: when using post method with body data, must:
			// 1. on client side, set text content type in header, AND
			// 2. on server side, specify urlencoded body in second arg in the route
			fetch(url, {
				method: 'POST',
				headers: {
					'Accept': 'application/text',
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({rec_id: this.state.message.REC_ID, content_format: this.state.content_format})
			}).then(response => {
				response.text().then(function (text) {
					//console.log('resp:'+ JSON.stringify(body, null, '\t'));
					if (response.ok)
					{
						if (act === 'view')
						{
							viewFn(text);
						}
						else
						{
							var err = 'Cannot edit text version of message';
							console.error('ERROR:' + err);
							// TODO: clear contents area
							alert(err);
						}
					}
					else
					{
						console.error('ERROR:' + text);
						// TODO: clear contents area
						viewFn('ERROR: ' + text);
					}
				});
			});
		}
		else if (this.state.content_format === 2)
		{
			// BEWARE: when using post method with body data, must:
			// 1. on client side, set json content type in header, AND
			// 2. on server side, specify json body in second arg in the route
			fetch(url, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({rec_id: this.state.message.REC_ID, content_format: this.state.content_format})
			}).then(response => {
				response.json().then(body => {
					//console.log('resp:'+ JSON.stringify(body, null, '\t'));
					if (response.ok)
					{
						if (this.state.action === 'view')
						{
							viewFn(body);
						}
						else if (this.state.action === 'edit')
						{
							editFn(body);
						}
					}
					else
					{
						console.error('ERROR:' + body.message);
						// TODO: clear contents area
						viewFn('ERROR:' + body.message);
					}
				});
			});
		}
	}


	extractValues()
	{
		var elem = document.getElementById("contentsArea");
		var valstr='';
		if (elem)
		{
			var valueList = elem.getElementsByTagName("input");
			for (var i=0; i<valueList.length; i++)
			{
				valstr += valueList[i].value;
			}
		}

		return valstr;
	}

	onEditChange(ev)
	{
		if (ev) { ev.preventDefault(); }
		//console.log('onEditChange:'+ev.target.id + ',' + ev.type + ',' + ev.target.value);
		var changedElem = document.getElementById(ev.target.id);
		//console.log('current value:'+changedElem.value);
		changedElem.setAttribute("class", "edited");
	}



	onSubmitChange(ev)
	{
		//console.log('onSubmitChange:'+ev.target.id + ',' + ev.type + ',' + ev.target.value);
		if (ev) { ev.preventDefault(); }
		if (ev.target.id === "submit")
		{
			// TODO: do this once only
			var url = process.env.REACT_APP_API_URL + '/hmi/config';
			fetch(url, {
				method: 'GET',
				credentials: 'include'
			}).then(response => {
				response.json().then(body => {
					if (response.ok)
					{
						var jsval = {};
						jsval['origin'] = this.state.message.ORIGIN;
						jsval['file_name'] = this.state.message.FILE_NAME; 
						jsval['content'] = this.extractValues();

						// BEWARE: when using post method with json body data, must:
						// 1. on client side, set jsoncontent type in header, AND
						// 2. on server side, specify json body in second arg in the route
						if (this.state.from === 'host')
						{
							url = process.env.REACT_APP_API_URL + '/hmi/edit/host_message';

							jsval['file_name'] = this.create_filename_from_content(body.message.hosts);
						}
						else if (this.state.from === 'omega')
						{
							url = process.env.REACT_APP_API_URL + '/hmi/edit/omega_message';
						}

						fetch(url, {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							credentials: 'include',
							body: JSON.stringify(jsval)
						}).then(response => {
							response.json().then(body => {
								if (response.ok)
								{
									//console.log('resp:'+ JSON.stringify(body, null, '\t'));

									var elem = document.getElementById("submitConfirmation");
									if (elem != null)
									{
										//var res = '<div>' + body.message + '</div>';
										//elem.appendChild(document.createElement('div')).innerHTML = res;
										elem.innerHTML = body.message;
										elem.setAttribute("class", "blinking");
									}
								}
								else
								{
									console.error('ERROR:' + body.message);
									// TODO: clear contents area
									alert(body.message);
									return;
								}
							});
						});
					}
					else
					{
						console.error('ERROR:' + body.message);
						// TODO: clear contents area
						alert(body.message);
						return;
					}
				})
			});
		}
	}


	render()
	{
		if (this.state.from && this.state.action && this.state.message)
		{
			this.getData();
		}

		return (
			<div>
				<b id="contentsAreaHeading">Contents</b>
				<div id="contentsArea" className="contentsArea"
						onInput={this.onEditChange}
						onClick={this.onSubmitChange}>
					Click a message on the left to see the message contents
				</div>
			</div>
		);
	}



	get_cfg_data(filenm)
	{
		var data = null;
		var cfg_data = null;

		try
		{
			data = fs.readFileSync(filenm, 'utf8');
		}
		catch (ex)
		{
			//logr.write_to_console(__filename, __line, 'ERROR:'+ex);
			return;
		}

		try
		{
			cfg_data = JSON.parse(data);
			//logr.write_to_console(__filename, __line, 'cfg_data parsed:')
			//logr.write_to_console(__filename, __line, JSON.stringify(cfg_data, null, '\t'))
		}
		catch (ex)
		{
			var msg = 'ERROR: Failed to parse ' + filenm + ' , ' + ex;
			//logr.write_to_console(__filename, __line, msg);
			//logr.write_to_omega_log(__filename, __line, msg);
		}

		return cfg_data;
	}



	find_conn_data_for_host_msg(search_criteria, host_list)
	{
		var found = false;
		var conn = [];
		for (var i = 0; i < host_list.length && !found; i++)
		{
			if (search_criteria === host_list[i].ip)
			{
				var conns = host_list[i].conns;
				for (var j = 0; j < conns.length && !found; j++)
				{
					if (conns[j].data_flow_direction === "from")
					{
						conn = conns[j];
						found = true;
						break;
					}
				}
			}
		}

		return conn;
	}

	find_conn_data_for_om_msg(search_criteria, host_list)
	{
		var found = false;
		var conn = '';
		for (var i = 0; i < host_list.length && !found; i++)
		{
			var conns = host_list[i].conns;
			for (var j = 0; j < conns.length && !found; j++)
			{
				conn = conns[j];
				if (conn.data_flow_direction === "to")
				{
					var routes = conn.route_to;
					for (var k = 0; k < routes.length && !found; k++)
					{
						// TODO: if search criteria used is origin,
						// this code would be wrong
						var rinfo = routes[k][search_criteria];
						if (typeof rinfo !== 'undefined' && rinfo !== '')
						{
							found = true;
							break;
						}
					}
				}
			}
		}

		return conn;
	}

	create_filename_from_content(host_list)
	{
		var file_nm = '';

		if (this.state.from === 'host')
		{
			//console.log('origin:'+this.state.message.ORIGIN);
			//console.log('host_list:'+JSON.stringify(host_list,null,'\t'));
			var conn = this.find_conn_data_for_host_msg(this.state.message.ORIGIN, host_list);
			//console.log('conn:'+JSON.stringify(conn,null,'\t'));
			var err;
			var elem;
			var elemTyp;
			var fldnm;
			var fldfmt;
			var fefields = conn.file_name_format.fe_fields;
			for (var f = 0; f < fefields.length; ++f)
			{
				//console.log('fefields['+f+']:<'+fefields[f]+'>');
				var idx = fefields[f].indexOf(":");
				if (idx === -1)
				{
					elem = document.getElementById(fefields[f]);
					if (elem)
					{
						fldnm = fefields[f];
						elemTyp = document.getElementById(fldnm + '_TYP');
						if (elemTyp)
						{
							if (elemTyp.textContent === 'ASCII_9')
							{
								file_nm += parseInt(elem.value.trim(), 10);
							}
							else
							{
								file_nm += elem.value.trim();
							}
						}
						else
						{	
							file_nm += elem.value.trim();
						}
						//console.log('file_nm:<'+file_nm+'>');
					}
					else
					{
						err = 'ERROR: element with id ' + fefields[f] + ' do not exist';
						console.error('ERROR:' + err);
						// TODO: clear contents area
						alert(err);
						return;
					}
				}
				else
				{
					fldnm = fefields[f].substr(0, idx);
					fldfmt = fefields[f].substr(idx+1);
					//console.log('fldnm:<'+fldnm+'>');
					//console.log('fldfmt:<'+fldfmt+'>');


					elem = document.getElementById(fldnm);
					var fldVal;
					if (elem)
					{
						fldVal = elem.value.trim();
						//console.log('fldVal:<'+fldVal+'>');
					}
					else
					{
						err = 'ERROR: element with id ' + fldnm + ' do not exist';
						console.error('ERROR:' + err);
						// TODO: clear contents area
						alert(err);
						return;
					}

					var newFmt = 'yyyymmddhhmmssfff';
					if (fldfmt === 'SHORT')
					{
						var shortnames = {};
						shortnames['LOAD:SPEC'] = 'SHP';
						shortnames['LOAD:ORDER'] = 'ORD';
						shortnames['OPEN:ORD'] = 'CON';
						shortnames['LOAD:DELETE'] = 'LDE';
						shortnames['TANKER:DET'] = 'TKC';
						shortnames['TANKER:DELETE'] = 'TKD';
						shortnames['PARTNER:DET'] = 'PARD';
						shortnames['DELIVERY:DET'] = 'DLV';

						var shortnm = shortnames[fldVal];
						//console.log('shortnm:'+shortnm);
						if (typeof shortnm !== undefined && shortnm !== '')
						{
							file_nm += shortnm;
							//console.log('file_nm:<'+file_nm+'>');
						}
						else
						{
							err = 'ERROR: No short name exist';
							console.error('ERROR:' + err);
							// TODO: clear contents area
							alert(err);
							return;
						}
					}
					else if (fldfmt === newFmt)
					{
						//console.log('elemTyp:<'+fldnm+'_TYP>');
						elemTyp = document.getElementById(fldnm + '_TYP');
						if (elemTyp)
						{
							//console.log('elemTyp.value:<'+elemTyp.textContent+'>');
							var origFmt = 'ASCII_DDdMMdCCYYHHcMMcSS';
							if (elemTyp.textContent === origFmt)
							{
								var day = fldVal.substr(0,2);
								var month = fldVal.substr(3,2);
								var year = fldVal.substr(6,4);
								var hour = fldVal.substr(10,2);
								var min = fldVal.substr(13,2);
								var sec = fldVal.substr(16,2);

								var now = new Date().toISOString();
								now = now.replace(/[T\-:.Z]/g, '');
								//console.log('now:'+now);
								var msec = parseInt(now.substr(now.length - 3));
								var newFmtVal = year + month + day + hour + min + sec + msec;
								//console.log('newFmtVal:'+newFmtVal);
								file_nm += newFmtVal;
								//console.log('file_nm:<'+file_nm+'>');
							}
							else
							{
								err = 'ERROR: Don\'t know how to convert ' + elem.value + ' from format '
											+ origFmt + ' to ' + newFmt;
								console.error('ERROR:' + err);
								// TODO: clear contents area
								alert(err);
								return;
							}
						}
						else
						{
							err = 'ERROR: element with id ' + fldnm + '_TYP do not exist';
							console.error('ERROR:' + err);
							// TODO: clear contents area
							alert(err);
							return;
						}
					}
				}

				if (f < fefields.length - 1)
				{
					file_nm += conn.file_name_format.field_separator;
				}
			}
			file_nm += (conn.file_name_format.extension_prefix + conn.file_name_format.extension);
			//console.log('final file_nm:'+file_nm);
		}

		return file_nm;
	}
}

export default ContentsArea;
