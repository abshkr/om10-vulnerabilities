import React, { Component } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import _ from 'lodash';

export default class InputPopupEditor extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  getValue() {
    return this.state.value;
  }

  setCellValue = (value) => {
    const { form, grid, tableAPI, colDef, rowIndex } = this.props;

    let current = form.getFieldValue(grid);

    current[rowIndex][colDef?.field] = value;

    /* form.setFieldsValue({
      [grid]: current,
    }); */
    console.log('InputPopupEditor: setCellValue', value, grid, rowIndex, current, colDef);

    tableAPI.updateRowData({ update: [current[rowIndex]] });

    if (this._isMounted) {
      this.setState(
        {
          value,
        },
        () => this.props.api.stopEditing()
      );
    }
  };

  popupCallBack = (value) => {
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
        this.setCellValue(index);
    }
  }

  handlePopup = () => {
    const { t, popupManager, popupTitle, popupParams, width, height } = this.props;
    console.log('InputPopupEditor: handlePopup');
    // pop up the dialog
    if (_.isFunction(popupManager)) {
        popupManager(
            popupTitle,
            popupParams,
            this.popupCallBack,
            !width ? '60vw' : width,
            !height ? '50vh' : height,
            t,
        );
     }
  };

  handleValueChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handlePressEnter = (event) => {
    this.setState({ value: event.target.value });
  }

  componentDidMount() {
    this._isMounted = true;
    console.log('................componentDidMount', this._isMounted);
  }

  componentWillUnmount() {
    this._isMounted = false;
    console.log('................componentWillUnmount', this._isMounted);
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
