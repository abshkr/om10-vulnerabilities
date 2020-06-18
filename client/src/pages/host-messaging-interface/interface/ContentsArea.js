import React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';


const ContentsArea = ({from, action, message, contentFormat, handleFormState}) => {

  const [ifrom, setFrom] = useState(from);
  const [iaction, setAction] = useState(action);
  const [imessage, setMessage] = useState(message);
  const [icontentFormat, setContentFormat] = useState(contentFormat);
  const [icontent, setContent] = useState('');

  const { t } = useTranslation();

	const url = process.env.REACT_APP_API_URL + '/hmi/read_file';

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
				console.log('Content:'+JSON.stringify(body,null,'\t')); 
				setContent(body.message);
				return body;
			});
		});
	};

  const { data: payload, isValidating, revalidate } = useSWR(url, getData);


  useEffect(() => {
		if (	 (message && imessage && message.REC_ID != imessage.REC_ID)
				|| (from && ifrom && from != ifrom)
			 )
		{
			console.log('message:'+message.REC_ID+', imessage:'+imessage.REC_ID);
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
