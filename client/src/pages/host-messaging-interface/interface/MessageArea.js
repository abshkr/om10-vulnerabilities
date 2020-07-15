import React from 'react';
import { useState, useEffect } from 'react';
import fs from 'fs';

const MessageArea = ({from, action, message, content_format, handleTaskComplete}) => {

	const [ifrom, setFrom] = useState('');
	const [iaction, setAction] = useState('');
	const [icontent_format, setContentFormat] = useState('');
	const [imessage, setMessage] = useState('');
	const [icontent, setContent] = useState('');

	var urlprefix = process.env.REACT_APP_API_URL || '';
	var dbstr = process.env.REACT_APP_OMEGA_USER || '';

	const getData = () => {
		if (message)
		{
			var url;
			if (from === 'host')
			{
				url = urlprefix + '/hmi/parse/host_message';
			}
			else if (from === 'omega')
			{
				url = urlprefix + '/hmi/parse/omega_message';
			}

			if (dbstr)
			{
				url = url + '?db=' + dbstr;
			}

			if (content_format === 1)
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
					body: JSON.stringify({rec_id: message.REC_ID, content_format: content_format})
				}).then(response => {
					response.text().then(function (text) {
						//console.log('resp:'+ JSON.stringify(text, null, '\t'));
						setContent(text);	
					});
				});
			}
			else if (content_format === 2)
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
					body: JSON.stringify({rec_id: message.REC_ID, content_format: content_format})
				}).then(response => {
					response.json().then(body => {
						//console.log('resp:'+ JSON.stringify(body, null, '\t'));
						setContent(body);
					});
				});
			}
		}
	}


  useEffect(() => {
		if (   (from !== ifrom)
			  || (action !== iaction)
				|| (content_format !== icontent_format)
			  || (message !== imessage)
			 )
		{
			setFrom(from);
			setAction(action);
			setContentFormat(content_format);
			setMessage(message);
			getData();
		}
  }, [from, action, content_format, message]);

  useEffect(() => {
		if (action !== iaction && action === 'submit')
		{
			onSubmitChange();
		}
  }, [action]);


	const viewMessage = (contents) => {
		var heading = document.getElementById("messageAreaHeading");
		if (heading == null)
		{
			// TODO: Write error to status bar
			//console.log('no element id by "messageAreaHeading"');
		}
		else
		{
			heading.innerHTML = "Message";
		}

		var elem = document.getElementById("messageArea");
		if (elem == null)
		{
			// TODO: Write error to status bar
			//console.log('no element id by "messageArea"');
		}
		else
		{
			while (elem.firstChild)
			{
				elem.removeChild(elem.firstChild);
			}

			var newContent = document.createElement('pre');
			newContent.setAttribute("class", "messageAreaPre");
			newContent.innerHTML = contents;
			elem.appendChild(newContent);

			if (from === 'host')
			{
				elem.setAttribute("class", "messageAreaFilledByHostMsg");
			}
			else if (from === 'omega')
			{
				elem.setAttribute("class", "messageAreaFilledByOmMsg");
			}
		}
	}


	const traverse = (jsmsg, txt, indent_level) => {
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
			//txt += ('<input id="' + jsmsg.field_name + '" type="text" class="messageAreaPreBodyInputFld" value="'
			// size does not seem to work in CSS, so do it here
			txt += ('<input id="' + jsmsg.field_name + '" type="text" size="40%" value="'
							+ (jsmsg.value ? jsmsg.value : '&nbsp;')
							+ '" onChange={onEditChange}');
			txt += '</input>';
			txt += ('</td>');
		}
		txt += '</tr>';

		if (typeof jsmsg.fields !== 'undefined' && jsmsg.fields !== [])
		{
			for (var obj of jsmsg.fields)
			{
				txt = traverse(obj, txt, indent_level+1);
			}
		}

		return txt;
	}

	const convert = (jsmsg) => {
		// WARNING: when creating html tags by concatenation, use keyword "class", NOT "className".

		var res = '';
		res = '<div>';
		res += '<div><table class="messageAreaPre">';
		//res += '<thead><tr><td>Field</td><td>Type</td><td>Size</td><td>Value</td></tr></thead>';
		res += '<tbody class="messageAreaPreBody">';
		res += '<tr><td>Field</td><td>Type</td><td>Size</td><td>Value</td></tr>';
		res = traverse(jsmsg, res, 0);
		res += '</tbody>';
		res += '</table></div>';
		//console.log('res:'+res);


		var heading = document.getElementById("messageAreaHeading");
		if (heading == null)
		{
			// TODO: Write error to status bar
			//console.log('no element id by "messageAreaHeading"');
		}
		else
		{
			heading.innerHTML = "Message [Edit]";
		}

		var elem = document.getElementById("messageArea");
		if (elem == null)
		{
			// TODO: Write error to status bar
			//console.log('no element id by "messageArea"');
		}
		else
		{
			if (from === 'host')
			{
				elem.setAttribute("class", "messageAreaFilledByHostMsg");
			}
			else if (from === 'omega')
			{
				elem.setAttribute("class", "messageAreaFilledByOmMsg");
			}

			elem.setAttribute("onChange", "{onEditChange}");
			elem.setAttribute("onClick", "{onSubmitChange}");
			elem.innerHTML = res;
		}
	}


	const extractValues = (conn) => {
		var elem = document.getElementById("messageArea");
		var valstr='';
		if (elem)
		{
			var valueList = elem.getElementsByTagName("input");
			var inserted_msgid_fld = conn.file_name_format.inserted_message_id_field;

			if (inserted_msgid_fld == '')
			{
				for (var i=0; i < valueList.length; i++)
				{
					valstr += valueList[i].value;
				}
			}
			else
			{
				for (var i=0; i < valueList.length; i++)
				{
					if (inserted_msgid_fld != valueList[i].id)
					{
						valstr += valueList[i].value;
					}
				}
			}
		}

		return valstr;
	}

	const onEditChange = (ev) => {
		var changedElem = document.getElementById(ev.target.id);
		//console.log('current value:'+changedElem.value);
		changedElem.setAttribute("class", "edited");
	}



	const onSubmitChange = () => {
		//console.log('onSubmitChange:'+ev.target.id + ',' + ev.type + ',' + ev.target.value);
		//if (ev) { ev.preventDefault(); }
		//if (ev.target.id === "submit")
		{
			// TODO: do this once only
			var url = urlprefix + '/hmi/config';
			if (dbstr)
			{
				url = url + '?db=' + dbstr;
			}

			fetch(url, {
				method: 'POST',
				credentials: 'include'
			}).then(response => {
				response.json().then(body => {
					if (response.ok)
					{
						var conn = getConnObj(body.message.hosts);

						var jsval = {};
						jsval['origin'] = message.ORIGIN;
						jsval['destination'] = message.DESTINATION;
						jsval['file_name'] = message.FILE_NAME; 
						jsval['content'] = extractValues(conn);

						// BEWARE: when using post method with json body data, must:
						// 1. on client side, set json content type in header, AND
						// 2. on server side, specify json body in second arg in the route
						if (from === 'host')
						{
							url = urlprefix + '/hmi/edit/host_message';
							if (dbstr)
							{
								url = url + '?db=' + dbstr;
							}

							var res = create_filename_from_content(conn);
							if (res.ok)
							{
								jsval['file_name'] = res.result;
							}
						}
						else if (from === 'omega')
						{
							url = urlprefix + '/hmi/edit/omega_message';
							if (dbstr)
							{
								url = url + '?db=' + dbstr;
							}
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
									handleTaskComplete(body.message);  
								}
								else
								{
									console.error('ERROR:' + body.message);
									handleTaskComplete(body.message);  
									alert(body.message);
								}
							});
						});
					}
					else
					{
						console.error('ERROR:' + body.message);
						handleTaskComplete(body.message);  
						alert(body.message);
					}
				})
			});
		}
	}



	const get_cfg_data = (filenm) => {
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



	const find_conn_data_for_host_msg = (search_criteria, host_list) => {
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

	const find_conn_data_for_om_msg = (search_criteria, host_list) => {
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

	const getConnObj = (host_list) => {
		if (from === 'host')
		{
			return find_conn_data_for_host_msg(message.ORIGIN, host_list);
		}
		else if (from === 'omega')
		{
			return find_conn_data_for_om_msg(message.ORIGIN, host_list);
		}
		else
		{
			return {};
		}
	}


	const create_filename_from_content = (conn) => {
		var file_nm = '';

		if (from === 'host')
		{
			var err;
			var elem;
			var elemTyp;
			var fldnm;
			var fldfmt;
			var fe_fields = conn.file_name_format.fe_fields;
			var search_key = message.MESSAGE_TYPE;

			for (var fef = 0; fef < fe_fields.length; ++fef)
			{
				var objkey = Object.keys(fe_fields[fef]);
				if (objkey[0] != search_key)
				{
					continue;
				}

				var fefields = fe_fields[fef][search_key];

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
							// TODO: clear message area
							alert(err);
							return {'ok': false, 'result': ''};
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
							// TODO: clear message area
							alert(err);
							return {'ok': false, 'result': ''};
						}

						var newFmt = 'yyyymmddhhmmssfff';
						if (fldfmt === 'SHORT')
						{
							// TODO: get these from config
							var shortnames = {};
							shortnames['LOAD:SPEC'] = 'SHP';
							shortnames['LOAD:ORDER'] = 'ORD';
							shortnames['OPEN:ORD'] = 'CON';
							shortnames['LOAD:DELETE'] = 'DEL';
							shortnames['LOAD:DETAIL'] = 'LDD';
							shortnames['LOAD:REJECT'] = 'REJ';
							shortnames['ALEAUD:UPLOAD'] = 'ACK';
							shortnames['DOC:REQUEST'] = 'DOC';
							shortnames['TANKER:DET'] = 'TKC';
							shortnames['OILNOM'] = 'NOM';
							shortnames['OILTKT'] = 'TKT';
							shortnames['PID:REQUEST'] = 'EOD';
							shortnames['PDS:REQUEST'] = 'PDS';
							shortnames['SPCL:MVMENT'] = 'SPM';
							shortnames['CUSTOMER:DET'] = 'CUS';
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
								// TODO: clear message area
								alert(err);
								return {'ok': false, 'result': ''};
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
									// TODO: clear message area
									alert(err);
									return {'ok': false, 'result': ''};
								}
							}
							else
							{
								err = 'ERROR: element with id ' + fldnm + '_TYP do not exist';
								console.error('ERROR:' + err);
								// TODO: clear message area
								alert(err);
								return {'ok': false, 'result': ''};
							}
						}
					}

					if (f < fefields.length - 1)
					{
						file_nm += conn.file_name_format.field_separator;
					}
				}
			}
			file_nm += (conn.file_name_format.extension_prefix + conn.file_name_format.extension);
			//console.log('final file_nm:'+file_nm);
		}

		return {'ok': true, 'result': file_nm};
	}

	const create_display_data = () => {
		//console.log('create_display_data:'+content_format+','+action+','+icontent.length);
		if (content_format === 1)
		{
			if (action === 'view')
			{
				viewMessage(icontent);
			}
			else if (action === 'edit')
			{
				var err = 'Cannot edit text version of message';
				console.error('ERROR:' + err);
				// TODO: clear message area
				alert(err);
			}
		}
		else if (content_format === 2)
		{
			if (action === 'view')
			{
				viewMessage(icontent);
			}
			else if (action === 'edit')
			{
				convert(icontent);
			}
			else if (action === 'submit')
			{
				//onSubmitChange();
			}
		}
	}



	return (

		<div>
			<b id="messageAreaHeading">Message</b>
			<div id="messageArea" className="messageArea"
					onInput={onEditChange}
			>
				{create_display_data()}
			</div>
		</div>
	);


}

export default MessageArea;
