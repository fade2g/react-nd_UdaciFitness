import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {getMetricsMetaInfo, timeToString} from "../utils/helpers";
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';
import {Ionicons} from '@expo/vector-icons';
import TextButton from './TextButton';
import {submitEntry, removeEntry} from "../utils/api";
import {connect} from 'react-redux'
import {addEntry} from "../actions/index";
import { getDailyReminderValue} from "../utils/helpers";

function SubmitBtn({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Submit</Text>

    </TouchableOpacity>
  )
}

class AddEntry extends Component {

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

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    this.props.dispatch(addEntry({
      [key]: entry
    }));

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    });

    // TODO Update Redux
    // TODO Naviagte to home
    submitEntry(entry, key);
    // TODO Clear local information
  };

  reset = () => {
    const key = timeToString();
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }));

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    });
    // TODO Update Redux
    // TODO Naviagte to home
    removeEntry(key); // from api.js
  };

  render() {
    const metaInfo = getMetricsMetaInfo();

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons
            name="ios-happy-outline"
            size={100}
          />
          <Text>You've already logged your data for today</Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }


    return (
      <ScrollView>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
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
        <SubmitBtn onPress={this.submit}/>
      </ScrollView>
    )
  }
}


function mapStateToProps(state) {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps)(AddEntry);
