import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Select, Form, notification } from 'antd';

import useSWR from 'swr';
import _ from 'lodash';

import api, { EQUIPMENT_LIST } from '../../../../api';
import columns from './columns';
import Cell from './cell';
import Row from './row';

const Compartments = ({ form, value, eqptType, onChange, config }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState(value?.eqpt_code || null);

  const { setFieldsValue } = form;

  const { data: types } = useSWR(EQUIPMENT_LIST.TYPES, { revalidateOnFocus: false });

  const fetchByCompartment = useCallback(
    (id) => {
      setLoading(true);

      api.get(`${EQUIPMENT_LIST.COMPARTMENTS}?eqpt_id=${id}`).then((response) => {
        setData([]);    //Muse do this before next setData, otherwise frontend does not refresh to new data
        setData(response.data.records);
        setFieldsValue({ compartments: response.data.records });
        setLoading(false);
      });
    },
    [setFieldsValue]
  );

  const fetchByEquipment = useCallback(
    (id) => {
      setLoading(true);

      api.get(`${EQUIPMENT_LIST.COMPARTMENT_EQUIPMENT}?etyp_id=${id}`).then((response) => {
        // loop through the eqpt type compartment list, add column safefill and sfl with the value of cmpt_capacit
        _.forEach(response?.data?.records, (item) => {
          item.safefill = item.cmpt_capacit;
          item.sfl = item.cmpt_capacit;
        });
        setData(response.data.records);
        setFieldsValue({ compartments: response.data.records });
        setLoading(false);
      });
    },
    [setFieldsValue]
  );

  const save = (row) => {
    let payload = [...data];

    const index = payload.findIndex((item) => item.cmpt_no === row.cmpt_no);

    payload.splice(index, 1, row);

    setData(payload);

    setFieldsValue({
      compartments: payload,
    });
  };

  const handleEquipmentSelect = (value) => {
    fetchByCompartment(value);
    setSelected(value);
  };

  useEffect(() => {
    if (eqptType) {
      api
        .get(EQUIPMENT_LIST.MATCHES_BY_TYPE, {
          params: {
            eqpt_etp: eqptType,
            pgflag: 'N',
          },
        })
        .then((res) => {
          setOptions(res.data.records);
          setSelected(res.data.records[0]?.eqpt_id);
          setSelected(value ? value.eqpt_id.toString() : res.data.records[0]?.eqpt_id);
        })
        .catch((errors) => {
          _.forEach(errors.response.data.errors, (error) => {
            notification.error({
              message: error.type,
              description: error.message,
            });
          });
        });
    }
  }, [ eqptType ]);

  useEffect(() => {
    // the eqpttype in value?.eqpt_etp is String and eqptType is Number,
    // so etp will be a String in EDIT mode, a Number in CREATE mode.
    // But etyp_id in eqpt types is a Number, so we must force etp to Number.
    const etp = value?.eqpt_etp || eqptType;
    // change the filter condition to make both sides number
    // const type = _.find(types?.records, ['etyp_id', _.toNumber(etp)]);
    const type = _.find(types?.records, (item) => _.toNumber(item?.etyp_id) === _.toNumber(etp));
    const image = type?.image?.toLowerCase() || null;
    console.log('compartments - image', eqptType, value?.eqpt_etp, etp, type, type?.image, image);

    onChange(image);
  }, [value, types, eqptType, onChange]);

  useEffect(() => {
    if (value) {
      fetchByCompartment(value.eqpt_id);
    }
  }, [value]);

  useEffect(() => {
    if (!value && eqptType) {
      fetchByEquipment(eqptType);
    }
  }, [eqptType]);

  const fields = columns(t, config).map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        data: data,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: save,
        config: config,
      }),
    };
  });

  if (eqptType && data.length > 0) {
    return (
      <Form.Item name="compartments">
        <Select
          dropdownMatchSelectWidth={false}
          placeholder={t('placeholder.selectPlease')}
          style={{ marginBottom: 10, marginTop: 10 }}
          showSearch
          value={selected}
          loading={isLoading}
          onSelect={handleEquipmentSelect}
          disabled={options.length === 0}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map((item, index) => (
            <Select.Option key={item.eqpt_id} value={item.eqpt_id}>
              {`${item.eqpt_code}[${item.eqpt_title}]: [${t('fields.compartments')}:${
                item?.compartments?.length
              }]${
                item?.compartments?.length === 0 ? '' : '[' + item?.compartments?.[0]?.cmpt_units + ']'
              }${item?.compartments?.map((item2, index) => `[${item2.safefill}]`)}`}
            </Select.Option>
          ))}
        </Select>
        <div style={{ textAlign: 'center', marginBottom: 10 }}>{t('descriptions.compartmentCopy')}</div>
        <Table
          size="small"
          rowKey="cmpt_no"
          loading={isLoading}
          components={{
            body: {
              row: Row,
              cell: Cell,
            },
          }}
          scroll={{ y: '30vh' }}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={data}
          columns={fields}
          pagination={false}
        />
      </Form.Item>
    );
  }

  return null;
};

export default Compartments;