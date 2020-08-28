import React, { Component } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import _ from 'lodash';

export default class InputPopupEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  getValue() {
    return this.state.value;
  }

  setCellValue = async (value) => {
    const { form, grid, colDef, rowIndex } = this.props;

    let current = form.getFieldValue(grid);

    current[rowIndex][colDef?.field] = value;

    form.setFieldsValue({
      [grid]: current,
    });
    console.log('InputPopupEditor: setCellValue', value, grid, rowIndex, current, colDef, this.props.api);

    //setPayload(current);

    this.setState(
      {
        value,
      },
      () => this.props.api.stopEditing()
    );
  };

  popupCallBack = async (value) => {
    const { name } = this.props;

    console.log('InputPopupEditor: popupCallBack', value);
    if (value) {
        let index = value;
        if (_.isObject(value) && value.hasOwnProperty(name)) {
          index = value[name];
        }
        if (_.isObject(value) && !value.hasOwnProperty(name)) {
          index = '';
        }
        await this.setCellValue(index);
        //this.setState({ value: index });
    }
  }

  handlePopup = async () => {
    const { t, popupTitle, popupParams, value } = this.props;
    console.log('InputPopupEditor: handlePopup', value);
    // pop up the dialog
    if (_.isFunction(this.state.popupManager)) {
        this.state.popupManager(
            popupTitle,
            popupParams,
            this.popupCallBack,
            '60vw',
            '50vh',
            t,
        );
     }
  };

  /* validate = (rule, input) => {

    if ((required && input === '') || (required && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${label}`);
    }

    const len = (new TextEncoder().encode(input)).length;
    if (maxLength != undefined && input && len > maxLength) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: ${maxLength} ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  }; */

  handleValueChange = (event) => {
    // this.setCellValue(event?.target?.value);
    this.setState({ value: event.target.value });
  }

  handlePressEnter = (event) => {
    // this.setCellValue(event?.target?.value);
    this.setState({ value: event.target.value });
  }

  componentDidMount() {
    const { popupManager } = this.props;
    // mount this dialog
    if (_.isFunction(popupManager)) {
        this.setState({ popupManager: popupManager });
    }
  }

  componentWillUnmount() {
    /* const { data } = this.props;
    // console.log('in NumericEditor componentWillUnmount', data);

    if (data?.editable) {
      this.refs.input.removeEventListener('keydown', this.onKeyDown);
    } */
    // this.props.value = this.state.value;
  }

  render() {
    const { id, maxLength, popupDisabled } = this.props;

    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <Input 
            id={id}
            value={this.state.value}
            style={{ width: '100%' }} 
            disabled={false}
            allowClear={true}
            maxLength={maxLength}
            onChange={this.handleValueChange}
            onPressEnter={this.handlePressEnter}
            addonAfter={
                !popupDisabled && (
                    <Button
                        icon={<CaretDownOutlined />}
                        onClick={() => this.handlePopup()}
                        disabled={false}
                    >
                    </Button>
                )
            }
        />


      </div>
    );
  }
}
