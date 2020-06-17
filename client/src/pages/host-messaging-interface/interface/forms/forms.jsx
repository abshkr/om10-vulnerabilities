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




import DetailsArea from '../DetailsArea';
import ContentsArea from '../ContentsArea';
import MessageArea from '../MessageArea';

const TabPane = Tabs.TabPane;

const FormModal = ({ value, visible, from, action, content_format, handleFormState, auth }) => {
  const { t } = useTranslation();

  const IS_CREATING = !value;


	const onFinish = async () => {

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
      width="68vw"
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
            {t('operations.update')}
          </Button>
        </>
      }
    >
			<PageContainer
				hidden={!visible}>

				<div>
					<Tabs defaultActiveKey="1" size="small" type="line" animated={false}>
						<TabPane key="1" tab={'Details'}>
							<DetailsArea
								from={from}
								action={action}
								message={value}
								content_format={content_format}
							/>
						</TabPane>

						<TabPane key="2" tab={'Contents'}>
							<ContentsArea
								from={from}
								action={action}
								message={value}
								content_format={content_format}
								handleFormState={handleFormState}
							/>
						</TabPane>
					</Tabs>
				</div>
				<div><br/></div>
				<div>
					<MessageArea
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
