import React, {Component} from 'react';
import {View} from 'react-native';
import {getMetricsMetaInfo} from "../utils/helpers";

export default class AddEntry extends Component {
  render() {
    return (
      <View>
        {getMetricsMetaInfo('bike').getIcon()}
      </View>
    )
  }
}

