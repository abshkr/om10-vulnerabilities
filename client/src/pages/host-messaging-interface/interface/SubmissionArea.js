import React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { DataTable } from '../../../components';
import columns from './SubmissionColumns';

const SubmissionArea = ({ from, message }) => {
  const [ifrom, setFrom] = useState('');
  const [imessage, setMessage] = useState('');
  const [isubmission, setSubmission] = useState('');

  const { t } = useTranslation();

  const fields = columns(t);

  var urlprefix = process.env.REACT_APP_API_URL || '';
  var dbstr = process.env.REACT_APP_OMEGA_USER || '';
  var url = urlprefix + '/hmi/submission';
  if (dbstr) {
    url = url + '?db=' + dbstr;
  }

  var getData = async () => {
    if (message && from) {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/text',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ rec_id: message.REC_ID, from: from }),
      }).then((response) => {
        response.json().then((body) => {
          if (response.ok) {
            setSubmission(body.message);
            return body;
          } else {
            return {};
          }
        });
      });
    }
  };

  const { data: payload, isValidating, mutate: revalidate } = useSWR(url, getData);

  useEffect(() => {
    var msg_recid = message?.REC_ID || '';
    var imsg_recid = imessage?.REC_ID || '';
    if (msg_recid != imsg_recid || (from && ifrom && from !== ifrom)) {
      setFrom(from);
      setMessage(message);
      getData();
    }
  }, [from, message]);

  if (from === 'host') {
    return (
      <div id="submission" className="submissionAreaFilledByHostMsg">
        <DataTable data={isubmission} columns={fields} selectionMode="single" isLoading={isValidating} />
      </div>
    );
  } else if (from === 'omega') {
    return (
      <div id="submission" className="submissionAreaFilledByOmMsg">
        <DataTable data={isubmission} columns={fields} selectionMode="single" isLoading={isValidating} />
      </div>
    );
  }
};

export default SubmissionArea;
