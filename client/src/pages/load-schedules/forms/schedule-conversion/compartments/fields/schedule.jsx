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
    const { form, rowIndex, data, products } = this.props;

    const max = _.toNumber(data?.safefill);
    let current = form.getFieldValue('compartments');

    let cmptQty = value;
    // find if product has been selected
    if (!data?.prod_code) {
      cmptQty = value <= max ? value : max;
    } else {
      // get the product from products list
      const product = _.find(products, (o) => o?.prod_code === data?.prod_code);
      const ordered = !product ? 0 : _.toNumber(product?.qty_scheduled);
      const planned =
        _.sumBy(
          current.filter((o) => o?.prod_code === data?.prod_code),
          'qty_scheduled'
        ) - _.toNumber(current[rowIndex].qty_scheduled); // need take away the old value of current compartment
      const availQty = parseInt(ordered - planned);
      const safeQty = parseInt(current[rowIndex].safefill);
      const maxQty = availQty >= safeQty ? safeQty : availQty < 0 ? 0 : availQty;
      cmptQty = value <= maxQty ? value : maxQty;
      console.log(
        '...........ordered, planned, avail',
        ordered,
        planned,
        availQty,
        current[rowIndex].qty_scheduled
      );
    }

    current[rowIndex].qty_scheduled = cmptQty;

    form.setFieldsValue({
      compartments: current,
    });

    this.setState({
      value: cmptQty,
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
      />
    );
  }

  deleteOrBackspace(event) {
    return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.keyCode) > -1;
  }
}
