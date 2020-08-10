import React from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Search = ({ value, search, isLoading }) => {
  const { t } = useTranslation();
  return (
    <Input.Search
      placeholder={t('operations.filter')}
      value={value}
      onChange={query => search(query.target.value)}
      style={{ marginBottom: 5, width: 250, marginRight: 5 }}
      disabled={isLoading}
      allowClear
    />
  );
};

export default Search;
