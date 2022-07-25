import React, { useEffect, useState, useCallback } from 'react';

import _ from 'lodash';
import { Card, Modal, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import api, { FOLIO_SUMMARY } from '../../../../api';
import { DataTable } from '../../../../components';
import { useConfig } from 'hooks';

import generator from './generator';
import columns from './columns';

const Tanks = ({ id, enabled, saveToFolioTrigger, saveToTanksTrigger, calculateTrigger, nullToZero }) => {
  const { t } = useTranslation();
  const config = useConfig();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [preSelected, setPreSelected] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);

  const fields = columns(t, enabled, config);

  const fetch = useCallback(() => {
    setLoading(true);

    api.get(`${FOLIO_SUMMARY.TANKS}?closeout_nr=${id}`).then((response) => {
      setLoading(false);

      const values = generator(response.data.records, nullToZero);
      const filtered = _.filter(response.data.records, ['tank_gaugingmthd_desc', 'MANUAL']);
      const preSelected = _.uniq(_.map(filtered, 'tank_code'));

      setData(values);
      setPreSelected(preSelected);
    });
  }, [id]);

  const onItemValidation = (items) => {
    const errors = [];

    // check the tank items
    for (let tidx = 0; tidx < items?.length; tidx++) {
      const item = items?.[tidx];

      // The close_amb_tot, close_std_tot, close_mass_tot must be filled
      if ((item.close_amb_tot !== 0 && !item.close_amb_tot) || String(item.close_amb_tot).trim() === '') {
        errors.push({
          field: `${t('validate.set')} ─ ${t(config?.siteLabelUser + 'fields.closingAmbient')} (${t(
            'units.ltr'
          )})`,
          message: `${item.tank_code}: ${item.tank_basecode} - ${item.tank_basename} [${item.bclass_desc}]`,
          key: `${'close_amb_tot'}${tidx}`,
          //line: item.trsf_cmpt_no,
        });
      }

      if ((item.close_std_tot !== 0 && !item.close_std_tot) || String(item.close_std_tot).trim() === '') {
        errors.push({
          field: `${t(config?.siteLabelUser + 'fields.closingCorrected')} (${t('units.ltr')})`,
          message: `${item.tank_code}: ${item.tank_basecode} - ${item.tank_basename} [${item.bclass_desc}]`,
          key: `${'close_std_tot'}${tidx}`,
          //line: item.trsf_cmpt_no,
        });
      }

      if ((item.close_mass_tot !== 0 && !item.close_mass_tot) || String(item.close_mass_tot).trim() === '') {
        errors.push({
          field: `${t(config?.siteLabelUser + 'fields.closingMass')} (${t('units.kg')})`,
          message: `${item.tank_code}: ${item.tank_basecode} - ${item.tank_basename} [${item.bclass_desc}]`,
          key: `${'close_mass_tot'}${tidx}`,
          //line: item.trsf_cmpt_no,
        });
      }
    }

    if (errors.length > 0) {
      const lines = (
        <>
          {errors?.map((error, index) => (
            <Card key={error.key} size="small" title={error.field}>
              {error.message}
            </Card>
          ))}
        </>
      );

      notification.error({
        message: t('validate.lineItemValidation'),
        description: lines,
        // duration: 0,
        style: {
          height: errors.length > 5 ? '500px' : `${errors.length * 80 + 100}px`,
          width: '30vw',
          overflowY: 'scroll',
        },
      });
      /* _.forEach(errors, (error) => {
        notification.error({
          message: error.field,
          description: error.message,
          key: error.key,
        });
      }); */
    }

    return errors;
  };

  const saveToFolio = () => {
    const errors = onItemValidation(data);
    if (errors.length > 0) {
      return;
    }

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
              // const filtered = _.find(response.data.data, ['tank_code', rowNode.data.tank_code]);
              const filtered = _.find(
                response.data.data,
                (o) =>
                  o?.tank_code === rowNode.data.tank_code &&
                  o?.tank_basecode === rowNode.data.tank_basecode &&
                  o?.base_period_open === rowNode.data.base_period_open &&
                  o?.base_period_close === rowNode.data.base_period_close
              );

              // console.log('......................filtered', filtered);

              if (filtered) {
                rowNode.data.close_amb_tot = filtered.close_amb_tot;
                rowNode.data.close_std_tot = filtered.close_std_tot;
                rowNode.data.close_mass_tot = filtered.close_mass_tot;
                rowNode.data.close_mass_tot_air =
                  filtered.close_mass_tot - filtered.close_std_tot * config?.airBuoyancyFactor;
                rowNode.data.close_vcf_tot = filtered.real_cvf;
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
    const errors = onItemValidation(data);
    if (errors.length > 0) {
      return;
    }

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
            folio_tanks: data,
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

  useEffect(() => {
    if (calculateTrigger > 0) {
      calculate();
    }
  }, [calculateTrigger]);

  useEffect(() => {
    if (saveToFolioTrigger > 0) {
      saveToFolio();
    }
  }, [saveToFolioTrigger]);

  useEffect(() => {
    if (saveToTanksTrigger > 0) {
      saveToTanks();
    }
  }, [saveToTanksTrigger]);

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
    </div>
  );
};

export default Tanks;
