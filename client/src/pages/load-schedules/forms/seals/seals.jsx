import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Row, Col, notification, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { DataTable } from '../../../../components';
import api, { LOAD_SCHEDULES } from '../../../../api';
import columns from './columns';

const { Search } = Input;

const Seals = ({ value, sealUpated }) => {
  const url = value
    ? `${LOAD_SCHEDULES.SEALS}?supplier=${value.supplier_code}&trip_no=${value?.shls_trip_no}`
    : null;

  const { t } = useTranslation();

  const { data: payload, revalidate: refreshSeals } = useSWR(url);
  const { data: nextSeal, revalidate: refreshNextSeal } = useSWR(LOAD_SCHEDULES.NEXT_SEAL);

  const [next, setNext] = useState(null);
  const [savable, setSavable] = useState(false);
  const [selected, setSelected] = useState(null);
  const [modified, setModified] = useState([]);

  const fields = columns(t, value?.status === 'A' || value?.status === 'F');

  const onSealUpdate = (value) => {
    api
      .post(LOAD_SCHEDULES.SET_NEXT_SEAL, {
        next_seal: value,
      })
      .then(() => {
        refreshNextSeal();
        sealUpated();

        notification.success({
          message: t('messages.updateSuccess'),
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
  };

  const onAllocation = (val) => {
    if (payload?.records?.length === 0) {
      if (val <= 0) {
        notification.error({
          message: t("messages.validationFailed"),
          description: t("descriptions.sealNumberRequired"),
        });
        return;
      }

      if (modified.length > 0) {
        Modal.confirm({
          title: t('prompts.saveBeforeSeal'),
          okText: t('operations.yes'),
          okType: 'primary',
          icon: <QuestionCircleOutlined />,
          cancelText: t('operations.no'),
          centered: true,
          onOk: async () => {
            api.post(LOAD_SCHEDULES.ALLOCATE_ALL, {
              supplier: value.supplier_code,
              trip_no: value.shls_trip_no,
              seal_num: val,
            })
            .then(() => {
              refreshSeals();
              sealUpated();
              setModified([]);
              setSavable(false);
    
              notification.success({
                message: t('messages.updateSuccess'),
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
      } else {
        api.post(LOAD_SCHEDULES.ALLOCATE_ALL, {
          supplier: value.supplier_code,
          trip_no: value.shls_trip_no,
          seal_num: val,
        })
        .then(() => {
          refreshSeals();
          sealUpated();
          setModified([]);
          setSavable(false);

          notification.success({
            message: t('messages.updateSuccess'),
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
      }
    } else {
      if (modified.length > 0) {
        Modal.confirm({
          title: t('prompts.saveBeforeSeal'),
          okText: t('operations.yes'),
          okType: 'primary',
          icon: <QuestionCircleOutlined />,
          cancelText: t('operations.no'),
          centered: true,
          onOk: async () => {
            api.post(LOAD_SCHEDULES.ALLOCATE_ONE, {
              supplier: value.supplier_code,
              trip_no: value.shls_trip_no,
              cmpt_nr: 1,
            })
            .then(() => {
              refreshSeals();
              refreshNextSeal();
              sealUpated();
              setModified([]);
              setSavable(false);
    
              notification.success({
                message: t('messages.updateSuccess'),
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
      } else {
        api.post(LOAD_SCHEDULES.ALLOCATE_ONE, {
          supplier: value.supplier_code,
          trip_no: value.shls_trip_no,
          cmpt_nr: 1,
        })
        .then(() => {
          refreshSeals();
          refreshNextSeal();
          sealUpated();
          setModified([]);
          setSavable(false);

          notification.success({
            message: t('messages.updateSuccess'),
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
      }
    }
  };

  const onReallocateSelected = () => {
    if (modified.length > 0) {
      Modal.confirm({
        title: t('prompts.saveBeforeSeal'),
        okText: t('operations.yes'),
        okType: 'primary',
        icon: <QuestionCircleOutlined />,
        cancelText: t('operations.no'),
        centered: true,
        onOk: async () => {
          api.post(LOAD_SCHEDULES.REALLOCATE, {
            supplier: value.supplier_code,
            trip_no: value.shls_trip_no,
            seal_nr: selected?.seal_nr,
            cmpt_nr: 1,
          })
          .then(() => {
            refreshSeals();
            refreshNextSeal();
            sealUpated();
            setModified([]);
            setSavable(false);
    
            notification.success({
              message: t('messages.updateSuccess'),
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
    } else {
      api.post(LOAD_SCHEDULES.REALLOCATE, {
        supplier: value.supplier_code,
        trip_no: value.shls_trip_no,
        seal_nr: selected?.seal_nr,
        cmpt_nr: 1,
      })
      .then(() => {
        refreshSeals();
        refreshNextSeal();
        sealUpated();
        setModified([]);
        setSavable(false);

        notification.success({
          message: t('messages.updateSuccess'),
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
    }
  };

  const onDellocateAllSelected = () => {
    if (modified.length > 0) {
      Modal.confirm({
        title: t('prompts.saveBeforeSeal'),
        okText: t('operations.yes'),
        okType: 'primary',
        icon: <QuestionCircleOutlined />,
        cancelText: t('operations.no'),
        centered: true,
        onOk: async () => {
          api.post(LOAD_SCHEDULES.DELETE_SEAL, {
            seal_nr: selected?.seal_nr,
          })
          .then(() => {
            refreshSeals();
            refreshNextSeal();
            sealUpated();
            setModified([]);
            setSavable(false);
    
            notification.success({
              message: t('messages.updateSuccess'),
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
    } else {
      api.post(LOAD_SCHEDULES.DELETE_SEAL, {
        seal_nr: selected?.seal_nr,
      })
      .then(() => {
        refreshSeals();
        refreshNextSeal();
        sealUpated();
        setModified([]);
        setSavable(false);

        notification.success({
          message: t('messages.updateSuccess'),
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
    };
  }

  const onDellocateAll = () => {
    if (modified.length > 0) {
      Modal.confirm({
        title: t('prompts.saveBeforeSeal'),
        okText: t('operations.yes'),
        okType: 'primary',
        icon: <QuestionCircleOutlined />,
        cancelText: t('operations.no'),
        centered: true,
        onOk: async () => {
          api
          .post(LOAD_SCHEDULES.DEALLOCATE, {
            supplier: value.supplier_code,
            trip_no: value.shls_trip_no,
          })
          .then(() => {
            refreshSeals();
            refreshNextSeal();
            sealUpated();
            setSelected(null);
            setModified([]);
            setSavable(false);

            notification.success({
              message: t('messages.updateSuccess'),
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
    } else {
      api
      .post(LOAD_SCHEDULES.DEALLOCATE, {
        supplier: value.supplier_code,
        trip_no: value.shls_trip_no,
      })
      .then(() => {
        refreshSeals();
        refreshNextSeal();
        sealUpated();
        setSelected(null);
        setModified([]);
        setSavable(false);

        notification.success({
          message: t('messages.updateSuccess'),
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
    }
  };

  const onSave = () => {
    for (let i = 0; i < modified.length; i ++) {
      if (!!modified[i].seal_prefix) {
        api.post(LOAD_SCHEDULES.SET_PREFIX, {
          seal_nr: modified[i].seal_nr,
          prefix: modified[i].seal_prefix,
        })
        .then(() => {
          notification.success({
            message: t('messages.updateSuccess'),
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
      }
      if (!!modified[i].seal_suffix) {
        api.post(LOAD_SCHEDULES.SET_SUFFIX, {
          seal_nr: modified[i].seal_nr,
          suffix: modified[i].seal_suffix,
        })
        .then(() => {
          notification.success({
            message: t('messages.updateSuccess'),
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
      }
    }

    setModified([]);
    setSavable(false);
  };

  const onCellUpdate = (value) => {
    setSavable(savable || value.oldValue !== value.value);
    if (value.oldValue !== value.value) {
      const field = value.colDef.field;
      
      const temp = [...modified];
      const find = _.find(temp, (item) => {
        return item.seal_nr === value.data.seal_nr;
      });

      if (find) {
        if (field === "seal_prefix" && find.seal_prefix !== value.value) {
          find.seal_prefix = value.value; 
        } else if (field === "seal_suffix" && find.seal_suffix !== value.value) {
          find.seal_suffix = value.value; 
        }
      } else {
        if (field === "seal_prefix") {
          temp.push({
            seal_prefix: value.value,
            seal_nr: value.data.seal_nr,
          })
        } else if (field === "seal_suffix") {
          temp.push({
            seal_suffix: value.value,
            seal_nr: value.data.seal_nr,
          })
        }
      }
      
      setModified(temp);
    }
  }

  useEffect(() => {
    const payload = nextSeal?.records[0]?.site_next_seal;

    if (payload) {
      setNext(payload);
    }
  }, [nextSeal]);

  const extra = (
    <>
      <Button 
        style={{ marginRight: 10 }} 
        type="primary" 
        disabled={!selected || (value?.status !== 'A' && value?.status !== 'F')} 
        onClick={onReallocateSelected}
      >
        {t('operations.reallocateSelected')}
      </Button>

      <Button
        style={{ marginRight: 10 }}
        type="primary"
        disabled={!selected}
        onClick={onDellocateAllSelected}
      >
        {t('operations.deallocateSelected')}
      </Button>

      <Button 
        style={{ marginRight: 5 }} 
        type="primary" 
        onClick={onDellocateAll}
        disabled={value?.status !== 'A' && value?.status !== 'F'}
      >
        {t('operations.deallocateAll')}
      </Button>
    </>
  );

  return (
    <>
      <Row gutter={[8, 10]}>
        <Col span={12}>
          <Form.Item label={t('fields.nextSeal')} >
            <Search
              type="number"
              min={next}
              placeholder={next}
              enterButton={t('operations.update')}
              onSearch={(value) => onSealUpdate(value)}
              disabled={!next}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('fields.numOfSeals')} >
            <Search
              placeholder={payload?.records?.length}
              enterButton={payload?.records?.length === 0 ? t('operations.allocation') : t('operations.addOne')}
              disabled={value?.status !== 'A' && value?.status !== 'F'}
              onSearch={(value) => onAllocation(value)}
              readOnly={!payload?.records || payload?.records?.length > 0}
            />
          </Form.Item>
        </Col>
      </Row>

      <div style={{marginBottom: 10}}>
        <Button 
          style={{ marginRight: 5 }} 
          type="primary" 
          disabled={!selected || (value?.status !== 'A' && value?.status !== 'F')} 
          onClick={onReallocateSelected}
        >
          {t('operations.reallocateSelected')}
        </Button>

        <Button
          style={{ marginRight: 5 }}
          type="primary"
          disabled={!selected || value?.status !== 'A' && value?.status !== 'F'}
          onClick={onDellocateAllSelected}
        >
          {t('operations.deallocateSelected')}
        </Button>

        <Button 
          style={{ marginRight: 5 }} 
          type="primary" 
          onClick={onDellocateAll}
          disabled={value?.status !== 'A' && value?.status !== 'F'}
        >
          {t('operations.deallocateAll')}
        </Button>

        <Button 
          style={{ marginRight: 5 }} 
          type="primary" 
          onClick={onSave}
          disabled={value?.status !== 'A' && value?.status !== 'F' || !savable}
        >
          {t('operations.save')}
        </Button>
      </div>

      <Form.Item name="seals" noStyle >
        <DataTable
          data={payload?.records}
          columns={fields}
          height="50vh" 
          // extra={extra}
          minimal
          handleSelect={(value) => setSelected(value[0])}
          onCellUpdate={(value) => onCellUpdate(value)}
        />
      </Form.Item>
    </>
  );
};

export default Seals;
