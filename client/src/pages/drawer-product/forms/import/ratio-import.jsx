import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Row, Col, notification, Modal, Upload, Card, Tag } from 'antd';
import { CloseOutlined, QuestionCircleOutlined, SyncOutlined, UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { DataTable } from '../../../../components';
// import api, { TANK_STRAPPING } from '../../../../api';
import columns from './columns';
import { csvToJSON } from '../../../../utils';

const RatioImport = ({ value, bases, onClose, config, pipenodeBases, user_code }) => {
  const { t } = useTranslation();

  const [ratioList, setRatioList] = useState(bases);
  const [selected, setSelected] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [canPreview, setCanPreview] = useState(false);
  const [canUpload, setCanUpload] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const props = {
    accept: '.csv',
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setCanPreview(newFileList.length > 0 ? true : false);
      setCanUpload(newFileList.length > 0 ? canUpload : false);
      setRatioList([]);
      console.log(newFileList);
    },
    beforeUpload: (file) => {
      // Limited to one file in the list always
      const newFileList = []; // fileList.slice();
      newFileList.push(file);
      setFileList(newFileList);
      setCanPreview(newFileList.length > 0 ? true : false);
      setCanUpload(newFileList.length > 0 ? canUpload : false);
      console.log(newFileList);

      return false;
    },
    fileList,
  };

  const [form] = Form.useForm();
  const fields = columns(t, config, form, pipenodeBases, user_code);

  const onFinish = () => {
    Modal.destroyAll();
    onClose(ratioList);
  };

  const onDeleteLine = () => {
    const index = ratioList.indexOf(selected);
    const newList = ratioList.slice();
    newList.splice(index, 1);
    setRatioList(newList);

    //tableAPI.updateRowData({ remove: selected });
  };

  const onAddLine = () => {
    const ratio = {};

    if (ratioList.length > 0) {
      const line = ratioList[ratioList.length - 1];
      ratio.pitem_base_code = line.pitem_base_code;
      ratio.pitem_base_name = line.pitem_base_name;
      if (!(config?.siteRecipeOnPercent && user_code !== '9999')) {
        ratio.pitem_ratio_value = line.pitem_ratio_value;
      }
      if (!config?.siteRecipeOnPercent) {
        ratio.pitem_ratio_as_percent = line.pitem_ratio_as_percent;
      }
      if (config?.siteRecipeOnPercent) {
        ratio.pitem_ratio_percent_ppm = line.pitem_ratio_percent_ppm;
      }
      ratio.pitem_bltol_flag = line.pitem_bltol_flag;
      ratio.pitem_bltol_ntol = line.pitem_bltol_ntol;
      ratio.pitem_bltol_ptol = line.pitem_bltol_ptol;
      if (config?.manageHotProduct) {
        ratio.pitem_hot_main = line.pitem_hot_main;
      }
      ratio.pitem_adtv_flag = line.pitem_adtv_flag;
      ratio.pitem_base_class = line.pitem_base_class;
      ratio.pitem_bclass_name = line.pitem_bclass_name;
      if (config?.manageHotProduct) {
        ratio.pitem_hot_check = line.pitem_hot_check;
      }
      ratio.pitem_bclass_dens_lo = line.pitem_bclass_dens_lo;
      ratio.pitem_bclass_dens_hi = line.pitem_bclass_dens_hi;
      ratio.pitem_bclass_temp_lo = line.pitem_bclass_temp_lo;
      ratio.pitem_bclass_temp_hi = line.pitem_bclass_temp_hi;
      if (config?.siteEnabledPIDX) {
        ratio.pitem_pidx_code = line.pitem_pidx_code;
      }
    } else {
      ratio.ratio_height = '0';
      ratio.ratio_volume = '0';
      ratio.ratio_tankcode = value?.tank_code;
      ratio.ratio_sitecode = value?.tank_terminal;

      ratio.pitem_base_code = '';
      ratio.pitem_base_name = '';
      if (!(config?.siteRecipeOnPercent && user_code !== '9999')) {
        ratio.pitem_ratio_value = 1;
      }
      if (!config?.siteRecipeOnPercent) {
        ratio.pitem_ratio_as_percent = 1;
      }
      if (config?.siteRecipeOnPercent) {
        ratio.pitem_ratio_percent_ppm = 1;
      }
      ratio.pitem_bltol_flag = false;
      ratio.pitem_bltol_ntol = -10;
      ratio.pitem_bltol_ptol = 10;
      if (config?.manageHotProduct) {
        ratio.pitem_hot_main = false;
      }
      ratio.pitem_adtv_flag = false;
      ratio.pitem_base_class = 2;
      ratio.pitem_bclass_name = '';
      if (config?.manageHotProduct) {
        ratio.pitem_hot_check = false;
      }
      ratio.pitem_bclass_dens_lo = 0;
      ratio.pitem_bclass_dens_hi = 0;
      ratio.pitem_bclass_temp_lo = 0;
      ratio.pitem_bclass_temp_hi = 0;
      if (config?.siteEnabledPIDX) {
        ratio.pitem_pidx_code = '';
      }
    }
    const newList = ratioList.slice();
    newList.push(ratio);
    setRatioList(newList);

    //tableAPI.updateRowData({ add: [ratio] });
  };

  const onDeleteAll = () => {
    setRatioList([]);
  };

  const onCellUpdate = (val) => {
    const newList = ratioList.slice();
    newList[val?.rowIndex] = val?.data;
    setRatioList(newList);
    // loop all lines to see if enabling Upload button
    onVerifyData(newList, true);
    /* const invalid = verifyRatio(val?.data, val?.rowIndex);

    if (invalid) {
      setCanUpload(false);
    } else {
      const newList = ratioList.slice();
      newList[val?.rowIndex] = val?.data;
      setRatioList(newList);
      // loop all lines to see if enabling Upload button
      onVerifyData(newList, false);
    } */
  };

  const onPreviewData = () => {
    const reader = new FileReader();

    /*
    field: 'pitem_base_code',
    field: 'pitem_base_name',
    field: 'pitem_ratio_value',
      hide: config?.siteRecipeOnPercent && user_code !== '9999',
    field: 'pitem_ratio_as_percent',
      hide: config?.siteRecipeOnPercent,
    field: 'pitem_ratio_percent_ppm',
	    hide: !config?.siteRecipeOnPercent,
    field: 'pitem_bltol_flag',
    field: 'pitem_bltol_ntol',
    field: 'pitem_bltol_ptol',
    field: 'pitem_hot_main',
	    hide: !config.manageHotProduct,
    field: 'pitem_adtv_flag',
    field: 'pitem_base_class',
    field: 'pitem_bclass_name',
    field: 'pitem_hot_check',
       hide: !config.manageHotProduct,
    field: 'pitem_bclass_dens_lo',
    field: 'pitem_bclass_dens_hi',
    field: 'pitem_bclass_temp_lo',
    field: 'pitem_bclass_temp_hi',
    field: 'pitem_pidx_code',
       hide: !config?.siteEnabledPIDX,
    */
    const codes = [];
    codes.push('pitem_base_code');
    codes.push('pitem_base_name');
    if (!(config?.siteRecipeOnPercent && user_code !== '9999')) {
      codes.push('pitem_ratio_value');
    }
    if (!config?.siteRecipeOnPercent) {
      codes.push('pitem_ratio_as_percent');
    }
    if (config?.siteRecipeOnPercent) {
      codes.push('pitem_ratio_percent_ppm');
    }
    codes.push('pitem_bltol_flag');
    codes.push('pitem_bltol_ntol');
    codes.push('pitem_bltol_ptol');
    if (config?.manageHotProduct) {
      codes.push('pitem_hot_main');
    }
    codes.push('pitem_adtv_flag');
    codes.push('pitem_base_class');
    codes.push('pitem_bclass_name');
    if (config?.manageHotProduct) {
      codes.push('pitem_hot_check');
    }
    codes.push('pitem_bclass_dens_lo');
    codes.push('pitem_bclass_dens_hi');
    codes.push('pitem_bclass_temp_lo');
    codes.push('pitem_bclass_temp_hi');
    if (config?.siteEnabledPIDX) {
      codes.push('pitem_pidx_code');
    }
    const ids = [];
    for (let i = 0; i < codes.length; i++) {
      ids.push(i);
    }

    reader.onload = function (e) {
      const text = reader.result;
      console.log('file contents', text);
      const json = csvToJSON(text, ids, codes);
      const newJson = [];
      for (let i = 0; i < json?.length; i++) {
        const o = json?.[i];
        console.log('file contents', i, o);

        if (String(o?.pitem_bltol_flag).toUpperCase() === 'TRUE') {
          o.pitem_bltol_flag = true;
        }
        if (String(o?.pitem_bltol_flag).toUpperCase() === 'FALSE') {
          o.pitem_bltol_flag = false;
        }
        if (String(o?.pitem_hot_main).toUpperCase() === 'TRUE') {
          o.pitem_hot_main = true;
        }
        if (String(o?.pitem_hot_main).toUpperCase() === 'FALSE') {
          o.pitem_hot_main = false;
        }
        if (String(o?.pitem_adtv_flag).toUpperCase() === 'TRUE') {
          o.pitem_adtv_flag = true;
        }
        if (String(o?.pitem_adtv_flag).toUpperCase() === 'FALSE') {
          o.pitem_adtv_flag = false;
        }
        if (String(o?.pitem_hot_check).toUpperCase() === 'TRUE') {
          o.pitem_hot_check = true;
        }
        if (String(o?.pitem_hot_check).toUpperCase() === 'FALSE') {
          o.pitem_hot_check = false;
        }
        newJson.push(o);
      }
      console.log('file contents', json, newJson);
      setRatioList(newJson);
      onVerifyData(newJson);
    };

    reader.readAsText(fileList?.[0]);
  };

  const onVerifyData = (json, showWarning = true) => {
    const errors = onItemValidation(json, showWarning);

    const invalid = errors?.length > 0;
    setInvalid(invalid);
    setCanUpload(!invalid);
  };

  /*
    oci_bind_by_name($stmt, ':ratio_base', $value->pitem_base_code);
    oci_bind_by_name($stmt, ':rat_prod_prodcode', $this->prod_code);
    oci_bind_by_name($stmt, ':rat_prod_prodcmpy', $this->prod_cmpy);
    oci_bind_by_name($stmt, ':ratio_value', $value->pitem_ratio_value);
    oci_bind_by_name($stmt, ':ratio_percent_ppm', $value->pitem_ratio_percent_ppm);
    oci_bind_by_name($stmt, ':rat_bltol_flag', $value->pitem_bltol_flag);
    oci_bind_by_name($stmt, ':rat_bltol_ptol', $value->pitem_bltol_ptol);
    oci_bind_by_name($stmt, ':rat_bltol_ntol', $value->pitem_bltol_ntol);
    oci_bind_by_name($stmt, ':rat_hot_main', $value->pitem_hot_main);

    The following validations will be processed after the data are imported:

    all of above red fields must have the values
    the field "ratio_base" must not be duplicated in all base ratios in the CSV
    the field "ratio_value" must be a positive integer
    the field "ratio_percent_ppm" must be a positive number
    the field "rat_bltol_ptol" must be a positive number or ZERO
    the field "rat_bltol_ntol" must be a negative number or ZERO
    the field "rat_bltol_flag" must be a boolean flag
    the field "rat_hot_main" must be a boolean flag
  */
  const onItemValidation = (items, showWarning = true) => {
    console.log('..............onItemValidation....', items);
    const errors = [];
    const codes = [];

    // check the base ratio items
    for (let bidx = 0; bidx < items?.length; bidx++) {
      const ratio = items?.[bidx];

      // the field "ratio_base" must not be duplicated in all base ratios in the CSV
      const base = ratio?.pitem_base_code;
      const cidx = codes.findIndex((o) => o === base);
      if (cidx >= 0) {
        errors.push({
          field: `${t('validate.duplicated')} ─ ${t('fields.pitemBaseCode')}`,
          message: `${t('descriptions.textField')}: ${t('fields.pitemBaseCode')}; ${t(
            'descriptions.textValue'
          )}: ${base}; ${t('descriptions.textRowCur')}: ${bidx + 1}; ${t('descriptions.textRowSrc')}: ${
            cidx + 1
          }`,
          key: `E0_${'pitem_base_code'}${bidx}_${cidx}`,
        });
      } else {
        codes.push(base);
      }

      // these fields cannot be null:
      // pitem_base_code,pitem_ratio_value,pitem_ratio_percent_ppm,pitem_bltol_flag,pitem_bltol_ptol,pitem_bltol_ntol,pitem_hot_main
      if (
        ratio?.pitem_base_code === undefined ||
        ratio?.pitem_base_code === null ||
        ratio?.pitem_base_code === ''
      ) {
        errors.push({
          field: `${t('validate.set')} ─ ${t('fields.pitemBaseCode')}`,
          message: `${t('descriptions.textField')}: ${t('fields.pitemBaseCode')}; ${t(
            'descriptions.textValue'
          )}: ${''}; ${t('descriptions.textRow')}: ${bidx + 1}`,
          key: `E1_${'pitem_base_code'}${bidx}`,
        });
      }
      if (
        ratio?.pitem_ratio_value === undefined ||
        ratio?.pitem_ratio_value === null ||
        ratio?.pitem_ratio_value === ''
      ) {
        errors.push({
          field: `${t('validate.set')} ─ ${t('fields.pitemRatioValue')}`,
          message: `${t('descriptions.textField')}: ${t('fields.pitemRatioValue')}; ${t(
            'descriptions.textValue'
          )}: ${''}; ${t('descriptions.textRow')}: ${bidx + 1}`,
          key: `E1_${'pitem_ratio_value'}${bidx}`,
        });
      }
      if (
        config?.siteRecipeOnPercent &&
        (ratio?.pitem_ratio_percent_ppm === undefined ||
          ratio?.pitem_ratio_percent_ppm === null ||
          ratio?.pitem_ratio_percent_ppm === '')
      ) {
        errors.push({
          field: `${t('validate.set')} ─ ${t('fields.pitemRatioPercentPPM')}`,
          message: `${t('descriptions.textField')}: ${t('fields.pitemRatioPercentPPM')}; ${t(
            'descriptions.textValue'
          )}: ${''}; ${t('descriptions.textRow')}: ${bidx + 1}`,
          key: `E1_${'pitem_ratio_percent_ppm'}${bidx}`,
        });
      }
      if (
        ratio?.pitem_bltol_flag === undefined ||
        ratio?.pitem_bltol_flag === null ||
        ratio?.pitem_bltol_flag === ''
      ) {
        errors.push({
          field: `${t('validate.set')} ─ ${t('fields.pitemBltolFlag')}`,
          message: `${t('descriptions.textField')}: ${t('fields.pitemBltolFlag')}; ${t(
            'descriptions.textValue'
          )}: ${''}; ${t('descriptions.textRow')}: ${bidx + 1}`,
          key: `E1_${'pitem_bltol_flag'}${bidx}`,
        });
      }
      if (
        ratio?.pitem_bltol_ptol === undefined ||
        ratio?.pitem_bltol_ptol === null ||
        ratio?.pitem_bltol_ptol === ''
      ) {
        errors.push({
          field: `${t('validate.set')} ─ ${t('fields.pitemBltolPtol')}`,
          message: `${t('descriptions.textField')}: ${t('fields.pitemBltolPtol')}; ${t(
            'descriptions.textValue'
          )}: ${''}; ${t('descriptions.textRow')}: ${bidx + 1}`,
          key: `E1_${'pitem_bltol_ptol'}${bidx}`,
        });
      }
      if (
        ratio?.pitem_bltol_ntol === undefined ||
        ratio?.pitem_bltol_ntol === null ||
        ratio?.pitem_bltol_ntol === ''
      ) {
        errors.push({
          field: `${t('validate.set')} ─ ${t('fields.pitemBltolNtol')}`,
          message: `${t('descriptions.textField')}: ${t('fields.pitemBltolNtol')}; ${t(
            'descriptions.textValue'
          )}: ${''}; ${t('descriptions.textRow')}: ${bidx + 1}`,
          key: `E1_${'pitem_bltol_ntol'}${bidx}`,
        });
      }
      if (
        ratio?.pitem_hot_main === undefined ||
        ratio?.pitem_hot_main === null ||
        ratio?.pitem_hot_main === ''
      ) {
        errors.push({
          field: `${t('validate.set')} ─ ${t('fields.pitemHotMain')}`,
          message: `${t('descriptions.textField')}: ${t('fields.pitemHotMain')}; ${t(
            'descriptions.textValue'
          )}: ${''}; ${t('descriptions.textRow')}: ${bidx + 1}`,
          key: `E1_${'pitem_hot_main'}${bidx}`,
        });
      }

      // the field "ratio_value" must be a positive integer
      if (
        !(
          ratio?.pitem_ratio_value === undefined ||
          ratio?.pitem_ratio_value === null ||
          ratio?.pitem_ratio_value === ''
        )
      ) {
        // console.log('.........ppm', ratio?.pitem_ratio_value, _.toNumber(ratio.pitem_ratio_value), _.isInteger(_.toNumber(ratio.pitem_ratio_value)));
        if (!_.isInteger(_.toNumber(ratio.pitem_ratio_value))) {
          errors.push({
            field: `${t('validate.regexpTextInteger')} ─ ${t('fields.pitemRatioValue')}`,
            message: `${t('descriptions.textField')}: ${t('fields.pitemRatioValue')}; ${t(
              'descriptions.textValue'
            )}: ${ratio.pitem_ratio_value}; ${t('descriptions.textRow')}: ${bidx + 1}`,
            key: `E2_${'pitem_ratio_value'}${bidx}`,
          });
        }
        if (_.isInteger(_.toNumber(ratio.pitem_ratio_value)) && _.toNumber(ratio.pitem_ratio_value) <= 0) {
          errors.push({
            field: `${t('validate.positiveInteger')} ─ ${t('fields.pitemRatioValue')}`,
            message: `${t('descriptions.textField')}: ${t('fields.pitemRatioValue')}; ${t(
              'descriptions.textValue'
            )}: ${ratio.pitem_ratio_value}; ${t('descriptions.textRow')}: ${bidx + 1}`,
            key: `E3_${'pitem_ratio_value'}${bidx}`,
          });
        }
      }

      // the field "ratio_percent_ppm" must be a positive number
      if (
        config?.siteRecipeOnPercent &&
        !(
          ratio?.pitem_ratio_percent_ppm === undefined ||
          ratio?.pitem_ratio_percent_ppm === null ||
          ratio?.pitem_ratio_percent_ppm === ''
        )
      ) {
        console.log(
          '.........ppm',
          ratio?.pitem_ratio_percent_ppm,
          _.toNumber(ratio.pitem_ratio_percent_ppm),
          _.isNumber(_.toNumber(ratio.pitem_ratio_percent_ppm)),
          _.isFinite(_.toNumber(ratio.pitem_ratio_percent_ppm))
        );
        if (!_.isFinite(_.toNumber(ratio.pitem_ratio_percent_ppm))) {
          errors.push({
            field: `${t('validate.mustBeNumber')} ─ ${t('fields.pitemRatioPercentPPM')}`,
            message: `${t('descriptions.textField')}: ${t('fields.pitemRatioPercentPPM')}; ${t(
              'descriptions.textValue'
            )}: ${ratio.pitem_ratio_percent_ppm}; ${t('descriptions.textRow')}: ${bidx + 1}`,
            key: `E2_${'pitem_ratio_percent_ppm'}${bidx}`,
          });
        }
        if (
          _.isFinite(_.toNumber(ratio.pitem_ratio_percent_ppm)) &&
          _.toNumber(ratio.pitem_ratio_percent_ppm) <= 0
        ) {
          errors.push({
            field: `${t('validate.positiveNumber')} ─ ${t('fields.pitemRatioPercentPPM')}`,
            message: `${t('descriptions.textField')}: ${t('fields.pitemRatioPercentPPM')}; ${t(
              'descriptions.textValue'
            )}: ${ratio.pitem_ratio_percent_ppm}; ${t('descriptions.textRow')}: ${bidx + 1}`,
            key: `E3_${'pitem_ratio_percent_ppm'}${bidx}`,
          });
        }
      }

      // the field "rat_bltol_ptol" must be a positive number or ZERO
      if (
        !(
          ratio?.pitem_bltol_ptol === undefined ||
          ratio?.pitem_bltol_ptol === null ||
          ratio?.pitem_bltol_ptol === ''
        )
      ) {
        if (!_.isFinite(_.toNumber(ratio.pitem_bltol_ptol))) {
          errors.push({
            field: `${t('validate.mustBeNumber')} ─ ${t('fields.pitemBltolPtol')}`,
            message: `${t('descriptions.textField')}: ${t('fields.pitemBltolPtol')}; ${t(
              'descriptions.textValue'
            )}: ${ratio.pitem_bltol_ptol}; ${t('descriptions.textRow')}: ${bidx + 1}`,
            key: `E2_${'pitem_bltol_ptol'}${bidx}`,
          });
        }
        if (_.isFinite(_.toNumber(ratio.pitem_bltol_ptol)) && _.toNumber(ratio.pitem_bltol_ptol) < 0) {
          errors.push({
            field: `${t('validate.regexpTextNumericNonNegative')} ─ ${t('fields.pitemBltolPtol')}`,
            message: `${t('descriptions.textField')}: ${t('fields.pitemBltolPtol')}; ${t(
              'descriptions.textValue'
            )}: ${ratio.pitem_bltol_ptol}; ${t('descriptions.textRow')}: ${bidx + 1}`,
            key: `E3_${'pitem_bltol_ptol'}${bidx}`,
          });
        }
      }

      // the field "rat_bltol_ntol" must be a negative number or ZERO
      if (
        !(
          ratio?.pitem_bltol_ntol === undefined ||
          ratio?.pitem_bltol_ntol === null ||
          ratio?.pitem_bltol_ntol === ''
        )
      ) {
        if (!_.isFinite(_.toNumber(ratio.pitem_bltol_ntol))) {
          errors.push({
            field: `${t('validate.mustBeNumber')} ─ ${t('fields.pitemBltolNtol')}`,
            message: `${t('descriptions.textField')}: ${t('fields.pitemBltolNtol')}; ${t(
              'descriptions.textValue'
            )}: ${ratio.pitem_bltol_ntol}; ${t('descriptions.textRow')}: ${bidx + 1}`,
            key: `E2_${'pitem_bltol_ntol'}${bidx}`,
          });
        }
        if (_.isFinite(_.toNumber(ratio.pitem_bltol_ntol)) && _.toNumber(ratio.pitem_bltol_ntol) > 0) {
          errors.push({
            field: `${t('validate.regexpTextNumericNonPositive')} ─ ${t('fields.pitemBltolNtol')}`,
            message: `${t('descriptions.textField')}: ${t('fields.pitemBltolNtol')}; ${t(
              'descriptions.textValue'
            )}: ${ratio.pitem_bltol_ntol}; ${t('descriptions.textRow')}: ${bidx + 1}`,
            key: `E3_${'pitem_bltol_ntol'}${bidx}`,
          });
        }
      }

      // the field "rat_bltol_flag" must be a boolean flag
      if (
        !(
          ratio?.pitem_bltol_flag === undefined ||
          ratio?.pitem_bltol_flag === null ||
          ratio?.pitem_bltol_flag === ''
        )
      ) {
        if (!_.isBoolean(ratio.pitem_bltol_flag)) {
          errors.push({
            field: `${t('validate.mustBeBoolean')} ─ ${t('fields.pitemBltolFlag')}`,
            message: `${t('descriptions.textField')}: ${t('fields.pitemBltolFlag')}; ${t(
              'descriptions.textValue'
            )}: ${ratio.pitem_bltol_flag}; ${t('descriptions.textRow')}: ${bidx + 1}`,
            key: `E2_${'pitem_bltol_flag'}${bidx}`,
          });
        }
      }

      // the field "rat_hot_main" must be a boolean flag
      if (
        !(
          ratio?.pitem_hot_main === undefined ||
          ratio?.pitem_hot_main === null ||
          ratio?.pitem_hot_main === ''
        )
      ) {
        if (!_.isBoolean(ratio.pitem_hot_main)) {
          errors.push({
            field: `${t('validate.mustBeBoolean')} ─ ${t('fields.pitemHotMain')}`,
            message: `${t('descriptions.textField')}: ${t('fields.pitemHotMain')}; ${t(
              'descriptions.textValue'
            )}: ${ratio.pitem_hot_main}; ${t('descriptions.textRow')}: ${bidx + 1}`,
            key: `E2_${'pitem_hot_main'}${bidx}`,
          });
        }
      }
    }

    if (errors.length > 0) {
      const lines = (
        <>
          {errors?.map((error, index) => (
            <Card key={error.key} size="small" title={error.field}>
              {error.message}
            </Card>
          ))}
        </>
      );

      if (showWarning) {
        notification.error({
          message: t('validate.lineItemValidation'),
          description: lines,
          // duration: 0,
          style: {
            height: errors.length > 10 ? '900px' : `${errors.length * 80 + 100}px`,
            width: '30vw',
            overflowY: 'scroll',
          },
        });
      }
    }

    return errors;
  };
  /*
    "isDuplicated": " is duplicated",
    "isNotPositive": " is not positive",
    "isRequired": " is required",
    "ratioBaseCodeDuplicated": "Base code cannot be duplicated",
    "ratioBaseCodeInLine": "Base product code in line ",
    "ratioBaseFieldNull": " cannot be NULL",
      "ratioBaseValueMustBeInteger": "Ratio value must be an integer",
      "ratioBaseValueMustBePositive": "Ratio value must be positive",
      "ratioBaseValueInLine": "Ratio value in line ",
      "ratioBasePpmMustBeNumber": "Ratio percentage/ppm must be a number",
      "ratioBasePpmMustBePositive": "Ratio % or PPM must be positive",
      "ratioBasePpmInLine": "Ratio % or PPM in line ",
    
    notNumber
    isNegative
    isPositive
    notBoolean

      ratioBaseUpperLimitMustBeNumber
      ratioBaseUpperLimitMustBePositive
    ratioBaseUpperLimitInLine
    
    ratioBaseLowerLimitMustBeNumber
    ratioBaseLowerLimitMustBePositive
    ratioBaseLowerLimitInLine
    
    ratioBaseBlendTolMustBeBool
    ratioBaseBlendTolInLine
    
    ratioBaseHotMainMustBeBool
    ratioBaseHotMainInLine
  */

  /* const onUploadData = () => {
    Modal.confirm({
      title: t('prompts.upload'),
      okText: t('operations.yes'),
      okType: 'primary',
      cancelText: t('operations.no'),
      icon: <QuestionCircleOutlined />,
      centered: true,
      onOk: async () => {
        const values = {};
        values.tank_code = value?.tank_code;
        values.tank_terminal = values?.tank_terminal;
        values.delete_ratio = true;
        values.data = ratioList;
        await api
          .post(TANK_STRAPPING.IMPORT, values)
          .then((response) => {
            notification.success({
              message: t('messages.uploadSuccess'),
              description: t('descriptions.uploadRatioSuccess'),
            });
            onFinish();
          })

          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.uploadRatioFailed'),
            });
          });
      },
    });
  }; */

  const extra = (
    <>
      <Button style={{ marginRight: 10 }} type="primary" disabled={!selected} onClick={onDeleteLine}>
        {t('operations.deleteLineItem')}
      </Button>

      <Button style={{ marginRight: 10 }} type="primary" onClick={onAddLine}>
        {t('operations.addLineItem')}
      </Button>
    </>
  );

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} scrollToFirstError style={{ marginTop: '1rem' }}>
      <Row gutter={[8, 10]}>
        <Col span={12}>{`${t('fields.drawer')}: ${value?.prod_cmpycode} - ${value?.prod_cmpyname}`}</Col>
        <Col span={12}>{`${t('fields.product')}: ${value?.prod_code} - ${value?.prod_name}`}</Col>
      </Row>

      <Row gutter={[8, 10]}>
        <Col span={18}>
          <Upload {...props} style={{ marginRight: 10, width: '100%' }}>
            <Button style={{ marginRight: 10, width: '100%' }} type="primary">
              <UploadOutlined />
              {t('operations.selectFile')}
            </Button>
          </Upload>
        </Col>

        <Col span={6}>
          <Button
            style={{ marginRight: 10, width: '100%' }}
            type="primary"
            disabled={!canPreview}
            onClick={onPreviewData}
          >
            {t('operations.importPreviewData')}
          </Button>
        </Col>

        {/* <Col span={6}>
          <Button
            style={{ marginRight: 10, width: '100%' }}
            type="primary"
            disabled={!canUpload}
            onClick={onUploadData}
          >
            {t('operations.uploadData')}
          </Button>
        </Col> */}
      </Row>

      <DataTable
        minimal={true}
        data={ratioList}
        columns={fields}
        // extra={extra}
        // handleSelect={(value) => setSelected(value[0])}
        onCellUpdate={(value) => onCellUpdate(value)}
        height={'40vh'}
      />

      <div style={{ marginTop: '2rem' }}>
        <Tag color="red" style={{ float: 'left', width: '40vw' }}>
          <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold', color: 'red' }}>
            {t('descriptions.importEditBaseRatios')}
          </div>
        </Tag>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          style={{ float: 'right' }}
          onClick={() => Modal.destroyAll()}
        >
          {t('operations.cancel')}
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          icon={<SyncOutlined />}
          style={{ float: 'right', marginRight: 5 }}
          disabled={!canUpload}
        >
          {t('operations.ok')}
        </Button>
      </div>
    </Form>
  );
};

export default RatioImport;
