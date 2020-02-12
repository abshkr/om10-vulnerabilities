import React, { useState, useCallback } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Modal, Button, List, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { FOLIO_SUMMARY } from '../../../../api';

const Reports = ({ id, enabled }) => {
  const { t } = useTranslation();

  const [isRegenerating, setRegenerate] = useState(false);

  const { data: payload, isValidating } = useSWR(`${FOLIO_SUMMARY.REPORTS}?closeout_nr=${id}`);

  const regenerate = useCallback(() => {
    setRegenerate(true);

    const key = 'regenerate';

    message.loading({ content: t('messages.regenerating'), key });

    axios.post(`${FOLIO_SUMMARY.CREATE_REPORTS}?closeout_nr=${id}`).then(
      axios.spread(response => {
        message.success({ content: t('messages.regeneratingComplete'), key });
        setRegenerate(false);
      })
    );
  }, [id, t]);

  return (
    <div>
      <List
        size="small"
        loading={isValidating}
        dataSource={payload?.records}
        renderItem={item => (
          <List.Item
            actions={[
              <a
                href={() => window.open(`${FOLIO_SUMMARY.OPEN_REPORT}?report=${id}/${item}`)}
                onClick={() => window.open(`${FOLIO_SUMMARY.OPEN_REPORT}?report=${id}/${item}`)}
              >
                {t('operations.download')}
              </a>
            ]}
          >
            <List.Item.Meta title={item} />
          </List.Item>
        )}
      />

      <div className="operations">
        <Button shape="round" icon="close" style={{ float: 'right' }} onClick={() => Modal.destroyAll()}>
          {t('operations.cancel')}
        </Button>

        <Button
          shape="round"
          type="primary"
          icon={'redo'}
          style={{ float: 'right', marginRight: 5 }}
          loading={isRegenerating}
          disabled={!enabled}
          onClick={() => regenerate()}
        >
          {t('operations.regenerate')}
        </Button>
      </div>
    </div>
  );
};

export default Reports;
