import React, { useState, useEffect } from 'react';
import { Modal, notification } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import api, { USER_COLUMNS } from '../api';

const updateUserPageColumns = (t, gridColumns, pageColumns, pageCode, columnLoader, flagHandler) => {
  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const siteCode = decoded?.site_code;
  const userCode = decoded?.per_code;

  let IS_CREATING = true;
  const columns = gridColumns;
  console.log('...........................existing columns: ', columns);
  const values = [];
  const newValues = [];
  if (pageColumns?.length === 0) {
    // no settings yet, get one from current column settings on screen
    // CREATE mode
    for (let i = 0; i < columns?.length; i++) {
      const cln = columns?.[i]?.colDef;
      if (!cln) {
        continue;
      } else {
        const column = {
          column_user: userCode,
          column_site: siteCode,
          column_page: pageCode,
          column_code: cln?.field,
          column_title: cln?.headerName,
          column_visible: !cln?.hide ? true : false,
          column_order: i + 1,
          column_pinned: cln?.pinned || '',
          column_type: 'STRING',
          column_filter: cln?.filter || '',
          column_editor: cln?.cellEditor || '',
          column_render: cln?.cellRenderer || '',
          column_style: cln?.cellClass || '',
          column_editable: cln?.editable || false,
          column_sortable: cln?.sortable || false,
          column_resizable: cln?.resizable || false,
          // column_width: cln?.width || 100,
          column_width: columns?.[i]?.actualWidth || cln?.width || 100,
        };
        values.push(column);
      }
    }
  } else {
    IS_CREATING = false;
    // found the settings, re-organize the sequence of columns
    for (let i = 0; i < columns?.length; i++) {
      const cln = columns?.[i]?.colDef;
      const item = _.find(pageColumns, (o) => cln?.field === o?.column_code);
      if (!item) {
        // the missing columns need be created
        const column = {
          column_user: userCode,
          column_site: siteCode,
          column_page: pageCode,
          column_code: cln?.field,
          column_title: cln?.headerName,
          column_visible: !cln?.hide ? true : false,
          column_order: i + 1,
          column_pinned: cln?.pinned || '',
          column_type: 'STRING',
          column_filter: cln?.filter || '',
          column_editor: cln?.cellEditor || '',
          column_render: cln?.cellRenderer || '',
          column_style: cln?.cellClass || '',
          column_editable: cln?.editable || false,
          column_sortable: cln?.sortable || false,
          column_resizable: cln?.resizable || false,
          // column_width: cln?.width || 100,
          column_width: columns?.[i]?.actualWidth || cln?.width || 100,
        };
        newValues.push(column);
      } else {
        /* if (
          userCode === item?.column_user &&
          siteCode === item?.column_site &&
          pageCode === item?.column_page
        ) {
          IS_CREATING = false;
        } */
        // the existing columns need be updated
        const column = {
          column_user: userCode,
          column_site: siteCode,
          column_page: pageCode,
          column_code: item?.column_code,
          column_title: item?.column_title,
          // column_visible: item?.column_visible,
          column_visible: !cln?.hide ? true : false,
          column_order: i + 1,
          column_pinned: item?.column_pinned,
          column_type: item?.column_type,
          column_filter: item?.column_filter,
          column_editor: item?.column_editor,
          column_render: item?.column_render,
          column_style: item?.column_style,
          column_editable: item?.column_editable,
          column_sortable: item?.column_sortable,
          column_resizable: item?.column_resizable,
          // column_width: item?.column_width,
          column_width: columns?.[i]?.actualWidth || item?.column_width,
        };
        values.push(column);
      }
    }
  }

  if (values?.length === 0) {
    if (IS_CREATING) {
      return;
    } else {
      if (newValues?.length === 0) {
        return;
      }
    }
  }

  Modal.confirm({
    title: IS_CREATING ? t('prompts.createColumns') : t('prompts.updateColumns'),
    okText: IS_CREATING ? t('operations.create') : t('operations.update'),
    okType: 'primary',
    icon: <QuestionCircleOutlined />,
    cancelText: t('operations.no'),
    centered: true,
    onCancel() {
      if (flagHandler) {
        flagHandler(false);
      }
      Modal.destroyAll();
    },
    onOk: async () => {
      await api
        .post(IS_CREATING ? USER_COLUMNS.CREATE_COLUMNS : USER_COLUMNS.UPDATE_COLUMNS, values)
        .then(async (response) => {
          // when it is UPDATE mode, there might be the extra operation to create the missing columns
          if (!IS_CREATING && newValues?.length > 0) {
            await api
              .post(USER_COLUMNS.CREATE_COLUMNS, newValues)
              .then((response) => {
                if (columnLoader) {
                  columnLoader();
                }
                if (flagHandler) {
                  flagHandler(false);
                }
                // the missing columns are created in the existing columns
                Modal.destroyAll();

                notification.success({
                  message: t('messages.updateSuccess'),
                  description: t('descriptions.updateSuccessColumns'),
                });
              })
              .catch((error) => {
                notification.error({
                  message:
                    error.code === 400 || error.code === 500 ? t('messages.updateFailed') : error.message,
                  description: t('descriptions.updateFailedColumns'),
                });
              });
          } else {
            if (columnLoader) {
              columnLoader();
            }
            if (flagHandler) {
              flagHandler(false);
            }
            Modal.destroyAll();

            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING
                ? t('descriptions.createSuccessColumns')
                : t('descriptions.updateSuccessColumns'),
            });
          }
        })

        .catch((error) => {
          notification.error({
            message:
              error.code === 400 || error.code === 500
                ? IS_CREATING
                  ? t('messages.createFailed')
                  : t('messages.updateFailed')
                : error.message,
            description: IS_CREATING
              ? t('descriptions.createFailedColumns')
              : t('descriptions.updateFailedColumns'),
          });
        });
    },
  });
};

export default updateUserPageColumns;
