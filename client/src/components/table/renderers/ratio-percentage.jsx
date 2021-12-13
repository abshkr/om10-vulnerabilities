import React, { Component } from 'react';
import { Select, Tag, Tooltip } from 'antd';
import _ from 'lodash';

export default class RatioPercentageRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  };

  getTotalRatios = (items, valueField) => {
    let total = 0;
    for (let i=0; i<items?.length; i++) {
      const item = items?.[i];
      total += _.toNumber(item?.[valueField]);
    }

    return total;
  };

  getMaxRatio = (items, valueField) => {
    let ratio = 0;
    for (let i=0; i<items?.length; i++) {
      const item = items?.[i];
      const value = _.toNumber(item?.[valueField]);
      if (value > ratio) {
        ratio = value;
      }
    }

    return ratio;
  };

  getAdtvRatios = (items, valueField, adtvFlag) => {
    let total = 0;
    for (let i=0; i<items?.length; i++) {
      const item = items?.[i];
      const isFlag = adtvFlag?.indexOf('flag') >= 0;
      const isAdditive = isFlag
        ? item?.[adtvFlag] === true || item?.[adtvFlag] === '1'
        : String(item?.[adtvFlag]) === '6' || String(item?.[adtvFlag]) === '11';
      if (isAdditive) {
        total += _.toNumber(item?.[valueField]);
      }
    }

    return total;
  };

  isStreamRecipeMatched = (items, nodes, codeField) => {
    if (nodes?.length === 0 || items?.length === 0) {
      return false;
    }
    // console.log('isStreamRecipeMatched2.....', items, nodes, codeField);
    let matched = true;
    for (let i=0; i<items?.length; i++) {
      const item = items?.[i];
      const node = _.find(nodes, (o) => (o?.stream_basecode === item?.[codeField]));
      // console.log('isStreamRecipeMatched.....', node);
      if (!node) {
        matched = false;
        break;
      }
    }

    return matched;
  }

  getStreamMembers = (data, items, streams, codeField) => {
    // find the matched node
    let bases = [];
    for (let i=0; i<streams?.length; i++) {
      const stream = streams?.[i];
      if (stream?.stream_basecode === data?.[codeField]) {
        // found the node
        const index = stream?.stream_index;
        // found the node, now get all the members of the stream.
        bases = _.filter(streams, (o) => (o?.stream_index === index));
        // now check if the stream contains all members of the recipe
        const found = this.isStreamRecipeMatched(items, bases, codeField);
        // console.log('...getStreamMembers.........', index, found, bases);
        if (found) {
          break;
        }
      }
    }

    return bases;
  };

  getStreamMainRatios = (data, items, streams, codeField, valueField, adtvFlag) => {
    // get all the members of a stream containing the recipe
    const nodes = this.getStreamMembers(data, items, streams, codeField);
    // console.log('getStreamMainRatios..............', data, nodes);

    // find the stream_seq of the base product in the stream.
    // the additives attached to a major base product will share the same value of stream_seq
    const node = _.find(nodes, (o) => (o?.stream_basecode === data?.[codeField]));
    if (!node) {
      // recipe base not found in pipenode
      const maxRatio = this.getMaxRatio(items, valueField);
      if (maxRatio === data?.[valueField]) {
        // this is the main base product
        // get total additive ratios
        const adtvRatios = this.getAdtvRatios(items, valueField, adtvFlag);
        const mainRatio = maxRatio + adtvRatios;
        return mainRatio;
      } else {
        return _.toNumber(data?.[valueField]);
      }
    }

    // recipe base found in pipenode
    const seq = node?.stream_seq;
    let total = 0;
    for (let i=0; i<items?.length; i++) {
      const item = items?.[i];
      const base = _.find(nodes, (o) => (o?.stream_basecode === item?.[codeField] && o?.stream_seq === seq));
      if (base) {
        total += _.toNumber(item?.[valueField]);
      }
    }

    return total;
  };

  getStreamAdtvRatios = (data, items, streams, codeField, valueField, adtvFlag) => {
    // get all the members of a stream containing the recipe
    const nodes = this.getStreamMembers(data, items, streams, codeField);

    // find the stream_seq of the base product in the stream.
    // the additives attached to a major base product will share the same value of stream_seq
    const node = _.find(nodes, (o) => (o?.stream_basecode === data?.[codeField]));
    if (!node) {
      // recipe base not found in pipenode, just return 0
      return 0;
    }

    // recipe base found in pipenode
    const seq = node?.stream_seq;
    let total = 0;
    for (let i=0; i<items?.length; i++) {
      const item = items?.[i];
      const isFlag = adtvFlag?.indexOf('flag') >= 0;
      const isAdditive = isFlag
        ? item?.[adtvFlag] === true || item?.[adtvFlag] === '1'
        : String(item?.[adtvFlag]) === '6' || String(item?.[adtvFlag]) === '11';
      if (isAdditive) {
        const base = _.find(nodes, (o) => (o?.stream_basecode === item?.[codeField] && o?.stream_seq === seq));
        if (base) {
            total += _.toNumber(item?.[valueField]);
        }
      }
    }

    return total;
  };

  render() {
    const { form, ratioField, codeField, valueField, adtvFlag, seqField, pipenode, data } = this.props;
    let current = form.getFieldValue(ratioField);

    const isFlag = adtvFlag?.indexOf('flag') >= 0;
    const isAdditive = isFlag
      ? data?.[adtvFlag] === true || data?.[adtvFlag] === '1'
      : String(data?.[adtvFlag]) === '6' || String(data?.[adtvFlag]) === '11';

    // get total ratios
    const totalRatios = this.getTotalRatios(current, valueField);
    // get max ratio
    const maxRatio = this.getMaxRatio(current, valueField);
    const adtv2Max = false;

    let percentQty = undefined;
    let tipQty = undefined;
    if (isAdditive) {
      // display in ppm
      // percentQty = data?.[valueField] + ' ppm';
      percentQty = totalRatios === 0 ? 0 : _.round((data?.[valueField] / totalRatios * 1000000), 0) + ' ppm';
      tipQty = totalRatios === 0 ? 0 : _.round((data?.[valueField] / totalRatios * 1000000), 0);
    } else {
      // calculate and display as %
      if (adtv2Max) {
        if (String(data?.[seqField]) === '1' || maxRatio === data?.[valueField]) {
            // this is the main base product
            // get total additive ratios
            const adtvRatios = this.getAdtvRatios(current, valueField, adtvFlag);
            const mainRatio = maxRatio + adtvRatios;
            percentQty = totalRatios === 0 ? 0 : _.round((mainRatio / totalRatios * 100), 4) + ' %';
            tipQty = totalRatios === 0 ? 0 : _.round((mainRatio / totalRatios * 1000000), 0);
        } else {
            percentQty = totalRatios === 0 ? 0 : _.round((data?.[valueField] / totalRatios * 100), 4) + ' %';
            tipQty = totalRatios === 0 ? 0 : _.round((data?.[valueField] / totalRatios * 1000000), 0);
        }
      } else {
        const streamRatios = this.getStreamMainRatios(data, current, pipenode, codeField, valueField, adtvFlag);
        percentQty = totalRatios === 0 ? 0 : _.round((streamRatios / totalRatios * 100), 4) + ' %';
        tipQty = totalRatios === 0 ? 0 : _.round((streamRatios / totalRatios * 1000000), 0);
      }
    }

    return (
      <Tooltip placement="topRight" title={tipQty}>
        <div style={{ display: 'flex' }}>{percentQty}</div>
      </Tooltip>
    );
  }
}
