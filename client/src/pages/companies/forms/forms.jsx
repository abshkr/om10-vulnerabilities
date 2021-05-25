import React, { useState, useEffect } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  FormOutlined,
  ApiOutlined,
} from '@ant-design/icons';

import {
  Form,
  Button,
  Tabs,
  Modal,
  notification,
  Drawer,
  Input,
  // InputNumber,
  Select,
  Checkbox,
  Card,
  Row,
  Col,
} from 'antd';
// import 'antd/dist/antd.css';
import { useTranslation } from 'react-i18next';
import { mutate } from 'swr';

import api, { COMPANIES } from '../../../api';
import { InputNumber, NumericInput } from '../../../components';
import { REGEX } from '../../../constants';
import useSWR from 'swr';
import _, { trim } from 'lodash';
import { useConfig } from 'hooks';

const TabPane = Tabs.TabPane;

const FormModal = ({
  value,
  visible,
  handleFormState,
  auth,
  specialActions,
  companyRelations,
  setFilterValue,
}) => {
  const { t } = useTranslation();
  const { siteCompanyRelationAllowed, maxLengthCmpyCode, carrcode_tankernum_tag } = useConfig();
  const { data: addresses, isValidating } = useSWR(COMPANIES.ADDRESSES);

  const childurl = !value?.cmpy_code
    ? null
    : `${COMPANIES.CHECK_CHILDREN}?parent=${'COMPANYS'}&cmpy_code=${value?.cmpy_code}`;
  const { data: children } = useSWR(childurl);

  const [form] = Form.useForm();
  const { resetFields, setFieldsValue } = form;

  const [site_manager, setManager] = useState(value?.site_manager);
  const [supplier, setSupplier] = useState(value?.supplier);
  const [carrier, setCarrier] = useState(value?.carrier);
  const [customer, setCustomer] = useState(value?.customer);
  const [drawer, setDrawer] = useState(value?.drawer);
  const [issuer, setIssuer] = useState(value?.issuer);
  const [employer, setEmployer] = useState(value?.employer);
  const [host, setHost] = useState(value?.host);
  const [plantRequired, setPlantRquired] = useState(value?.cmpy_plant);
  const [childCounts, setChildCounts] = useState([]);

  const IS_CREATING = !value;

  /* const ctables = `ACCESS_KEYS	KYA_ALLOC_CMPY	Supplier, Carrier, Customer, Drawer	
  ACCESS_KEYS	KYA_SP_SUPPLIER	Supplier	FK_KYA_SP_SUPPLIER
  ACCESS_KEYS	KYA_KEY_ISSUER	Issuer	FK_KYA_KEY_ISSUER
  ACCESS_KEYS	KYA_DRAWER	Drawer	FK_KYA_DRAWER
  ACCESS_KEYS_HISTORY	KYA_SP_SUPPLIER	Supplier	
  ACCESS_KEYS_HISTORY	KYA_DRAWER	Drawer	
  ACCESS_KEYS_HISTORY	KYA_KEY_ISSUER	Issuer	
  ACCESS_MOVEMENT	ACM_TRIP_SUPP	Supplier	
  ACCESS_MOVEMENT	ACM_KEY_ISSUER	Issuer	
  ACTIONS_FOR_AUDIT_01	AU_PER_CMPY	Employer	
  ACTIONS_FOR_AUDIT_02	AU_PER_CMPY	Employer	
  ACTIONS_FOR_AUDIT_03	AU_PER_CMPY	Employer	
  ACTIONS_FOR_AUDIT_04	AU_PER_CMPY	Employer	
  ACTIONS_FOR_AUDIT_05	AU_PER_CMPY	Employer	
  ACTIONS_FOR_AUDIT_06	AU_PER_CMPY	Employer	
  ACTIONS_FOR_AUDIT_07	AU_PER_CMPY	Employer	
  ACTIONS_FOR_AUDIT_08	AU_PER_CMPY	Employer	
  ACTIONS_FOR_AUDIT_09	AU_PER_CMPY	Employer	
  ACTIONS_FOR_AUDIT_10	AU_PER_CMPY	Employer	
  ACTIONS_FOR_AUDIT_11	AU_PER_CMPY	Employer	
  ACTIONS_FOR_AUDIT_12	AU_PER_CMPY	Employer	
  ADJUSTS	ADJALL_ALL_ATKY_AT_CMPY	Supplier, Carrier, Customer, Drawer	
  ADJUSTS	ADJALL_ALL_PROD_PRODCMPY	Supplier, Drawer	
  ALL_CHILD	ALCH_ALP_ALL_PROD_PRODCMPY	Supplier, Drawer	
  ALL_CHILD	ALCH_ALP_ALL_ATKY_AT_CMPY	Supplier, Carrier, Customer, Drawer	
  ALLOC_AUTH	PRODCMPY	Supplier, Drawer	
  ALLOC_DETAILS	ALL_PROD_PRODCMPY	Supplier, Drawer	
  ALLOC_DETAILS	ALL_ATKY_AT_CMPY	Supplier, Carrier, Customer, Drawer	
  ALLOC_DISTB_RLT	ALLOC_KEY_ISSUER	Issuer	
  ALLOC_DISTB_RLT	DISTB_KEY_ISSUER	Issuer	
  ALLOC_DISTB_RLT_HIST	ALLOC_KEY_ISSUER	Issuer	
  ALLOC_DISTB_RLT_HIST	DISTB_KEY_ISSUER	Issuer	
  ALLOC_GLBT	ALLOCTER	Supplier, Carrier, Customer, Drawer	
  ALLOC_GLBT	ALLOCTEE	Supplier, Carrier, Customer, Drawer	
  ALLOC_TYPE	AT_CMPY	Supplier, Carrier, Customer, Drawer	FK_AT_CMPY
  ALLOCS	ALL_PROD_PRODCMPY	Supplier, Drawer	
  ALLOCS	ALL_ATKY_AT_CMPY	Supplier, Carrier, Customer, Drawer	
  ARM_LOADING_QUEUE	AQ_SUPP	Supplier	
  BA_CMPY_LNK	BACL_CMPY_CODE	Supplier	FK_BCL_BACL_CMPY_CD
  BARMPROD	BARMPLNK_PRODCMPY	Supplier, Drawer	
  BARMPROD	BARM_SUPPLIERLNK	Supplier	FK_BARM_SUPPLIERLNK
  BASE_PROD_OWNSHIP	SUPP_CMPY	Supplier	FK_BASE_PROD_OWNSHIP_CMPY
  BASE_TRANSLATE	BASE_TRANS_CMPY	Supplier?	FK_BASE_TRANS_CMPY
  BL_HISTORY	BL_BORROWER	Supplier?	FK_BL_BORROWER
  BL_HISTORY	BL_LOANER	Supplier?	FK_BL_LOANER
  CLOSEOUT_PRODOWNSHIP	CMPY_CODE		
  CLOSEOUT_TK_OWNER	TKCMPY_LINK		
  CMPY_CUST_PRTNR	CCP_CMPY_CODE	Supplier	FK_CCP_CCP_CMPY_CODE
  CMPY_ROLE_MSG	CRM_CMPY	Employer?	FK_CRM_CMPY
  COMPANY_RELATION	CHILD_CMPY_CODE		
  COMPANY_RELATION	PARENT_CMPY_CODE		
  COMPANYS	CMPY_CODE		
  CREATE_OPEN_ORDER_HOST_IN	OO_CUST_CODE		
  CREATE_OPEN_ORDER_HOST_IN	OO_CARR_CODE		
  CREATE_OPEN_ORDER_HOST_IN	OO_SUPP_CODE	Supplier	
  CREATE_OPEN_ORDER_HOST_IN_BAK	OO_CUST_CODE		
  CREATE_OPEN_ORDER_HOST_IN_BAK	OO_CARR_CODE		
  CREATE_OPEN_ORDER_HOST_IN_BAK	OO_SUPP_CODE	Supplier	
  CUST_ORDER	ORDER_CARRIER	Carrier	FK_ORDER_CARRIER
  CUST_ORDER	ORDER_DRAWER	Drawer	FK_ORDER_DRAWER
  CUSTOMER	CUST_CODE	Customer	FK_CUST_CODE
  CUSTOMER	CUST_SUPP	Supplier	FK_CUST_SUPP
  CUSTOMER_CARRIER	CMPY_CODE	Carrier	FK_CUSTCARRIER_CARRIER
  CUSTOMER_PRODUCT	PROD_CMPY	Supplier, Drawer	
  DEL_LOAD_DETAILS	CARR_CODE		
  DEL_LOAD_DETAILS	SUPP_CODE	Supplier	
  DELV_BOL	DB_SUPP_CODE	Supplier	
  DELV_COMPT	DC_DELV_DOC_SHL_SHLSSUPP	Supplier	
  DELV_DETAILS	DD_SUPP_CODE	Supplier	
  DELV_DETAILS	DD_SELL_CMPY_CODE		
  DELV_DETAILS_DN	DDD_DD_SUPP_CODE	Supplier	
  DELV_DETAILS_DN_ADDL_INFO	DDD_DD_SUPP_CODE	Supplier	
  DELV_DETAILS_ITEM	DDI_CMPY_CODE		
  DELV_DETAILS_ITEM	DDI_DD_SUPP_CODE	Supplier	
  DELV_DETAILS_ITEM_ADDL_INFO	DDI_DD_SUPP_CODE	Supplier	
  DG_LINK	DGLNK_SP_PRODCMPY	Supplier, Drawer	
  DLOC_TANKS	DLTPRDCT_PRODCMPY	Supplier, Drawer	
  DOC_INSTRUCT	DOC_LINK_DOC_SHL_SHLSSUPP	Supplier	
  DOC_PROD	DP_PROD_PRODCMPY	Supplier, Drawer	
  DOC_PROD	DP_DOC_DOC_SHL_SHLSSUPP	Supplier	
  DOCKET	DOC_CUST		
  DOCKET	DOC_SHL_SHLSSUPP	Supplier	
  DOR_HISTORY	DH_SHLSSUPP	Supplier	
  EPC_DATA	EPCFPROD_PRODCMPY	Supplier, Drawer	
  EXPIRY_DATE_DETAILS	ED_CMPY_CODE		
  HOST_OUT_HIST	OO_CUST_CODE		
  HOST_OUT_HIST	OO_CARR_CODE		
  HOST_OUT_HIST	OO_SUPP_CODE	Supplier	
  HOST_OUT_INTF	OO_CUST_CODE		
  HOST_OUT_INTF	OO_CARR_CODE		
  HOST_OUT_INTF	OO_SUPP_CODE	Supplier	
  HOSTTMM	HOSTTMMCO	Host?	FK_HOSTTMMCO
  HST_OUT_MSGS	HST_COMP_CODE		
  HZ_LINK	HZLNK_SP_PRODCMPY	Supplier, Drawer	
  INTERLOCK_REPORT	COMPANY_CODE	Carrier?	
  INV_PRODUCT	IP_PRKEY_PRODCMPY	Supplier, Drawer	
  INVPROD_BASE	IPB_DAD_IP_PRKEY_PRODCMPY	Supplier, Drawer	
  LINKED_SCHEDULES	LS_LINKED_SUPP	Supplier	
  LINKED_SCHEDULES	LS_SUPP_SUPP	Supplier	
  LOAD_WEIGTHS	LDW_PROD_PRODCMPY	Supplier, Drawer	
  LOADED_COMPT	LDCPPROD_PRODCMPY	Supplier, Drawer	
  LOADS	LOAD_CARRIER	Carrier	FK_LOAD_CARRIER
  LOCKAL	LOCKAL_SUPL	Supplier	
  LOCKAL	LOCKATYP_AT_CMPY	Supplier, Carrier, Customer, Drawer	
  MOV_LOAD_ITEMS	MLITM_COMPANY_TO	Supplier?	
  MOV_LOAD_ITEMS	MLITM_COMPANY_FROM	Supplier?	
  MOV_LOAD_ITEMS	MLITM_SUPPLIER	Supplier	
  MOV_LOAD_ITEMS	MLITM_PRODCMPY_TO	Supplier, Drawer	
  MOV_LOAD_ITEMS	MLITM_PRODCMPY	Supplier, Drawer	
  MOV_SCHD_ITEMS	MSITM_SHLSSUPP	Supplier	
  MOV_SCHD_ITEMS	MSITM_CUSTOMER	Customer	
  MOV_SCHD_ITEMS	MSITM_PRODCMPY	Supplier, Drawer	
  MOV_SCHEDULES	MS_PAIRSUPP	Supplier	
  MOV_SCHEDULES	MS_SHLSSUPP	Supplier	
  MOV_TRSF_ITEMS	MTITM_COMPANY_TO	Supplier?	
  MOV_TRSF_ITEMS	MTITM_COMPANY_FROM	Supplier?	
  MOV_TRSF_ITEMS	MTITM_SUPPLIER	Supplier	
  MOV_TRSF_ITEMS	MTITM_PRODCMPY_TO	Supplier, Drawer	
  MOV_TRSF_ITEMS	MTITM_PRODCMPY	Supplier, Drawer	
  MOVEMENT_ITEMS	MVITM_PRODCMPY_TO	Supplier, Drawer	
  MOVEMENT_ITEMS	MVITM_PRODCMPY_FROM	Supplier, Drawer	
  MOVEMENTS	MV_SUPPLIER	Supplier	
  MOVEMENTS	MV_DRAWER	Drawer	
  MOVEMENTS	MV_SHIPPER	Carrier	
  MOVEMENTS	MV_CARRIER	Carrier	
  MSG	CMPY	Employer?	FK_MSG_CMPY
  O_CLOSEOUT	OC_SUPPLIER	Supplier	FK_OC_SUPPLIER
  OPROD_CHILD	OPB_DAD_OSPROD_PRODCMPY	Supplier, Drawer	
  OPRODMTD	OSPROD_PRODCMPY	Supplier, Drawer	
  ORD_SCHEDULE	OS_SHL_SHLSSUPP	Supplier	
  ORDER_DISTB_RLT	DISTB_KEY_ISSUER	Issuer	
  OVERFILL_EVENTS	COMPANY_CODE	Supplier?	
  PARTNER	PRTNR_CMPY	Supplier	
  PERSONNEL	PER_CMPY	Employer	FK_PER_CMPY
  PRDCT_MV_OWNERS	PMO_CMPNY_LNK	Supplier?	FK_PMO_CMPNY_LNK
  PRFCMPT	PRFC_PRD_PRODCMPY	Supplier, Drawer	
  PRICE_OFFSET	PO_SUPPLIER	Supplier	FK_PO_SUPPLIER
  PRICE_OFFSET	PO_PROD_PRODCMPY	Supplier, Drawer	
  PRNT_VIRT_PRINT	PRNF_CMPY	Supplier, Carrier	FK_PRNF_CMPY
  PRNTR_CMPY_USAGE	CMPY	Supplier	
  PRODOWNSHIP_TRANSACT	SUPP_CMPY	Supplier	FK_PRODOWNSHIP_TRSA_CMPY
  PRODOWNSHIP_TRANSACT	SUPP_CMPY_TO	Supplier	
  PRODUCT_MVMNTS	PMVDRPR_PRODCMPY	Supplier, Drawer	
  PRODUCT_MVMNTS	PMV_SRC_COMPANY	Supplier?	FK_PMV_SRC_COMPANY
  PRODUCT_MVMNTS	PMV_DST_COMPANY	Supplier?	FK_PMV_DST_COMPANY
  PRODUCT_MVMNTS	PMV_TRIP_SUPPLIE	Supplier	
  PRODUCT_SWAP	PRDS_TO_CMPY	Supplier?	FK_PRDS_TO_CMPY
  PRODUCT_SWAP	PRDS_FROMCMPY	Supplier?	FK_PRDS_FROMCMPY
  PRODUCTS	PROD_CMPY	Drawer	
  PRODUCTS	PROD_2ND_DRAWER	Drawer	
  PROFILE	PRF_SUPP	Supplier	FK_PRF_SUPP
  RATIOS	RAT_PROD_PRODCMPY	Supplier, Drawer	
  RECIPES	RCPINGR_PRODCMPY	Supplier, Drawer	
  RECIPES	RCP_RCP_PRODCMPY	Supplier, Drawer	
  RTN_EQP_CPT	RTNCPTTY_RTNT_SHL_SHLSSUPP	Supplier	
  RTN_EQP_CPT	RTN_PROD_PRODCMPY	Supplier, Drawer	
  RTN_EQP_CPT	RTN_SHL_SHLSSUPP	Supplier	
  RTNTYPE	RTNT_SHL_SHLSSUPP	Supplier	
  SCHEDULE	SHLS_CUST	Customer	
  SCHEDULE	SHLS_DRAWER	Drawer	FK_SHLS_DRAWER
  SCHEDULE	SHLS_SUPP	Supplier	FK_SHLS_SUPP
  SCHEDULE	SHLS_SUPP_ORG	Supplier	
  SEAL	SEALSPEC_SHLSSUPP	Supplier	
  SITE	SITE_MNGR	Site Manager, Supplier	
  SITE_JOURNAL_01	COMPANY_CODE	Site Manager, Supplier	
  SITE_JOURNAL_02	COMPANY_CODE	Site Manager, Supplier	
  SITE_JOURNAL_03	COMPANY_CODE	Site Manager, Supplier	
  SITE_JOURNAL_04	COMPANY_CODE	Site Manager, Supplier	
  SITE_JOURNAL_05	COMPANY_CODE	Site Manager, Supplier	
  SITE_JOURNAL_06	COMPANY_CODE	Site Manager, Supplier	
  SITE_JOURNAL_07	COMPANY_CODE	Site Manager, Supplier	
  SITE_JOURNAL_08	COMPANY_CODE	Site Manager, Supplier	
  SITE_JOURNAL_09	COMPANY_CODE	Site Manager, Supplier	
  SITE_JOURNAL_10	COMPANY_CODE	Site Manager, Supplier	
  SITE_JOURNAL_11	COMPANY_CODE	Site Manager, Supplier	
  SITE_JOURNAL_12	COMPANY_CODE	Site Manager, Supplier	
  SPEC_ORDERS	SCHO_DAD_SCHDSPEC_SHLSSUPP	Supplier	
  SPECAXLES	SUPP	Supplier	
  SPECDETS	SCHDPROD_PRODCMPY	Supplier, Drawer	
  SPECDETS	SCHDSPEC_SHLSSUPP	Supplier	
  SPECDPPROD	SPECDPPP_PRODCMPY	Supplier, Drawer	
  SPECDPPROD	SPECDPPS_SHLSSUPP	Supplier	
  SPECPROD	SCHPPROD_PRODCMPY	Supplier, Drawer	
  SPECPROD	SCHPSPID_SHLSSUPP	Supplier	
  SPECVARS	SCHVSPID_SHLSSUPP	Supplier	
  SUPP_LNKD_CMPY	CMPY_CODE	Supplier?	
  SUPP_LNKD_CMPY	SUPP_CODE	Supplier	
  TANKERS	TNKR_OWNER	Carrier	FK_TNKR_OWNER
  TANKERS	TNKR_CARRIER	Carrier	FK_TNKR_CARRIER
  TEMPLATE_N_CMPY	CMPY_CODE	Supplier	
  TK_CLOSEOUT	TKCL_CO	Supplier	FK_TKCL_CO
  TK_OWNERS	TKCMPY_LINK	Supplier	FK_TKCMPY_LINK
  TMM_FLAGS	TMMF_COMPANY	Supplier?	FK_TMMF_COMPANY
  TRANSFERS	TRSFPROD_PRODCMPY	Supplier, Drawer	
  TRANSFERS	TRSF_SUPPLIER	Supplier	FK_TRSF_SUPPLIER
  TRANSP_EQUIP	EQPT_OWNER	Carrier	FK_EQPT_OWNER
  `;

  const getJsonChildren = () => {
    const lines = ctables.split('\n');
    const json = {};
    json.CHILDREN = [];
    for (let i=0; i<lines.length; i++) {
      const columns = lines[i].trim().split('\t');
      const item = {};
      item.TABLE_NAME = columns[0];
      item.CKEYS = [];
      item.TYPE = columns[2];
      const column = {};
      column.COLUMN_NAME = columns[1];
      column.DATA_TYPE = 'VARCHAR(16)';
      column.COLUMN_ID = 1;
      // column.TYPE = columns[2];
      item.CKEYS.push(column);
      json.CHILDREN.push(item);
    }

    console.log('........................json', json, JSON.stringify(json));
  } */

  const removeWhiteSpaceFrontBack = (s) => s.trim().split(/ +/).join(' ');

  const onComplete = (cmpy_code) => {
    handleFormState(false, null);
    if (cmpy_code) {
      setFilterValue('' + cmpy_code);
    }
    mutate(COMPANIES.READ);
  };

  const onManagerChange = (v) => {
    setManager(v.target.checked);
    setFieldsValue({
      site_manager: v.target.checked,
    });
  };

  const onSupplierChange = (v) => {
    setSupplier(v.target.checked);
    setFieldsValue({
      supplier: v.target.checked,
    });

    if (v.target.checked && !drawer) {
      setDrawer(v.target.checked);
      setFieldsValue({
        drawer: v.target.checked,
      });
    }
  };

  const onCarrierChange = (v) => {
    setCarrier(v.target.checked);
    setFieldsValue({
      carrier: v.target.checked,
    });
  };

  const onCustomerChange = (v) => {
    setCustomer(v.target.checked);
    setFieldsValue({
      customer: v.target.checked,
    });
  };

  const onDrawerChange = (v) => {
    if (!v.target.checked && supplier) {
      return;
    }

    setDrawer(v.target.checked);
    setFieldsValue({
      drawer: v.target.checked,
    });
  };

  const onIssuerChange = (v) => {
    setIssuer(v.target.checked);
    setFieldsValue({
      issuer: v.target.checked,
    });
  };

  const onEmployerChange = (v) => {
    setEmployer(v.target.checked);
    setFieldsValue({
      employer: v.target.checked,
    });
  };

  const onHostChange = (v) => {
    setHost(v.target.checked);
    setFieldsValue({
      host: v.target.checked,
    });
  };

  useEffect(() => {
    if (value) {
      setManager(value.site_manager);
      setSupplier(value.supplier);
      setCarrier(value.carrier);
      setCustomer(value.customer);
      setDrawer(value.drawer);
      setIssuer(value.issuer);
      setEmployer(value.employer);
      setHost(value.host);
      setFieldsValue({
        cmpy_code: value.cmpy_code,
        cmpy_plant: value.cmpy_plant,
        cmpy_name: value.cmpy_name,
        cmpy_aoi: value.cmpy_aoi,
        cmpy_addr: value.cmpy_addr,
        site_manager: value.site_manager,
        supplier: value.supplier,
        carrier: value.carrier,
        customer: value.customer,
        drawer: value.drawer,
        issuer: value.issuer,
        employer: value.employer,
        host: value.host,
      });
    } else {
      resetFields();
      setManager(null);
      setSupplier(null);
      setCarrier(null);
      setCustomer(null);
      setDrawer(null);
      setIssuer(null);
      setEmployer(null);
      setHost(null);
    }
  }, [value, setFieldsValue, resetFields]);

  useEffect(() => {
    // getJsonChildren();
    if (children) {
      console.log('..................children', children);
      setChildCounts(children?.records);
    }
  }, [children]);

  const onFinish = async () => {
    const values = await form.validateFields();

    // if(values.cmpy_name){
    //   values.cmpy_name = removeWhiteSpaceFrontBack(values.cmpy_name);
    // };

    if (
      !values.carrier &&
      !values.customer &&
      !values.drawer &&
      !values.employer &&
      !values.host &&
      !values.issuer &&
      !values.site_manager &&
      !values.supplier
    ) {
      notification.error({
        message: t('messages.validationFailed'),
        description: t('descriptions.noCompanyType'),
      });
      return;
    }

    Modal.confirm({
      title: IS_CREATING ? t('prompts.create') : t('prompts.update'),
      okText: IS_CREATING ? t('operations.create') : t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(IS_CREATING ? COMPANIES.CREATE : COMPANIES.UPDATE, values)
          .then((response) => {
            onComplete(values.cmpy_code);

            mutate(COMPANIES.READ);
            notification.success({
              message: IS_CREATING ? t('messages.createSuccess') : t('messages.updateSuccess'),
              description: IS_CREATING ? t('descriptions.createSuccess') : t('messages.updateSuccess'),
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

  const onDelete = () => {
    Modal.confirm({
      title: t('prompts.delete'),
      okText: t('operations.yes'),
      okType: 'danger',
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(COMPANIES.DELETE, value)
          .then((response) => {
            onComplete();

            notification.success({
              message: t('messages.deleteSuccess'),
              description: `${t('descriptions.deleteSuccess')}`,
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

  const validateCode = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.companyCode')}`);
      }
    }

    const regex = new RegExp(REGEX.ALPHANUMERIC);
    const validated = regex.exec(input);

    if (!validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumeric')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > maxLengthCmpyCode) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${maxLengthCmpyCode} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const validatePlant = (rule, input) => {
    /* if (rule.required && input?.length > 0) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.plantCode')}`);
      }
    } */

    if (input === '' || !input) {
      setPlantRquired(false);
    } else {
      setPlantRquired(true);
    }

    const regex = new RegExp(REGEX.ALPHANUMERIC);
    const validated = regex.exec(input);

    if (!validated && input?.length > 0) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumeric')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 16) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 16 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  const validateName = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.companyName')}`);
      }
    }

    if (input != input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }

    if (input != input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    const regex = new RegExp(REGEX.DOCUMENT);
    const validated = regex.exec(input);

    if (!validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextDocument')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 300) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 300 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      forceRender
      onClose={() => handleFormState(false, null)}
      maskClosable={IS_CREATING}
      destroyOnClose={true}
      mask={IS_CREATING}
      placement="right"
      width="48vw"
      visible={visible}
      footer={
        <>
          {!IS_CREATING && (
            <Button
              type="primary"
              icon={<FormOutlined />}
              style={{ float: 'left' }}
              loading={isValidating}
              onClick={() => specialActions()}
              disabled={!auth.canUpdate}
            >
              {t('operations.specialAction')}
            </Button>
          )}

          {!IS_CREATING && siteCompanyRelationAllowed && (
            <Button
              type="primary"
              icon={<ApiOutlined />}
              style={{ float: 'left', marginLeft: 5 }}
              loading={isValidating}
              onClick={() => companyRelations()}
              disabled={!auth.canUpdate || value?.supplier !== true}
            >
              {t('operations.companyRelation')}
            </Button>
          )}

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
            icon={IS_CREATING ? <PlusOutlined /> : <EditOutlined />}
            htmlType="submit"
            onClick={onFinish}
            style={{ float: 'right', marginRight: 5 }}
            disabled={IS_CREATING ? !auth?.canCreate : !auth?.canUpdate}
          >
            {IS_CREATING ? t('operations.create') : t('operations.update')}
          </Button>

          {!IS_CREATING && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ float: 'right', marginRight: 5 }}
              onClick={onDelete}
              disabled={!auth?.canDelete}
            >
              {t('operations.delete')}
            </Button>
          )}
        </>
      }
    >
      <Form layout="vertical" form={form} scrollToFirstError>
        <Tabs defaultActiveKey="1">
          <TabPane tab={t('tabColumns.general')} key="1" style={{ height: '60vh' }}>
            <Form.Item
              name="cmpy_code"
              label={t('fields.companyCode')}
              rules={[{ required: true, validator: validateCode }]}
            >
              {carrcode_tankernum_tag ? (
                <NumericInput
                  inputValue={value?.cmpy_code}
                  disabled={!IS_CREATING}
                  onChange={(cmpy_code) =>
                    setFieldsValue({
                      cmpy_code: cmpy_code,
                    })
                  }
                />
              ) : (
                <Input disabled={!IS_CREATING}></Input>
              )}
            </Form.Item>
            <Form.Item
              name="cmpy_plant"
              label={t('fields.plantCode')}
              rules={[{ required: plantRequired, validator: validatePlant }]}
            >
              <Input disabled={!supplier}></Input>
            </Form.Item>
            <Form.Item
              name="cmpy_name"
              label={t('fields.companyName')}
              rules={[{ required: true, validator: validateName }]}
            >
              <Input></Input>
            </Form.Item>
            {/* <Form.Item name="cmpy_aoi" label={t('fields.aoiNumber')}>
              <InputNumber maxLength={4} min={0} max={9999} precision={0} style={{ width: '100%' }}></InputNumber>
            </Form.Item> */}
            <InputNumber
              form={form}
              value={value?.cmpy_aoi}
              name="cmpy_aoi"
              label={t('fields.aoiNumber')}
              maxLength={4}
              min={0}
              max={9999}
              precision={0}
              style={{ width: '100%' }}
            />
            <Form.Item name="cmpy_addr" label={t('fields.address')}>
              <Select
                dropdownMatchSelectWidth={false}
                loading={isValidating}
                // onChange={onChange}
                // disabled={!!value || type === '1'}
                showSearch
                optionFilterProp="children"
                placeholder={!value ? t('placeholder.selectAddress') : null}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {addresses?.records.map((item, index) => (
                  <Select.Option key={index} value={item.db_address_key}>
                    {item.address_text}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Card size="small" title={t('fields.companyType')}>
              <Row gutter={[8, 10]}>
                <Col span={6}>
                  <Form.Item name="site_manager" noStyle>
                    <Checkbox
                      checked={site_manager && !IS_CREATING}
                      disabled={true}
                      onChange={onManagerChange}
                    >
                      {t('fields.siteManager')}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="supplier" noStyle>
                    <Checkbox checked={supplier} onChange={onSupplierChange}>
                      {t('fields.schdSupplier')}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="carrier" noStyle>
                    <Checkbox checked={carrier} onChange={onCarrierChange}>
                      {t('fields.schdCarrier')}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="customer" noStyle>
                    <Checkbox checked={customer} onChange={onCustomerChange}>
                      {t('fields.customer')}
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 10]}>
                <Col span={6}>
                  <Form.Item name="drawer" noStyle>
                    <Checkbox checked={drawer} onChange={onDrawerChange}>
                      {t('fields.drawer')}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="issuer" noStyle>
                    <Checkbox checked={issuer} onChange={onIssuerChange}>
                      {t('fields.issuer')}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="employer" noStyle>
                    <Checkbox checked={employer} onChange={onEmployerChange}>
                      {t('fields.employer')}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="host" noStyle>
                    <Checkbox checked={host} onChange={onHostChange}>
                      {t('fields.host')}
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </Form>
    </Drawer>
  );
};

export default FormModal;
