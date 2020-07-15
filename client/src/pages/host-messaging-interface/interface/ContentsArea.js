import React from 'react';
import { useState, useEffect } from 'react';
import useSWR from 'swr';


const ContentsArea = ({from, action, message, content_format }) => {

  const [ifrom, setFrom] = useState('');
	const [icontent_format, setContentFormat] = useState('');
  const [imessage, setMessage] = useState('');
  const [icontent, setContent] = useState('');

	var urlprefix = process.env.REACT_APP_API_URL || '';
	var dbstr = process.env.REACT_APP_OMEGA_USER || '';
	var url = urlprefix + '/hmi/read_file';
	if (dbstr)
	{
		url = url + '?db=' + dbstr;
	}

	var getData = async () => {
		if (message && from)
		{
			fetch(url, {
				method: 'POST',
				headers: {
					'Accept': 'application/text',
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({rec_id: message.REC_ID, from: from})
			}).then(response => {
				response.json().then(body => {
					setContent(body.message);
				});
			});
		}
	};

  const { data: payload } = useSWR(url, getData);

  useEffect(() => {

		var msg_recid = message?.REC_ID || '';
		var imsg_recid = imessage?.REC_ID || ''; 
		if (	 (msg_recid != imsg_recid)
				|| (from && ifrom && from !== ifrom)
			 )
		{
			setFrom(from);
			setMessage(message);
			getData();
		}
  }, [from, message]);


	if (from === 'host')
	{
		return(
			<div id="contentsArea" className="contentsAreaFilledByHostMsg">
					<pre className="contentsAreaPre" >{icontent}</pre>
			</div>
		);
	}
	else if (from === 'omega')
	{
		return(
			<div id="contentsArea" className="contentsAreaFilledByOmMsg">
					<pre className="contentsAreaPre" >{icontent}</pre>
			</div>
		);
	}
}


export default ContentsArea;
