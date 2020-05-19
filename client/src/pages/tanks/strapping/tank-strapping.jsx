import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import axios from 'axios';

import { DataTable } from '../../../components';
import { TANK_STRAPPING } from '../../../api';

import columns from './columns';

const TankStrapping = ({ tank }) => {
  const { t } = useTranslation();

  const [straps, setStraps] = useState([]);

  const fields = columns(t);

  useEffect(() => {
    if (tank) {
      setStraps(null);
      axios.get(`${TANK_STRAPPING.READ}?strap_tankcode=${tank}`).then((response) => {
        setStraps(response.data.records);
      });
    }
  }, [tank]);

  return <DataTable columns={fields} data={straps} height="305px" />;
};

export default TankStrapping;
