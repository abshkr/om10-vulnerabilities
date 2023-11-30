import React, { useEffect } from 'react';

import useSWR from 'swr';

import { Scrollbars } from 'react-custom-scrollbars-2';
import { useTranslation } from 'react-i18next';
import { Form, Radio, notification } from 'antd';
import _ from 'lodash';

import api, { EQUIPMENT_TYPES } from '../../../../api';
import { Equipment, DataTable } from '../../../../components';
import { useConfig } from '../../../../hooks';

const Compartments = ({ form, value, isCombination }) => {
  const { railTankAvailable, rigidShipAvailable, showSeals, maxSealsPerCompartment } = useConfig();

  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const CAN_CHANGE_EQUIPMENT = !isCombination;

  /* const equipment = _.reject(['p', 'f', 't', 'r', 's', 'e'], (equipment) => {
    if (!railTankAvailable) {
      return equipment === 'e';
    }

    if (!rigidShipAvailable) {
      return equipment === 's';
    }

    if (!(_.toNumber(value?.etyp_n_items) === 0)) {
      return (equipment === 'p' || equipment === 'f');
    }

    if (!(_.toNumber(value?.etyp_n_items) > 0)) {
      return (equipment === 't' || equipment === 'r' || equipment === 's' || equipment === 'e');
    }
  }); */

  const makeEquipmentImageList = (cmpt) => {
    const list = [];

    if (cmpt === 0) {
      list.push('p');
      list.push('f');
    } else {
      list.push('t');
      list.push('r');
      if (railTankAvailable) {
        list.push('e');
      }
      if (rigidShipAvailable) {
        list.push('s');
      }
    }

    return list;
  };

  const equipment = makeEquipmentImageList(value?.etyp_n_items);

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

  const onCellUpdate = async (value) => {
    console.log('onCellUpdate', value?.data);

    if (!_.isInteger(_.toNumber(value?.newValue))) {
      notification.error({
        message: t('descriptions.mustBeInteger'),
        description:
          value?.colDef?.headerName +
          ': ' +
          value?.newValue +
          ', ' +
          t('fields.compartment') +
          ': ' +
          value?.data.cmpt_no,
      });

      return;
    }

    if (_.toNumber(value?.newValue) > _.toNumber(maxSealsPerCompartment)) {
      notification.error({
        message: t('descriptions.exceedMaxNumber'),
        description:
          value?.colDef?.headerName +
          ': ' +
          value?.newValue +
          ', ' +
          t('fields.maxNumber') +
          ': ' +
          String(maxSealsPerCompartment),
      });

      return;
    }

    if (_.toNumber(value?.newValue) < 0) {
      notification.error({
        message: t('descriptions.CannotBeNegative'),
        description: value?.colDef?.headerName + ': ' + value?.newValue,
      });

      return;
    }

    await api.post(EQUIPMENT_TYPES.UPDATE_NUMSEALS, value?.data);
  };

  const columns = [
    {
      headerName: t('fields.equipmentType'),
      field: 'etyp_id',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.columnNo'),
      field: 'cmpt_no',
      sortable: true,
      resizable: true,
      width: 50,
      suppressSizeToFit: true,
    },
    {
      headerName: t('fields.capacity'),
      field: 'cmpt_capacit',
      sortable: true,
      resizable: true,
      width: showSeals ? 100 : 250,
      suppressSizeToFit: true,
    },
    {
      headerName: t('fields.unit'),
      field: 'cmpt_units',
      sortable: true,
      resizable: true,
      width: showSeals ? 100 : 100,
      suppressSizeToFit: true,
    },
    {
      headerName: t('fields.unit'),
      field: 'cmpt_unit_id',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.unit'),
      field: 'cmpt_unit_id',
      sortable: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: t('fields.numOfSeals'),
      field: 'cmpt_n_seals',
      sortable: true,
      resizable: true,
      width: showSeals ? 150 : 1,
      hide: !showSeals,
      editable: showSeals,

      cellClass: showSeals ? 'editable-ag-grid-cell' : '',
      suppressSizeToFit: true,
      cellEditor: 'NumericEditor',
      cellEditorParams: {
        ranges: {
          max: _.toNumber(maxSealsPerCompartment),
          min: 0,
        },
        t,
      },
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
            <div key={item} style={{ marginRight: 10, width: '400px' }}>
              <Equipment image={item?.etyp_category?.toLowerCase()} showName={item.etyp_title} />
              {item.etyp_category.toUpperCase() !== 'P' && item.etyp_category.toUpperCase() !== 'F' && (
                <DataTable
                  data={item?.compartments}
                  columns={columns}
                  minimal
                  height="80vh"
                  onCellUpdate={(value) => onCellUpdate(value)}
                />
              )}
            </div>
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};

export default Compartments;
