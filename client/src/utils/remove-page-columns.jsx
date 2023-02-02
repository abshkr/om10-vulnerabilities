import React, { useState, useEffect } from 'react';
import { Modal, notification } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import api, { USER_COLUMNS } from '../api';

const removeUserPageColumns = (t, pageColumns, pageCode, columnLoader) => {
  if (pageColumns?.length === 0) {
    return;
  }
  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const siteCode = decoded?.site_code;
  const userCode = decoded?.per_code;
  const values = {
    user_code: userCode,
    site_code: siteCode,
    page_code: pageCode,
  };

  Modal.confirm({
    title: t('prompts.deleteColumns'),
    okText: t('operations.delete'),
    okType: 'primary',
    icon: <QuestionCircleOutlined />,
    cancelText: t('operations.no'),
    centered: true,
    onOk: async () => {
      await api
        .post(USER_COLUMNS.DELETE_COLUMNS, values)
        .then((response) => {
          if (columnLoader) {
            columnLoader();
          }
          Modal.destroyAll();

          notification.success({
            message: t('messages.deleteSuccess'),
            description: t('descriptions.deleteSuccessColumns'),
          });
        })
        .catch((error) => {
          notification.error({
            message: error.code === 400 || error.code === 500 ? t('messages.deleteFailed') : error.message,
            description: t('descriptions.deleteFailedColumns'),
          });
        });
    },
  });
};

export default removeUserPageColumns;
