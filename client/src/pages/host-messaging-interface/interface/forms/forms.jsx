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

const FormModal = ({ msg, visible, from, action, content_format, handleFormState}) => {


  const { t } = useTranslation();

	const [notEdit, setNotEdit] = useState(!msg);
	const [label, setLabel] = useState(t('operations.edit'));
	const [notice, setNotice] = useState('');
	const [ifrom, setFrom] = useState(from);
	const [iaction, setAction] = useState(action);
	const [icontentFormat, setContentFormat] = useState(content_format);
	const [imsg, setMessage] = useState(msg);



	useEffect(() => {
		if (from != ifrom)
		{
			if (from == 'host')
			{
				setNotice('');
			}
			else if (from == 'omega')
			{
				setNotice('Edit function is currently disabled for outgoing messages');
				setAction('view');
				setNotEdit(true);
				setContentFormat(1);
			}
			setFrom(from);
		}
	}, [from]);

	useEffect(() => {
		if (action != iaction)
		{
			setAction(action);
		}
	}, [action]);

	useEffect(() => {
		if (content_format != icontentFormat)
		{
			setContentFormat(content_format);
		}
	}, [content_format]);

	useEffect(() => {
		if (msg != imsg)
		{
			setMessage(msg);
			setNotice('');
		}
	}, [msg]);



	const onEdit = async () => {
		if (notEdit)
		{
			setNotEdit(false);
			setAction('edit');
			setContentFormat(2);
			setNotice('');
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
			var urlprefix = process.env.REACT_APP_API_URL || '';
			var dbstr = process.env.REACT_APP_OMEGA_USER || '';

			var url = '';
			if (from === 'host')
			{
				url = urlprefix + '/hmi/resubmit/host_message';
			}
			else if (from === 'omega')
			{
				url = urlprefix + '/hmi/resubmit/omega_message';
			}
			if (dbstr)
			{
				url = url + '?db=' + dbstr;
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

	const handleTaskComplete = async (result) => {
		setLabel(t('operations.edit'));
		setNotEdit(true);
		setAction('view');
		setContentFormat(1);
		setNotice(result);
	}


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
					<Button
						htmlType="button"
						icon={<CloseOutlined />}
						style={{ float: 'right', marginRight: 5 }}
						onClick={() => onCancel()}
						disabled={notEdit}
					>
						{t('operations.cancel')}
					</Button>

					<Button
						//icon={notEdit ? <PlusOutlined /> : <EditOutlined />}
						icon={<EditOutlined />}
						onClick={onEdit}
						style={{ float: 'right', marginRight: 5 }}
						disabled={!notEdit || (from == 'omega')}
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
							from={ifrom}
							action={iaction}
							message={imsg}
							content_format={icontentFormat}
						/>
					</TabPane>

					<TabPane key="2" tab={'Contents'}>
						<ContentsArea
							from={ifrom}
							action={iaction}
							message={imsg}
							content_format={icontentFormat}
							handleFormState={handleFormState}
						/>
					</TabPane>
				</Tabs>
			</div>
			<div><br/></div>
			<div>
				<MessageArea
					from={ifrom}
					action={iaction}
					message={imsg}
					content_format={icontentFormat}
					handleTaskComplete={handleTaskComplete}
				/>
			</div>
			<p>{notice}</p>

		</Drawer>
  );

};

export default FormModal;
