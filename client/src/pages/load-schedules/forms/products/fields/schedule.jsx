import React, { Component } from 'react';
import { InputNumber } from 'antd';
import _ from 'lodash';

const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;
const KEY_F2 = 113;

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.cancelBeforeStart = this.props.charPress && '1234567890'.indexOf(this.props.charPress) < 0;

    this.state = this.createInitialState(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  createInitialState(props) {
    let startValue;
    let highlightAllOnFocus = true;

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

    if (data?.editable) {
      this.refs.input.addEventListener('keydown', this.onKeyDown);
    }
  }

  componentWillUnmount() {
    const { data } = this.props;

    if (data?.editable) {
      this.refs.input.removeEventListener('keydown', this.onKeyDown);
    }
  }

  afterGuiAttached() {
    const eInput = this.refs.input;

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
    return this.cancelBeforeStart || data?.editable;
  }

  onKeyDown(event) {
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

  handleChange(value) {
    console.log('products:handleChange1', this.props);
    const { form, rowIndex, data, colDef } = this.props;
    console.log('products:handleChange2', data);

    let min = colDef?.cellEditorParams?.min;
    if (min === undefined) {
      min = 0;
    }
    let max = colDef?.cellEditorParams?.max;
    if (max === undefined) {
      max = 999999999;
    }

    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }

    let current = form.getFieldValue('products');

    current[rowIndex].qty_scheduled = value;

    form.setFieldsValue({
      compartments: current,
    });

    this.setState({
      value: value,
    });
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
      <InputNumber
        ref="input"
        value={this.state.value}
        onChange={this.handleChange}
        style={{ width: '100%' }}
        min={0}
        precision={0}
      />
    );
  }

  deleteOrBackspace(event) {
    return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.keyCode) > -1;
  }
}
