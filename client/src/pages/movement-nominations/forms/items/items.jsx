import React, { useState, useEffect } from 'react';
import { PlusOutlined, MinusOutlined, EyeOutlined, CarryOutOutlined } from '@ant-design/icons';
import { Button, Form, Select, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { MOVEMENT_NOMIATIONS } from '../../../../api';
import { DataTable } from '../../../../components';

import columns from './columns';

const Items = ({ value }) => {
  const { t } = useTranslation();

  const { data: payload } = useSWR(`${MOVEMENT_NOMIATIONS.ITEMS}?mv_id=${value?.mv_id}`);
  const { data: types } = useSWR(MOVEMENT_NOMIATIONS.TYPES, { refreshInterval: 0 });
  const { data: units } = useSWR(MOVEMENT_NOMIATIONS.UNITS, { refreshInterval: 0 });

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState([]);

  const fields = columns(t);

  const IS_DISABLED = selected.length === 0;
  //const TYPE = selected[0]?.mvitm_type_name;

  const handleItemAdd = () => {
    const length = size + 1;

    const value = {
      mvitm_line_id: String(size + 1),
      mvitm_item_id: '',
      mvitm_type: '0',
      mvitm_type_name: 'Receipt',
      mvitm_item_key: String(size + 1),
      mvitm_status_name: 'NEW',
      mvitm_prod_qty: '0',
      mvitm_prod_unit: '5',
      mvitm_prod_unit_str: 'l (amb)',
      mvitm_plant_from: '',
      mvitm_prodcmpy_from: '',
      mvitm_prodname_from: '',
      mvitm_tank_from: '',
      mvitm_shiploc_from: '',
      mvitm_shiptext_from: '',
      mvitm_shiptext_from2: '',
      mvitm_plant_to: '',
      mvitm_prodcmpy_to: '',
      mvitm_prodname_to: '',
      mvitm_tank_to: '',
      mvitm_shiploc_to: '',
      mvitm_shiptext_to: '',
      mvitm_shiptext_to2: '',
      mvitm_comments: '',
      mvitm_qty_schd: '0',
      mvitm_qty_move: '0',
      mvitm_qty_delv: '0',
      editable: true
    };

    setSize(length);

    tableAPI.updateRowData({ add: [value] });
  };

  const handleItemRemove = () => {
    tableAPI.updateRowData({ remove: selected });
  };

  const handleNominationType = value => {
    const payload = [];

    const filtered = _.find(types?.records, ['movitem_type_id', value]);

    if (filtered) {
      tableAPI.forEachNodeAfterFilterAndSort((rowNode, index) => {
        if (selected[0].mvitm_line_id === rowNode.data.mvitm_line_id) {
          rowNode.data.mvitm_type = filtered.movitem_type_id;
          rowNode.data.mvitm_type_name = filtered.movitem_type_name;

          payload.push(rowNode.data);
        }
      });

      setSelected(payload);
      tableAPI.updateRowData({ update: payload });
    }
  };

  const handleProductQuantity = value => {
    const payload = [];

    tableAPI.forEachNodeAfterFilterAndSort((rowNode, index) => {
      if (selected[0].mvitm_line_id === rowNode.data.mvitm_line_id) {
        rowNode.data.mvitm_prod_qty = value;

        payload.push(rowNode.data);
      }
    });

    setSelected(payload);
    tableAPI.updateRowData({ update: payload });
  };

  const handleProductUnit = value => {
    const payload = [];

    const filtered = _.find(units?.records, ['unit_id', value]);

    if (filtered) {
      tableAPI.forEachNodeAfterFilterAndSort((rowNode, index) => {
        if (selected[0].mvitm_line_id === rowNode.data.mvitm_line_id) {
          rowNode.data.mvitm_prod_unit = filtered.unit_id;
          rowNode.data.mvitm_prod_unit_str = filtered.description;

          payload.push(rowNode.data);
        }
      });

      setSelected(payload);
      tableAPI.updateRowData({ update: payload });
    }
  };

  useEffect(() => {
    setData(payload?.records);
    setSize(payload?.records?.length || 0);
  }, [payload]);

  return (
    <Form.Item field="items">
      <Button type="primary" icon={<PlusOutlined />} onClick={handleItemAdd} style={{ marginRight: 5 }}>
        {t('operations.addLineItem')}
      </Button>

      <Button
        type="danger"
        icon={<MinusOutlined />}
        disabled={IS_DISABLED}
        onClick={handleItemRemove}
        style={{ marginBottom: 10 }}
      >
        {t('operations.deleteLineItem')}
      </Button>

      <Button icon={<CarryOutOutlined />} style={{ float: 'right', marginRight: 5 }} disabled={IS_DISABLED}>
        {t('operations.makeTransaction')}
      </Button>

      <Button icon={<EyeOutlined />} style={{ float: 'right', marginRight: 5 }} disabled={IS_DISABLED}>
        {t('operations.viewTransaction')}
      </Button>

      <Button icon={<EyeOutlined />} style={{ float: 'right', marginRight: 5 }} disabled={IS_DISABLED}>
        {t('operations.viewSchedule')}
      </Button>

      <div style={{ display: 'flex' }}>
        <div style={{ width: !IS_DISABLED ? '80%' : '100%', transition: 'width 0.3s ease-in-out' }}>
          <DataTable
            columns={fields}
            data={data}
            height="42vh"
            handleSelect={setSelected}
            apiContext={setTableAPI}
            selectionMode="single"
          />
        </div>

        <div
          style={{
            width: !IS_DISABLED ? '20%' : '0%',
            transition: 'width 0.3s ease-in-out',
            marginLeft: !IS_DISABLED ? 10 : 0,
            marginRight: !IS_DISABLED ? 5 : 0,
            paddingRight: 10,
            marginTop: 30,
            overflowY: 'scroll',
            maxHeight: 'calc(60vh - 7px)'
          }}
        >
          {!IS_DISABLED && (
            <>
              <Form.Item label={t('fields.nominationType')}>
                <Select
                  value={selected[0]?.mvitm_type}
                  onChange={handleNominationType}
                  disabled={IS_DISABLED}
                >
                  {types?.records.map(item => (
                    <Select.Option key={item.movitem_type_id} value={item.movitem_type_id}>
                      {item.movitem_type_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label={t('fields.productQuantity')}>
                <InputNumber
                  style={{ width: '100%' }}
                  value={selected[0]?.mvitm_prod_qty}
                  onChange={handleProductQuantity}
                  disabled={IS_DISABLED}
                />
              </Form.Item>

              <Form.Item label={t('fields.productUnit')}>
                <Select
                  value={selected[0]?.mvitm_prod_unit}
                  onChange={handleProductUnit}
                  disabled={IS_DISABLED}
                >
                  {units?.records.map(item => (
                    <Select.Option key={item.unit_id} value={item.unit_id}>
                      {item.description}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label={t('fields.toPlant')}>
                <Select
                  value={selected[0]?.mvitm_prod_unit}
                  onChange={handleProductUnit}
                  disabled={IS_DISABLED}
                >
                  {units?.records.map(item => (
                    <Select.Option key={item.unit_id} value={item.unit_id}>
                      {item.description}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label={t('fields.toSupplier')}>
                <Select
                  value={selected[0]?.mvitm_prod_unit}
                  onChange={handleProductUnit}
                  disabled={IS_DISABLED}
                >
                  {units?.records.map(item => (
                    <Select.Option key={item.unit_id} value={item.unit_id}>
                      {item.description}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label={t('fields.toProduct')}>
                <Select
                  value={selected[0]?.mvitm_prod_unit}
                  onChange={handleProductUnit}
                  disabled={IS_DISABLED}
                >
                  {units?.records.map(item => (
                    <Select.Option key={item.unit_id} value={item.unit_id}>
                      {item.description}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label={t('fields.toTank')}>
                <Select
                  value={selected[0]?.mvitm_prod_unit}
                  onChange={handleProductUnit}
                  disabled={IS_DISABLED}
                >
                  {units?.records.map(item => (
                    <Select.Option key={item.unit_id} value={item.unit_id}>
                      {item.description}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label={t('fields.comments')}>
                <Select
                  value={selected[0]?.mvitm_prod_unit}
                  onChange={handleProductUnit}
                  disabled={IS_DISABLED}
                >
                  {units?.records.map(item => (
                    <Select.Option key={item.unit_id} value={item.unit_id}>
                      {item.description}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}
        </div>
      </div>
    </Form.Item>
  );
};

export default Items;
