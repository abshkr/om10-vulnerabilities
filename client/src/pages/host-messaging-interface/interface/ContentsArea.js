import React from 'react';
import { useState, useEffect } from 'react';
import useSWR from 'swr';


const ContentsArea = ({from, action, message, contentFormat, handleFormState}) => {

  const [ifrom, setFrom] = useState(from);
  const [imessage, setMessage] = useState(message);
  const [icontent, setContent] = useState('');

	var urlprefix = process.env.REACT_APP_API_URL;
	if (urlprefix == 'undefined')
	{
		urlprefix = '';
	}
	const url = urlprefix + '/hmi/read_file';
	//const url = '/hmi/read_file';

	var getData = async () => {
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
				return body;
			});
		});
	};

  const { data: payload } = useSWR(url, getData);

  useEffect(() => {
		if (	 (message && imessage && message.REC_ID !== imessage.REC_ID)
				|| (from && ifrom && from !== ifrom)
			 )
		{
			setFrom(from);
			setMessage(message);
			setContent('');
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
