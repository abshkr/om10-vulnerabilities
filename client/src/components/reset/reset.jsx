import React, { useState } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import _ from 'lodash';

import api, { AUTH } from 'api';
import { hash } from 'utils';

const Reset = ({ code, oldPassword, language, callback }) => {
  const onFinish = async (values) => {
    const hashed = hash(language, code, values.password);

    await api
      .post(AUTH.ACTIVATE, {
        per_code: hashed.user,
        old_password: oldPassword,
        password: hashed.psw,
      })
      .then((res) => {
        const token = res.data?.token;

        if (token) {
          callback(token);
          Modal.destroyAll();
        }
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  };

  Modal.info({
    title: 'Password Reset',
    centered: true,

    content: (
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            {
              required: true,
              message: 'Please type your new password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('confirm_password') !== value) {
                  return Promise.reject('The two passwords that you entered do not match!');
                }

                if (value?.length < 5 || value?.length > 32) {
                  return Promise.reject('Must be between 5-32 characters');
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') !== value) {
                  return Promise.reject('The two passwords that you entered do not match!');
                }

                if (value?.length < 5 || value?.length > 32) {
                  return Promise.reject('Must be between 5-32 characters');
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Change
          </Button>
        </Form.Item>
      </Form>
    ),
    okButtonProps: {
      style: { display: 'none' },
    },
  });

  return null;
};

export default Reset;
