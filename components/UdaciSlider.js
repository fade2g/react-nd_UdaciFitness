import React from 'react';
import {View, Slider, Text} from 'react-native';


export default UdaciSlider = ({max, unit, step, value, onChange}) => {
  return (
    <View>
      <Slider
        maximumValue={max}
        minmumValue={0}
        step={step}
        value={value}
        onValueChange={onChange}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  )
}
