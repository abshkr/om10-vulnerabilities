import React, { useState, useEffect } from 'react';

import {
  Card,
  Checkbox,
  Button,
  Drawer,
  Modal,
  Form,
  Tabs,
  Input,
  Select,
  notification,
  Row,
  Col,
  Descriptions,
} from 'antd';

import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import _ from 'lodash';
import moment from 'moment';

import { DataTable, Download } from '../../../components';
import api, { BASE_OWNERS, BASE_OWNER_TRANSACTIONS, ORDER_LISTINGS, SPECIAL_MOVEMENTS } from '../../../api';
import { SETTINGS } from '../../../constants';
import { getCurrentTime } from '../../../utils';
import columns from './columns';
import { TYPES } from 'api/company-bay-movement';
import CheckboxContainer from './style';

const { TabPane } = Tabs;

const BaseOwnershipTransactions = ({ baseCode, suppCode, bases, suppliers, value, access, config }) => {
  const [base, setBase] = useState(baseCode || value?.base_prod_code);
  const [supplier, setSupplier] = useState(suppCode || value?.supp_cmpy);
  const [transactionChanged, setTransactionChanged] = useState(0);
  const [ownershipChanged, setOwnershipChanged] = useState(0);
  const [ownership2Changed, setOwnership2Changed] = useState(0);

  const url = `${BASE_OWNER_TRANSACTIONS.READ}?base_code=${base || '-1'}&cmpy_code=${supplier || '-1'}`;

  const { data, isValidating } = useSWR(url);

  const isLoading = isValidating || !data;

  const { data: units } = useSWR(ORDER_LISTINGS.UNIT_TYPES);
  // const { data: types } = useSWR(BASE_OWNER_TRANSACTIONS.REASONS);
  const { data: types } = useSWR(SPECIAL_MOVEMENTS.TYPES);

  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const IS_CREATING = !selected;
  const percentPrecision = 4;

  const { resetFields, setFieldsValue, getFieldsValue } = form;

  const reasons = [
    {
      reason_id: 1,
      reason_text: t('operations.increase'),
    },
    {
      reason_id: -1,
      reason_text: t('operations.decrease'),
    },
  ];

  const fields = columns(t, reasons);

  const getBaseSummary = async (prod) => {
    const results = await api.get(`${BASE_OWNER_TRANSACTIONS.BASE_SUMMARY}?base_code=${prod}`);

    return results?.data?.records;
  };

  const handleBaseDensity = async () => {
    const payload = getFieldsValue(['base_prod_code']);

    if (payload?.base_prod_code) {
      const basesum = await getBaseSummary(payload?.base_prod_code);
      let prorateDensity = 0;

      if (basesum.length > 0) {
        if (_.toNumber(basesum?.[0]?.tank_cor_vol) > 0) {
          prorateDensity =
            (_.toNumber(basesum?.[0]?.tank_liquid_kg) / _.toNumber(basesum?.[0]?.tank_cor_vol)) * 1000.0;
        }
      } else {
        prorateDensity = 0;
      }

      setFieldsValue({
        trsa_density: _.round(prorateDensity, config?.precisionDensity),
      });
    }
  };

  const onBaseChanged = async () => {
    handleBaseDensity();
    handleOwnership();
    handleOwnershipTo();
  };

  const getOwnership = async (prod, supp) => {
    const results = await api.get(`${BASE_OWNERS.READ}?base_code=${prod}&cmpy_code=${supp}`);

    return results?.data?.records;
  };

  const handleOwnership = async () => {
    const payload = getFieldsValue(['base_prod_code', 'supp_cmpy']);

    if (payload?.base_prod_code && payload?.supp_cmpy) {
      const owners = await getOwnership(payload?.base_prod_code, payload?.supp_cmpy);
      if (owners.length > 0) {
        setFieldsValue({
          trsa_qty_owned: owners?.[0]?.ownship_qty,
          trsa_density_owned: owners?.[0]?.ownship_density,
          // trsa_density: owners?.[0]?.ownship_density,
          trsa_unit: owners?.[0]?.ownship_unit,
        });
      } else {
        setFieldsValue({
          trsa_qty_owned: 0,
          trsa_density_owned: 0,
          trsa_unit: 11,
        });
      }
    }
  };

  const handleOwnershipTo = async () => {
    const payload = getFieldsValue(['base_prod_code', 'supp_cmpy_to']);

    if (payload?.base_prod_code && payload?.supp_cmpy_to) {
      const owners = await getOwnership(payload?.base_prod_code, payload?.supp_cmpy_to);
      if (owners.length > 0) {
        setFieldsValue({
          trsa_qty_owned_to: owners?.[0]?.ownship_qty,
          trsa_density_owned_to: owners?.[0]?.ownship_density,
          // trsa_density: owners?.[0]?.ownship_density,
          // trsa_unit: owners?.[0]?.ownship_unit,
        });
      } else {
        setFieldsValue({
          trsa_qty_owned_to: 0,
          trsa_density_owned_to: 0,
          // trsa_unit: 11,
        });
      }
    }
  };

  const handleFormState = (visibility, value) => {
    if (!visibility) {
      setFieldsValue({
        supp_cmpy: null,
        base_prod_code: null,
        qty: null,
        reason: 2,
      });
    }
    setSelected(value);
    setVisible(visibility);
  };

  const onComplete = () => {
    handleFormState(false, null);
    mutate(url);
  };

  const updateBaseOwnership = async (vobj, who) => {
    const values = {};

    values.ownship_no = vobj?.ownship_no;
    values.base_prod_code = vobj?.base_prod_code;
    values.supp_cmpy = vobj?.supp_cmpy;

    /* // adjust the quantity
    const volume = _.toNumber(vobj?.ownship_qty) + _.toNumber(vobj?.reason) * _.toNumber(vobj?.qty);
    const mass =
      _.toNumber(vobj?.ownship_qty) * _.toNumber(vobj?.ownship_density) +
      _.toNumber(vobj?.reason) * _.toNumber(vobj?.qty) * _.toNumber(vobj?.trsa_density);
    values.ownship_qty = volume;
    // adjust the density
    values.ownship_density = 0;
    if (volume > 0) {
      values.ownship_density = mass / volume;
    } */

    values.ownship_qty = _.toNumber(vobj?.ownship_qty) + _.toNumber(vobj?.qty);
    values.ownship_density = _.toNumber(vobj?.trsa_density);
    values.ownship_unit = vobj?.ownship_unit;

    await api
      .post(BASE_OWNERS.UPDATE, values)
      .then(() => {
        // onComplete();

        let notes = t('descriptions.updateSuccessBaseOwnership');
        notes = notes.replace('[[BASE]]', '"' + vobj?.base_prod_code + '"');
        notes = notes.replace('[[SUPPLIER]]', '"' + vobj?.supp_cmpy + '"');

        notification.success({
          message: t('messages.updateSuccess'),
          description: notes,
        });

        if (who === 'FROM') {
          setOwnershipChanged(2);
        } else {
          setOwnership2Changed(2);
        }
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });

        if (who === 'FROM') {
          setOwnershipChanged(-2);
        } else {
          setOwnership2Changed(-2);
        }
      });
  };

  const createBaseOwnership = async (vobj, who) => {
    const values = {};

    values.ownship_no = -888888;
    values.base_prod_code = vobj?.base_prod_code;
    values.supp_cmpy = vobj?.supp_cmpy;
    values.ownship_qty = _.toNumber(vobj?.qty);
    values.ownship_density = _.toNumber(vobj?.trsa_density);
    values.ownship_unit = vobj?.trsa_unit;

    await api
      .post(BASE_OWNERS.CREATE, values)
      .then(() => {
        // onComplete();

        let notes = t('descriptions.createSuccessBaseOwnership');
        notes = notes.replace('[[BASE]]', '"' + vobj?.base_prod_code + '"');
        notes = notes.replace('[[SUPPLIER]]', '"' + vobj?.supp_cmpy + '"');

        notification.success({
          message: t('messages.createSuccess'),
          description: notes,
        });

        if (who === 'FROM') {
          setOwnershipChanged(1);
        } else {
          setOwnership2Changed(1);
        }
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });

        if (who === 'FROM') {
          setOwnershipChanged(-1);
        } else {
          setOwnership2Changed(-1);
        }
      });
  };

  const createOwnershipTransaction = async (vobj) => {
    const values = vobj;

    await api
      .post(BASE_OWNER_TRANSACTIONS.CREATE, values)
      .then(() => {
        // onComplete();

        let notes = t('descriptions.createSuccessOwnershipTransactionTransfer');
        notes = notes.replace('[[BASE]]', '"' + vobj?.base_prod_code + '"');
        notes = notes.replace('[[SUPPLIER_FROM]]', '"' + vobj?.supp_cmpy + '"');
        notes = notes.replace('[[SUPPLIER_TO]]', '"' + vobj?.supp_cmpy_to + '"');

        notification.success({
          message: t('messages.createSuccess'),
          description: notes,
        });

        setTransactionChanged(1);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });

        setTransactionChanged(-1);
      });
  };

  const updateOwnershipTransaction = async (vobj, action) => {
    const values = vobj;

    await api
      .post(BASE_OWNER_TRANSACTIONS.UPDATE, values)
      .then(() => {
        // onComplete();

        let notes = t('descriptions.updateSuccessOwnershipTransactionTransfer');
        if (action === 'UPDATE') {
          notes = t('descriptions.updateSuccessOwnershipTransactionTransfer');
        }
        if (action === 'APPROVE') {
          notes = t('descriptions.updateSuccessApproveOwnershipTransactionTransfer');
        }
        if (action === 'REVERSE') {
          notes = t('descriptions.updateSuccessReverseOwnershipTransactionTransfer');
        }
        notes = notes.replace('[[BASE]]', '"' + vobj?.base_prod_code + '"');
        notes = notes.replace('[[SUPPLIER_FROM]]', '"' + vobj?.supp_cmpy + '"');
        notes = notes.replace('[[SUPPLIER_TO]]', '"' + vobj?.supp_cmpy_to + '"');

        notification.success({
          message: t('messages.updateSuccess'),
          description: notes,
        });

        setTransactionChanged(2);
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });

        setTransactionChanged(-2);
      });
  };

  const checkOwnership = (ownersFrom, ownersTo, reason, action, qty, suppFrom, baseFrom, suppTo, baseTo) => {
    // 0: Receipt; 1: Disposal; 2: Transfer
    // CREATE, UPDATE, APPROVE, REVERSE
    /*
      Action    Reason        From Ownership          To Ownership
      CREATE    0:Receipt     qty>=0, dens>=0(N/A)    qty>=0, dens>0   
      CREATE    1:Disposal    qty>0, dens>0           qty>=0, dens>=0(N/A)
      CREATE    2:Transfer    qty>0, dens>0           qty>=0, dens>0
      UPDATE    0:Receipt     qty>=0, dens>=0(N/A)    qty>=0, dens>0
      UPDATE    1:Disposal    qty>0, dens>0           qty>=0, dens>=0(N/A)
      UPDATE    2:Transfer    qty>0, dens>0           qty>=0, dens>0
      APPROVE   0:Receipt     qty>=0, dens>=0(N/A)    qty>=0, dens>0
      APPROVE   1:Disposal    qty>0, dens>0           qty>=0, dens>=0(N/A)
      APPROVE   2:Transfer    qty>0, dens>0           qty>=0, dens>0
      REVERSE   0:Receipt     qty>=0, dens>=0(N/A)    qty>0, dens>0
      REVERSE   1:Disposal    qty>=0, dens>0          qty>=0, dens>=0(N/A)
      REVERSE   2:Transfer    qty>=0, dens>0          qty>0, dens>0
    */
    let errors = '';

    if (action === 'CREATE' || action === 'UPDATE' || action === 'APPROVE') {
      // CREATE    0:Receipt     qty>=0, dens>=0(N/A)    qty>=0, dens>0
      // UPDATE    0:Receipt     qty>=0, dens>=0(N/A)    qty>=0, dens>0
      // APPROVE   0:Receipt     qty>=0, dens>=0(N/A)    qty>=0, dens>0
      if (reason === 0) {
      }
      // CREATE    1:Disposal    qty>0, dens>0           qty>=0, dens>=0(N/A)
      // UPDATE    1:Disposal    qty>0, dens>0           qty>=0, dens>=0(N/A)
      // APPROVE   1:Disposal    qty>0, dens>0           qty>=0, dens>=0(N/A)
      if (reason === 1) {
        if (ownersFrom.length === 0) {
          // From ownership does not exist
          errors = t('descriptions.ownershipCannotBeZeroForTrans');
          errors = errors.replace('[[BASE]]', '"' + baseFrom + '"');
          errors = errors.replace('[[SUPPLIER]]', '"' + suppFrom + '"');
        } else {
          if (ownersFrom?.[0]?.ownship_qty <= 0) {
            // From ownership exists but the qty is ZERO
            errors = t('descriptions.ownershipCannotBeZeroForTrans');
            errors = errors.replace('[[BASE]]', '"' + ownersFrom?.[0]?.base_prod_code + '"');
            errors = errors.replace('[[SUPPLIER]]', '"' + ownersFrom?.[0]?.supp_cmpy + '"');
          } else {
            if (ownersFrom?.[0]?.ownship_qty < qty) {
              // From ownership exists but the qty is not enough
              errors = t('descriptions.ownershipNotEnoughForTrans');
              errors = errors.replace('[[BASE]]', '"' + ownersFrom?.[0]?.base_prod_code + '"');
              errors = errors.replace('[[SUPPLIER]]', '"' + ownersFrom?.[0]?.supp_cmpy + '"');
            }
          }
        }
      }
      // CREATE    2:Transfer    qty>0, dens>0           qty>=0, dens>0
      // UPDATE    2:Transfer    qty>0, dens>0           qty>=0, dens>0
      // APPROVE   2:Transfer    qty>0, dens>0           qty>=0, dens>0
      if (reason === 2) {
        if (ownersFrom.length === 0) {
          // From ownership does not exist
          errors = t('descriptions.ownershipCannotBeZeroForTrans');
          errors = errors.replace('[[BASE]]', '"' + baseFrom + '"');
          errors = errors.replace('[[SUPPLIER]]', '"' + suppFrom + '"');
        } else {
          if (ownersFrom?.[0]?.ownship_qty <= 0) {
            // From ownership exists but the qty is ZERO
            errors = t('descriptions.ownershipCannotBeZeroForTrans');
            errors = errors.replace('[[BASE]]', '"' + ownersFrom?.[0]?.base_prod_code + '"');
            errors = errors.replace('[[SUPPLIER]]', '"' + ownersFrom?.[0]?.supp_cmpy + '"');
          } else {
            if (ownersFrom?.[0]?.ownship_qty < qty) {
              // From ownership exists but the qty is not enough
              errors = t('descriptions.ownershipNotEnoughForTrans');
              errors = errors.replace('[[BASE]]', '"' + ownersFrom?.[0]?.base_prod_code + '"');
              errors = errors.replace('[[SUPPLIER]]', '"' + ownersFrom?.[0]?.supp_cmpy + '"');
            }
          }
        }
      }
    }
    if (action === 'REVERSE') {
      // REVERSE   0:Receipt     qty>=0, dens>=0(N/A)    qty>0, dens>0
      if (reason === 0) {
        if (ownersTo.length === 0) {
          // To ownership does not exist
          errors = t('descriptions.ownershipCannotBeZeroForReverse');
          errors = errors.replace('[[BASE]]', '"' + baseTo + '"');
          errors = errors.replace('[[SUPPLIER]]', '"' + suppTo + '"');
        } else {
          if (ownersTo?.[0]?.ownship_qty <= 0) {
            // To ownership exists but the qty is ZERO
            errors = t('descriptions.ownershipCannotBeZeroForReverse');
            errors = errors.replace('[[BASE]]', '"' + ownersTo?.[0]?.base_prod_code + '"');
            errors = errors.replace('[[SUPPLIER]]', '"' + ownersTo?.[0]?.supp_cmpy + '"');
          } else {
            if (ownersTo?.[0]?.ownship_qty < qty) {
              // To ownership exists but the qty is not enough
              errors = t('descriptions.ownershipNotEnoughForReverse');
              errors = errors.replace('[[BASE]]', '"' + ownersTo?.[0]?.base_prod_code + '"');
              errors = errors.replace('[[SUPPLIER]]', '"' + ownersTo?.[0]?.supp_cmpy + '"');
            }
          }
        }
      }
      // REVERSE   1:Disposal    qty>=0, dens>0          qty>=0, dens>=0(N/A)
      if (reason === 1) {
      }
      // REVERSE   2:Transfer    qty>=0, dens>0          qty>0, dens>0
      if (reason === 2) {
        if (ownersTo.length === 0) {
          // To ownership does not exist
          errors = t('descriptions.ownershipCannotBeZeroForReverse');
          errors = errors.replace('[[BASE]]', '"' + baseTo + '"');
          errors = errors.replace('[[SUPPLIER]]', '"' + suppTo + '"');
        } else {
          if (ownersTo?.[0]?.ownship_qty <= 0) {
            // To ownership exists but the qty is ZERO
            errors = t('descriptions.ownershipCannotBeZeroForReverse');
            errors = errors.replace('[[BASE]]', '"' + ownersTo?.[0]?.base_prod_code + '"');
            errors = errors.replace('[[SUPPLIER]]', '"' + ownersTo?.[0]?.supp_cmpy + '"');
          } else {
            if (ownersTo?.[0]?.ownship_qty < qty) {
              // To ownership exists but the qty is not enough
              errors = t('descriptions.ownershipNotEnoughForReverse');
              errors = errors.replace('[[BASE]]', '"' + ownersTo?.[0]?.base_prod_code + '"');
              errors = errors.replace('[[SUPPLIER]]', '"' + ownersTo?.[0]?.supp_cmpy + '"');
            }
          }
        }
      }
    }

    return errors;
  };

  const onApprove = async () => {
    const values = await form.validateFields();

    const owners = await getOwnership(values.base_prod_code, values.supp_cmpy);
    const owners2 = await getOwnership(values.base_prod_code, values.supp_cmpy_to);

    const errors = checkOwnership(
      owners,
      owners2,
      values?.reason,
      'APPROVE',
      values?.qty,
      values?.supp_cmpy,
      values?.base_prod_code,
      values?.supp_cmpy_to,
      values?.base_prod_code
    );

    Modal.confirm({
      title: errors?.length > 0 ? errors : t('prompts.approveOwnershipTransaction'),
      okText: t('operations.approve'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      okButtonProps: {
        hidden: errors?.length > 0,
      },
      onOk: async () => {
        if (!IS_CREATING) {
          // set the time approved with server time
          // const currTime = config?.serverTime;
          const currTime = await getCurrentTime();
          const serverCurrent = moment(currTime, SETTINGS.DATE_TIME_FORMAT);
          values.trsa_time_approved = serverCurrent.format(SETTINGS.DATE_TIME_FORMAT);

          values.trsa_approved = true;
          // need update the from/to ownership data to the latest
          // "trsa_time": "na",
          if (owners.length > 0) {
            values.trsa_qty_owned = owners?.[0]?.ownship_qty;
            values.trsa_density_owned = owners?.[0]?.ownship_density;
          }
          if (owners2.length > 0) {
            values.trsa_qty_owned_to = owners2?.[0]?.ownship_qty;
            values.trsa_density_owned_to = owners2?.[0]?.ownship_density;
          }
          await updateOwnershipTransaction(values, 'APPROVE');
          const trsa_qty = values?.qty;
          if (owners.length > 0) {
            values.ownship_no = owners?.[0]?.ownship_no;
            values.ownship_qty = owners?.[0]?.ownship_qty;
            values.ownship_density = owners?.[0]?.ownship_density;
            values.ownship_unit = owners?.[0]?.ownship_unit;
            values.supp_cmpy = owners?.[0]?.supp_cmpy;
            values.qty = -1 * _.toNumber(trsa_qty);

            await updateBaseOwnership(values, 'FROM');
            values.qty = trsa_qty;
            // need this to trigger onComplete
            // setOwnership2Changed(3);
          } else {
            values.qty = -1 * _.toNumber(trsa_qty);

            await createBaseOwnership(values, 'FROM');
            values.qty = trsa_qty;
            // need this to trigger onComplete
            // setOwnershipChanged(3);
          }
          if (owners2.length > 0) {
            values.ownship_no = owners2?.[0]?.ownship_no;
            values.ownship_qty = owners2?.[0]?.ownship_qty;
            values.ownship_density = owners2?.[0]?.ownship_density;
            values.ownship_unit = owners2?.[0]?.ownship_unit;
            let tmp_cmpy = values.supp_cmpy;
            values.supp_cmpy = owners2?.[0]?.supp_cmpy;
            values.qty = 1 * _.toNumber(trsa_qty);

            await updateBaseOwnership(values, 'TO');
            values.qty = trsa_qty;
            values.supp_cmpy = tmp_cmpy;
            // need this to trigger onComplete
            // setOwnership2Changed(3);
          } else {
            let tmp_cmpy = values.supp_cmpy;
            values.supp_cmpy = values.supp_cmpy_to;
            values.qty = 1 * _.toNumber(trsa_qty);

            await createBaseOwnership(values, 'TO');
            values.qty = trsa_qty;
            values.supp_cmpy = tmp_cmpy;
            // need this to trigger onComplete
            // setOwnershipChanged(3);
          }
        }
      },
    });
  };

  const onReverse = async () => {
    const values = await form.validateFields();

    const owners = await getOwnership(values.base_prod_code, values.supp_cmpy);
    const owners2 = await getOwnership(values.base_prod_code, values.supp_cmpy_to);

    const errors = checkOwnership(
      owners,
      owners2,
      values?.reason,
      'REVERSE',
      values?.qty,
      values?.supp_cmpy,
      values?.base_prod_code,
      values?.supp_cmpy_to,
      values?.base_prod_code
    );

    Modal.confirm({
      title: errors?.length > 0 ? errors : t('prompts.reverseOwnershipTransaction'),
      okText: t('operations.reverse'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      okButtonProps: {
        hidden: errors?.length > 0,
      },
      onOk: async () => {
        if (!IS_CREATING) {
          // set the time reversed with server time
          // const currTime = config?.serverTime;
          const currTime = await getCurrentTime();
          const serverCurrent = moment(currTime, SETTINGS.DATE_TIME_FORMAT);
          values.trsa_time_reversed = serverCurrent.format(SETTINGS.DATE_TIME_FORMAT);

          values.trsa_reversed = true;
          await updateOwnershipTransaction(values, 'REVERSE');
          const trsa_qty = values?.qty;
          if (owners.length > 0) {
            values.ownship_no = owners?.[0]?.ownship_no;
            values.ownship_qty = owners?.[0]?.ownship_qty;
            values.ownship_density = owners?.[0]?.ownship_density;
            values.ownship_unit = owners?.[0]?.ownship_unit;
            values.supp_cmpy = owners?.[0]?.supp_cmpy;
            values.qty = 1 * _.toNumber(trsa_qty);

            await updateBaseOwnership(values, 'FROM');
            values.qty = trsa_qty;
            // need this to trigger onComplete
            // setOwnership2Changed(3);
          } else {
            values.qty = 1 * _.toNumber(trsa_qty);

            await createBaseOwnership(values, 'FROM');
            values.qty = trsa_qty;
            // need this to trigger onComplete
            // setOwnershipChanged(3);
          }
          if (owners2.length > 0) {
            values.ownship_no = owners2?.[0]?.ownship_no;
            values.ownship_qty = owners2?.[0]?.ownship_qty;
            values.ownship_density = owners2?.[0]?.ownship_density;
            values.ownship_unit = owners2?.[0]?.ownship_unit;
            let tmp_cmpy = values.supp_cmpy;
            values.supp_cmpy = owners2?.[0]?.supp_cmpy;
            values.qty = -1 * _.toNumber(trsa_qty);

            await updateBaseOwnership(values, 'TO');
            values.qty = trsa_qty;
            values.supp_cmpy = tmp_cmpy;
            // need this to trigger onComplete
            // setOwnership2Changed(3);
          } else {
            let tmp_cmpy = values.supp_cmpy;
            values.supp_cmpy = values.supp_cmpy_to;
            values.qty = -1 * _.toNumber(trsa_qty);

            await createBaseOwnership(values, 'TO');
            values.qty = trsa_qty;
            values.supp_cmpy = tmp_cmpy;
            // need this to trigger onComplete
            // setOwnershipChanged(3);
          }
        }
      },
    });
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    const owners = await getOwnership(values.base_prod_code, values.supp_cmpy);
    const owners2 = await getOwnership(values.base_prod_code, values.supp_cmpy_to);

    const errors = checkOwnership(
      owners,
      owners2,
      values?.reason,
      IS_CREATING ? 'CREATE' : 'UPDATE',
      values?.qty,
      values?.supp_cmpy,
      values?.base_prod_code,
      values?.supp_cmpy_to,
      values?.base_prod_code
    );

    if (IS_CREATING) {
      values.ownship_trsa_no = -888888;
    } else {
      if (owners.length > 0) {
        values.trsa_qty_owned = owners?.[0]?.ownship_qty;
        values.trsa_density_owned = owners?.[0]?.ownship_density;
      }
      if (owners2.length > 0) {
        values.trsa_qty_owned_to = owners2?.[0]?.ownship_qty;
        values.trsa_density_owned_to = owners2?.[0]?.ownship_density;
      }
    }

    Modal.confirm({
      title: errors?.length > 0 ? errors : IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      okButtonProps: {
        hidden: errors?.length > 0,
      },
      onOk: async () => {
        if (!IS_CREATING) {
          // set the time updated with server time
          // const currTime = config?.serverTime;
          const currTime = await getCurrentTime();
          const serverCurrent = moment(currTime, SETTINGS.DATE_TIME_FORMAT);
          values.trsa_time_updated = serverCurrent.format(SETTINGS.DATE_TIME_FORMAT);
        }
        await api
          .post(IS_CREATING ? BASE_OWNER_TRANSACTIONS.CREATE : BASE_OWNER_TRANSACTIONS.UPDATE, values)
          .then(() => {
            onComplete();

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
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

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      icon: <DeleteOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(BASE_OWNER_TRANSACTIONS.DELETE, selected)
          .then(() => {
            onComplete();

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`,
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

  const validateInput = (rule, input) => {
    const min = rule?.minValue || 0;
    const max = rule?.maxValue || 999999999;
    const limit = rule?.maxLen || 256;
    console.log('.............rule', rule);

    if (rule?.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
      }
    }

    if (input && _.toNumber(input) < min) {
      return Promise.reject(`${t('placeholder.minNumber')}: ${min} ─ ${t('descriptions.minNumber')}`);
    }

    if (input && _.toNumber(input) > max) {
      return Promise.reject(`${t('placeholder.maxNumber')}: ${max} ─ ${t('descriptions.maxNumber')}`);
    }

    if (input && input.length > limit) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${limit} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const validateList = (rule, input) => {
    if (rule?.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
      }
    }

    return Promise.resolve();
  };

  const modifiers = (
    <>
      <Download
        data={data?.records}
        // data={payload}
        isLoading={isLoading}
        columns={fields}
      />

      <Button
        type="primary"
        style={{ marginLeft: 5 }}
        disabled={!access.canCreate}
        onClick={() => handleFormState(true, null)}
      >
        {t('operations.makeTransaction')}
      </Button>
    </>
  );

  useEffect(() => {
    console.log('....................trans', baseCode, suppCode, value);
    if (value) {
      setBase(value?.base_prod_code);
      setSupplier(value?.supp_cmpy);
    } else {
      if (baseCode) {
        setBase(baseCode);
      }
      if (suppCode) {
        setSupplier(suppCode);
      }
    }
  }, [value, baseCode, suppCode]);

  useEffect(() => {
    if (!selected) {
      resetFields();

      if (base) {
        setFieldsValue({
          base_prod_code: base,
        });
      }
      if (supplier) {
        setFieldsValue({
          supp_cmpy: supplier,
        });
      }
      if (base || supplier) {
        setFieldsValue({
          reason: 2,
        });
        if (base) {
          handleBaseDensity();
        }
        handleOwnership();
      }
    }
  }, [resetFields, setFieldsValue, base, supplier, selected]);

  useEffect(() => {
    if (transactionChanged !== 0 && ownershipChanged !== 0 && ownership2Changed !== 0) {
      onComplete();
      setTransactionChanged(0);
      setOwnershipChanged(0);
      setOwnership2Changed(0);
    }
  }, [transactionChanged, ownershipChanged, ownership2Changed]);

  useEffect(() => {
    if (selected) {
      resetFields();
      setFieldsValue({
        base_prod_code: selected?.base_prod_code,
        supp_cmpy: selected?.supp_cmpy,
        reason: selected?.reason,
        qty: selected?.qty,
        ownship_trsa_no: selected?.ownship_trsa_no,
        trsa_density: selected?.trsa_density,
        trsa_qty_owned: selected?.trsa_qty_owned,
        trsa_density_owned: selected?.trsa_density_owned,
        supp_cmpy_to: selected?.supp_cmpy_to,
        trsa_qty_owned_to: selected?.trsa_qty_owned_to,
        trsa_density_owned_to: selected?.trsa_density_owned_to,
        trsa_unit: selected?.trsa_unit,
        trsa_comments: selected?.trsa_comments,
        trsa_approved: selected?.trsa_approved,
        trsa_reversed: selected?.trsa_reversed,
      });
    } else {
    }
  }, [resetFields, selected]);

  return (
    <>
      <Card hoverable>
        <Row gutter={[2, 12]}>
          <Col span={24}>
            <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }}>
              <Descriptions.Item label={t('fields.baseProduct')} span={24}>
                <Select
                  dropdownMatchSelectWidth={false}
                  allowClear
                  style={{ width: '100%' }}
                  defaultValue={base}
                  value={base}
                  onChange={setBase}
                  showSearch
                  optionFilterProp="children"
                  placeholder={t('placeholder.selectBaseProduct')}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {bases?.records?.map((item) => {
                    return (
                      <Select.Option key={item.base_code} value={item.base_code}>
                        {item.base_desc}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Descriptions.Item>
              <Descriptions.Item label={t('fields.supplier')} span={24}>
                <Select
                  dropdownMatchSelectWidth={false}
                  allowClear
                  style={{ width: '100%' }}
                  defaultValue={supplier}
                  value={supplier}
                  onChange={setSupplier}
                  showSearch
                  optionFilterProp="children"
                  placeholder={t('placeholder.selectSupplier')}
                  filterOption={(value, option) =>
                    option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                  }
                >
                  {suppliers?.records?.map((item) => {
                    return (
                      <Select.Option key={item.cmpy_code} value={item.cmpy_code}>
                        {item.cmpy_desc}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <div style={{ float: 'right' }}>{modifiers}</div>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <DataTable
              minimal={true}
              columns={fields}
              data={data?.records}
              parentHeight={'calc(100vh - 360px)'}
              onClick={(payload) => handleFormState(true, payload)}
              handleSelect={(payload) => handleFormState(true, payload[0])}
            />
          </Col>
        </Row>
      </Card>

      <Drawer
        bodyStyle={{ paddingTop: 5 }}
        onClose={() => handleFormState(false, null)}
        maskClosable={IS_CREATING}
        destroyOnClose={true}
        mask={IS_CREATING}
        placement="right"
        width="50vw"
        visible={visible}
        footer={
          <>
            {!IS_CREATING && (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={onApprove}
                style={{ float: 'left', marginRight: 5 }}
                disabled={!access?.canUpdate || selected?.trsa_approved}
              >
                {t('operations.approve')}
              </Button>
            )}

            {!IS_CREATING && (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={onReverse}
                style={{ float: 'left', marginRight: 5 }}
                disabled={!access?.canUpdate || selected?.trsa_reversed || !selected?.trsa_approved}
              >
                {t('operations.reverse')}
              </Button>
            )}

            <Button
              htmlType="button"
              icon={<CloseOutlined />}
              style={{ float: 'right' }}
              onClick={() => handleFormState(false, null)}
            >
              {t('operations.cancel')}
            </Button>

            <Button
              type="primary"
              icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
              htmlType="submit"
              onClick={onFinish}
              style={{ float: 'right', marginRight: 5 }}
              disabled={IS_CREATING ? !access?.canCreate : !access?.canUpdate || selected?.trsa_approved}
            >
              {IS_CREATING ? t('operations.create') : t('operations.update')}
            </Button>

            {!IS_CREATING && (
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={onDelete}
                style={{ float: 'right', marginRight: 5 }}
                disabled={!access?.canDelete || selected?.trsa_approved}
              >
                {t('operations.delete')}
              </Button>
            )}
          </>
        }
      >
        <Form layout="vertical" form={form} scrollToFirstError>
          <Tabs defaultActiveKey="1">
            <TabPane tab={t('tabColumns.general')} key="1">
              <Row gutter={[8, 1]}>
                <Col span={12}>
                  <Form.Item
                    name="ownship_trsa_no"
                    label={t('fields.baseOwnerTransNo')}
                    rules={[{ required: false }]}
                  >
                    <Input disabled={true} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="reason"
                    label={t('fields.baseOwnerTransReason')}
                    rules={[
                      { required: true, validator: validateList, label: t('fields.baseOwnerTransReason') },
                    ]}
                  >
                    <Select
                      dropdownMatchSelectWidth={false}
                      showSearch
                      defaultValue={2}
                      disabled={selected?.trsa_approved}
                      // onChange={handleChange}
                      optionFilterProp="children"
                      placeholder={t('placeholder.selectOwnershipTransReason')}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {types?.records?.map((item, index) => (
                        <Select.Option
                          key={index}
                          disabled={_.toNumber(item.movitem_type_id) !== 2}
                          value={_.toNumber(item.movitem_type_id)}
                        >
                          {item.movitem_type_name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[8, 1]}>
                <Col span={12}>
                  <Form.Item
                    name="base_prod_code"
                    label={t('fields.baseProduct')}
                    rules={[{ required: true, validator: validateList, label: t('fields.baseProduct') }]}
                  >
                    <Select
                      dropdownMatchSelectWidth={false}
                      disabled={selected?.trsa_approved}
                      allowClear
                      style={{ width: '100%' }}
                      defaultValue={base}
                      // value={base}
                      onChange={onBaseChanged}
                      showSearch
                      optionFilterProp="children"
                      placeholder={t('placeholder.selectBaseProduct')}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {bases?.records?.map((item) => {
                        return (
                          <Select.Option key={item.base_code} value={item.base_code}>
                            {item.base_desc}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="trsa_density"
                    label={t('fields.baseOwnerTransDensity')}
                    rules={[
                      {
                        required: true,
                        validator: validateInput,
                        label: t('fields.baseOwnerTransDensity'),
                        minValue: 0,
                        maxValue: 999999999,
                        maxLen: 20,
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      disabled={selected?.trsa_approved}
                      style={{ width: '100%' }}
                      min={0}
                      max={999999999}
                      precision={config?.precisionDensity}
                      addonAfter={t('units.kg/m3')}
                      // onChange={handleQtyProportionFieldChange}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[8, 1]}>
                <Col span={12}>
                  <Card size="small" title={t('fields.nomtranFromTitle')}>
                    <Row gutter={[8, 1]}>
                      <Col span={24}>
                        <Form.Item
                          name="supp_cmpy"
                          label={t('fields.supplier')}
                          rules={[{ required: true, validator: validateList, label: t('fields.supplier') }]}
                        >
                          <Select
                            dropdownMatchSelectWidth={false}
                            disabled={selected?.trsa_approved}
                            allowClear
                            style={{ width: '100%' }}
                            defaultValue={supplier}
                            // value={supplier}
                            onChange={handleOwnership}
                            showSearch
                            optionFilterProp="children"
                            placeholder={t('placeholder.selectSupplier')}
                            filterOption={(value, option) =>
                              option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                            }
                          >
                            {suppliers?.records?.map((item) => {
                              return (
                                <Select.Option key={item.cmpy_code} value={item.cmpy_code}>
                                  {item.cmpy_desc}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[8, 1]}>
                      <Col span={24}>
                        <Form.Item
                          name="trsa_qty_owned"
                          label={t('fields.baseOwnerQuantity')}
                          rules={[
                            {
                              required: true,
                              validator: validateInput,
                              label: t('fields.baseOwnerQuantity'),
                              minValue: -999999999,
                              maxValue: 999999999,
                              maxLen: 20,
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            disabled={true}
                            style={{ width: '100%' }}
                            min={-999999999}
                            max={999999999}
                            precision={config?.precisionVolume}
                            // addonAfter={!value ? t('units.lcor') : value?.description}
                            // onChange={handleQtyProportionFieldChange}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[8, 1]}>
                      <Col span={24}>
                        <Form.Item
                          name="trsa_density_owned"
                          label={t('fields.baseOwnerDensity')}
                          rules={[
                            {
                              required: true,
                              validator: validateInput,
                              label: t('fields.baseOwnerDensity'),
                              minValue: 0,
                              maxValue: 999999999,
                              maxLen: 20,
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            disabled={true}
                            style={{ width: '100%' }}
                            min={0}
                            max={999999999}
                            precision={config?.precisionDensity}
                            addonAfter={t('units.kg/m3')}
                            // onChange={handleQtyProportionFieldChange}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col span={12}>
                  <Card size="small" title={t('fields.nomtranToTitle')}>
                    <Row gutter={[8, 1]}>
                      <Col span={24}>
                        <Form.Item
                          name="supp_cmpy_to"
                          label={t('fields.supplier')}
                          rules={[{ required: true, validator: validateList, label: t('fields.supplier') }]}
                        >
                          <Select
                            dropdownMatchSelectWidth={false}
                            disabled={selected?.trsa_approved}
                            allowClear
                            style={{ width: '100%' }}
                            // defaultValue={supplier}
                            // value={supplier}
                            onChange={handleOwnershipTo}
                            showSearch
                            optionFilterProp="children"
                            placeholder={t('placeholder.selectSupplier')}
                            filterOption={(value, option) =>
                              option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                            }
                          >
                            {suppliers?.records?.map((item) => {
                              return (
                                <Select.Option key={item.cmpy_code} value={item.cmpy_code}>
                                  {item.cmpy_desc}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[8, 1]}>
                      <Col span={24}>
                        <Form.Item
                          name="trsa_qty_owned_to"
                          label={t('fields.baseOwnerQuantity')}
                          rules={[
                            {
                              required: true,
                              validator: validateInput,
                              label: t('fields.baseOwnerQuantity'),
                              minValue: -999999999,
                              maxValue: 999999999,
                              maxLen: 20,
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            disabled={true}
                            style={{ width: '100%' }}
                            min={-999999999}
                            max={999999999}
                            precision={config?.precisionVolume}
                            // addonAfter={!value ? t('units.lcor') : value?.description}
                            // onChange={handleQtyProportionFieldChange}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[8, 1]}>
                      <Col span={24}>
                        <Form.Item
                          name="trsa_density_owned_to"
                          label={t('fields.baseOwnerDensity')}
                          rules={[
                            {
                              required: true,
                              validator: validateInput,
                              label: t('fields.baseOwnerDensity'),
                              minValue: 0,
                              maxValue: 999999999,
                              maxLen: 20,
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            disabled={true}
                            style={{ width: '100%' }}
                            min={0}
                            max={999999999}
                            precision={config?.precisionDensity}
                            addonAfter={t('units.kg/m3')}
                            // onChange={handleQtyProportionFieldChange}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[8, 1]}>
                <Col span={18}>
                  <Form.Item
                    name="qty"
                    label={t('fields.baseOwnerTransQuantity')}
                    rules={[
                      {
                        required: true,
                        validator: validateInput,
                        label: t('fields.baseOwnerTransQuantity'),
                        minValue: -999999999,
                        maxValue: 999999999,
                        maxLen: 20,
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      disabled={selected?.trsa_approved}
                      style={{ width: '100%' }}
                      min={-999999999}
                      max={999999999}
                      precision={config?.precisionVolume}
                      // addonAfter={!value ? t('units.lcor') : value?.description}
                      // onChange={handleQtyProportionFieldChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="trsa_unit"
                    label={t('fields.baseOwnerTransUnit')}
                    rules={[
                      { required: true, validator: validateList, label: t('fields.baseOwnerTransUnit') },
                    ]}
                  >
                    <Select
                      dropdownMatchSelectWidth={false}
                      showSearch
                      disabled={true}
                      // onChange={handleChange}
                      optionFilterProp="children"
                      placeholder={t('placeholder.selectUnit')}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {units?.records?.map((item, index) => (
                        <Select.Option key={index} value={_.toNumber(item.unit_id)}>
                          {item.description}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[8, 1]}>
                <Col span={18}>
                  <Form.Item name="trsa_comments" label={t('fields.baseOwnerTransComments')}>
                    <Input.TextArea disabled={selected?.trsa_approved}></Input.TextArea>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Row gutter={[8, 1]}>
                    <Col span={24}>
                      <Form.Item
                        name="trsa_approved"
                        valuePropName="checked"
                        // label={t('fields.baseOwnerTransApproved')}
                        label=" "
                      >
                        <CheckboxContainer>
                          <Checkbox checked={selected?.trsa_approved} disabled={true}>
                            {t('fields.baseOwnerTransApproved')}
                          </Checkbox>
                        </CheckboxContainer>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[8, 1]}>
                    <Col span={24}>
                      <Form.Item
                        name="trsa_reversed"
                        valuePropName="checked"
                        // label={t('fields.baseOwnerTransReversed')}
                      >
                        <CheckboxContainer>
                          <Checkbox checked={selected?.trsa_reversed} disabled={true}>
                            {t('fields.baseOwnerTransReversed')}
                          </Checkbox>
                        </CheckboxContainer>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Form>
      </Drawer>
    </>
  );
};

export default BaseOwnershipTransactions;
