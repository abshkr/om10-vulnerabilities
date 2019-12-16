import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge } from 'antd';

import auth from '../../auth';
import columns from './columns';
import { fscStatus } from '../../api';
import { Page, DataTable } from '../../components';
import generator from './generator';

const FSCStatus = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isMaster, setMaster] = useState(false);

  useEffect(() => {
    const fetch = setInterval(() => {
      axios.all([fscStatus.heartbeat(), fscStatus.batch(), fscStatus.which()]).then(
        axios.spread((heartbeat, batch, which) => {
          const payload = generator(heartbeat.data.records, batch.data.records);
          setData(payload);
          setMaster(which.data.is_master);
          setLoading(false);
        }),
      );
    }, 1000);
    return () => clearInterval(fetch);
  }, []);

  //const Node = <div className="fsc-node">{`Current Mode: ${isMaster ? 'Master' : 'Slave'}`}</div>;
  const Node = (
    <Badge
      count={`Current Mode: ${isMaster ? 'Master' : 'Slave'}`}
      style={{ backgroundColor: isMaster ? '#52c41a' : '#fbb120', marginTop: -3 }}
    />
  );

  return (
    <Page page={t('pageMenu.operations')} name={t('pageNames.fscStatus')}>
      <DataTable modifiers={[Node]} columns={columns(t)} data={data} t={t} isLoading={isLoading} />
    </Page>
  );
};

export default auth(FSCStatus);
