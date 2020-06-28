import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal, Badge, Checkbox, notification, Calendar } from 'antd';
import { useTranslation } from 'react-i18next';

import { mutate } from 'swr';
import './calendar.css';
import moment from 'moment';

import _ from 'lodash';

import api, { FOLIO_SCHEDULING } from '../../../api';

const FolioCalendar = ({ access, value }) => {
  const { t } = useTranslation();
  let curDate = null;

  const onComplete = () => {
    mutate(FOLIO_SCHEDULING.READ);
  };

  const override_exist = (d) => {
    const overrides = _.filter(value, function (item) {
      return item.window_name === 'OVERRIDE';
    });
    for (let i = 0; i < overrides.length; i++) {
      if (curDate === overrides[i].repeat_interval) {
        return true;
      }
    }

    return false;
  };

  const onChange = (v) => {
    const overrideExists = override_exist(curDate);
    const ADD_OVERRIDE = v.target.checked && !overrideExists;
    const ADD_EXCEPTION = !v.target.checked && !overrideExists;
    const DELETE_OVERRIDE = !v.target.checked && overrideExists;
    const values =
      ADD_OVERRIDE || DELETE_OVERRIDE
        ? {
            repeat_interval: curDate,
          }
        : {
            window_name: 'ONCE_WINDOW',
            description: 'Set From Calendar',
            repeat_interval: curDate,
            status: 1,
          };

    Modal.confirm({
      title: ADD_OVERRIDE
        ? t('prompts.createOverride')
        : ADD_EXCEPTION
        ? t('prompts.createOnceOffDate')
        : t('prompts.deleteOverride'),
      okText: t('operations.create'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(
            ADD_OVERRIDE
              ? FOLIO_SCHEDULING.CREATE_OVERRIDE
              : ADD_EXCEPTION
              ? FOLIO_SCHEDULING.CREATE
              : FOLIO_SCHEDULING.DELETE_OVERRIDE,
            values
          )
          .then(() => {
            onComplete();
            notification.success({
              message: t('messages.createSuccess'),
              description: t('descriptions.createSuccess'),
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

  const checkDate = (v) => {
    const ret = {};
    ret.closeoutEnabled = true;

    //Override overrides exceptions
    const overrides = _.filter(value, function (item) {
      return item.window_name === 'OVERRIDE';
    });
    for (let i = 0; i < overrides.length; i++) {
      if (v.format('D_M_YYYY') === overrides[i].repeat_interval) {
        ret.closeoutEnabled = true;
        ret.override = t('fields.override') + ': ' + overrides[i].description;
      }
    }

    const exceptions = _.filter(value, function (item) {
      return item.window_name != 'OVERRIDE';
    });
    for (let i = 0; i < exceptions.length; i++) {
      if (exceptions[i].window_name === 'MONTH_WINDOW') {
        if (v.format('D') === exceptions[i].repeat_interval) {
          ret.closeoutEnabled = false;
          ret.exception = t('fields.exception') + ': ' + exceptions[i].description;
          break;
        }
      }

      if (exceptions[i].window_name === 'WEEK_WINDOW') {
        if (v.format('dddd') === exceptions[i].repeat_interval) {
          ret.closeoutEnabled = false;
          ret.exception = t('fields.exception') + ': ' + exceptions[i].description;
          break;
        }
      }

      if (exceptions[i].window_name === 'DATE_YEAR_WINDOW') {
        if (v.format('D_M') === exceptions[i].repeat_interval) {
          ret.closeoutEnabled = false;
          ret.exception = t('fields.exception') + ': ' + exceptions[i].description;
          break;
        }
      }

      if (exceptions[i].window_name === 'YEAR_WINDOW') {
        let interval = exceptions[i].repeat_interval.split('_');
        if (v.format('dddd') !== interval[1]) {
          continue;
        } else if (v.format('M') !== interval[2]) {
          continue;
        }

        let sequnceOfMonth = 1;
        for (let j = 1; j <= 5; j++) {
          const cloneMoment = v.clone();
          cloneMoment.subtract(7 * j, 'days');
          if (parseInt(cloneMoment.format('M')) !== parseInt(v.format('M'))) {
            sequnceOfMonth = j;
            break;
          }
        }

        if (sequnceOfMonth === parseInt(interval[0]) + 1) {
          ret.closeoutEnabled = false;
          ret.exception = t('fields.exception') + ': ' + exceptions[i].description;
          break;
        }
      }

      if (exceptions[i].window_name === 'ONCE_WINDOW') {
        if (v.format('D_M_YYYY') === exceptions[i].repeat_interval) {
          ret.closeoutEnabled = false;
          ret.exception = t('fields.exception') + ': ' + exceptions[i].description;
          break;
        }
      }
    }

    if (ret.override) {
      ret.closeoutEnabled = true;
    }

    return ret;
  };

  const dateCellRender = (v) => {
    const isPast = v.diff(moment()) < 0;
    const checkDateRet = checkDate(v);
    return (
      <div>
        <div className={isPast ? 'past' : 'future'}>
          <Checkbox checked={checkDateRet.closeoutEnabled} onChange={onChange} disabled={isPast} />
        </div>
        <ul
          className="events"
          // style={{listStyle: "none"}}
        >
          {checkDateRet.override ? (
            <li key={1}>
              <Badge status="success" text={checkDateRet.override} />
            </li>
          ) : null}
          {checkDateRet.exception ? (
            <li key={2}>
              <Badge status="error" text={checkDateRet.exception} />
            </li>
          ) : null}
        </ul>
      </div>
    );
  };

  const onSelect = (v) => {
    curDate = v.format('D_M_YYYY');
  };

  return (
    <Calendar
      dateCellRender={dateCellRender}
      onSelect={onSelect}
      // onPanelChange={onPanelChange}
    ></Calendar>
  );
};

export default FolioCalendar;
