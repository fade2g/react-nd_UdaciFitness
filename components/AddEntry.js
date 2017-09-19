import React, {Component} from 'react';
import {View} from 'react-native';
import {getMetricsMetaInfo} from "../utils/helpers";
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';


export default class AddEntry extends Component {

  // noinspection JSUnusedGlobalSymbols
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
    const metaInfo = getMetricsMetaInfo();
    return (
      <View>
        {Object.keys(metaInfo).map((key) => {
          const {getIcon, type, ...rest} = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                  value={value}
                  onChange={(newValue) => this.slide(key, newValue)}
                  {...rest}
                />
                : <UdaciStepper
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              }
            </View>
          )

        })}
      </View>
    )
  }
}

