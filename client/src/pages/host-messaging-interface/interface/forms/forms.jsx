import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Tabs, Drawer } from 'antd';
import { useTranslation } from 'react-i18next';

import { EditOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

import DetailsArea from '../DetailsArea';
import ContentsArea from '../ContentsArea';
import MessageArea from '../MessageArea';
import SubmissionArea from '../SubmissionArea';

const TabPane = Tabs.TabPane;

const FormModal = ({ msg, visible, from, action, content_format, handleFormState }) => {
  const { t } = useTranslation();

  const [notEdit, setNotEdit] = useState(!msg);
  const [label, setLabel] = useState(t('operations.edit'));
  const [notice, setNotice] = useState('');
  const [ifrom, setFrom] = useState(from);
  const [iaction, setAction] = useState(action);
  const [icontent_format, setContentFormat] = useState(content_format);
  const [imsg, setMessage] = useState(msg);
  //const [ihmcfg, setHmConfig] = useState({});
  const [ihostEditOn, setHostEditOn] = useState(false);
  const [ihostSubmitOn, setHostSubmitOn] = useState(false);
  const [iomEditOn, setOmEditOn] = useState(false);
  const [iomSubmitOn, setOmSubmitOn] = useState(false);

  var urlprefix = process.env.REACT_APP_API_URL || '';
  var dbstr = process.env.REACT_APP_OMEGA_USER || '';
  var url = urlprefix + '/hmi/site_config';
  if (dbstr) {
    url = url + '?db=' + dbstr;
  }

  const getHostMessagingConfig = async () => {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ host_messaging_only: true }),
    }).then((response) => {
      response.json().then((body) => {
        if (response.ok) {
          //setHmConfig(body.message);
          //setHostEditOn(body.
          body.message.map((cfg) => {
            if (cfg.CONFIG_KEY === 'HOST_MESSAGING_IN_EDIT_ON') {
              setHostEditOn(cfg.CONFIG_VALUE === 'Y');
            } else if (cfg.CONFIG_KEY === 'HOST_MESSAGING_IN_SUBMIT_ON') {
              setHostSubmitOn(cfg.CONFIG_VALUE === 'Y');
            } else if (cfg.CONFIG_KEY === 'HOST_MESSAGING_OUT_EDIT_ON') {
              setOmEditOn(cfg.CONFIG_VALUE === 'Y');
            } else if (cfg.CONFIG_KEY === 'HOST_MESSAGING_OUT_SUBMIT_ON') {
              setOmSubmitOn(cfg.CONFIG_VALUE === 'Y');
            }
          });
          return body;
        } else {
          //alert(body.message);
          return {};
        }
      });
    });
  };

  useEffect(() => {
    if (from != ifrom) {
      getHostMessagingConfig();

      if (from == 'host') {
        setNotice('');
      } else if (from == 'omega') {
        setNotice('Edit function is currently disabled for outgoing messages');
        setAction('view');
        setNotEdit(true);
        setContentFormat(1);
      }
      setFrom(from);
    }
  }, [from]);

  useEffect(() => {
    if (action != iaction) {
      setAction(action);
    }
  }, [action]);

  useEffect(() => {
    if (content_format != icontent_format) {
      setContentFormat(content_format);
    }
  }, [content_format]);

  useEffect(() => {
    if (msg != imsg) {
      setMessage(msg);
      setNotice('');
    }
  }, [msg]);

  const onEdit = async () => {
    if (notEdit) {
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
    if (notEdit) {
      var urlprefix = process.env.REACT_APP_API_URL || '';
      var dbstr = process.env.REACT_APP_OMEGA_USER || '';

      var url = '';
      if (from === 'host') {
        url = urlprefix + '/hmi/resubmit/host_message';
      } else if (from === 'omega') {
        url = urlprefix + '/hmi/resubmit/omega_message';
      }
      if (dbstr) {
        url = url + '?db=' + dbstr;
      }

      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ rec_id: msg.REC_ID, content_format: content_format }),
      }).then((response) => {
        response.json().then((body) => {
          setNotice(body.message);
        });
      });
    } else {
      setAction('submit');
    }
  };

  const handleTaskComplete = async (result) => {
    setLabel(t('operations.edit'));
    setNotEdit(true);
    setAction('view');
    setContentFormat(1);
    setNotice(result);
  };

  const showEditStatus = () => {
    if (ifrom === 'host') {
      if (!ihostEditOn) {
        return t('descriptions.hostEditOff');
      }
    } else if (ifrom === 'omega') {
      if (!iomEditOn) {
        return t('descriptions.omEditOff');
      }
    }
  };

  const showSubmitStatus = () => {
    if (ifrom === 'host') {
      if (!ihostSubmitOn) {
        return t('descriptions.hostSubmitOff');
      }
    } else if (ifrom === 'omega') {
      if (!iomSubmitOn) {
        return t('descriptions.omSubmitOff');
      }
    }
  };

  return (
    <Drawer
      styles={{ body: { paddingTop: 5 } }}
      forceRender
      onClose={() => handleFormState(false, null)}
      maskClosable={false}
      destroyOnClose={true}
      mask={false}
      placement="right"
      width="68vw"
      open={visible}
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
            title={showEditStatus()}
            icon={<EditOutlined />}
            onClick={onEdit}
            style={{ float: 'right', marginRight: 5 }}
            disabled={!notEdit || (!(ifrom === 'host' && ihostEditOn) && !(ifrom === 'omega' && iomEditOn))}
          >
            {t('operations.edit')}
          </Button>

          <Button
            title={showSubmitStatus()}
            icon={<EditOutlined />}
            onClick={onSubmit}
            style={{ float: 'right', marginRight: 5 }}
            disabled={!(ifrom === 'host' && ihostSubmitOn) && !(ifrom === 'omega' && iomSubmitOn)}
          >
            {t('operations.submit')}
          </Button>
        </>
      }
    >
      <div>
        <Tabs defaultActiveKey="1" size="small" type="line">
          <TabPane key="1" tab={t('fields.details')}>
            <DetailsArea from={ifrom} action={iaction} message={imsg} content_format={icontent_format} />
          </TabPane>

          <TabPane key="2" tab={t('fields.contents')}>
            <ContentsArea from={ifrom} action={iaction} message={imsg} content_format={icontent_format} />
          </TabPane>

          <TabPane key="3" tab={t('fields.submissions')}>
            <SubmissionArea from={ifrom} message={imsg} />
          </TabPane>
        </Tabs>
      </div>
      <div>
        <br />
      </div>
      <div>
        <MessageArea
          from={ifrom}
          action={iaction}
          message={imsg}
          content_format={icontent_format}
          handleTaskComplete={handleTaskComplete}
        />
      </div>
      <p>{notice}</p>
    </Drawer>
  );
};

export default FormModal;
