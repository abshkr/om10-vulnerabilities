import React, { useEffect, useState, useRef } from 'react';
import { Form, Modal, Input, notification } from 'antd';
import Supplier from './fields/supplier'
import MvKey from './fields/mv_key'
import api, { PRODUCT_MOVEMENTS } from 'api';
import _ from 'lodash';

const MakeNomination = ({ value, t, visible, setVisible, onComplete }) => {
    const [form] = Form.useForm();

    const finishHandler = async () => {
        const values = await form.validateFields();
        
        const params = {
            ...value,
            ...values
        }
        
        await api
            .post(PRODUCT_MOVEMENTS.MAKE_NOMINATION, params)
            .then((response) => {
                setVisible(false)
                onComplete();

                notification.success({
                    message: t('messages.submitSuccess'),
                    description: t('descriptions.pmvNominationCreated'),
                });
            })

            .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
                notification.error({
                    message: error.type,
                    description: error.message,
                });
                setVisible(false)
            });
        });
    }

    return (
        <Modal
            centered
            visible={visible}
            onOk={finishHandler}
            onCancel={() => setVisible(false)}
        >
            <Form form={form} layout="vertical">
                <p>{t('prompts.pmvMakeNomination')}</p>
                <Supplier />
                <MvKey />
                <Form.Item name="mv_number" label={t('fields.nominationNumber')} rules={[{ required: true }]}>
                    <Input style={{width: "100%"}} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default MakeNomination