import React, { Component } from 'react';
import { Form, Button, Tabs, notification, Modal, Descriptions } from 'antd';
import { tanks } from '../../../api';
import _ from 'lodash';

import axios from 'axios';
import {
  TankCode,
  Product,
  TankName,
  Density,
  DailyVariancePercent,
  DailyVarianceVol,
  MonthlyVariancePercent,
  MonthlyVarianceVol,
  ExcludeFromPID,
  ExcludeFromPOS,
  ExcludeFromSMG,
  ExcludeFromStockReports
} from '../../tankConfiguration/forms/fields';

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
                description: `You have Created the Tank ${values.tank_code}`
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: 'Failed to create the Tank.'
            });
          });
      } else {
        notification.error({
          message: 'Validation Failed.',
          description: 'Make sure all the fields meet the requirements.'
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
                description: `You have updated the Tank ${values.tank_code}`
              });
            })
          )
          .catch(error => {
            notification.error({
              message: error.message,
              description: 'Failed to update the Tank.'
            });
          });
      } else {
        notification.error({
          message: 'Validation Failed.',
          description: 'Make sure all the fields meet the requirements.'
        });
      }
    });
  };

  handleDelete = () => {
    const { value } = this.props;
    axios
      .all([tanks.deleteTank(value.tank_code)])
      .then(
        axios.spread(() => {
          this.props.refresh();
          Modal.destroyAll();
          notification.success({
            message: 'Successfully Deleted.',
            description: `You have deleted the Tank ${value.tank_code}`
          });
        })
      )
      .catch(error => {
        notification.error({
          message: error.message,
          description: 'Failed to delete the Tank.'
        });
      });
  };

  showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this tank?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      centered: true,
      onOk: this.handleDelete
    });
  };

  showUpdateConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to update this tank?',
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      centered: true,
      onOk: this.handleUpdate
    });
  };

  showCreateConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to update this tank?',
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      centered: true,
      onOk: this.handleCreate
    });
  };

  render() {
    const { form, value, products, data, tank } = this.props;
    const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
    const TabPane = Tabs.TabPane;

    const capacity = !!value ? _.toInteger(value.tank_ullage) + _.toInteger(value.tank_cor_vol) : 0;
    const volume = !!value ? _.toInteger(value.tank_cor_vol) : 0;

    return (
      <div>
        <Form style={{ height: 640 }}>
          <Tabs defaultActiveKey={!!value ? '0' : '1'} animated={false}>
            {!!value && (
              <TabPane className="tank-view-tab" tab="Information" key="0">
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
                    {volume} Litres
                  </Descriptions.Item>
                  <Descriptions.Item label="Weight in Air" span={3}>
                    {value.tank_vapour_kg} T
                  </Descriptions.Item>
                  <Descriptions.Item label="Weight in Vaccum" span={3}>
                    {value.tank_liquid_kg} T
                  </Descriptions.Item>
                  <Descriptions.Item label="Ullage" span={3}>
                    {value.tank_ullage}
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
                    {value.tank_date}
                  </Descriptions.Item>
                </Descriptions>
                <div className="tank-view-tank">
                  <TankForm
                    tank={tank}
                    decorator={getFieldDecorator}
                    value={value}
                    setValue={setFieldsValue}
                    data={data}
                  />
                </div>
              </TabPane>
            )}

            <TabPane tab="General" key="1">
              <TankCode
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
                data={data}
              />
              <Product decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <TankName decorator={getFieldDecorator} value={value} setValue={setFieldsValue} />
              <Density
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
                baseProducts={products}
                selectedBase={getFieldValue('tank_base')}
              />
            </TabPane>

            <TabPane tab="Variance" key="3">
              <DailyVarianceVol
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
              />
              <MonthlyVarianceVol
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
              />
              <DailyVariancePercent
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
              />
              <MonthlyVariancePercent
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
              />
            </TabPane>

            <TabPane tab="Flags" key="4">
              <ExcludeFromPID
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
              />
              <ExcludeFromPOS
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
              />
              <ExcludeFromSMG
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
              />
              <ExcludeFromStockReports
                decorator={getFieldDecorator}
                value={value}
                setValue={setFieldsValue}
              />
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

        {!!value && (
          <Button
            shape="round"
            type="danger"
            icon="delete"
            style={{ float: 'right', marginRight: 5 }}
            onClick={this.showDeleteConfirm}
          >
            Delete
          </Button>
        )}
      </div>
    );
  }
}

const Forms = Form.create()(TankConfigurationForm);

export default Forms;
