import React, { useState, useEffect } from 'react';

import { EditOutlined, QuestionCircleOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';

import { Form, Button, Tabs, Modal, notification } from 'antd';
import { DataTable } from '../../../components';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import moment from 'dayjs';

import { SETTINGS } from '../../../constants';
import api, { COMPANIES } from '../../../api';
import useSWR, { mutate } from 'swr';
import columns from './columns';
import ChildForm from './child-form/forms';

const TabPane = Tabs.TabPane;

const RelationForm = ({ value, handleFormState }) => {
  const { data: payload, isValidating } = useSWR(
    `${COMPANIES.RELATIONS}?parent_cmpy_code=${value.cmpy_code}`
  );
  const [children, setChildren] = useState(
    _.sortBy(payload?.records, ['child_cmpy_code', 'child_cmpy_role'])
  );

  const { t } = useTranslation();
  const fields = columns(t);
  const [form] = Form?.useForm();
  const { setFieldsValue } = form;
  const [selected, setSelected] = useState(null);
  const [childVisible, setChildVisible] = useState(false);

  const onComplete = () => {
    handleFormState(false, null);
    // mutate(COMPANIES.READ);
    Modal.destroyAll();
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    values.cmpy_code = value.cmpy_code;

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(COMPANIES.UPDATE_RELATIONS, values)
          .then((response) => {
            // mutate(COMPANIES.READ);
            // Modal.destroyAll();
            onComplete();

            // mutate(COMPANIES.READ);
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

  const returnChild = (v) => {
    v.parent_cmpy_code = value.cmpy_code;
    v.parent_cmpy_name = value.cmpy_name;
    if (v.is_creating) {
      v.create_date = moment().format(SETTINGS.DATE_TIME_FORMAT);
      if (
        _.find(children, (item) => {
          return item.child_cmpy_code === v.child_cmpy_code && item.child_cmpy_role === v.child_cmpy_role;
        })
      ) {
        notification.error({
          message: t('messages.submitFailed'),
          description: t('descriptions.alreadyExists'),
        });
        return;
      }
      const newChildren = _.sortBy([...children, v], ['child_cmpy_code', 'child_cmpy_role']);
      setChildren(newChildren);
      setFieldsValue({
        relations: [...children, v],
      });
    } else {
      const filtered = _.filter(children, (item) => {
        return item.child_cmpy_code !== v.child_cmpy_code || item.child_cmpy_role !== v.child_cmpy_role;
      });
      const newChildren = _.sortBy([...filtered, v], ['child_cmpy_code', 'child_cmpy_role']);
      setChildren(newChildren);

      setFieldsValue({
        relations: [...filtered, v],
      });
    }
  };

  const onAdd = () => {
    setSelected(null);
    setChildVisible(true);
  };

  const onModify = () => {
    setChildVisible(true);
  };

  const onDelete = () => {
    const filtered = _.filter(children, (item) => {
      return !(
        item.child_cmpy_code === selected.child_cmpy_code && item.child_cmpy_role === selected.child_cmpy_role
      );
    });
    setChildren([...filtered]);
    setFieldsValue({
      relations: [...filtered],
    });
    setSelected(null);
  };

  useEffect(() => {
    if (payload) {
      setChildren(payload.records);
      setFieldsValue({
        relations: payload.records,
      });
    }
  }, [payload]);

  return (
    <div>
      <Form form={form} onFinish={onFinish} scrollToFirstError>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.companyRelation')} key="1" style={{ height: '65vh' }}>
            <Form.Item name="relations">
              <DataTable
                height="70vh"
                columns={fields}
                data={children}
                isLoading={isValidating}
                onClick={(payload) => setSelected(payload)}
                handleSelect={(payload) => setSelected(payload[0])}
              />
            </Form.Item>

            <Button type="primary" style={{ float: 'right', marginRight: 5 }} onClick={onAdd}>
              {t('operations.add')}
            </Button>

            <Button
              type="primary"
              style={{ float: 'right', marginRight: 5 }}
              onClick={onModify}
              disabled={!selected}
            >
              {t('operations.edit')}
            </Button>

            <Button
              type="danger"
              style={{ float: 'right', marginRight: 5 }}
              disabled={!selected}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          </TabPane>
        </Tabs>

        <Form.Item>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => Modal.destroyAll()}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={<EditOutlined />}
            htmlType="submit"
            style={{ float: 'right', marginRight: 5 }}
          >
            {t('operations.update')}
          </Button>
        </Form.Item>
      </Form>
      <ChildForm
        value={selected}
        visible={childVisible}
        returnChild={returnChild}
        setChildVisible={setChildVisible}
      />
    </div>
  );
};

export default RelationForm;
