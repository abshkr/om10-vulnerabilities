import React, { useState, useEffect, useCallback } from 'react';

import { Page, Filter, DataTable, Download, Container } from '../../components';
import { Button, Modal, notification } from 'antd';
import { equipmentList } from '../../api';
import { search } from '../../utils';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import axios from 'axios';

const EquipmentList = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [expiry, setExpiry] = useState([]);
  const [resize, setResize] = useState(false);
  const [filtered, setFiltered] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    Modal.info({
      title: !!object
        ? `${t('operations.editing')} (${object.eqpt_id} / ${object.eqpt_code})`
        : `${t('operations.create')}`,
      centered: true,
      width: '50vw',
      icon: !!object ? 'edit' : 'form',
      content: <Forms value={object} refresh={fetch} t={t} expiry={expiry} data={data} />,
      okButtonProps: {
        style: { display: 'none' }
      }
    });
  };

  const handleSearch = query => {
    const { value } = query.target;

    setFiltered(search(value, data));
    setValue(value);
  };

  const fetch = useCallback(() => {
    setLoading(true);
    axios
      .all([equipmentList.readEquipment(), equipmentList.readExpiry()])
      .then(
        axios.spread((tankers, expiry) => {
          setLoading(false);
          setData(tankers.data.records);
          setExpiry(expiry.data.records);
        })
      )
      .catch(error => {
        setLoading(false);
        notification.error({
          message: error.message,
          description: t('descriptions.requestFailed')
        });
      });
  }, [t]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const results = !!filtered ? filtered : data;
  const fields = columns(results, t);

  return (
    <Page
      page={t('pageMenu.schedules')}
      name={t('pageNames.equipmentList')}
      isLoading={isLoading}
      block={true}
    >
      <Container>
        <Filter value={value} search={handleSearch} loading={isLoading} />
        <Button
          shape="round"
          type="primary"
          icon={resize ? 'shrink' : 'arrows-alt'}
          style={{ float: 'right' }}
          onClick={() => setResize(!resize)}
          disabled={isLoading}
        />
        <Download
          data={data}
          type={'equipment_list'}
          style={{ float: 'right', marginRight: 5 }}
          loading={isLoading}
        />
        <Button
          shape="round"
          icon="plus"
          type="primary"
          style={{ float: 'right', marginRight: 5 }}
          onClick={() => handleClick(null)}
          disabled={isLoading}
        >
          {t('operations.create')}
        </Button>
        <DataTable
          rowKey="eqpt_id"
          resize={resize}
          columns={fields}
          data={results}
          isLoading={isLoading}
          click={handleClick}
        />
      </Container>
    </Page>
  );
};

export default auth(EquipmentList);
