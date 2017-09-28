import React from 'react';
import {View, StyleSheet} from 'react-native'
import {FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'
import {white, red, blue, orange, lightPurp, pink} from './colors';

export function isBetween(num, x, y) {
  return num >= x && num <= y;
}

export function calculateDirection(heading) {
  let direction = '';

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North'
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East'
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East'
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East'
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South'
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West'
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West'
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West'
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North'
  } else {
    direction = 'Calculating'
  }

  return direction
}

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return todayUTC.toISOString().split('T')[0]
}

const style = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  }
});

const iconColor = white;

export function getMetricsMetaInfo(metric) {
  const info = {
    run: {
      displayName: 'run',
      max: 50,
      unit: 'miles',
      step: 1,
      type: 'steppers',
      getIcon() {
        return (
          <View style={[style.iconContainer, {backgroundColor: red}]}>
            <MaterialIcons name='directions-run' color={iconColor} size={35}/>
          </View>
        )
      }
    },
    bike: {
      displayName: 'bike',
      max: 100,
      unit: 'miles',
      step: 1,
      type: 'steppers',
      getIcon() {
        return (
          <View style={[style.iconContainer, {backgroundColor: orange}]}>
            <MaterialCommunityIcons name='bike' color={iconColor} size={35}/>
          </View>
        )
      }
    },
    swim: {
      displayName: 'swim',
      max: 9900,
      unit: 'meters',
      step: 100,
      type: 'steppers',
      getIcon() {
        return (
          <View style={[style.iconContainer, {backgroundColor: blue}]}>
            <MaterialCommunityIcons name='swim' color={iconColor} size={35}/>
          </View>
        )
      }
    },
    sleep: {
      displayName: 'sleep',
      max: 24,
      unit: 'hours',
      step: 1,
      type: 'slider',
      getIcon() {
        return (
          <View style={[style.iconContainer, {backgroundColor: lightPurp}]}>
            <FontAwesome name='bed' color={iconColor} size={35}/>
          </View>
        )
      }
    },
    eat: {
      displayName: 'eat',
      max: 10,
      unit: 'rating',
      step: 1,
      type: 'slider',
      getIcon() {
        return (
          <View style={[style.iconContainer, {backgroundColor: pink}]}>
            <MaterialCommunityIcons name='food' color={iconColor} size={35}/>
          </View>
        )
      }
    }
  };

  return typeof metric === 'undefined' ? info : info[metric];
}

export function getDailyReminderValue() {
  return {
    today: ":wave: Don't forget to log your data today!"


  }
}
