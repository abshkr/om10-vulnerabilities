import React, { useEffect, useState, useCallback } from 'react';

import axios from 'axios';
import _ from 'lodash';
import { Modal, Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { EditOutlined, SaveOutlined, RedoOutlined, CloseOutlined } from '@ant-design/icons';
import { FOLIO_SUMMARY } from '../../../../api';
import { DataTable } from '../../../../components';

import generator from './generator';
import columns from './columns';

const Tanks = ({ id, enabled, access }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [preSelected, setPreSelected] = useState([]);
  const [api, setAPI] = useState(null);

  const fields = columns(t);

  const fetch = useCallback(() => {
    setLoading(true);

    axios.get(`${FOLIO_SUMMARY.TANKS}?closeout_nr=${id}`).then(response => {
      setLoading(false);

      const values = generator(response.data.records);
      const filtered = _.filter(response.data.records, ['tank_gaugingmthd_desc', 'MANUAL']);
      const preSelected = _.uniq(_.map(filtered, 'tank_code'));

      setData(values);
      setPreSelected(preSelected);
    });
  }, [id]);

  const saveToFolio = () => {
    Modal.confirm({
      title: t('prompts.save'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      centered: true,
      content: t('descriptions.saveToFolioWarning'),
      onOk: async () => {
        await axios
          .post(FOLIO_SUMMARY.SAVE_TANKS, data)
          .then(
            axios.spread(response => {
              fetch();

              notification.success({
                message: t('messages.saveSuccess'),
                description: t('descriptions.saveSuccess')
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: t('descriptions.saveSuccess')
            });
          });
      }
    });
  };

  const calculate = () => {
    Modal.confirm({
      title: t('prompts.calculate'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(FOLIO_SUMMARY.CALCULATE, selected)
          .then(
            axios.spread(response => {
              const payload = [];

              api.forEachNodeAfterFilterAndSort((rowNode, index) => {
                const filtered = _.find(response.data.data, ['tank_code', rowNode.data.tank_code]);

                if (filtered) {
                  rowNode.data.close_amb_tot = filtered.close_amb_tot;
                  rowNode.data.close_std_tot = filtered.close_std_tot;
                  rowNode.data.close_mass_tot = filtered.close_mass_tot;
                  rowNode.data.tank_prod_lvl = filtered.tank_prod_lvl;
                  rowNode.data.close_temp = filtered.close_temp;
                  rowNode.data.close_density = filtered.close_density;

                  payload.push(rowNode.data);
                }
              });

              api.updateRowData({ update: payload });

              if (response.data.calc_issues === 0) {
                notification.success({
                  message: t('messages.calculateSuccess'),
                  description: t('descriptions.calculateSuccess')
                });
              }

              if (response.data.desc.length > 0) {
                _.forEach(response.data.desc, error => {
                  notification.error({
                    message: error
                  });
                });
              }
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: t('descriptions.calculateFailed')
            });
          });
      }
    });
  };

  const save = () => {
    Modal.confirm({
      title: t('prompts.save'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      centered: true,
      content: t('descriptions.saveToTanksWarning'),
      onOk: async () => {
        await axios
          .post(FOLIO_SUMMARY.SAVE_TANKS, data)
          .then(
            axios.spread(response => {
              notification.success({
                message: t('messages.saveSuccess'),
                description: t('descriptions.saveSuccess')
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: t('descriptions.saveFailed')
            });
          });
      }
    });
  };

  const onEditingFinished = values => {
    const payload = [];

    values.api.forEachNode(node => payload.push(node.data));

    setData(payload);
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div>
      <DataTable
        columns={fields}
        data={data}
        isLoading={isLoading}
        t={t}
        height="44vh"
        onEditingFinished={onEditingFinished}
        handleSelect={setSelected}
        preSelected={preSelected}
        idKey="tank_code"
        apiContext={setAPI}
      />
      <div className="operations">
        <Button
          shape="round"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => Modal.destroyAll()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          shape="round"
          type="primary"
          icon={<RedoOutlined />}
          style={{ float: 'right', marginRight: 5 }}
          onClick={calculate}
          disabled={!enabled}
        >
          {t('operations.calculate')}
        </Button>

        <Button
          shape="round"
          type="primary"
          icon={<SaveOutlined />}
          style={{ float: 'right', marginRight: 5 }}
          onClick={save}
          disabled={!enabled || !access.canUpdate}
        >
          {t('operations.saveToTanks')}
        </Button>

        <Button
          shape="round"
          type="primary"
          icon={<EditOutlined />}
          style={{ float: 'right', marginRight: 5 }}
          onClick={saveToFolio}
          disabled={!enabled || !access.canUpdate}
        >
          {t('operations.saveToFolio')}
        </Button>
      </div>
    </div>
  );
};

export default Tanks;
