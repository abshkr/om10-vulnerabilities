import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { default as tankConfiguration } from '../pages/tank-configuration/columns';

const useAllSearch = () => {
  const { t } = useTranslation();

  const [results, setResults] = useState([]);

  const TANK_CONFIGURATIONS = t('pageNames.tankConfiguration');

  const payload = {};

  payload[t('pageNames.tankConfiguration')] = tankConfiguration(null, t);

  return <div></div>;
};

export default useAllSearch;
