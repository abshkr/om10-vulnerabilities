import React, { Component } from 'react';
import { Form, Button, Tabs, notification, Modal, Descriptions, Divider } from 'antd';
import { tanks } from '../../../api';
import { convertToLocale } from '../../../utils';

import _ from 'lodash';

import axios from 'axios';
import {
  Code,
  Product,
  Name,
  Density,
  DailyVariance,
  MontlhyVariance,
  Flags,
} from '../../../pages/tankConfiguration/forms/fields';

import TankForm from './tank-form';

class TankConfigurationForm extends Component {
  handleCreate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .all([tanks.createTank(values)])
          .then(
            axios.spread(() => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: 'Successfully Created.',
                description: `You have Created the Tank ${values.tank_code}`,
              });
            }),
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: 'Failed to create the Tank.',
            });
          });
      } else {
        notification.error({
          message: 'Validation Failed.',
          description: 'Make sure all the fields meet the requirements.',
        });
      }
    });
  };

  handleUpdate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .all([tanks.updateTank(values)])
          .then(
            axios.spread(() => {
              this.props.refresh();
              Modal.destroyAll();
              notification.success({
                message: 'Successfully Updated.',
                description: `You have updated the Tank ${values.tank_code}`,
              });
            }),
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: 'Failed to update the Tank.',
            });
          });
      } else {
        notification.error({
          message: 'Validation Failed.',
          description: 'Make sure all the fields meet the requirements.',
        });
      }
    });
  };

  showUpdateConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to update this tank?',
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      centered: true,
      onOk: this.handleUpdate,
    });
  };

  showCreateConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to create this tank?',
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      centered: true,
      onOk: this.handleCreate,
    });
  };

  render() {
    const { form, value, data, tank, t } = this.props;

    const TabPane = Tabs.TabPane;

    const capacity = !!value ? _.toInteger(value.tank_ullage) + _.toInteger(value.tank_amb_vol) : 0;

    return (
      <div>
        <Form>
          <Tabs defaultActiveKey={!!value ? '0' : '1'} animated={false}>
            {!!value && (
              <TabPane className="tank-view-tab" tab="Information" key="0" forceRender={true}>
                <Descriptions bordered size="small" style={{ width: '40vw' }}>
                  <Descriptions.Item label="Product" span={2}>
                    {value.tank_base_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Product Code">{value.tank_base}</Descriptions.Item>

                  <Descriptions.Item label="Observed Temperature" span={3}>
                    {value.tank_temp} °C
                  </Descriptions.Item>
                  <Descriptions.Item label="Reference Density" span={3}>
                    {value.tank_density} Kg / m³
                  </Descriptions.Item>
                  <Descriptions.Item label="Reference Temperature" span={3}>
                    {value.tank_base_ref_temp} °C
                  </Descriptions.Item>

                  <Descriptions.Item label="Tank Capacity" span={3}>
                    {capacity} Litres
                  </Descriptions.Item>
                  <Descriptions.Item label="Level" span={3}>
                    {value.tank_prod_lvl} cm
                  </Descriptions.Item>
                  <Descriptions.Item label="Observed Quantity" span={3}>
                    {value.tank_amb_vol} Litres
                  </Descriptions.Item>
                  <Descriptions.Item label="Standard Quantity" span={3}>
                    {value.tank_cor_vol} Litres
                  </Descriptions.Item>
                  <Descriptions.Item label="Weight in Air" span={3}>
                    {value.tank_vapour_kg} T
                  </Descriptions.Item>
                  <Descriptions.Item label="Weight in Vaccum" span={3}>
                    {value.tank_liquid_kg} T
                  </Descriptions.Item>
                  <Descriptions.Item label="Ullage" span={3}>
                    {value.tank_ullage} Litres
                  </Descriptions.Item>
                  <Descriptions.Item label="Pumpable Volume" span={3}>
                    {value.tank_pump_vol} T
                  </Descriptions.Item>
                  <Descriptions.Item label="Water Level" span={3}>
                    {value.tank_water_lvl} mm
                  </Descriptions.Item>
                  <Descriptions.Item label="Water Volume" span={3}>
                    {value.tank_liquid_kg} Kg
                  </Descriptions.Item>
                  <Descriptions.Item label="Last Online" span={3}>
                    {convertToLocale(value.tank_date)}
                  </Descriptions.Item>
                </Descriptions>
                <div className="tank-view-tank">
                  {!!value && <TankForm tank={tank} form={form} value={value} data={data} />}
                </div>
              </TabPane>
            )}

            <TabPane tab="General" className="ant-tab-window" key="1" forceRender={true}>
              <Code form={form} value={value} t={t} data={data} />
              <Name form={form} value={value} t={t} />
              <Product form={form} value={value} t={t} />
              <Density form={form} value={value} t={t} product={form.getFieldValue('tank_base')} />
              <Divider>Variances</Divider>
              <DailyVariance form={form} value={value} t={t} />
              <MontlhyVariance form={form} value={value} t={t} />
              <Divider>Flags</Divider>
              <Flags form={form} value={value} t={t} />
            </TabPane>
          </Tabs>
        </Form>

        <Button
          shape="round"
          icon="close"
          style={{ float: 'right' }}
          onClick={() => Modal.destroyAll()}
        >
          Cancel
        </Button>

        <Button
          shape="round"
          type="primary"
          icon={!!value ? 'edit' : 'plus'}
          style={{ float: 'right', marginRight: 5 }}
          onClick={!!value ? this.showUpdateConfirm : this.showCreateConfirm}
        >
          {!!value ? 'Update' : 'Create'}
        </Button>
      </div>
    );
  }
}

const Forms = Form.create()(TankConfigurationForm);

export default Forms;
