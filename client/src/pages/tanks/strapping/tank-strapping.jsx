import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Card } from 'antd';
import axios from 'axios';

import { DataTable } from '../../../components';
import { TANK_STRAPPING } from '../../../api';
import columns from './columns';

const TankStrapping = ({ selected, isLoading }) => {
  const { t } = useTranslation();

  const [straps, setStraps] = useState([]);

  const fields = columns(t);

  useEffect(() => {
    if (selected) {
      setStraps(null);
      axios.get(`${TANK_STRAPPING.READ}?strap_tankcode=${selected?.tank_code}`).then((response) => {
        setStraps(response.data.records);
      });
    }
  }, [selected]);

  return (
    <Card hoverable loading={isLoading}>
      <DataTable columns={fields} data={straps} height="305px" />
    </Card>
  );
};

export default TankStrapping;
