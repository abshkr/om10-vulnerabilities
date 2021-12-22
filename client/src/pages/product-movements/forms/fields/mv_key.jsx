import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import api, { MOVEMENT_NOMIATIONS } from 'api';
import _ from 'lodash';

const MvKey = ({form}) => {
  const [mvKey, setMvKey] = useState(null)
  const [isValidating, setIsValidating] = useState(false)
  const [existed, setExisted] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsValidating(true)
      api
      .post(MOVEMENT_NOMIATIONS.CHECK_NOMKEY, {nomination_key: mvKey})
      .then((response) => {
        setIsValidating(false)
        setExisted(parseInt(response.data?.records[0]?.cnt) > 0)
        form.validateFields(['mv_key'])
      })
      .catch((errors) => {
        setIsValidating(false)
        console.log(errors)
      });
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [mvKey])

  const changeHandler = (e) => {
    setExisted(false)
    setMvKey(e.target.value)
  }

  const validate = (rule, input) => {
    if (existed) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    return Promise.resolve();
  };

  let status = "success"
  if (isValidating) {
    status = 'validating'
  } else if (existed) {
    status = 'error'
  };
  
  return (
    <Form.Item 
      name="mv_key" 
      hasFeedback
      label={t('fields.nominationKey')} 
      rules={[{ validator: validate }]}
      validateStatus={mvKey > 0 ? status : null}
    >
      <Input
        onChange={changeHandler} 
        style={{width: "100%"}}  
      />
    </Form.Item>
  );
};

export default MvKey;
