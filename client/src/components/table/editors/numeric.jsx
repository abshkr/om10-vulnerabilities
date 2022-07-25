import React, { Component } from 'react';
import { notification } from 'antd';
import _ from 'lodash';

const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;
const KEY_F2 = 113;

export default class NumericEditor extends Component {
  constructor(props) {
    super(props);
    // console.log('in NumericEditor constructor', props);
    this.cancelBeforeStart = this.props.charPress && '1234567890'.indexOf(this.props.charPress) < 0;

    this.state = this.createInitialState(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  createInitialState(props) {
    let startValue;
    let highlightAllOnFocus = true;
    // console.log('in NumericEditor createInitialState', props);

    if (props.keyPress === KEY_BACKSPACE || props.keyPress === KEY_DELETE) {
      // if backspace or delete pressed, we clear the cell
      startValue = '';
    } else if (props.charPress) {
      // if a letter was pressed, we start with the letter
      startValue = props.charPress;
      highlightAllOnFocus = false;
    } else {
      // otherwise we start with the current value
      startValue = props.value;
      if (props.keyPress === KEY_F2) {
        highlightAllOnFocus = false;
      }
    }

    return {
      value: startValue,
      highlightAllOnFocus,
    };
  }

  componentDidMount() {
    const { data } = this.props;
    // console.log('in NumericEditor componentDidMount', data);

    if (data?.editable) {
      this.refs.input.addEventListener('keydown', this.onKeyDown);
    }
  }

  componentWillUnmount() {
    const { data } = this.props;
    // console.log('in NumericEditor componentWillUnmount', data);

    if (data?.editable) {
      this.refs.input.removeEventListener('keydown', this.onKeyDown);
    }
  }

  afterGuiAttached() {
    const eInput = this.refs.input;
    // console.log('in NumericEditor afterGuiAttached', eInput);

    eInput.focus();
    if (this.state.highlightAllOnFocus) {
      eInput.select();

      this.setState({
        highlightAllOnFocus: false,
      });
    } else {
      const length = eInput.value ? eInput.value.length : 0;
      if (length > 0) {
        eInput.setSelectionRange(length, length);
      }
    }
  }

  getValue() {
    return this.state.value;
  }

  isCancelBeforeStart() {
    const { data } = this.props;
    // console.log('in NumericEditor isCancelBeforeStart', this.cancelBeforeStart, data);
    return this.cancelBeforeStart || (data?.editable !== undefined && !data?.editable);
  }

  isCancelAfterEnd() {
    const { data, colDef, ranges, t } = this.props;

    let inputTxt = String(this.state.value);
    if (inputTxt !== undefined && inputTxt !== inputTxt?.trimLeft()) {
      notification.error({
        message: `${colDef.headerName}${t('validate.dataTypeNumber')}!`,
        description: `${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`,
      });
      return true;
    }
    if (inputTxt !== undefined && inputTxt !== inputTxt?.trimRight()) {
      notification.error({
        message: `${colDef.headerName}${t('validate.dataTypeNumber')}!`,
        description: `${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`,
      });
      return true;
    }

    const value = _.toNumber(this.state.value);
    const valid = !_.isNaN(value);
    // console.log('NumericEditor - isCancelAfterEnd', colDef, data, ranges);
    // console.log('...........space......', _.isNaN('    '), isNaN('          '), _.isFinite('    '));

    if (valid) {
      //const { options } = colDef;
      // ag-grid: invalid colDef property 'options'
      const options = !ranges ? colDef?.options : ranges;

      // const min = data[options?.min];
      // const max = data[options?.max];
      let min = undefined;
      let max = undefined;
      if (options !== undefined) {
        if (_.isNumber(options?.min)) {
          min = options?.min;
        } else {
          min = data[options?.min];
        }
        if (_.isNumber(options?.max)) {
          max = options?.max;
        } else {
          max = data[options?.max];
        }
      }

      let payload = false;
      if (max !== undefined && this.state.value > max) {
        payload = true;
      }
      if (min !== undefined && min > this.state.value) {
        payload = true;
      }

      if (payload) {
        notification.error({
          message: `${colDef.headerName}${t('validate.dataOutRange')}!`,
          description: `${t('descriptions.pleaseKeepValueRange')}${min} ⟶ ${max}`,
        });
      }

      return payload;
    } else {
      notification.error({
        message: `${colDef.headerName}${t('validate.dataTypeNumber')}!`,
        description: `${t('descriptions.pleaseEnterNumber')}`,
      });
    }

    return true;
  }

  onKeyDown(event) {
    // console.log('in NumericEditor onKeyDown', event);
    if (this.isLeftOrRight(event) || this.deleteOrBackspace(event)) {
      event.stopPropagation();
      return;
    }

    if (!this.isKeyPressedNumeric(event)) {
      if (event.preventDefault) event.preventDefault();
    }
  }

  isLeftOrRight(event) {
    return [37, 39].indexOf(event.keyCode) > -1;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  getCharCodeFromEvent(event) {
    event = event || window.event;
    return typeof event.which === 'undefined' ? event.keyCode : event.which;
  }

  isKeyPressedNumeric(event) {
    return true;
  }

  render() {
    return (
      <input ref="input" value={this.state.value} onChange={this.handleChange} style={{ width: '100%' }} />
    );
  }

  deleteOrBackspace(event) {
    return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.keyCode) > -1;
  }
}
