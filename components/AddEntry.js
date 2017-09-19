import React, {Component} from 'react';
import {View} from 'react-native';
import {getMetricsMetaInfo} from "../utils/helpers";

export default class AddEntry extends Component {

  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };

  increment = (metric) => {
    const {max, step} = getMetricsMetaInfo(metric);

    this.setState((state) => {
      const count = state[metric] + step;
      return {
        ...state,
        [metric]: count > max ? max : count
      };
    })
  };

  decrement = (metric) => {

    this.setState((state) => {
      const count = state[metric] - getMetricsMetaInfo(metric).step;
      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      };
    })
  };

  slide = (metric, newValue) => {
    this.setState((state) => {
      return {
        ...state,
        [metric]: newValue
      }
    })
  };

  render() {
    return (
      <View>
        {getMetricsMetaInfo('bike').getIcon()}
      </View>
    )
  }
}

