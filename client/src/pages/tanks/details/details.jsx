import React from 'react';

import { DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Form, Modal, Button, Card, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';
import _ from 'lodash';

import General from '../forms/fields/general';
import api, { TANKS } from '../../../api';
import { getDensityRange } from '../../../utils';

const Details = ({ selected, access, isLoading, config, setSelected }) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const onFinish = async () => {
    const values = await form.validateFields();

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(TANKS.UPDATE, values)
          .then(() => {
            mutate(TANKS.READ);
            // to refresh changes in the form, need to NULL the selected
            setSelected({
              ...selected,
              ...values,
            });

            notification.success({
              message: t('messages.updateSuccess'),
              description: t('messages.updateSuccess'),
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
          .post(TANKS.DELETE, selected)
          .then(() => {
            mutate(TANKS.READ);

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

  /* const getTankDensHi = (value, config) => {
    let density_hi = 2000;
    if (!value?.tank_base_dens_hi) {
      density_hi = value?.tank_bclass_dens_hi;
    } else {
      if (config.manageBaseProductDensityRange && config.useBaseProductDensityRange) {
        density_hi = value?.tank_base_dens_hi;
      } else {
        density_hi = value?.tank_bclass_dens_hi;
      }
    }
    return density_hi;
  };

  const getTankDensLo = (value, config) => {
    let density_lo = 0;
    if (!value?.tank_base_dens_lo) {
      density_lo = value?.tank_bclass_dens_lo;
    } else {
      if (config.manageBaseProductDensityRange && config.useBaseProductDensityRange) {
        density_lo = value?.tank_base_dens_lo;
      } else {
        density_lo = value?.tank_bclass_dens_lo;
      }
    }
    return density_lo;
  };

  const densRange = {
    min: getTankDensLo(selected, config),
    max: getTankDensHi(selected, config),
  }; */

  const densRange = getDensityRange({
    manageFlag: config.manageBaseProductDensityRange,
    useFlag: config.useBaseProductDensityRange,
    minDefaultDensity: config.minDensity,
    maxDefaultDensity: config.maxDensity,
    minClassDensity: selected?.tank_bclass_dens_lo,
    maxClassDensity: selected?.tank_bclass_dens_hi,
    minBaseDensity: selected?.tank_base_dens_lo,
    maxBaseDensity: selected?.tank_base_dens_hi,
  });

  return (
    <Form layout="vertical" onFinish={onFinish} form={form} scrollToFirstError initialValues={selected}>
      <Card
        loading={isLoading}
        actions={[
          <Form.Item>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={onFinish}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canUpdate}
            >
              {t('operations.update')}
            </Button>

            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!access?.canDelete}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          </Form.Item>,
        ]}
      >
        <General
          form={form}
          value={selected}
          refTempC={0}
          refTempF={30}
          config={config}
          densRange={densRange}
        />
      </Card>
    </Form>
  );
};

export default Details;
