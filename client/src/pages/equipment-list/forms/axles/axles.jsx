import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';

import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import api, { AXLE_WEIGHTS } from '../../../../api';
import columns from './columns';

const Axles = ({ form, value, equipment, type, count }) => {
  const { t } = useTranslation();

  const [data, setData] = useState(undefined);
  const [options, setOptions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState(undefined);
  const [tableAPI, setTableAPI] = useState(null);
  const [fields, setFields] = useState([]);
  const [offsets, setOffsets] = useState([]);

  const { setFieldsValue, getFieldValue } = form;

  // const { data: payload, isValidating } = useSWR(`${AXLE_WEIGHTS.GET_EQPT_AXLE_WEIGHTS}?eqpt_id=${value?.eqpt_id}`, { revalidateOnFocus: false });
  const { data: limitTypes } = useSWR(AXLE_WEIGHTS.AVAIL_LIMIT_TYPES);
  const { data: axleGroups } = useSWR(AXLE_WEIGHTS.AVAIL_AXLE_GROUPS);
  // const { data: axleWeights } = useSWR(`${AXLE_WEIGHTS.CURR_AXLE_WEIGHT_LIMIT}?limit_type=${type}`);
  const { data: axleWeights } = useSWR(AXLE_WEIGHTS.READ);

  const fetchByEquipment = useCallback(
    (id) => {
      setLoading(true);

      api.get(`${AXLE_WEIGHTS.GET_EQPT_AXLE_WEIGHTS}?eqpt_id=${id}`).then((response) => {
        setData(response.data.records);
        setOffsets(calcOffsets(response.data.records));
        setFieldsValue({ axles: response.data.records });
        setLoading(false);
      });
    },
    [setFieldsValue]
  );

  const adjustAxle = (type, group, weights, axle) => {
    // "axle_limit_type_id": 1,
    // "axle_limit_type_code": "GML",
    // "axle_limit_type_name": "GML: General Mass Limits",
    // "axle_group_id": 0,
    // "axle_group_name": "N\/A",
    // "axle_weight_limit": 0
    const groupItem = _.find(weights?.records, (item) => {
      return item.axle_limit_type_id === type && item.axle_group_id === group;
    });
    const axle_limit = groupItem?.axle_weight_limit === undefined ? 0 : groupItem?.axle_weight_limit;
    const axleItem = {
      eqpt_id: axle?.eqpt_id,
      axle_id: axle?.axle_id,
      limit_type_id: type,
      axle_group: group,
      user_weight_limit: axle?.user_weight_limit === undefined ? axle_limit : axle?.user_weight_limit,
      limit_type_code: groupItem?.axle_limit_type_code,
      limit_type_name: groupItem?.axle_limit_type_name,
      axle_group_name: groupItem?.axle_group_name,
      axle_weight_limit: axle_limit,
    };
    axleItem.user_weight_offset = axleItem?.user_weight_limit - axleItem?.axle_weight_limit;
    console.log('adjustAxle', groupItem, axleItem);

    return axleItem;
  };

  const initAxle = (id, no, type, group, weights) => {
    // "axle_limit_type_id": 1,
    // "axle_limit_type_code": "GML",
    // "axle_limit_type_name": "GML: General Mass Limits",
    // "axle_group_id": 0,
    // "axle_group_name": "N\/A",
    // "axle_weight_limit": 0
    const groupItem = _.find(weights?.records, (item) => {
      return item.axle_limit_type_id === type && item.axle_group_id === group;
    });
    const axle_limit = groupItem?.axle_weight_limit === undefined ? 0 : groupItem?.axle_weight_limit;
    const axle = {
      eqpt_id: id,
      axle_id: no,
      limit_type_id: type,
      axle_group: group,
      user_weight_limit: axle_limit,
      limit_type_code: groupItem?.axle_limit_type_code,
      limit_type_name: groupItem?.axle_limit_type_name,
      axle_group_name: groupItem?.axle_group_name,
      axle_weight_limit: axle_limit,
    };
    axle.user_weight_offset = 0;

    return axle;
  };

  const initAxles = (id, type, number, weights) => {
    const axles = [];
    for (let i = 0; i < number; i++) {
      const group = (i % 5) + 1;
      const axle = initAxle(id, i + 1, type, group, weights);
      axles.push(axle);
    }

    return axles;
  };

  const initByEquipment = useCallback(
    (id, type, number, weights) => {
      setLoading(true);
      const axles = initAxles(id, type, number, weights);
      setData(axles);
      setOffsets(calcOffsets(axles));
      setFieldsValue({ axles: axles });
      setLoading(false);
    },
    [setFieldsValue]
  );

  const adjustAxles = (id, type, number, weights, currAxles) => {
    const len = _.min([currAxles.length, number]);
    const axles = [];
    // adjust the existing axle(s)
    for (let i = 0; i < len; i++) {
      const axle = adjustAxle(type, currAxles?.[i]?.axle_group, weights, currAxles?.[i]);
      axles.push(axle);
    }
    // init the new axle(s)
    for (let i = len; i < number; i++) {
      const group = (i % 5) + 1;
      const axle = initAxle(id, i + 1, type, group, weights);
      axles.push(axle);
    }

    return axles;
  };

  const calcOffsets = (records) => {
    const values = [];
    _.forEach(records, (item) => {
      values.push(item.user_weight_limit - item.axle_weight_limit);
    });
    return values;
  };

  const handleItemSelect = async (items) => {
    console.log('handleItemSelect', items);
    if (items && items[0]) {
      items[0].editable = true;
    }
    console.log('handleItemSelect222', items);
    setSelected(items);
  };

  const onEditingFinished = (cell) => {
    let axleItem = cell.data;

    console.log('onEditingFinished', cell, cell.colDef);

    // get the new standard weight limit if the axle group is changed
    if (cell.colDef.field === 'axle_group') {
      // AXLE_LIMIT_TYPE_ID, AXLE_GROUP_ID, AXLE_WEIGHT_LIMIT
      /* console.log('onEditingFinished1', axleItem);
      const tempItem = adjustAxle(type, cell?.value, axleWeights, axleItem);
      axleItem.axle_group = tempItem?.axle_group;
      axleItem.axle_weight_limit = tempItem?.axle_weight_limit;
      axleItem.user_weight_limit = tempItem?.user_weight_limit;
      console.log('onEditingFinished2', axleItem); */
      const axleGroupItem = _.find(axleWeights?.records, (item) => {
        return item.axle_limit_type_id === type && item.axle_group_id === cell?.value;
      });
      // console.log('onEditingFinished2', axleGroupItem, axleWeights);
      if (!!axleGroupItem && axleGroupItem?.axle_weight_limit !== axleItem?.axle_weight_limit) {
        axleItem.axle_weight_limit = axleGroupItem?.axle_weight_limit;
        if (!axleItem.user_weight_limit) {
          axleItem.user_weight_limit = axleGroupItem?.axle_weight_limit;
        }
        // axleItem.user_weight_offset = axleItem.user_weight_limit - axleItem.axle_weight_limit;
      }
    }

    if (cell.colDef.field === 'user_weight_limit') {
      axleItem.user_weight_limit = _.toNumber(cell?.value);
    }

    console.log('onEditingFinished3', axleItem);
    // calculate the weight offset if necessary
    axleItem.user_weight_offset =
      axleItem?.user_weight_limit - axleItem?.axle_weight_limit === undefined
        ? 0
        : axleItem?.axle_weight_limit;

    tableAPI.updateRowData({ update: [axleItem] });

    const rows = [];
    tableAPI.forEachNodeAfterFilterAndSort((rowNode, index) => {
      rows.push(rowNode.data);
    });
    console.log('................ rows', rows);
    setOffsets([]);
    setOffsets(calcOffsets(rows));

    handleItemSelect([axleItem]);
  };

  useEffect(() => {
    console.log('.........edit1 equipment', equipment, data);
    if (equipment > 0) {
      console.log('.........edit2 equipment', equipment, data);
      fetchByEquipment(equipment);
    }
  }, [equipment, fetchByEquipment]);

  useEffect(() => {
    console.log('.........data1 equipment, count, data', count, data, equipment);
    if (equipment <= 0) {
      console.log('.........data3 !equipment', count, data, equipment);
      if (axleWeights) {
        initByEquipment(equipment, type, count, axleWeights);
      }
    }
  }, [equipment, type, count, axleWeights, initByEquipment]);

  useEffect(() => {
    console.log('.........data4 equipment, count, data', count, data, equipment, 
      (count===''), (count===undefined), (count===null), _.isNumber(count), _.isFinite(count));
    if (data && setFieldsValue && (count !== '' && count !== null && _.isFinite(count))) {
      console.log('.........data5 data', count, data, equipment);
      if (
        ((data?.length > 0 && type !== data?.[0]?.limit_type_id) || count !== data?.length) &&
        axleWeights
      ) {
        console.log('.........data6 data', count, data, equipment);
        const axles = adjustAxles(equipment, type, count, axleWeights, data);
        console.log('.........data7 data', count, data, equipment, axles);
        setData(axles);
        setOffsets(calcOffsets(axles));
        setFieldsValue({ axles: axles });
      }
    }
  }, [equipment, type, count, axleWeights, data, setFieldsValue]);

  useEffect(() => {
    const values = columns(t, selected, axleGroups, offsets, 1);
    setFields(values);
  }, [t, selected, axleGroups, offsets]);

  return (
    <Form.Item name="axles" label="">
      <DataTable
        minimal
        columns={fields}
        data={data}
        isLoading={isLoading}
        parentHeight={data?.length > 0 ? `${data?.length * 25 + 90}px` : '135px'}
        selectionMode="single"
        handleSelect={(value) => handleItemSelect(value)}
        apiContext={setTableAPI}
        onEditingFinished={onEditingFinished}
        editType={false}
      />
    </Form.Item>
  );
};

export default Axles;
