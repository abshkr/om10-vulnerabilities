import React, { useEffect, useState, useCallback } from 'react';

import _ from 'lodash';
import { Modal, Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { EditOutlined, SaveOutlined, RedoOutlined, CloseOutlined } from '@ant-design/icons';
import api, { FOLIO_SUMMARY } from '../../../../api';
import { DataTable } from '../../../../components';

import generator from './generator';
import columns from './columns';

const Tanks = ({ id, enabled, access, handleFormState }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [preSelected, setPreSelected] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);

  const fields = columns(t);

  const fetch = useCallback(() => {
    setLoading(true);

    api.get(`${FOLIO_SUMMARY.TANKS}?closeout_nr=${id}`).then((response) => {
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
        await api
          .post(FOLIO_SUMMARY.UPDATE_TANKS, data)
          .then((response) => {
            fetch();

            notification.success({
              message: t('messages.saveSuccess'),
              description: t('descriptions.saveSuccess'),
            });
          })

          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const calculate = () => {
    if (selected.length <= 0) {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('descriptions.tankNotSelected'),
      });
      return;
    }

    Modal.confirm({
      title: t('prompts.calculate'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(FOLIO_SUMMARY.CALCULATE, selected)
          .then((response) => {
            const payload = [];

            tableAPI.forEachNodeAfterFilterAndSort((rowNode, index) => {
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

            tableAPI.updateRowData({ update: payload });

            if (response.data.calc_issues === 0) {
              notification.success({
                message: t('messages.calculateSuccess'),
                description: t('descriptions.calculateSuccess'),
              });
            }

            if (response.data.desc.length > 0) {
              _.forEach(response.data.desc, (error) => {
                notification.error({
                  message: error,
                });
              });
            }
          })

          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const saveToTanks = () => {
    Modal.confirm({
      title: t('prompts.save'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      centered: true,
      content: t('descriptions.saveToTanksWarning'),
      onOk: async () => {
        await api
          .post(FOLIO_SUMMARY.SAVE_TO_TANKS, {
            folio_tanks: data
          })
          .then((response) => {
            notification.success({
              message: t('messages.saveSuccess'),
              description: t('descriptions.saveSuccess'),
            });
          })

          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const onEditingFinished = (values) => {
    const payload = [];
    values.api.forEachNode((node) => payload.push(node.data));

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
        height="25vh"
        onEditingFinished={onEditingFinished}
        handleSelect={setSelected}
        preSelected={preSelected}
        idKey="tank_code"
        apiContext={setTableAPI}
        autoColWidth
      />
      <div className="operations">
        <Button
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => handleFormState(false, null)}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          icon={<RedoOutlined />}
          style={{ float: 'right', marginRight: 5 }}
          onClick={calculate}
          disabled={!enabled || selected.length <= 0}
        >
          {t('operations.calculate')}
        </Button>

        <Button
          type="primary"
          icon={<SaveOutlined />}
          style={{ float: 'right', marginRight: 5 }}
          onClick={saveToTanks}
          disabled={!enabled || !access.canUpdate}
        >
          {t('operations.saveToTanks')}
        </Button>

        <Button
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
