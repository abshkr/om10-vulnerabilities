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

const FormModal = ({ value, visible, from, action, content_format, handleFormState, auth }) => {
  const { t } = useTranslation();

	const [notEdit, setNotEdit] = useState(!value);
	const [label, setLabel] = useState(t('operations.edit'));
	const [notice, setNotice] = useState('');

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
			setLabel(t('operations.save'));
			setNotEdit(false);
		}
		else
		{
			setLabel(t('operations.edit'));
			setNotEdit(true);
		}
	};


	const onCancel = async () => {
		setLabel(t('operations.edit'));
		setNotEdit(true);
	};

	const onSubmit = async () => {
		var url = '';
		if (from === 'host')
		{
			url = process.env.REACT_APP_API_URL + '/hmi/resubmit/host_message';
		}
		else if (from === 'omega')
		{
			url = process.env.REACT_APP_API_URL + '/hmi/resubmit/omega_message';
		}

		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({rec_id: value.REC_ID, content_format: content_format })
		}).then(response => {
			response.json().then(body => {
				console.log('Response of resubmit:'+JSON.stringify(body,null,'\t')); 
				setNotice(body.message);
			});
		});
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
					<text>{notice}</text>
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
						icon={notEdit ? <PlusOutlined /> : <EditOutlined />}
						onClick={onEditSave}
						style={{ float: 'right', marginRight: 5 }}
					>
						{ label }
					</Button>

          <Button
            icon={<EditOutlined />}
            onClick={onSubmit}
            style={{ float: 'right', marginRight: 5 }}
						disabled={!notEdit}
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

		</Drawer>
  );

};

export default FormModal;
