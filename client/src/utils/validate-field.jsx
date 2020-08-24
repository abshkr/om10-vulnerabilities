import _ from 'lodash';
import {notification} from 'antd';

const validateField = (rule, input) => {
    //   rule:
    //   {
    //     field: 'ddi_dd_number',
    //     title: t('fields.ddiDdNumber'),
    //     dataType: 'STRING',
    //     maxLength: 40,
    //     editable: false,
    //     required: true,
    //     precision: null,
    //     min: null,
    //     max: null,
    //   }
    // rule:
    //   {
    //     "fullField": "adr_name",
    //     "type": "string"
    //   }
    const errors = [];
    const t = rule.prompts;

    if ((rule.required && input === '') || (rule.required && !input)) {
      errors.push({
        key: rule.field + '_required',
        field: rule.title,
        message: `${t('validate.set')} ─ ${rule.title}`
      });
    }
 
    const len = (new TextEncoder().encode(input)).length;
    if ((rule.maxLength != undefined && rule.maxLength != null) && input && len > rule.maxLength) {
      errors.push({
        key: rule.field + '_maxlen',
        field: rule.title,
        message: `${t('placeholder.maxCharacters')}: ${rule.maxLength} ─ ${t('descriptions.maxCharacters')}`
      });
    }

    if (rule.dataType === 'STRING') {
    }
 
    if (rule.dataType === 'NUMBER' && String(input).trim() !== '' && input !== undefined && input !=null ) {
      const number = _.toNumber(input);
      const invalid = _.isNaN(number);
  
      const decimals = _.toString(number).split('.')[1]?.length || 0;
      
      if (input && input !== '' && invalid) {
        errors.push({
          key: rule.field + '_invalid',
          field: rule.title,
          message: `${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`
        });
      }
  
      if (rule.precision !== undefined && rule.precision !== null && decimals > rule.precision) {
        errors.push({
          key: rule.field + '_precision',
          field: rule.title,
          message: `${t('validate.decimalPlacesExceeded')} ${rule.precision} ─ ${t('descriptions.invalidDecimals')}`
        });
      }
  
      if (rule.max !== undefined && rule.max !== null && input !== '' && !invalid && number > rule.max) {
        errors.push({
          key: rule.field + '_maximum',
          field: rule.title,
          message: `${t('validate.outOfRangeMax')} ${rule.max} ─ ${t('descriptions.maxNumber')}`
        });
      }
  
      if (rule.min !== undefined && rule.min !== null && input !== '' && !invalid && number < rule.min) {
        errors.push({
          key: rule.field + '_minimum',
          field: rule.title,
          message: `${t('validate.outOfRangeMin')} ${rule.min} ─ ${t('descriptions.minNumber')}`
        });
      }
    }

    if (rule.returnType === 'notice') {
        if (errors.length > 0) {
            _.forEach(errors, error => {
            notification.error({
                message: error.field,
                description: error.message,
                key: error.key
            });
            });
        }
        return errors;
    } else {
        if (errors.length > 0) {
            return Promise.reject(errors?.[0]?.message);
        } else {
            return Promise.resolve();
        }
    }
};

export default validateField;
  