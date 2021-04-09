import React, { useEffect, useState, useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { Equipment } from '../../../../components';
import api, { TANKER_LIST } from '../../../../api';
import { Table, Select, Form } from 'antd';
import columns from './columns';
import Cell from './cell';
import Row from './row';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const Compartments = ({ form, value, equipment }) => {
  const { t } = useTranslation();

  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { setFieldsValue } = form;

  const fetch = useCallback((id) => {
    setIsLoading(true);

    api.get(`${TANKER_LIST.COMPOSITION}?tnkr_code=${id}`).then((response) => {
      setdata(response.data.records);
      setIsLoading(false);
    });
  }, []);

  const fetchComposition = useCallback((id) => {
    setIsLoading(true);

    api.get(`${TANKER_LIST.TYPE_COMPOSITION}?etyp_id=${id}`).then((response) => {
      setdata(response.data.records);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!!value) {
      fetch(value.tnkr_code);
    } else {
      if (!!equipment) {
        fetchComposition(equipment);
      }
    }
  }, [value, fetch, equipment, fetchComposition]);

  const save = (row) => {
    const payload = [...data];

    if (value) {
      let composition = _.find(payload, ['eqpt_code', row.eqpt_code]);

      const compartmentIndex = _.findIndex(composition.compartments, (object) => {
        return object.cmpt_no === row.cmpt_no;
      });

      const compositionIndex = _.findIndex(payload, (object) => {
        return object.eqpt_code === row.eqpt_code;
      });

      composition.compartments.splice(compartmentIndex, 1, row);

      payload.splice(compositionIndex, 1, composition);

      setdata(payload);

      setFieldsValue({
        tnkr_equips: _.map(payload, (value) => {
          return _.omit(value, ['eqpt_list']);
        }),
      });
    } else {
      let composition = _.find(payload, ['eqpt_code', row.eqpt_code]);

      const compartmentIndex = _.findIndex(composition.compartments, (object) => {
        return object.cmpt_no === row.cmpt_no;
      });

      const compositionIndex = _.findIndex(payload, (object) => {
        return object.eqpt_code === row.eqpt_code;
      });

      composition.compartments.splice(compartmentIndex, 1, row);

      payload.splice(compositionIndex, 1, composition);

      setdata(payload);

      setFieldsValue({
        tnkr_equips: _.map(payload, (value) => {
          return _.omit(value, ['eqpt_list']);
        }),
      });
    }
  };

  // need use seq to locate the correct sub eqpt type when combo type is made of more than one same eqpt type
  const changeType = (tanker, code, seq) => {
    api.get(`${TANKER_LIST.COMPARTMENT}?eqpt_id=${code}`).then((response) => {
      const payload = [...data];
      let index = 0;
      if (!!value) {
        index = _.findIndex(payload, ['tc_eqpt', tanker.tc_eqpt]);
        let compartment = _.find(tanker.eqpt_list, ['eqpt_id', code]);
        compartment['compartments'] = response.data.records;
        compartment['eqpt_list'] = tanker.eqpt_list;
        compartment['tc_eqpt'] = tanker.tc_eqpt;
        compartment['image'] = tanker.image;
        compartment['etyp_title'] = tanker.etyp_title;

        payload.splice(index, 1, compartment);
        setdata(payload);
      } else {
        console.log('...................changeType', seq, code);
        index = seq; //_.findIndex(payload, ['etyp_id', tanker.etyp_id]);
        let compartment = _.find(tanker.eqpt_list, ['eqpt_id', code]);
        compartment['compartments'] = response.data.records;
        compartment['eqpt_list'] = tanker.eqpt_list;
        compartment['etyp_id'] = tanker.etyp_id;
        compartment['image'] = tanker.image;
        compartment['etyp_title'] = tanker.etyp_title;

        payload.splice(index, 1, compartment);
        setdata(payload);
      }

      setFieldsValue({
        tnkr_equips: _.map(payload, (value) => {
          return _.omit(value, ['eqpt_list']);
        }),
      });
    });
  };

  const fields = columns(t).map((col) => {
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
      }),
    };
  });

  return (
    <Form.Item name="tnkr_equips">
      <Scrollbars
        style={{
          width: '100%',
          padding: 5,
          height: 'calc(60vh - 100px)',
        }}
      >
        <div style={{ display: 'flex' }}>
          {[...data].map((item, index) => (
            <div key={index} style={{ marginRight: 10 }}>
              <Equipment image={_.toLower(item.image)} isLoading={isLoading} showName={item.etyp_title} />
              {/* <div style={{ textAlign: 'center' }}>
                <b>{item.etyp_title}</b>
              </div> */}
              <Select
                dropdownMatchSelectWidth={false}
                onChange={(value) => changeType(item, value, index)}
                // value={item.tc_eqpt || undefined}
                // placeholder={t('placeholder.selectEquipment')}
                placeholder={
                  !item?.tc_eqpt
                    ? t('placeholder.selectEquipment')
                    : item.eqpt_code + '[' + item.eqpt_title + ']'
                }
                style={{ marginBottom: 10, marginTop: 30 }}
                disabled={item.eqpt_list.length === 0}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {!isLoading &&
                  item.eqpt_list.map((item, index) => (
                    <Select.Option key={index} value={item.eqpt_id}>
                      {`${item.eqpt_name}: [Compartments:${
                        item.compartments.length
                      }]${item?.compartments?.map(
                        (item2, index) =>
                          `[${item2.cmpt_units}:(${item2.cmpt_no})${item2.safefill},${item2.sfl}]`
                      )}`}
                    </Select.Option>
                  ))}
              </Select>

              {item.compartments.length !== 0 && (
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
                  style={{ marginBottom: 5, width: '30vw' }}
                  scroll={{ y: '45vh' }}
                  rowClassName={() => 'editable-row'}
                  bordered
                  dataSource={item.compartments}
                  columns={fields}
                  pagination={false}
                />
              )}
            </div>
          ))}
        </div>
      </Scrollbars>
    </Form.Item>
  );
};

export default Compartments;
