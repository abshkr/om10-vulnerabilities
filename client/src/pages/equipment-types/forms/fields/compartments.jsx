import React, { useEffect } from 'react';

import useSWR from 'swr';

import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { Form, Radio } from 'antd';
import _ from 'lodash';

import { EQUIPMENT_TYPES } from '../../../../api';
import { Equipment, DataTable } from '../../../../components';
import { useConfig } from '../../../../hooks';

const Compartments = ({ form, value, isCombination }) => {
  const { railTankAvailable, rigidShipAvailable } = useConfig();

  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const CAN_CHANGE_EQUIPMENT = !isCombination;

  const equipment = _.reject(['p', 'f', 't', 'r', 's', 'e'], (equipment) => {
    if (!railTankAvailable) {
      return equipment === 'e';
    }

    if (!rigidShipAvailable) {
      return equipment === 's';
    }
  });

  const names = {
    p: t('fields.primeMover'),
    f: t('fields.flatBed'),
    t: t('fields.trailer'),
    r: t('fields.ridgid'),
    s: t('fields.rigidShip'),
    e: t('fields.railTank'),
  };

  const { data: composition, isValidating } = useSWR(
    `${EQUIPMENT_TYPES.COMPOSITION}?etyp_id=${value.etyp_id}`
  );

  useEffect(() => {
    if (value) {
      setFieldsValue({
        etyp_category: value.etyp_category?.toLowerCase(),
      });
    }
  }, [value, setFieldsValue]);

  const columns = [
    {
      headerName: t('fields.compartment'),
      field: 'cmpt_no',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.capacity'),
      field: 'cmpt_capacit',
      sortable: true,
      resizable: true,
    },
    {
      headerName: t('fields.unit'),
      field: 'cmpt_units',
      sortable: true,
      resizable: true,
    },
  ];

  return (
    <div>
      {CAN_CHANGE_EQUIPMENT && (
        <Scrollbars
          style={{
            width: '100%',
            padding: 5,
            height: 180,
          }}
        >
          <Form.Item name="etyp_category">
            <Radio.Group>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {equipment.map((item) => (
                  <div
                    key={item}
                    style={{
                      marginRight: 10,
                      minWidth: 300,
                      height: 140,
                      background: 'white',

                      borderRadius: 5,
                    }}
                    hoverable
                  >
                    <Equipment
                      image={item}
                      style={{
                        height: '100%',

                        objectFit: 'contain',
                        objectPosition: '0 0',
                        transform: 'scale(0.8)',
                      }}
                    />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Radio value={item}>{names[item]}</Radio>
                    </div>
                  </div>
                ))}
              </div>
            </Radio.Group>
          </Form.Item>
        </Scrollbars>
      )}

      <Scrollbars
        style={{
          width: '100%',
          padding: 5,
          height: '420px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {composition?.records?.map((item) => (
            <div key={item} style={{ marginRight: 10 }}>
              <Equipment image={item?.etyp_category?.toLowerCase()} showName={item.etyp_title} />
              {item.etyp_category !== 'P' && item.etyp_category !== 'F' && (
                <DataTable data={item?.compartments} columns={columns} minimal height="80vh" />
              )}
            </div>
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};

export default Compartments;
