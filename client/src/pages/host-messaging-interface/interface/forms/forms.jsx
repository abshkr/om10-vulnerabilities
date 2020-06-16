import React from 'react';
import { Form, Button, Tabs, notification, Modal, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../../components/page/style';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';


import columns from './columns';


import DetailsArea from '../DetailsArea';
import ContentsArea from '../ContentsArea';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, from, action, content_format, handleFormState, auth }) => {
  const { t } = useTranslation();

  const IS_CREATING = !value;

  const fields = columns(t);

	const onFinish = async () => {

	};

	const onDelete = async () => {

	};

	const onEdit = async () => {

	};

	const onSubmit = async () => {

	};



  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="58vw"
      visible={visible}
      footer={
        <>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => handleFormState(false, null)}
          >
            {t('operations.cancel')}
          </Button>

          <Button
            type="primary"
            icon={IS_CREATING ? <EditOutlined /> : <PlusOutlined />}
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !auth?.canCreate : !auth?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              disabled={!auth?.canDelete}
              onClick={onDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
			<PageContainer
				hidden={!visible}>
				<div>
					<DetailsArea
						from={from}
						action={action}
						message={value}
						content_format={content_format}
					/>
				</div>

				<div>
					<ContentsArea
						from={from}
						action={action}
						message={value}
						content_format={content_format}
					/>
				</div>

			</PageContainer>
		</Drawer>
  );

};

export default FormModal;
