import React from 'react';
import { Select, Form } from 'antd';

const options = [
  { value: '1', label: 'Read' },
  { value: '2', label: 'Create' },
  { value: '3', label: 'Update' },
  { value: '4', label: 'Delete' }
];

const General = ({ form, value }) => {
  const { getFieldDecorator } = form;

  return (
    <div>
      <Form.Item label="Dashboard">
        {getFieldDecorator('DASHBOARD')(
          <Select
            showSearch
            optionFilterProp="children"
            mode="multiple"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item label="Schedules">
        {getFieldDecorator('DASHBOARD')(
          <Select
            showSearch
            optionFilterProp="children"
            mode="multiple"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item label="Gantry">
        {getFieldDecorator('DASHBOARD')(
          <Select
            showSearch
            optionFilterProp="children"
            mode="multiple"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item label="Reports">
        {getFieldDecorator('DASHBOARD')(
          <Select
            showSearch
            optionFilterProp="children"
            mode="multiple"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item label="Access Control">
        {getFieldDecorator('DASHBOARD')(
          <Select
            showSearch
            optionFilterProp="children"
            mode="multiple"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item label="Customers">
        {getFieldDecorator('DASHBOARD')(
          <Select
            showSearch
            optionFilterProp="children"
            mode="multiple"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item label="Stock Management">
        {getFieldDecorator('DASHBOARD')(
          <Select
            showSearch
            optionFilterProp="children"
            mode="multiple"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item label="Printer Configuration">
        {getFieldDecorator('DASHBOARD')(
          <Select
            showSearch
            optionFilterProp="children"
            mode="multiple"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item label="Stock Reconcilliation">
        {getFieldDecorator('DASHBOARD')(
          <Select
            showSearch
            optionFilterProp="children"
            mode="multiple"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item label="Stock Reconcilliation">
        {getFieldDecorator('DASHBOARD')(
          <Select
            showSearch
            optionFilterProp="children"
            mode="multiple"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    </div>
  );
};

export default General;
