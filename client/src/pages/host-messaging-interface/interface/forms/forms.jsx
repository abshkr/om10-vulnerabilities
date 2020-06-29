import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Tabs, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
} from '@ant-design/icons';




import DetailsArea from '../DetailsArea';
import ContentsArea from '../ContentsArea';
import MessageArea from '../MessageArea';

const TabPane = Tabs.TabPane;

const FormModal = ({ msg, visible, from, action, content_format, handleFormState, auth }) => {
  const { t } = useTranslation();

	const [notEdit, setNotEdit] = useState(!msg);
	const [label, setLabel] = useState(t('operations.edit'));
	const [notice, setNotice] = useState('');
	const [iaction, setAction] = useState(action);
	const [cFormat, setContentFormat] = useState(content_format);

	useEffect(() => {
		const timer = setTimeout(() => {
			setNotice('');
		}, 5000);
		return () => clearTimeout(timer);
	}, [notice]);


/*
	useEffect(() => {
		if (!notEdit)
		{
			setLabel(t('operations.edit'));
		}
	}, [label]);
*/

	const onEditSave = async () => {
		if (notEdit)
		{
			//setLabel(t('operations.save'));
			setNotEdit(false);
			setAction('edit');
			setContentFormat(2);
		}
	};


	const onCancel = async () => {
		setLabel(t('operations.edit'));
		setNotEdit(true);
		setAction('view');
		setContentFormat(1);
	};

	const onSubmit = async () => {
		if (notEdit)
		{
			var url = '';
			if (from === 'host')
			{
				url = process.env.REACT_APP_API_URL + '/hmi/resubmit/host_message';
				//url = '/hmi/resubmit/host_message';
			}
			else if (from === 'omega')
			{
				url = process.env.REACT_APP_API_URL + '/hmi/resubmit/omega_message';
				//url = '/hmi/resubmit/omega_message';
			}

			fetch(url, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({rec_id: msg.REC_ID, content_format: content_format })
			}).then(response => {
				response.json().then(body => {
					setNotice(body.message);
				});
			});
		}
		else
		{
			setAction('submit');
		}
	};

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      maskClosable={false}
      destroyOnClose={true}
      mask={false}
      placement="right"
      width="68vw"
      visible={visible}
      footer={
        <>
					<p>{notice}</p>
          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            style={{ float: 'right' }}
            onClick={() => onCancel()}
						disabled={notEdit}
          >
            {t('operations.cancel')}
          </Button>

					<Button
						//icon={notEdit ? <PlusOutlined /> : <EditOutlined />}
						icon={<EditOutlined />}
						onClick={onEditSave}
						style={{ float: 'right', marginRight: 5 }}
						disabled={!notEdit}
					>
						{ label }
					</Button>

          <Button
            icon={<EditOutlined />}
            onClick={onSubmit}
            style={{ float: 'right', marginRight: 5 }}
						//disabled={!notEdit}
          >
            {t('operations.submit')}
          </Button>
        </>
      }
    >
			<div>
				<Tabs defaultActiveKey="1" size="small" type="line">
					<TabPane key="1" tab={'Details'}>
						<DetailsArea
							from={from}
							action={iaction}
							message={msg}
							content_format={cFormat}
						/>
					</TabPane>

					<TabPane key="2" tab={'Contents'}>
						<ContentsArea
							from={from}
							action={iaction}
							message={msg}
							content_format={cFormat}
							handleFormState={handleFormState}
						/>
					</TabPane>
				</Tabs>
			</div>
			<div><br/></div>
			<div>
				<MessageArea
					from={from}
					action={iaction}
					message={msg}
					content_format={cFormat}
				/>
			</div>

		</Drawer>
  );

};

export default FormModal;
